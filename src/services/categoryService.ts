import type { CategoryRequest } from "../types/Category";
import api from "./api";

// CRUD APIs for Category service
export const CategoryService =  {
    getAll : () => api.get("/Categories/GetAllCategories"),

    post : (data : CategoryRequest) => api.post("/Categories", data),

    update : (id : number, data : CategoryRequest) => api.put(`/categories/${id}`, data),

    delete : (id : number) => api.delete(`/categories/${id}`) 
}