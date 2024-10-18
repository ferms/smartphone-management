import { Button } from "primereact/button";
import { Mobile } from "../modules/MobileManager";

interface MobileActionButtonsProps {
  rowData: Mobile;
  onEdit: (mobile: Mobile) => void;
  onDelete: (id: number) => void;
}

export const MobileActionButtons: React.FC<MobileActionButtonsProps> = ({ rowData, onEdit, onDelete }) => {
  return (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info p-mr-2"
        onClick={() => onEdit(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => onDelete(rowData.id)}
      />
    </>
  );
};
