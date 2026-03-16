import { Card } from "primereact/card";
import RecentTransactions from "../components/RecentTransactions";
import { useState } from "react";
import type { Transaction } from "../types/Transaction";

const Dashboard = () => {

    const [transactions, setTransactions] = useState<Transaction[]>([
      {
        id: 1,
        date: "2026-03-10",
        description: "Salary",
        category: "Income",
        account: "SBI",
        amount: 25000,
      },
      {
        id: 2,
        date: "2026-03-11",
        description: "Groceries",
        category: "Food",
        account: "SBI",
        amount: -500,
      },
      {
        id: 3,
        date: "2026-03-12",
        description: "Petrol",
        category: "Transport",
        account: "SBI",
        amount: -300,
      },
      {
        id: 4,
        date: "2026-03-13",
        description: "Freelance",
        category: "Income",
        account: "SBI",
        amount: 4000,
      },
    ]);

  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Balance">₹ 45,000</Card>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Expenses">₹ 12,000</Card>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Income">₹ 25,000</Card>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Savings">₹ 8,000</Card>
        </div>
      </div>

      <div className="mt-4">
        <RecentTransactions transactions={transactions}/>
      </div>
    </>
  );
};

export default Dashboard;
