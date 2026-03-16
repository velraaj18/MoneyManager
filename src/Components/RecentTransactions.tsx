"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import type { Transaction } from "../types/Transaction";

const amountTemplate = (rowData:any) => {
  const formatted = rowData.amount.toLocaleString("en-IN")
  return <span style={{color: rowData.amount > 0 ? "green" : "red"}}>₹ {formatted}</span>
}

const actionTemplate = () => {
  return (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" severity="secondary" text />
      <Button icon="pi pi-trash" severity="danger" text />
    </div>
  )
}

const transactions : Transaction[] = [
  { id: 1, date: "2026-03-10", description: "Salary", category: "Income", account: "SBI", amount: 25000 },
  { id: 2, date: "2026-03-11", description: "Groceries", category: "Food", account: "SBI", amount: -500 },
  { id: 3, date: "2026-03-12", description: "Petrol", category: "Transport", account: "SBI", amount: -300 },
  { id: 4, date: "2026-03-13", description: "Freelance", category: "Income", account: "SBI", amount: 4000 }
];

const columns = [
  { field: "date", header: "Date", sortable: true},
  { field: "description", header: "Description" },
  { field: "category", header: "Category" },
  { field: "account", header: "Account" },
  { field: "amount", header: "Amount", body: amountTemplate, sortable: true},
  { field: "actions", header: "Actions", body: actionTemplate }
];

export default function RecentTransactions() {
  return (
    <div className="card">
      <h3>Recent Transactions</h3>

      <DataTable value={transactions} stripedRows size="small">
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} body={col.body} sortable={col.sortable}/>
        ))}
      </DataTable>
    </div>
  );
}