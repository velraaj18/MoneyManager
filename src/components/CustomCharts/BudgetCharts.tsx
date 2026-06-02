import { Chart } from "primereact/chart";
import type { BudgetResponse } from "../../types/Budget";

type Props = {
  data: BudgetResponse[];
  loading?: boolean;
};

const palette = {
  budget: "#1e6fb8",
  spent: "#ef4444",
  remaining: "#22c55e",
};

const monthLabel = (month?: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return month ? months[month - 1] ?? `${month}` : "";
};

export const BudgetCharts = ({ data, loading }: Props) => {
  const sortedData = [...data].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  const getSpent = (item: BudgetResponse) =>
    Number(item.amountSpent ?? Number(item.spendLimit ?? 0) - Number(item.amountRemaining ?? 0));

  const labels = sortedData.map(
    (item) => `${item.categoryName} • ${monthLabel(item.month)} ${item.year}`,
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Budget",
        data: sortedData.map((item) => Number(item.spendLimit ?? 0)),
        backgroundColor: palette.budget,
      },
      {
        label: "Spent",
        data: sortedData.map((item) => Math.max(getSpent(item), 0)),
        backgroundColor: palette.spent,
      },
      {
        label: "Remaining",
        data: sortedData.map((item) => Number(item.amountRemaining ?? 0)),
        backgroundColor: palette.remaining,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <div className="dashboard-loading">Loading budget charts...</div>;
  }

  if (!sortedData.length) {
    return <div className="dashboard-loading">No budget data available for charts.</div>;
  }

  return <Chart type="bar" data={chartData} options={options} className="dashboard-chart" />;
};
