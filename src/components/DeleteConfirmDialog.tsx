import { ConfirmDialog } from "primereact/confirmdialog";

type props = {
  message: string;
  header: string;
  visible: boolean;
  setVisibile: (value: boolean) => void;
  icon: string;
  accept : () => void;
};

const DeleteConfirmDialog = ({
  message,
  header,
  visible,
  icon,
  setVisibile,
  accept,
}: props) => {
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
