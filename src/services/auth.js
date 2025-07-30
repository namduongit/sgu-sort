import axios from "axios";
import qs from "qs";
import { saveToken } from "../utils/tokenManager";


const API_LOGIN_URL = "https://thongtindaotao.sgu.edu.vn/public/api/auth/login";

export async function login(username, password) {
    try {
        const response = await axios.post(
            API_LOGIN_URL,
            qs.stringify({ username, password }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        // Return Object has many fields, but we only need the token and expiration time
        console.log("Login response:", response.data);
        
        const { access_token, expires_in } = response.data;
        saveToken(access_token, expires_in);
        return { access_token, expires_in };
    } catch (error) {
        throw new Error("Login failed: " + (error.response ? error.response.data.message : error.message));
    } finally {
        console.log("Login request completed");
    }
}