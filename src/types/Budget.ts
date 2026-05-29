export interface BudgetRequest{
    budgetId : number,
    categoryId : number,
    spendLimit : number,
    year : number,
    month : number 
}

export interface BudgetResponse{
    categoryName : string,
    spendLimit : number,
    amountRemaining: number,
    year : number,
    month : number ,
    dateCreated : Date,
    modifiedDate : Date
}