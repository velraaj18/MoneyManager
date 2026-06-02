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
  const labels = data.map((item) => item.accountName ?? item.name ?? item.label ?? "");
  const values = data.map((item) =>
    Number(item.totalAmount ?? item.balance ?? item.amount ?? 0)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Account Balance",
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

  return <Chart type="bar" data={chartData} className="dashboard-chart" />;
};
