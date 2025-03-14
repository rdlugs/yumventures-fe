import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/client/useAuthStore"; // Import Zustand store

const useAuthCheck = () => {
  const { checkAuth, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state
  const isFirstRender = useRef(true); // Flag to track first render

  useEffect(() => {
    const validateAuth = async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false; // Mark first render as complete
        await checkAuth(); // Validate token on app load
        setLoading(false); // Set loading to false once auth check is complete
      }
    };

    validateAuth();
  }, [checkAuth]);

  // Watch for changes in `isAuthenticated` after the `checkAuth` update
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        logout();
        navigate("/client/login");
      } else {
        navigate("/client/dashboard");
      }
    }
  }, [isAuthenticated, loading, logout, navigate]);

  // Return loading state so that you can handle the rendering based on the auth check status
  return { isAuthenticated, loading };
};

export default useAuthCheck;
