import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:3000", // Backend URL
  timeout: 5000, // Timeout for requests
  withCredentials: true,
  withXSRFToken: true,
});

// Add interceptors for logging and handling errors
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error.response || error.message);
  }
);

export default apiClient;
