import { TransactionTypeCode } from "../enums/TransactionTypeCode";

export const getTransactionTypeLabel = (type : number) => {
    switch (type){
        case TransactionTypeCode.Income:
            return "Income";
        case TransactionTypeCode.Expense:
            return "Expense";
        case TransactionTypeCode.Savings:
            return "Savings";
        default:
            return "Undefined"   
    }

}