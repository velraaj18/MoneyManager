"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { Transaction } from "../types/Transaction";
import { useState } from "react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import TransactionModal from "./TransactionModal";

const amountTemplate = (rowData: any) => {
  const formatted = rowData.amount.toLocaleString("en-IN");
  return (
    <span style={{ color: rowData.category === "Income" ? "green" : "red" }}>
      ₹ {formatted}
    </span>
  );
};

type Props = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
};

export default function RecentTransactions({
  transactions,
  setTransactions,
}: Props) {
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const actionTemplate = (rowData: Transaction) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          severity="secondary"
          text
          onClick={() => {
            setSelectedTransaction(rowData);
            setEditModalVisible(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          text
          onClick={() => {
            setSelectedId(rowData.id);
            setDeleteDialogVisible(true);
          }}
        />
      </div>
    );
  };

  const columns = [
    { field: "date", header: "Date", sortable: true },
    { field: "description", header: "Description" },
    { field: "category", header: "Category" },
    { field: "account", header: "Account" },
    { field: "amount", header: "Amount", body: amountTemplate, sortable: true },
    { field: "actions", header: "Actions", body: actionTemplate },
  ];

  // Accept and reject for Delete confirmation modal
  const accept = () => {
    if (selectedId === null) return;
    setTransactions((prev) => prev.filter((t) => t.id !== selectedId));
    setDeleteDialogVisible(false);
    setSelectedId(null);
  };

  // Edit transactions
  const editTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );
  };

  return (
    <div className="card">
      <h3>Recent Transactions</h3>

      <DataTable value={transactions} stripedRows size="small">
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={col.body}
            sortable={col.sortable}
          />
        ))}
      </DataTable>

      <DeleteConfirmDialog
        message="Do you want to delete?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        visible={deleteDialogVisible}
        setVisibile={setDeleteDialogVisible}
        accept={accept}
        reject={() => setDeleteDialogVisible(false)}
      />

      <TransactionModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        addTransaction={editTransaction}
        transaction={selectedTransaction}
      />
    </div>
  );
}
