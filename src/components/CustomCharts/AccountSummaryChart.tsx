import { Chart } from "primereact/chart";

type AccountPoint = {
  accountName?: string;
  name?: string;
  label?: string;
  totalAmount?: number;
  balance?: number;
  amount?: number;
};

type Props = {
  data: AccountPoint[];
};

export const AccountSummaryChart = ({ data }: Props) => {
  const sorted = [...data].sort(
    (a, b) => Number(b.totalAmount ?? b.balance ?? b.amount ?? 0) - Number(a.totalAmount ?? a.balance ?? a.amount ?? 0),
  );
  const labels = sorted.map((item) => item.accountName ?? item.name ?? item.label ?? "");
  const values = sorted.map((item) =>
    Number(item.totalAmount ?? item.balance ?? item.amount ?? 0)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Transaction Amount",
        data: values,
        backgroundColor: [
          "#1e6fb8",
          "#7c3aed",
          "#f59e0b",
          "#14b8a6",
          "#ef4444",
          "#22c55e",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) => `INR ${value}`,
        },
      },
    },
  };

  if (!sorted.length) {
    return <div className="dashboard-loading">No account data available.</div>;
  }

  return <Chart type="bar" data={chartData} options={options} className="dashboard-chart" />;
};
