import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
// Set up axios base URL and headers
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Your backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Login function
export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", response.data.token); // Save the JWT token in localStorage
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

// Get current user info (based on JWT token)
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Decode and return user info from the token (you can use a JWT decoding library like `jwt-decode`)
  return jsonwebtoken.decode(token);
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
};
