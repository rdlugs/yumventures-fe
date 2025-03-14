import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || "", // Persist token in localStorage
  setToken: (token) => {
    localStorage.setItem("token", token); // Store token in localStorage
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    set({ token: "" });
  },
}));

export default useAuthStore;
