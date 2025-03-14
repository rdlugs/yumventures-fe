import { Search } from "lucide-react";
import useLayoutStore from "../store/useLayoutStore"; // Import your Zustand store
import NavSearch from "./NavSearch"; // Import the NavSearch component

const NavSearchButton = () => {
  const { isSearchVisible, toggleSearch } = useLayoutStore((state) => ({
    isSearchVisible: state.isSearchVisible,
    toggleSearch: state.toggleSearch,
  }));

  return (
    <div>
      <button
        type="button"
        className="md:hidden size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        onClick={toggleSearch} // Toggle search visibility
      >
        <Search className="shrink-0 size-4" />
        <span className="sr-only">Search</span>
      </button>
      {isSearchVisible && <NavSearch />} {/* Conditionally render NavSearch */}
    </div>
  );
};

export default NavSearchButton;
