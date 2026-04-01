import api from "./api";
import type { CreateTrasactionRequest } from '../types/Transaction';

export const transactionService = {
    getall : () => api.get("/Transactions/GetAllTransactions"),

    post : (data : CreateTrasactionRequest) => api.post("/Transactions", data),

    update : (data : CreateTrasactionRequest, id : number) => api.put(`/Transactions/${id}`, data),

    delete : (id : number) => api.delete(`/Transactions/${id}`),

    getCategorySummary : (startDate: Date, endDate: Date) => api.get("/Transactions/Category-Summary", {params : {startDate, endDate}}),

    getAccountSummary : () => api.get("/Transactions/Account-Summary"),

    getMonthlySummary : () => api.get("/Transactions/Monthly-Summary")
}