import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarLink = ({ to, icon, label, exact = false }) => {
  return (
    <li>
      <NavLink
        to={to}
        exact={exact.toString()} // Ensure exact match for root or specific paths
        className={({ isActive }) =>
          `w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg text-gray-800 dark:text-neutral-200 ${
            isActive
              ? "bg-gray-100  dark:bg-neutral-900 hover:bg-gray-200" // Active link styles
              : " hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          }`
        }
      >
        {icon}

        {label}
      </NavLink>
    </li>
  );
};
SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  exact: PropTypes.string,
};

export default SidebarLink;
