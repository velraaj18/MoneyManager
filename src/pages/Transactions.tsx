import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import RecentTransactions from "../components/RecentTransactions";
import TransactionModal from "../components/TransactionModal";
import { TransactionTypeCode } from "../enums/TransactionTypeCode";
import { transactionService } from "../services/transactionService";
import type { Transaction } from "../types/Transaction";

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

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [period, setPeriod] = useState("thisMonth");

  const fetchTransactions = async () => {
    const res = await transactionService.getall();
    setTransactions(res.data.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const selectedRange = getDateRange(period);

  const filteredTransactions = transactions.filter((tx) => {
    const txDate = tx.date;

    return (
      txDate >= formatDate(selectedRange.start) &&
      txDate <= formatDate(selectedRange.end)
    );
  });

  const income = filteredTransactions
    .filter((x) => x.transactionTypeCode === TransactionTypeCode.Income)
    .reduce((sum, y) => sum + Number(y.amount), 0);

  const expense = filteredTransactions
    .filter((x) => x.transactionTypeCode === TransactionTypeCode.Expense)
    .reduce((sum, y) => sum + Number(y.amount), 0);

  const balance = income - expense;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Activity</p>
          <h2 className="dashboard-title">Transactions</h2>
          <p className="dashboard-subtitle">
            Track income, expenses, and balance in one clear view.
          </p>
        </div>

        <div className="dashboard-toolbar">
          <Dropdown
            value={period}
            options={periodOptions}
            onChange={(e) => setPeriod(e.value)}
            placeholder="Select Period"
            className="dashboard-period"
          />
          <Button
            className="flex align-items-center gap-2 p-2"
            onClick={() => setVisible(true)}
          >
            <i className="pi pi-plus"></i>
            <span className="hidden md:block">Add Transaction</span>
          </Button>
        </div>
      </div>

      <div className="transaction_cards">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-4">
            <Card className="metric-card-panel metric-income">
              <div className="metric-card">
                <div>
                  <span className="metric-label">Income</span>
                  <div className="metric-value">
                    INR {income.toLocaleString("en-IN")}
                  </div>
                </div>
                <span className="metric-icon pi pi-arrow-up" />
              </div>
            </Card>
          </div>

          <div className="col-12 md:col-6 lg:col-4">
            <Card className="metric-card-panel metric-expenses">
              <div className="metric-card">
                <div>
                  <span className="metric-label">Expenses</span>
                  <div className="metric-value">
                    INR {expense.toLocaleString("en-IN")}
                  </div>
                </div>
                <span className="metric-icon pi pi-arrow-down" />
              </div>
            </Card>
          </div>

          <div className="col-12 md:col-6 lg:col-4">
            <Card className="metric-card-panel metric-balance">
              <div className="metric-card">
                <div>
                  <span className="metric-label">Balance</span>
                  <div className="metric-value">
                    INR {balance.toLocaleString("en-IN")}
                  </div>
                </div>
                <span className="metric-icon pi pi-wallet" />
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Card className="dashboard-panel dashboard-panel-wrapper">
        <RecentTransactions
          transactions={filteredTransactions}
          onSave={fetchTransactions}
        />
      </Card>

      <TransactionModal
        visible={visible}
        setVisible={setVisible}
        onSave={fetchTransactions}
      />
    </div>
  );
};

export default Transactions;
