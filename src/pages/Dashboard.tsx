import { Card } from "primereact/card";
import RecentTransactions from "../components/RecentTransactions";
import { useEffect, useState } from "react";
import type { Transaction } from "../types/Transaction";
import { transactionService } from "../services/transactionService";

const Dashboard = () => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
      transactionService.getall().then((res) => {
        setTransactions(res.data.data);
      })
    }, [])

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
        <RecentTransactions transactions={transactions} setTransactions={setTransactions}/>
      </div>
    </>
  );
};

export default Dashboard;
