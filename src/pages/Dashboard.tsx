import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import RecentTransactions from "../components/RecentTransactions";
import { useEffect, useState } from "react";
import type {
  Transaction,
  TransactionCategorySummary,
} from "../types/Transaction";
import { transactionService } from "../services/transactionService";
import { CategoryExpenseChart } from "../components/CustomCharts/CategoryExpenseChart";
import { IncomeExpenseChart } from "../components/CustomCharts/IncomeExpenseChart";

const periodOptions = [
  { label: "This Month", value: "thisMonth" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Last 6 Months", value: "last6Months" },
  { label: "Annual", value: "annual" },
];

const getDateRange = (period: string) => {
  const now = new Date();

  if (period === "thisMonth")
    return {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: new Date(),
    };

  if (period === "lastMonth")
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      end: new Date(now.getFullYear(), now.getMonth(), 0),
    };

  if (period === "last6Months")
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 5, 1),
      end: new Date(),
    };

  return { start: new Date(now.getFullYear(), 0, 1), end: new Date() };
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categorySummary, setCategorySummary] = useState<
    TransactionCategorySummary[]
  >([]);
  const [period, setPeriod] = useState("thisMonth");

  useEffect(() => {
    transactionService.getall().then((res) => setTransactions(res.data.data));
  }, []);

  useEffect(() => {
    const { start, end } = getDateRange(period);

    transactionService.getCategorySummary(start, end).then((res) => {
      setCategorySummary(res.data.data);
    });
  }, [period]);

  return (
    <>
      <div className="flex justify-content-between mb-3">
        <h2>Dashboard</h2>

        <Dropdown
          value={period}
          options={periodOptions}
          onChange={(e) => setPeriod(e.value)}
          placeholder="Select Period"
        />
      </div>

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
            <CategoryExpenseChart data={categorySummary} />
          </Card>
        </div>

        <div className="col-12 md:col-6">
          <Card title="Income vs Expense">
            <IncomeExpenseChart data={categorySummary} />
          </Card>
        </div>
      </div>

      <div className="mt-4">
        <RecentTransactions transactions={transactions} />
      </div>
    </>
  );
};

export default Dashboard;
