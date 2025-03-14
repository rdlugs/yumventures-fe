import AvatarDropdown from "./AvatarDropdown";
import NavSearch from "./NavSearch";
import Notifications from "./Notifications";
const LayoutHeader = () => {
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-30 w-full bg-white border-b text-sm py-2.5 lg:ps-[260px] dark:bg-neutral-800 dark:border-neutral-700">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="me-5 lg:me-0 lg:hidden">
          <a
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
            href="#"
          >
            <div className="w-28 h-auto">Yum</div>
          </a>
        </div>

        <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
          <NavSearch />
          <div className="flex flex-row items-center justify-end gap-1">
            <Notifications />

            <AvatarDropdown />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LayoutHeader;
