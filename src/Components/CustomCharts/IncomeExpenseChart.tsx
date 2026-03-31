import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";
import { transactionService } from "../../services/transactionService";
import type { TransactionCategorySummary } from "../../types/Transaction";

export const IncomeExpenseChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    transactionService.getCategorySummary().then((res) => {
      const data: TransactionCategorySummary[] = res.data.data;

      const income = data
        .filter(x => x.categoryName === "Income")
        .reduce((sum, x) => sum + x.totalAmount, 0);

      const expense = data
        .filter(x => x.categoryName !== "Income")
        .reduce((sum, x) => sum + x.totalAmount, 0);

      setChartData({
        labels: ["Income", "Expense"],
        datasets: [
          {
            data: [income, expense],
            backgroundColor: ["#22c55e", "#ef4444"]
          }
        ]
      });
    });
  }, []);

  return <Chart type="doughnut" data={chartData} className="w-full md:w-30rem" />;
};