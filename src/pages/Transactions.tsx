import { Button } from "primereact/button";

import { useEffect, useState } from "react";
import TransactionModal from "../components/TransactionModal";
import RecentTransactions from "../components/RecentTransactions";
import type { Transaction } from "../types/Transaction";
import { Card } from "primereact/card";
import api from "../services/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

   useEffect(() => {
    api
      .get("/Transactions/GetAllTransactions")
      .then((res) => {setTransactions(res.data.data) 
        console.log(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const income = transactions
    .filter((x) => x.category === "Income")
    .reduce((sum, y) => sum + Number(y.amount), 0);

  const expense = transactions
    .filter((x) => x.category !== "Income")
    .reduce((sum, y) => sum + Number(y.amount), 0);

  const balance = income - expense;

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
