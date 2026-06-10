import api from "./api";
import type { CreateTrasactionRequest } from '../types/Transaction';

export const transactionService = {
    getall : () => api.get("/Transactions/GetAllTransactions"),

    post : (data : CreateTrasactionRequest) => api.post("/Transactions", data),

    update : (data : CreateTrasactionRequest, id : number) => api.put(`/Transactions/${id}`, data),

    delete : (id : number) => api.delete(`/Transactions/${id}`),

    getCategorySummary : (startDate: string, endDate: string) => api.get("/Transactions/Category-Summary", {params : {startDate, endDate}}),

    getAccountSummary : (startDate?: string, endDate?: string) =>
        api.get("/Transactions/Account-Summary", { params: { startDate, endDate } }),

    getMonthlySummary : (startDate?: string, endDate?: string) =>
        api.get("/Transactions/Month-Summary", { params: { startDate, endDate } })
}
