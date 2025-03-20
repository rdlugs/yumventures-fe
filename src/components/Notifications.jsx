import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bell } from "lucide-react"; // Using lucide for bell icon

export default function Notifications() {


  return (
    <div className="relative inline-block">
      <Popover>
        <PopoverButton
          type="button"
          className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          <Bell className="shrink-0 size-4" />
          <span className="sr-only">Notifications</span>
        </PopoverButton>

        <PopoverPanel className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:bg-neutral-800 dark:divide-neutral-700">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              Notifications
            </h3>
          </div>

          <div className="max-h-48 overflow-y-auto p-2">
            {/* Sample Notifications */}
            <div className="space-y-2">
              <a
                href="#"
                className="block rounded-lg py-2 px-3 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
              >
                <p className="text-sm text-gray-800 dark:text-neutral-400">
                  New comment on your post
                </p>
                <p className="text-xs text-gray-500 dark:text-neutral-500">
                  2 minutes ago
                </p>
              </a>
              <a
                href="#"
                className="block rounded-lg py-2 px-3 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
              >
                <p className="text-sm text-gray-800 dark:text-neutral-400">
                  Someone followed you
                </p>
                <p className="text-xs text-gray-500 dark:text-neutral-500">
                  5 minutes ago
                </p>
              </a>
              <a
                href="#"
                className="block rounded-lg py-2 px-3 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
              >
                <p className="text-sm text-gray-800 dark:text-neutral-400">
                  Your password was changed
                </p>
                <p className="text-xs text-gray-500 dark:text-neutral-500">
                  10 minutes ago
                </p>
              </a>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
