import { Chart } from "primereact/chart";
import { TransactionTypeCode } from "../../enums/TransactionTypeCode";

type Props = {
  data: Array<{
    categoryName?: string;
    transactionTypeCode?: number;
    totalAmount?: number;
  }>;
};

export const CategoryExpenseChart = ({ data }: Props) => {
  const filtered = [...data]
    .filter((x) => x.transactionTypeCode === TransactionTypeCode.Expense)
    .sort((a, b) => (b.totalAmount ?? 0) - (a.totalAmount ?? 0));

  const chartData = {
    labels: filtered.map((x) => x.categoryName ?? "Unknown"),
    datasets: [
      {
        data: filtered.map((x) => Number(x.totalAmount ?? 0)),
        backgroundColor: [
          "#3b82f6",
          "#f97316",
          "#14b8a6",
          "#a855f7",
          "#ef4444",
          "#22c55e",
          "#eab308",
          "#6366f1",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "48%",
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  if (!filtered.length) {
    return <div className="dashboard-loading">No expense data available.</div>;
  }

  return <Chart type="doughnut" data={chartData} options={options} className="dashboard-chart" />;
};
