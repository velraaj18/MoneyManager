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
import { Card } from "primereact/card";

export const Accounts = () => {
  const [accounts, setAccounts] = useState<AccountsAPIResponse[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [description, setDescription] = useState("");

  const loadAccounts = async () => {
    const res = await AccountService.getAll();
    setAccounts(res.data.data);
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const selectedAccount = accounts.find((x) => x.accountUID == selectedId);

  useEffect(() => {
    if (!selectedAccount) {
      setAccountName("");
      setDescription("");
      return;
    }

    setAccountName(selectedAccount.accountName);
    setDescription(selectedAccount.description);
  }, [selectedAccount]);

  const actionTemplate = (rowData: AccountsAPIResponse) => (
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

  const columns: customColumn[] = [
    { field: "accountName", header: "Account Name" },
    { field: "description", header: "Description" },
    { field: "action", header: "Action", body: actionTemplate },
  ];

  const content = (
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
      accountName,
      description,
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
      <Button label="Cancel" className="p-2" icon="pi pi-times" severity="secondary" text onClick={() => setModalVisible(false)} />
      <Button label="Save" className="p-2" icon="pi pi-check" onClick={handleSave} />
    </div>
  );

  const accept = async () => {
    if (!selectedId) return;
    await AccountService.delete(selectedId);
    await loadAccounts();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Wallets</p>
          <h2 className="dashboard-title">Accounts</h2>
          <p className="dashboard-subtitle">
            Keep every account in one tidy view and manage them without friction.
          </p>
        </div>

        <div className="dashboard-toolbar">
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
      </div>

      <Card className="dashboard-panel">
        <DynamicTable value={accounts} size="small" columns={columns} />
      </Card>

      <DynamicModal
        visible={modalVisible}
        setVisible={setModalVisible}
        content={content}
        header={modalHeader}
        footer={modalFooter}
      />

      <DeleteConfirmDialog
        message="Do you want to delete?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        visible={deleteModalVisible}
        setVisibile={setDeleteModalVisible}
        accept={accept}
      />
    </div>
  );
};
