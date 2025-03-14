import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 15000, // 10 seconds
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    // Handle specific status codes
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error, perhaps redirect to login page
      toast.error("Session expired. Please log in again.");
    }

    // Optionally, handle other status codes (e.g., 500 for server errors)
    if (error.response && error.response.status === 500) {
      toast.error("Server error, please try again later.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
