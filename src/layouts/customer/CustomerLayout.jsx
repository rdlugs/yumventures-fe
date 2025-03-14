import PropTypes from "prop-types";
import LayoutBreadcrumb from "../../components/LayoutBreadcrumb";
import LayoutSidebar from "../../components/LayoutSidebar";
import LayoutHeader from "../../components/LayoutHeader";
import SidebarLink from "../../components/SidebarLink";

import {
  History,
  ShoppingBag,
  LayoutDashboard,
  MessagesSquare,
  ShoppingBasket,
  Settings,
} from "lucide-react";
const CustomerLayout = ({ children }) => {
  return (
    <>
      <LayoutHeader />
      <LayoutSidebar>
        <SidebarLink
          to="/dashboard"
          label="Dashboard"
          icon={<LayoutDashboard className="shrink-0 size-4" />}
        />
        <SidebarLink
          to="/browse"
          label="Browse"
          icon={<ShoppingBasket className="shrink-0 size-4" />}
        />
        <SidebarLink
          to="/orders"
          label="Orders"
          icon={<ShoppingBag className="shrink-0 size-4" />}
        />
        <SidebarLink
          to="/history"
          label="History"
          icon={<History className="shrink-0 size-4" />}
        />
        <SidebarLink
          to="/forum"
          label="Forum"
          icon={<MessagesSquare className="shrink-0 size-4" />}
        />
        <SidebarLink
          to="/settings"
          label="Settings"
          icon={<Settings className="shrink-0 size-4" />}
        />
      </LayoutSidebar>
      <LayoutBreadcrumb />
      <div className="w-full h-full overflow-auto lg:ps-64 bg-gray-100">
        <div className="p-4 sm:p-2 space-y-2 sm:space-y-2">{children}</div>
      </div>
    </>
  );
};

CustomerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CustomerLayout;
