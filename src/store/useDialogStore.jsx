import { create } from "zustand";

const useDialogStore = create((set) => ({
  openDialogId: null, // The active dialog's ID
  openDialog: (dialogId) => set({ openDialogId: dialogId }), // Open dialog by ID
  closeDialog: () => set({ openDialogId: null }), // Close dialog
}));

export default useDialogStore;
