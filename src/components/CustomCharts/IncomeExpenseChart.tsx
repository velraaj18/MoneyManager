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
        backgroundColor: ["#22c55e", "#ef4444"],
        borderColor: "#ffffff",
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "58%",
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  if(income == 0 && expense == 0){
    return <div className="dashboard-loading">No expense data available.</div>;
  }

  return <Chart type="doughnut" data={chartData} options={options} className="dashboard-chart" />;
};
