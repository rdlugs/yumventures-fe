import AvatarDropdown from "../AvatarDropdown";
import Notifications from "../Notifications";
import useLayoutStore from "../../store/useLayoutStore";
const SuperadminHeader = () => {
  const { isHeaderNavbarOpen, toggleHeaderNavbar } = useLayoutStore();
  return (
    <div>
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white border-b text-sm py-2.5  dark:bg-neutral-950 dark:border-neutral-700">
        <nav className="max-w-[85rem] flex md:grid md:grid-cols-3 md:gap-x-1 basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="me-5">
            <a
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              href="#"
            >
              Yum
            </a>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                <svg
                  className="shrink-0 size-4 text-gray-400 dark:text-white/60"
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                className="py-2 ps-10 pe-16 block w-full bg-transparent border-gray-700 rounded-lg text-sm focus:outline-none focus:border-gray-600 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:border-neutral-600"
                placeholder="Disabled"
                disabled
              />
              <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
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

          <div className="flex-1 flex flex-row justify-end items-center gap-1">
            <div className="md:hidden block">
              <button
                onClick={() => toggleHeaderNavbar(!isHeaderNavbarOpen)}
                type="button"
                className=" size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-900 hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg
                  className={` size-4 ${
                    isHeaderNavbarOpen ? " block" : "hidden"
                  }`}
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
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className={` size-4 ${
                    isHeaderNavbarOpen ? "hidden" : "block"
                  }`}
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>

            <Notifications />

            <AvatarDropdown />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default SuperadminHeader;
