import axios from "axios";

const API_SUBJECT_URL = "http://localhost:5000/api/subject/subjects";
export const subjects = async (access_token) => {
    try {
        const response = await axios.post(
            API_SUBJECT_URL,
            {
                access_token
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Subjects failed";
    }
}