import type { Category } from "../types/Category";
import api from "./api";

// CRUD APIs for Category service
export const CategoryService =  {
    getAll : () => api.get("/Categories/GetAllCategories"),

    post : (data : Category) => api.post("/Categories", data),

    update : (id : number) => api.put(`/categories/${id}`),

    delete : (id : number) => api.delete(`/categories/${id}`) 
}