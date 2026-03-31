export interface Transaction{
    transactionUID : number,
    date : string,
    description : string,
    categoryId : number,
    category : string,
    accountId : number,
    account : string,
    amount : number
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
    totalAmount : number
}