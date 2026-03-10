import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const Transactions = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const modalHeader = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-plus"></i>
      <span>Add Transaction</span>
    </div>
  );

  const modalFooter = (
    <div>
      <Button label="Save" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
    </div>
  );

  return (
    <>
      <div className="flex justify-content-between align-items-center">
        <h3 className="m-0">Transactions</h3>

        <Button className="flex align-items-center gap-2 p-2" onClick={() => setVisible(true)}>
          <i className="pi pi-plus"></i>
          <span className="hidden md:block">Add Transaction</span>
        </Button>
      </div>

      <Dialog
        visible={visible}
        style={{ width: "30rem" }}
        modal
        header={modalHeader}
        footer={modalFooter}
        onHide={() => setVisible(false)}
      >
        <div className="flex flex-column gap-3">

          <div className="flex flex-column gap-1">
            <label>Date</label>
            <Calendar placeholder="Select date" name="date" showIcon />
          </div>

          <div className="flex flex-column gap-1">
            <label>Amount</label>
            <InputText placeholder="Enter amount" name="amount" />
          </div>

          <div className="flex flex-column gap-1">
            <label>Category</label>
            <InputText placeholder="Food / Rent / Salary" name="category" />
          </div>

          <div className="flex flex-column gap-1">
            <label>Account</label>
            <Dropdown/>
          </div>

          <div className="flex flex-column gap-1">
            <label>Notes</label>
            <InputText placeholder="Optional note" name="notes" />
          </div>

        </div>
      </Dialog>
    </>
  );
};

export default Transactions;