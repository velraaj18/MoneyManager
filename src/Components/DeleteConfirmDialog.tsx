import { ConfirmDialog } from "primereact/confirmdialog";
import { transactionService } from "../services/transactionService";

type props = {
  message: string;
  header: string;
  visible: boolean;
  setVisibile: (value: boolean) => void;
  icon: string;
  selectedId?: number | null;
  onDelete?: () => void;
};

const DeleteConfirmDialog = ({
  message,
  header,
  visible,
  icon,
  setVisibile,
  selectedId,
  onDelete,
}: props) => {
  const accept = async () => {
    if (!selectedId) return;
    await transactionService.delete(selectedId);
    onDelete?.();
  };
  return (
    <div>
      <ConfirmDialog
        message={message}
        header={header}
        visible={visible}
        icon={icon}
        accept={accept}
        reject={() => setVisibile(false)}
        onHide={() => setVisibile(false)}
      />
    </div>
  );
};

export default DeleteConfirmDialog;
