import type { Transaction } from "../types/Transaction";
import api from "./api";

export const transactionService = {
    getall : () => api.get("/Transactions/GetAllTransactions"),

    post : (data : Transaction) => api.post("/Transactions", data),

    update : (id : number) => api.put(`/Transactions/${id}`),

    delete : (id : number) => api.delete(`/Transactions/${id}`)
}