import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import RecentTransactions from "../components/RecentTransactions";
import type {
  Transaction,
  TransactionCategorySummary,
  TransactionMonthSummary,
} from "../types/Transaction";
import { transactionService } from "../services/transactionService";
import { CategoryExpenseChart } from "../components/CustomCharts/CategoryExpenseChart";
import { IncomeExpenseChart } from "../components/CustomCharts/IncomeExpenseChart";
import { MonthlySummaryChart } from "../components/CustomCharts/MonthlySummaryChart";
import { AccountSummaryChart } from "../components/CustomCharts/AccountSummaryChart";

const periodOptions = [
  { label: "This Month", value: "thisMonth" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Last 6 Months", value: "last6Months" },
  { label: "Annual", value: "annual" },
];

const getDateRange = (period: string) => {
  const now = new Date();

  if (period === "thisMonth") {
    return {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: new Date(),
    };
  }

  if (period === "lastMonth") {
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      end: new Date(now.getFullYear(), now.getMonth(), 0),
    };
  }

  if (period === "last6Months") {
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 5, 1),
      end: new Date(),
    };
  }

  return { start: new Date(now.getFullYear(), 0, 1), end: new Date() };
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categorySummary, setCategorySummary] = useState<
    TransactionCategorySummary[]
  >([]);
  const [monthlySummary, setMonthlySummary] = useState<TransactionMonthSummary[]>([]);
  const [accountSummary, setAccountSummary] = useState<any[]>([]);
  const [period, setPeriod] = useState("thisMonth");
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingMonthly, setLoadingMonthly] = useState(true);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoadingTransactions(true);
        const res = await transactionService.getall();
        console.log(res.data.data);
        setTransactions(res.data.data);
      } catch {
        setError("Unable to load transactions right now.");
      } finally {
        setLoadingTransactions(false);
      }
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoadingSummary(true);
        const { start, end } = getDateRange(period);
        const res = await transactionService.getCategorySummary(start, end);
        setCategorySummary(res.data.data);
      } catch {
        setError("Unable to load summary data right now.");
      } finally {
        setLoadingSummary(false);
      }
    };

    loadSummary();
  }, [period]);

  useEffect(() => {
    const loadMonthly = async () => {
      try {
        setLoadingMonthly(true);
        const res = await transactionService.getMonthlySummary();
        setMonthlySummary(res.data.data);
      } catch {
        setError("Unable to load monthly summary right now.");
      } finally {
        setLoadingMonthly(false);
      }
    };

    loadMonthly();
  }, []);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setLoadingAccounts(true);
        const res = await transactionService.getAccountSummary();
        setAccountSummary(res.data.data);
      } catch {
        setError("Unable to load account summary right now.");
      } finally {
        setLoadingAccounts(false);
      }
    };

    loadAccounts();
  }, []);

  const totals = transactions.reduce(
    (acc, tx) => {
      const amount = Number(tx.amount) || 0;

      if (amount >= 0) {
        acc.income += amount;
      } else {
        acc.expenses += Math.abs(amount);
      }

      acc.balance += amount;
      return acc;
    },
    { income: 0, expenses: 0, balance: 0 }
  );

  const savings = totals.balance - totals.expenses;

  const metrics = [
    {
      title: "Balance",
      value: totals.balance,
      icon: "pi-wallet",
      tone: "metric-balance",
    },
    {
      title: "Expenses",
      value: totals.expenses,
      icon: "pi-arrow-down",
      tone: "metric-expenses",
    },
    {
      title: "Income",
      value: totals.income,
      icon: "pi-arrow-up",
      tone: "metric-income",
    },
    {
      title: "Savings",
      value: savings,
      icon: "pi-chart-line",
      tone: "metric-savings",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Overview</p>
          <h2 className="dashboard-title">Dashboard</h2>
          <p className="dashboard-subtitle">
            Track the latest movement across accounts, spending, and savings.
          </p>
        </div>

        <div className="dashboard-toolbar">
          <span className="dashboard-toolbar-label">Period</span>
          <Dropdown
            value={period}
            options={periodOptions}
            onChange={(e) => setPeriod(e.value)}
            placeholder="Select Period"
            className="dashboard-period"
          />
        </div>
      </div>

      {error && <div className="dashboard-alert">{error}</div>}

      <div className="grid dashboard-metrics">
        {metrics.map((metric) => (
          <div className="col-12 md:col-6 lg:col-3" key={metric.title}>
            <Card className={`metric-card-panel ${metric.tone}`}>
              <div className="metric-card">
                <div>
                  <span className="metric-label">{metric.title}</span>
                  <div className="metric-value">
                    INR {metric.value.toLocaleString("en-IN")}
                  </div>
                </div>
                <span className={`metric-icon pi ${metric.icon}`} />
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-4 grid dashboard-grid">
        <div className="col-12 md:col-6">
          <Card title="Expense by Category" className="dashboard-panel">
            {loadingSummary ? (
              <div className="dashboard-loading">
                Loading category summary...
              </div>
            ) : (
              <CategoryExpenseChart data={categorySummary} />
            )}
          </Card>
        </div>

        <div className="col-12 md:col-6">
          <Card title="Income vs Expense" className="dashboard-panel">
            {loadingSummary ? (
              <div className="dashboard-loading">
                Loading income and expense chart...
              </div>
            ) : (
              <IncomeExpenseChart data={categorySummary} />
            )}
          </Card>
        </div>
      </div>

      <div className="mt-4 grid dashboard-grid">
        <div className="col-12 md:col-6">
          <Card title="Monthly Summary" className="dashboard-panel">
            {loadingMonthly ? (
              <div className="dashboard-loading">
                Loading monthly summary...
              </div>
            ) : (
              <MonthlySummaryChart data={monthlySummary} />
            )}
          </Card>
        </div>

        <div className="col-12 md:col-6">
          <Card title="Account Summary" className="dashboard-panel">
            {loadingAccounts ? (
              <div className="dashboard-loading">
                Loading account summary...
              </div>
            ) : (
              <AccountSummaryChart data={accountSummary} />
            )}
          </Card>
        </div>
      </div>

      <div className="mt-4">
        <Card title="Recent Transactions" className="dashboard-panel">
          {loadingTransactions ? (
            <div className="dashboard-loading">
              Loading recent transactions...
            </div>
          ) : (
            <RecentTransactions transactions={transactions} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
