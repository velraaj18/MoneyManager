import type { User } from "../types/User";
import api from "./api";

export const authService = {
    login : (data : User) => api.post("/login", data ),

    register : (data: User) => api.post("/register", data),

    logout : () => api.post("/logout"),

    refreshToken : (data : string) => api.post("/refreshToken", data) 
}