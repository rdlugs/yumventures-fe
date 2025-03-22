import { create } from "zustand";
import apiClient from "@/instance/AxiosClient";

const useNotificationStore = create((set) => ({
    updateNotification: async (business_id) => {
        await apiClient.post('/notification/update', { business_id: business_id }, { withCredentials: true });
        return true;
    }
}));

export default useNotificationStore;