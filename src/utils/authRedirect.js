import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * Custom hook to check authentication and redirect if authenticated.
 * @param {string} redirectPath - Path to redirect to if the user is authenticated.
 */
const useAuthRedirect = (redirectPath) => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.API_BASE_URL;
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      axios
        .get(`${API_BASE_URL}/validate-token`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(() => navigate(redirectPath))
        .catch(() => {
          localStorage.removeItem("authToken"); // Clear invalid token
        });
    }
  }, [navigate, redirectPath, API_BASE_URL]);
};

export default useAuthRedirect;
