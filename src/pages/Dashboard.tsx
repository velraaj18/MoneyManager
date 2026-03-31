import { Card } from "primereact/card";
import RecentTransactions from "../components/RecentTransactions";
import { useEffect, useState } from "react";
import type { Transaction } from "../types/Transaction";
import { transactionService } from "../services/transactionService";
import { CategoryExpenseChart } from "../components/CustomCharts/CategoryExpenseChart";
import { IncomeExpenseChart } from "../components/CustomCharts/IncomeExpenseChart";

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

      <div className="mt-4 grid">
      <div className="col-12 md:col-6">
        <Card title="Expense by Category">
          <CategoryExpenseChart />
        </Card>
      </div>

      <div className="col-12 md:col-6">
        <Card title="Income vs Expense">
          <IncomeExpenseChart />
        </Card>
      </div>
    </div>

      <div className="mt-4">
        <RecentTransactions transactions={transactions}/>
      </div>
    </>
  );
};

export default Dashboard;
