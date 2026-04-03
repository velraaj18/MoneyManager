import type { User } from "../types/User";
import api from "./api";

export const authService = {
    login : (data : User) => api.post("/auth/login", data ),

    register : (data: User) => api.post("/auth/register", data),

    logout : () => api.post("/auth/logout"),

    refreshToken : (data : string) => api.post("/auth/refreshToken", data) 
}