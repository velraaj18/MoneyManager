import { Dialog } from "primereact/dialog";

type dynamicModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  header?: any | "Header";
  footer?: any;
  content: any;
};

export const DynamicModal = ({
  visible,
  setVisible,
  header,
  footer,
  content,
}: dynamicModalProps) => {
  return (
    <>
      <Dialog
        visible={visible}
        style={{ width: "30rem" }}
        modal
        header={header}
        footer={footer}
        onHide={() => setVisible(false)}
      >
        {content}
      </Dialog>
    </>
  );
};
