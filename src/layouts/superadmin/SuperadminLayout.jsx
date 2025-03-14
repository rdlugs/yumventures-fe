import PropTypes from "prop-types";
import SuperadminHeader from "../../components/superadmin/SuperadminHeader";
import SuperadminNavigation from "../../components/superadmin/SuperadminNavigation";
const SuperadminLayout = ({ children }) => {
  return (
    <>
      <SuperadminHeader />

      <main id="content">
        <SuperadminNavigation />

        <div className="bg-gray-100 max-w-full min-h-screen">{children}</div>
      </main>
    </>
  );
};

SuperadminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuperadminLayout;
