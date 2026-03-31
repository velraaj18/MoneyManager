import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import { transactionService } from "../../services/transactionService";
import type { TransactionCategorySummary } from "../../types/Transaction";

export const CategoryExpenseChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    transactionService.getCategorySummary().then((res) => {
      const data: TransactionCategorySummary[] = res.data.data;

      const filtered = data.filter(x => x.categoryName !== "Income");

      const labels = filtered.map(x => x.categoryName);
      const amounts = filtered.map(x => x.totalAmount);

      setChartData({
        labels: labels,
        datasets: [
          {
            data: amounts,
          }
        ]
      });
    });
  }, []);

  return <Chart type="pie" data={chartData} className="w-full md:w-30rem" />;
};