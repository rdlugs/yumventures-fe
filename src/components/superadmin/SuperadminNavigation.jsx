import { Handshake, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import useLayoutStore from "../../store/useLayoutStore";

const SuperadminNavigation = () => {
  const { isHeaderNavbarOpen } = useLayoutStore();

  return (
    <div className="sticky md:py-4 bg-white md:border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
      <nav className="max-w-[85rem] w-full mx-auto md:flex md:items-center md:gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu */}
        <div
          className={`bg-white overflow-hidden transition-all duration-300 md:block lg:block ${
            isHeaderNavbarOpen ? "hidden" : "block"
          }`}
        >
          <div className="overflow-hidden overflow-y-auto max-h-[75vh]">
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-y-0.5 md:gap-y-0 md:gap-x-6">
              {/* Mobile Menu Links with Icons */}
              <NavLink
                to="/superadmin/dashboard"
                className={({ isActive }) =>
                  `py-2 md:py-0 flex items-center font-medium text-sm ${
                    isActive
                      ? "text-blue-600 dark:text-blue-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`
                }
                aria-current="page"
              >
                <Home className="shrink-0 w-4 h-4 me-3" />
                Dashboard
              </NavLink>
              <NavLink
                to="/superadmin/onboarding"
                className={({ isActive }) =>
                  `py-2 md:py-0 flex items-center font-medium text-sm ${
                    isActive
                      ? "text-blue-600 dark:text-blue-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`
                }
              >
                <Handshake className="shrink-0 w-4 h-4 me-3" />
                Onboarding
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SuperadminNavigation;
