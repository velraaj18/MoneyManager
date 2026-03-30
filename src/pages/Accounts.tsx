import { useEffect, useState } from "react";
import type {
  AccountsAPIResponse,
  CreateAccountRequest,
} from "../types/Account";
import { AccountService } from "../services/accountService";
import DynamicTable, { type customColumn } from "../components/DynamicTable";
import { Button } from "primereact/button";
import { DynamicModal } from "../components/DynamicModal";
import { InputText } from "primereact/inputtext";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

export const Accounts = () => {
  const [accounts, setAccounts] = useState<AccountsAPIResponse[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const [accountName, setAccountName] = useState("");
  const [description, setDescription] = useState("");

  // fetch the accounts each time the page refreshes automatically using "useEffect"
  const loadAccounts = async () => {
    const res = await AccountService.getAll();
    setAccounts(res.data.data);
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  // Get the selected account for edit and delete
  const selectedAccount = accounts.find((x) => x.accountUID == selectedId);

  // Pre-fill the modal on edit mode using the selected "Account" object
  useEffect(() => {
    if (!selectedAccount) {
      setAccountName("");
      setDescription("");
      return;
    }

    setAccountName(selectedAccount.accountName);
    setDescription(selectedAccount.description);
  }, [selectedAccount]);

  // this is the action template for the edit and delete on each row.
  const actionTemplate = (rowData: AccountsAPIResponse) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          severity="secondary"
          text
          onClick={() => {
            setSelectedId(rowData.accountUID);
            setModalVisible(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          text
          onClick={() => {
            setSelectedId(rowData.accountUID);
            setDeleteModalVisible(true);
          }}
        />
      </div>
    );
  };

  // Columns for the data table
  // the field should match the api response fields exactly [case sensitive]
  var columns: customColumn[] = [
    { field: "accountUID", header: "Account UID" },
    { field: "accountName", header: "Account Name" },
    { field: "description", header: "Description" },
    { field: "action", header: "Action", body: actionTemplate },
  ];

  // Content to render inside the modal
  // For edit mode the values will be loaded based on the selected ID.
  var content = (
    <div className="flex flex-column gap-3">
      <div className="flex flex-column gap-1">
        <label>Account Name</label>
        <InputText
          value={accountName}
          placeholder="Enter account name"
          name="accountName"
          onChange={(e) => setAccountName(e.target.value)}
        />
      </div>
      <div className="flex flex-column gap-1">
        <label>Description</label>
        <InputText
          value={description}
          placeholder="Optional note"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );

  const handleSave = async () => {
    const payload: CreateAccountRequest = {
      accountName: accountName,
      description: description,
    };

    if (selectedAccount) {
      await AccountService.put(selectedAccount.accountUID, payload);
    } else {
      await AccountService.post(payload);
    }

    await loadAccounts();
    setModalVisible(false);
  };

  const modalHeader = (
    <div className="flex align-items-center gap-2">
      <i className={selectedId ? "pi pi-pencil" : "pi pi-plus"}></i>
      <span>{selectedId ? "Edit Account" : "Add Account"}</span>
    </div>
  );

  const modalFooter = (
    <div className="flex align-items-center justify-content-between">
      <Button
        label="Cancel"
        className="p-2"
        icon="pi pi-cancel"
        onClick={() => setModalVisible(false)}
      />
      <Button
        label="Save"
        className="p-2"
        icon="pi pi-check"
        onClick={handleSave}
      />
    </div>
  );

  // Delete dialog accept function
  const accept = async () => {
    if (!selectedId) return;
    await AccountService.delete(selectedId);
    
    await loadAccounts();
  };

  return (
    <>
      <div>
        <div className="flex justify-content-between align-items-center">
          <h3>List of Accounts</h3>
          <Button
            className="flex align-items-center gap-2 p-2"
            onClick={() => {
              setModalVisible(true);
              setAccountName("");
              setDescription("");
              setSelectedId(undefined);
            }}
          >
            <i className="pi pi-plus"></i>
            <span className="hidden md:block">Add Account</span>
          </Button>
        </div>

        <DynamicTable
          value={accounts}
          size="small"
          columns={columns}
        ></DynamicTable>

        <DynamicModal
          visible={modalVisible}
          setVisible={setModalVisible}
          content={content}
          header={modalHeader}
          footer={modalFooter}
        ></DynamicModal>

        <DeleteConfirmDialog
          message="Do you want to delete?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          visible={deleteModalVisible}
          setVisibile={setDeleteModalVisible}
          accept={accept}
        />
      </div>
    </>
  );
};
