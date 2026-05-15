import { Chart } from "primereact/chart";
import { TransactionTypeCode } from "../../enums/TransactionTypeCode";

export const CategoryExpenseChart = ({ data }: any) => {
  const filtered = data.filter(
    (x: any) => x.transactionTypeCode === TransactionTypeCode.Expense,
  );

  const chartData = {
    labels: filtered.map((x: any) => x.categoryName),
    datasets: [
      {
        data: filtered.map((x: any) => x.totalAmount),
      },
    ],
  };

  return <Chart type="pie" data={chartData} className="w-full md:w-30rem" />;
};
