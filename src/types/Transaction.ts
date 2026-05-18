export interface Transaction {
  transactionUID: number;
  date: string;
  description: string;
  categoryId: number;
  category: string;
  accountId: number;
  account: string;
  amount: number;
  transactionTypeCode: number;
}

export interface CreateTrasactionRequest {
    categoryUID : number,
    accountUID : number,
    amount : number,
    description : string,
    date : Date
}

export interface TransactionCategorySummary{
    categoryName : string,
    transactionTypeCode : number,
    totalAmount : number
}

export interface TransactionMonthSummary {
  year: number;
  month: string;
  transactionType: number;
  amount: number;
}

export interface TransactionAccountSummary {
  accountName: string;
  totalAmount: number;
}