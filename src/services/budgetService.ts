import api from "./api";
import type { BudgetRequest } from "../types/Budget";

export const BudgetService = {
  getAll: () => api.get("/Budget/GetAllBudget"),
  add: (data: BudgetRequest) => api.post("/Budget/AddBudget", data),
  update: (data: BudgetRequest) => api.put("/Budget/UpdateBudget", data),
  getBudgetByCategory: (categoryId: number, month: number, year: number) =>
    api.get("/Budget/GetBudgetByCategory", {
      params: { categoryId, month, year },
    }),
};
