import axios from "axios";

const BASE_API = process.env.REACT_APP_REQUEST;

const API_LOGIN_URL = `${BASE_API}/api/auth/login`;
const API_REFRESH_URL = `${BASE_API}/api/auth/refresh`;

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            API_LOGIN_URL,
            {
                username,
                password
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
}

export const refresh = async (refresh_token) => {
    try {
        console("Token gửi để refresh: ", refresh_token);
        const response = await axios.post(
            API_REFRESH_URL,
            refresh_token
        );

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Refresh failed";
    }
}