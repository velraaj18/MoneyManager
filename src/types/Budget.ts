export interface BudgetRequest {
  budgetId?: number;
  categoryId: number;
  spendLimit: number;
  year: number;
  month: number;
}

export interface BudgetResponse {
  budgetUID?: number;
  categoryId : number;
  categoryName: string;
  spendLimit: number;
  amountRemaining: number;
  amountSpent?: number;
  year: number;
  month: number;
  dateCreated?: string;
  modifiedDate?: string;
}
