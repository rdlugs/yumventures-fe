import PropTypes from "prop-types";
import useLayoutStore from "../store/useLayoutStore";

const Sidebar = ({
  children,
  sidebarWidth = "w-[260px]",
  backdropColor = "bg-black bg-opacity-50",
  sidebarBg = "bg-white",
  sidebarDarkBg = "dark:bg-neutral-800",
  sidebarBorder = "border-e border-gray-200",
}) => {
  const { isSidebarOpen, toggleSidebar } = useLayoutStore();

  return (
    <>
      {/* Backdrop (visible only on mobile and tablet screens) */}
      {isSidebarOpen && (
        <div
          className={`fixed inset-0 z-40 ${backdropColor} lg:hidden`} // Backdrop only visible on mobile/tablet
          onClick={toggleSidebar} // Close sidebar when clicking the backdrop
        />
      )}

      {/* Sidebar */}
      <div
        className={`transition-all duration-300 transform h-full fixed inset-y-0 start-0 z-50 ${sidebarWidth} ${sidebarBg} ${sidebarBorder} ${sidebarDarkBg} 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`} // Always visible on large screens
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4">
            <a
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              href="#"
            >
              <div className="w-28 h-auto">Yum</div>
            </a>
          </div>

          {/* Sidebar Content */}
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <nav className="p-3 w-full flex flex-col flex-wrap">
              <ul className="flex flex-col space-y-1">{children}</ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired, // Content for sidebar
  sidebarWidth: PropTypes.string, // Custom sidebar width
  backdropColor: PropTypes.string, // Custom backdrop color
  sidebarBg: PropTypes.string, // Custom sidebar background color
  sidebarDarkBg: PropTypes.string, // Custom dark mode background color for sidebar
  sidebarBorder: PropTypes.string, // Custom border for sidebar
};

export default Sidebar;
