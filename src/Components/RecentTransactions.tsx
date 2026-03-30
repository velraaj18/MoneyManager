"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { Transaction } from "../types/Transaction";
import { useEffect, useState } from "react";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import TransactionModal from "./TransactionModal";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { CategoryService } from "../services/categoryService";
import type { Category } from "../types/Category";
import { transactionService } from "../services/transactionService";

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
  onSave? : () => void; 
};

export default function RecentTransactions({
  transactions,
  onSave
}: Props) {
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // These are for filters
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [search, setSearch] = useState("");

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
            setSelectedId(rowData.transactionUID);
            setDeleteDialogVisible(true);
          }}
        />
      </div>
    );
  };

  const columns = [
    {field: "transactionUID", header: "TransactionUID", sortable: true },
    { field: "date", header: "Date", sortable: true },
    { field: "description", header: "Description" },
    { field: "category", header: "Category" },
    { field: "account", header: "Account" },
    { field: "amount", header: "Amount", body: amountTemplate, sortable: true },
    { field: "actions", header: "Actions", body: actionTemplate },
  ];

  // Handle filters
  const filteredTransactions = transactions.filter(
    (t) =>
      (!selectedCategory ||
        t.categoryId === selectedCategory) &&
      (!fromDate || new Date(t.date) >= fromDate) &&
      (!toDate || new Date(t.date) <= toDate) &&
      (t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.account.toLowerCase().includes(search.toLowerCase())),
  );

  // Category for dropdown filters
  useEffect(() => {
    CategoryService.getAll().then((res) => {
      const mapped: Category[] = res.data.data.map((c: any) => ({
        name: c.categoryName,
        value: c.categoryUID
      }))
  
      console.log(mapped)
  
      setCategories(mapped)
    })
  }, [])

    const accept = async () => {
      if (!selectedId) return;
      await transactionService.delete(selectedId);
      onSave?.();
    };

  return (
    <div className="card">
      <div className="filters mb-5 mt-5">
        <div className="flex align-items-center gap-5">
          <Dropdown
            options={categories}
            value={selectedCategory}
            onChange={(e: DropdownChangeEvent) => setSelectedCategory(e.value)}
            optionLabel="name"
            optionValue="value"
            placeholder="Select a category"
          />
          <Calendar
            value={fromDate}
            placeholder="From date"
            name="date"
            onChange={(e) => setFromDate(e.value as Date)}
          />
          <Calendar
            value={toDate}
            placeholder="To date"
            name="date"
            onChange={(e) => setToDate(e.value as Date)}
          />
          <InputText
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
          />
        </div>
      </div>

      <DataTable
        value={filteredTransactions}
        stripedRows
        size="small"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20]}
        emptyMessage="No transactions found..."
      >
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
      />

      <TransactionModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        transaction={selectedTransaction}
        onSave={onSave}
      />
    </div>
  );
}
