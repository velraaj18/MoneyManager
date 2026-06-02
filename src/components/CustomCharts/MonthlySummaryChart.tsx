import { Chart } from "primereact/chart";
import type { TransactionMonthSummary } from "../../types/Transaction";
import { TransactionTypeCode } from "../../enums/TransactionTypeCode";

type Props = {
  data: TransactionMonthSummary[];
};

export const MonthlySummaryChart = ({ data }: Props) => {
  const sortedData = [...data].sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }

    return a.monthNumber - b.monthNumber;
  });

  const labels = [...new Set(sortedData.map((x) => `${x.month} ${x.year}`))];

  const incomeData = labels.map((label) => {
    return sortedData
      .filter(
        (x) =>
          `${x.month} ${x.year}` === label &&
          x.transactionType === TransactionTypeCode.Income,
      )
      .reduce((sum, x) => sum + x.amount, 0);
  });

  const expenseData = labels.map((label) => {
    return sortedData
      .filter(
        (x) =>
          `${x.month} ${x.year}` === label &&
          x.transactionType === TransactionTypeCode.Expense,
      )
      .reduce((sum, x) => sum + x.amount, 0);
  });

  const savingsData = labels.map((label) => {
    return sortedData
      .filter(
        (x) =>
          `${x.month} ${x.year}` === label &&
          x.transactionType === TransactionTypeCode.Savings,
      )
      .reduce((sum, x) => sum + x.amount, 0);
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Savings",
        data: savingsData,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Chart
      type={labels.length > 1 ? "line" : "bar"}
      data={chartData}
      options={options}
      className="dashboard-chart"
    />
  );
};
