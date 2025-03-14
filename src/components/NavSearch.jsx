import { Search } from "lucide-react";

const NavSearch = () => {
  return (
    <div className="hidden md:block">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
          <Search className="shrink-0 size-4 text-gray-400 dark:text-white/60" />
        </div>
        <input
          type="text"
          className="py-2 ps-10 pe-16 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600 disabled:pointer-events-none disabled:select-none"
          placeholder="Search disabled..."
          disabled
        />
        <div className="hidden absolute inset-y-0 end-0  items-center pointer-events-none z-20 pe-1">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6" />
              <path d="m9 9 6 6" />
            </svg>
          </button>
        </div>
        <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
          <svg
            className="shrink-0 size-3 text-gray-400 dark:text-white/60"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="mx-1">
            <svg
              className="shrink-0 size-3 text-gray-400 dark:text-white/60"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </span>
          <span className="text-xs">/</span>
        </div>
      </div>
    </div>
  );
};

export default NavSearch;
