import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import TransactionModal from "../components/TransactionModal";
import RecentTransactions from "../components/RecentTransactions";
import type { Transaction } from "../types/Transaction";
import { transactionService } from "../services/transactionService";
import { TransactionTypeCode } from "../enums/TransactionTypeCode";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const fetchTransactions = async () => {
    const res = await transactionService.getall();
    setTransactions(res.data.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const income = (transactions ?? [])
    .filter((x) => x.transactionTypeCode === TransactionTypeCode.Income)
    .reduce((sum, y) => sum + Number(y.amount), 0);

  const expense = (transactions ?? [])
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
          <Button className="flex align-items-center gap-2 p-2" onClick={() => setVisible(true)}>
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
                  <div className="metric-value">₹ {income}</div>
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
                  <div className="metric-value">₹ {expense}</div>
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
                  <div className="metric-value">₹ {balance}</div>
                </div>
                <span className="metric-icon pi pi-wallet" />
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Card className="dashboard-panel dashboard-panel-wrapper">
        <RecentTransactions transactions={transactions} onSave={fetchTransactions} />
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
