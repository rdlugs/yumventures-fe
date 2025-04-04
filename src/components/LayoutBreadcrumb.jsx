import { PanelLeftClose, PanelRightClose } from "lucide-react";
import useLayoutStore from "../store/useLayoutStore";

const LayoutBreadcrumb = () => {
  const { isSidebarOpen, toggleSidebar } = useLayoutStore();
  return (
    <div className="-mt-px">
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex items-center py-2">
          <button
            type="button"
            onClick={toggleSidebar}
            className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
          >
            <span className="sr-only">Toggle Navigation</span>
            {isSidebarOpen ? (
              <PanelLeftClose className="shrink-0 size-4 " />
            ) : (
              <PanelRightClose className="shrink-0 size-4" />
            )}
          </button>

          <ol className="ms-3 flex items-center whitespace-nowrap">
            <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
              Application Layout
              <svg
                className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </li>
            <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400">
              Dashboard
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LayoutBreadcrumb;
