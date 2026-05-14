import { Chart } from "primereact/chart";

type MonthlyPoint = {
  monthName?: string;
  month?: string;
  label?: string;
  totalIncome?: number;
  income?: number;
  totalExpense?: number;
  expense?: number;
  totalAmount?: number;
};

type Props = {
  data: MonthlyPoint[];
};

export const MonthlySummaryChart = ({ data }: Props) => {
  const labels = data.map((item) => item.monthName ?? item.month ?? item.label ?? "");
  const income = data.map(
    (item) => Number(item.totalIncome ?? item.income ?? 0)
  );
  const expense = data.map(
    (item) => Number(item.totalExpense ?? item.expense ?? item.totalAmount ?? 0)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: income,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.18)",
        tension: 0.35,
      },
      {
        label: "Expense",
        data: expense,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.18)",
        tension: 0.35,
      },
    ],
  };

  return <Chart type="line" data={chartData} className="dashboard-chart" />;
};
