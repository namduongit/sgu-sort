import axios from "axios";
import { getToken, clearToken } from "../utils/tokenManager";


const api = axios.create({
    baseURL: "https://thongtindaotao.sgu.edu.vn/public/api"
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// If token is expired, we can clear it, reload the page, or redirect to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized access - token may be expired");
            clearToken(); // Clear the token if unauthorized
            // Optionally, you can redirect to login page or show a message
        }
        return Promise.reject(error);
    }
);