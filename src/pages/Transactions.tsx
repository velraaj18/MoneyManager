import { Button } from "primereact/button";

import { useState } from "react";
import TransactionModal from "../components/TransactionModal";
import RecentTransactions from "../components/RecentTransactions";
import type { Transaction } from "../types/Transaction";
import { Card } from "primereact/card";

const Transactions = () => {
  const initialData: Transaction[] = [
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
      amount: 500,
    },
    {
      id: 3,
      date: "2026-03-12",
      description: "Petrol",
      category: "Transport",
      account: "SBI",
      amount: 300,
    },
    {
      id: 4,
      date: "2026-03-13",
      description: "Freelance",
      category: "Income",
      account: "SBI",
      amount: 4000,
    },
  ];

  const [transactions, setTransactions] = useState<Transaction[]>(initialData);
  const [visible, setVisible] = useState<boolean>(false);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const income = transactions
    .filter((x) => x.category === "Income")
    .reduce((sum, y) => sum + y.amount, 0);

  const expense = transactions
    .filter((x) => x.category !== "Income")
    .reduce((sum, y) => sum + y.amount, 0);
    
  const balance = income - expense;

  return (
    <>
      <div className="flex justify-content-between align-items-center">
        <h3 className="m-0">
          Transactions
        </h3>

        <Button
          className="flex align-items-center gap-2 p-2"
          onClick={() => setVisible(true)}
        >
          <i className="pi pi-plus"></i>
          <span className="hidden md:block">Add Transaction</span>
        </Button>
      </div>

      <div className="transaction_cards mt-5">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-4">
            <Card title="Income">₹ {income}</Card>
          </div>

          <div className="col-12 md:col-6 lg:col-4">
            <Card title="Expenses">₹ {expense}</Card>
          </div>

          <div className="col-12 md:col-6 lg:col-4">
            <Card title="Balance">₹ {balance}</Card>
          </div>
        </div>
      </div>

      <RecentTransactions
        transactions={transactions}
        setTransactions={setTransactions}
      />

      <TransactionModal
        visible={visible}
        setVisible={setVisible}
        saveTransaction={addTransaction}
      />
    </>
  );
};

export default Transactions;
