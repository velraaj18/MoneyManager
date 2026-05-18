import { Chart } from "primereact/chart";
import type { TransactionMonthSummary } from "../../types/Transaction";
import { TransactionTypeCode } from "../../enums/TransactionTypeCode";

type Props = {
  data: TransactionMonthSummary[];
};

export const MonthlySummaryChart = ({ data }: Props) => {

  const labels = [...new Set(data.map(x => x.month))];

  const incomeData = labels.map(month =>
    data
      .filter(
        x =>
          x.month === month &&
          x.transactionType === TransactionTypeCode.Income
      )
      .reduce((sum, x) => sum + x.amount, 0)
  );

  const expenseData = labels.map(month =>
    data
      .filter(
        x =>
          x.month === month &&
          x.transactionType === TransactionTypeCode.Expense
      )
      .reduce((sum, x) => sum + x.amount, 0)
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.18)",
        tension: 0.35,
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.18)",
        tension: 0.35,
      },
    ],
  };

  return (
    <Chart
      type="line"
      data={chartData}
      className="dashboard-chart"
    />
  );
};
