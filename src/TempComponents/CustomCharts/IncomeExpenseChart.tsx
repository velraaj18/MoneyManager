import { Chart } from "primereact/chart";
import type { TransactionCategorySummary } from "../../types/Transaction";
import { TransactionTypeCode } from "../../enums/TransactionTypeCode";


type Props = {
  data: TransactionCategorySummary[];
};

export const IncomeExpenseChart = ({ data }: Props) => {

  const income = data
    .filter(x => x.transactionTypeCode === TransactionTypeCode.Income)
    .reduce((sum, x) => sum + x.totalAmount, 0);

  const expense = data
    .filter(x => x.transactionTypeCode === TransactionTypeCode.Expense)
    .reduce((sum, x) => sum + x.totalAmount, 0);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"]
      }
    ]
  };

  return <Chart type="doughnut" data={chartData} className="w-full md:w-30rem" />;
};
