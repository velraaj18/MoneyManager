import { Button } from "primereact/button";

import { useState } from "react";
import TransactionModal from "../components/TransactionModal";
import RecentTransactions from "../components/RecentTransactions";
import type { Transaction } from "../types/Transaction";

const Transactions = () => {
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
  ]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <div className="flex justify-content-between align-items-center">
        <h3 className="m-0">Transactions</h3>

        <Button
          className="flex align-items-center gap-2 p-2"
          onClick={() => setVisible(true)}
        >
          <i className="pi pi-plus"></i>
          <span className="hidden md:block">Add Transaction</span>
        </Button>
      </div>

      <RecentTransactions transactions={transactions} />

      <TransactionModal
        visible={visible}
        setVisible={setVisible}
        addTransaction={addTransaction}
      />
    </>
  );
};

export default Transactions;
