import { useEffect, useState } from "react";
import type { AccountsAPIResponse } from "../types/Account";
import { AccountService } from "../services/accountService";
import DynamicTable, { type customColumn } from "../components/DynamicTable";
import { Button } from "primereact/button";

export const Accounts = () => {
  const [Accounts, setAccounts] = useState<AccountsAPIResponse[]>([]);
  const [selectedId, setSelectedId] = useState<number>();

  useEffect(() => {
    AccountService.getAll().then((res) => {
      setAccounts(res.data.data);
      console.log(res);
    });
  }, []);

  const actionTemplate = (rowData: AccountsAPIResponse) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          severity="secondary"
          text
          onClick={() => setSelectedId(rowData.accountUID)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          text
          onClick={() => setSelectedId(rowData.accountUID)}
        />
      </div>
    );
  };

  var columns: customColumn[] = [
    { field: "accountUID", header: "Account UID" },
    { field: "accountName", header: "Account Name" },
    { field: "description", header: "Description" },
    { field: "action", header: "Action", body: actionTemplate },
  ];

  return (
    <>
      <div>
        <div className="flex justify-content-between align-items-center">
          <h3>List of Accounts</h3>
          <Button className="flex align-items-center gap-2 p-2">
            <i className="pi pi-plus"></i>
            <span className="hidden md:block">Add Account</span>
          </Button>
        </div>
        <DynamicTable
          value={Accounts}
          size="small"
          columns={columns} 
        ></DynamicTable>
      </div>
    </>
  );
};
