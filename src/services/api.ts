import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5188/api"
});

// Interceptor has 2 types
// Request => will run before each API request
// Response => will run after each API response
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if(token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default api

