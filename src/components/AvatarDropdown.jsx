import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { LogOut, Settings, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/client/useAuthStore";

export default function AvatarDropdown() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    // Clear authentication state
    logout();

    // Optionally clear cookies or local storage if applicable
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Redirect to login page
    navigate("/client/login");
  };
  return (
    <div className="relative inline-flex">
      {/* Avatar Button */}
      <Menu>
        <MenuButton
          type="button"
          className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white"
        >
          <img
            className="shrink-0 size-[38px] rounded-full"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
            alt="Avatar"
          />
        </MenuButton>

        {/* Dropdown Menu */}
        <MenuItems className="absolute top-10 right-0 mt-2 w-60 bg-white shadow-md rounded-lg dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700">
          <div className="p-1.5 space-y-0.5">
            <MenuItem>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                href="#"
              >
                <UserRound className="shrink-0 size-4" />
                Profile
              </a>
            </MenuItem>
            <MenuItem>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                href="#"
              >
                <Settings className="shrink-0 size-4" />
                Settings
              </a>
            </MenuItem>

            <MenuItem>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
              >
                <LogOut className="shrink-0 size-4" />
                Log out
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
