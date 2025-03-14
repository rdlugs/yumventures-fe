import { create } from "zustand";
import apiClient from "../../instance/AxiosClient"; // Your Axios instance

// Create the Zustand store
const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: (token, user) => set({ isAuthenticated: true, token, user }),
  logout: async () => {
    try {
      await apiClient.post("/client/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
    set({ isAuthenticated: false, token: null, user: null });
  },
  checkAuth: async () => {
    try {
      const response = await apiClient.post(
        "/client/validate-token",
        {},
        { withCredentials: "true" }
      );
      console.log("checkAuth response:", response.data); // Debugging line

      if (response.status === 200 && response.data.isValid) {
        set({ isAuthenticated: true, user: response.data.business });
        console.log("User authenticated:", response.data.business);
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ isAuthenticated: false, user: null });
    }
  },
}));

export default useAuthStore;
