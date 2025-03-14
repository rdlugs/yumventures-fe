import PropTypes from "prop-types";
import LayoutBreadcrumb from "../../components/LayoutBreadcrumb";
import LayoutSidebar from "../../components/LayoutSidebar";
import LayoutHeader from "../../components/LayoutHeader";
import SidebarLink from "../../components/SidebarLink";

import {
  Banknote,
  BookOpen,
  Boxes,
  LayoutDashboard,
  Receipt,
} from "lucide-react";
const ClientLayout = ({ children }) => {
  return (
    <>
      <LayoutHeader />
      <LayoutSidebar>
        <SidebarLink
          to="/client/dashboard"
          label="Dashboard"
          icon={<LayoutDashboard className="shrink-0 size-4" />}
        />
        <SidebarLink
          to="/client/menu"
          label="Menu"
          icon={<BookOpen className="shrink-0 size-4" />}
        />
        <SidebarLink
          to="/client/point-of-sale"
          label="Point of Sale"
          icon={<Banknote className="shrink-0 size-4" />}
        />
        <SidebarLink
          to="/client/orders"
          label="Orders"
          icon={<Receipt className="shrink-0 size-4" />}
        />
        <SidebarLink
          to="/client/inventory"
          label="Inventory"
          icon={<Boxes className="shrink-0 size-4" />}
        />
      </LayoutSidebar>
      <LayoutBreadcrumb />
      <div className="w-full h-full overflow-auto lg:ps-64 bg-gray-100">
        <div className="p-4 sm:p-2 space-y-2 sm:space-y-2">{children}</div>
      </div>
    </>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ClientLayout;
