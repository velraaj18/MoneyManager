"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

 const amountTemplate = (rowData: any) => {
    return (
      <span style={{ color: rowData.amount > 0 ? "green" : "red" }}>
        ₹ {rowData.amount}
      </span>
    );
  };

const transactions = [
  {
    id: 1,
    date: "10 Mar 2026",
    description: "Grocery Store",
    category: "Food",
    account: "SBI",
    type: "Expense",
    amount: -1200,
  },
  {
    id: 2,
    date: "9 Mar 2026",
    description: "Salary",
    category: "Income",
    account: "HDFC",
    type: "Income",
    amount: 25000,
  },
  {
    id: 3,
    date: "8 Mar 2026",
    description: "Petrol",
    category: "Transport",
    account: "SBI",
    type: "Expense",
    amount: -800,
  },
];

const columns = [
  { field: "date", header: "Date" },
  { field: "description", header: "Description" },
  { field: "category", header: "Category" },
  { field: "account", header: "Account" },
  { field: "type", header: "Type" },
  { field: "amount", header: "Amount" , body: amountTemplate},
];

export default function RecentTransactions() {
 
  return (
    <div className="card">
      <h3>Recent Transactions</h3>

      <DataTable value={transactions} stripedRows>
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} body={col.body}/>
        ))}
      </DataTable>
    </div>
  );
}
