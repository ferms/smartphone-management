// src/components/MobileFormDialog.tsx
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Mobile } from '../modules/MobileManager';

interface MobileFormDialogProps {
  mobile: Mobile;
  isEditing: boolean;
  showDialog: boolean;
  maxChars: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof Mobile) => void;
  onSave: () => void;
  onHide: () => void;
}

const MobileFormDialog: React.FC<MobileFormDialogProps> = ({
  mobile,
  isEditing,
  showDialog,
  maxChars,
  onChange,
  onSave,
  onHide,
}) => {
  return (
    <Dialog
      style={{ width: '30vw' }}
      header={isEditing ? 'Editar Dispositivo' : 'Agregar Dispositivo'}
      visible={showDialog}
      onHide={onHide}
    >
      <div className="p-field flex flex-column">
        <label className='font-semibold' htmlFor="name">Nombre</label>
        <InputText
          id="name"
          value={mobile.name}
          onChange={(e) => onChange(e, 'name')}
          maxLength={maxChars} // Establecer límite de caracteres
        />
        <small>{mobile.name.length}/{maxChars} caracteres</small> {/* Mostrar conteo de caracteres */}
      </div>
      <div className="p-field flex flex-column mt-3">
        <label className='font-semibold' htmlFor="model">Modelo</label>
        <InputText
          id="model"
          value={mobile.model}
          onChange={(e) => onChange(e, 'model')}
          maxLength={maxChars}
        />
        <small>{mobile.model.length}/{maxChars} caracteres</small>
      </div>
      <div className="p-field flex flex-column mt-3">
        <label className='font-semibold' htmlFor="storage">Almacenamiento</label>
        <InputText
          id="storage"
          value={mobile.storage}
          onChange={(e) => onChange(e, 'storage')}
          maxLength={maxChars}
        />
        <small>{mobile.storage.length}/{maxChars} caracteres</small>
      </div>
      <Button
        className='mt-3'
        label={isEditing ? 'Actualizar' : 'Guardar'}
        icon="pi pi-check"
        onClick={onSave}
      />
    </Dialog>
  );
};

export default MobileFormDialog;
