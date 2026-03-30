import type { CreateAccountRequest } from "../types/Account";
import api from "./api";

export const AccountService = {
    getAll : () => api.get("/Accounts/GetAllAccounts"),

    post : (data : CreateAccountRequest) => api.post("/Accounts", data),
    
    put : (id : number, data : CreateAccountRequest) => api.put(`/Account/${id}`, data),

    delete : (id : number) => api.delete(`/Account/${id}`),
}