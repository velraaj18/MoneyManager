import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5188/api"
});

export default api

