import React, { useState, useRef, useEffect } from 'react';
import './MobileManager.css';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MobileService } from '../services/MobileService'; // Asegúrate de la ruta correcta
import { MobileActionButtons } from '../components/MobileActionButtons';
import MobileFormDialog from '../components/MobileFormDialog'; // Importa el nuevo componente
export interface Mobile {
  id: number;
  name: string;
  model: string;
  storage: string;
}

const MobileManager: React.FC = () => {
  const [mobiles, setMobiles] = useState<Mobile[]>([]);
  const [mobile, setMobile] = useState<Mobile>({ id: 0, name: '', model: '', storage: '' });
  const [showDialog, setShowDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useRef<Toast>(null);
  const maxChars = 70;

  const allMobiles = async () => {
    try {
      const data = await MobileService.allMobiles();
      setMobiles(data);
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los dispositivos' });
    }
  };

  useEffect(() => {
    allMobiles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Mobile) => {
    const value = e.target.value;

    if (value.length > maxChars) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: `Has superado el máximo de caracteres (${maxChars}). Valor ingresado: ${value.length}`,
      });
      return; 
    }

    setMobile({ ...mobile, [field]: value });
  };

  const addOrUpdateMobile = async () => {
    if (!mobile.name || !mobile.model || !mobile.storage) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Todos los campos son obligatorios' });
      return;
    }

    try {
      if (isEditing) {
        await MobileService.updateMobile(mobile.id, mobile);
        setMobiles(mobiles.map(m => (m.id === mobile.id ? mobile : m)));
        toast.current?.show({ severity: 'info', summary: 'Actualizado', detail: 'Dispositivo actualizado' });
      } else {
        const newMobile = await MobileService.createMobile(mobile);
        setMobiles([...mobiles, newMobile]);
        toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Dispositivo agregado' });
      }
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar el dispositivo' });
    }

    setMobile({ id: 0, name: '', model: '', storage: '' });
    setShowDialog(false);
    setIsEditing(false);
  };

  const deleteMobile = async (id: number) => {
    try {
      await MobileService.deleteMobile(id);
      setMobiles(mobiles.filter((m) => m.id !== id));
      toast.current?.show({ severity: 'warn', summary: 'Eliminado', detail: 'Dispositivo eliminado' });
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el dispositivo' });
    }
  };

  const editMobile = (mobile: Mobile) => {
    setMobile(mobile);
    setIsEditing(true);
    setShowDialog(true);
  };

  return (
    <div className="content">
      <Toast ref={toast} />
      <div className='tableData'>
        <h2 className='mt-1'>Gestión de smartphone</h2>
        <Button className='mb-2' label="Agregar Dispositivo" icon="pi pi-plus" onClick={() => setShowDialog(true)} />
        <DataTable value={mobiles} className="p-mt-3">
          <Column field="name" header="Nombre" />
          <Column field="model" header="Modelo" />
          <Column field="storage" header="Almacenamiento" />
          <Column
            className="flex gap-2"
            style={{ width: '150px' }}
            header="Acciones"
            body={(rowData: Mobile) => (
              <MobileActionButtons 
                rowData={rowData} 
                onEdit={editMobile} 
                onDelete={deleteMobile} 
              />
            )}
          />
        </DataTable>
      </div>
      {/* Usa el nuevo componente MobileFormDialog */}
      <MobileFormDialog 
        mobile={mobile} 
        isEditing={isEditing} 
        showDialog={showDialog} 
        maxChars={maxChars}
        onChange={handleChange} 
        onSave={addOrUpdateMobile} 
        onHide={() => {
          setShowDialog(false);
          setIsEditing(false);
          setMobile({ id: 0, name: '', model: '', storage: '' });
        }}
      />
    </div>
  );
};

export default MobileManager;
