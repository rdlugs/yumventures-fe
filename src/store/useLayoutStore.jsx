import { create } from "zustand";

const useLayoutStore = create((set) => ({
  // Sidebar state
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  //header navbar
  isHeaderNavbarOpen: false,
  toggleHeaderNavbar: () =>
    set((state) => ({ isHeaderNavbarOpen: !state.isHeaderNavbarOpen })),

  // Dark mode state
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Language state
  selectedLanguage: "en", // Default language: English
  setLanguage: (language) => set({ selectedLanguage: language }),

  // Currency state
  selectedCurrency: "USD", // Default currency: USD
  setCurrency: (currency) => set({ selectedCurrency: currency }),

  // Search visibility state
  isSearchVisible: false, // Initially, the search bar is hidden
  toggleSearch: () =>
    set((state) => ({ isSearchVisible: !state.isSearchVisible })),
}));

export default useLayoutStore;
