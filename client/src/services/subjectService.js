import axios from "axios";

const BASE_API = process.env.REACT_APP_REQUEST;

export const subjects = async () => {
    try {
        const response = await axios.get(`${BASE_API}/api/subject/crawl`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Subjects failed";
    }
}