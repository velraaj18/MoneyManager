import { ConfirmDialog } from "primereact/confirmdialog";

type props = {
  message: string;
  header: string;
  visible: boolean;
  setVisibile: (value: boolean) => void;
  accept: () => void;
  reject: () => void;
  icon: string;
};

const DeleteConfirmDialog = ({
  message,
  header,
  visible,
  icon,
  setVisibile,
  accept,
  reject,
}: props) => {
  return (
    <div>
      <ConfirmDialog
        message={message}
        header={header}
        visible={visible}
        icon={icon}
        accept={accept}
        reject={reject}
        onHide={() => setVisibile(false)}
      />
    </div>
  );
};

export default DeleteConfirmDialog;
