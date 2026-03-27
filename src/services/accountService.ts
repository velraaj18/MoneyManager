import type { Account } from "../types/Account";
import api from "./api";

export const AccountService = {
    getAll : () => api.get("/Accounts/GetAllAccounts"),

    post : (data : Account) => api.post("/Accounts", data),
    
    put : (id : number) => api.put(`/Account/${id}`),

    delete : (id : number) => api.delete(`/Account/${id}`),
}