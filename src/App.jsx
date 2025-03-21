import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/superadmin/Login";
import SuperadminDashboard from "./pages/superadmin/Dashboard";
import Onboarding from "./pages/superadmin/Onboarding";
import "./App.css";
import Register from "./pages/client/Register";
import ClientLogin from "./pages/client/Login";
import ClientDashboard from "./pages/client/Dashboard";
import ClientInventory from "./pages/client/Inventory";
import ClientMenu from "./pages/client/Menu";
import PointOfSale from "./pages/client/POS";
import ClientOrders from "./pages/client/Orders";
import CustomerLoginPage from "./pages/customer/Login";
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerRegisterPage from "./pages/customer/Register";
import BusinessOnboarding from "./pages/client/Onboarding";
import Browse from "./pages/customer/Browse";
import CustomerOrder from "./pages/customer/Order";
import CustomerHistory from "./pages/customer/History";
import CustomerSettings from "./pages/customer/Settings";
import Customertocustomer from "./pages/customer/c2c";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/superadmin/login" element={<LoginPage />} />
        <Route
          exact
          path="/superadmin/dashboard"
          element={<SuperadminDashboard />}
        />
        <Route
          exact
          path="/business/be-a-member"
          element={<BusinessOnboarding />}
        />
        <Route exact path="/superadmin/onboarding" element={<Onboarding />} />
        {/* Add other routes for client and customer */}
        <Route exact path="/create-an-account/:token" element={<Register />} />
        <Route exact path="/client/login" element={<ClientLogin />} />
        <Route exact path="/client/dashboard" element={<ClientDashboard />} />
        <Route exact path="/client/inventory" element={<ClientInventory />} />
        <Route exact path="/client/menu" element={<ClientMenu />} />
        <Route exact path="/client/point-of-sale" element={<PointOfSale />} />
        <Route exact path="/client/orders" element={<ClientOrders />} />
        <Route exact path="/login" element={<CustomerLoginPage />} />
        <Route exactly path="/browse" element={<Browse />} />
        <Route exact path="/register" element={<CustomerRegisterPage />} />
        <Route exact path="/saves/dashboard" element={<CustomerDashboard />} />
        <Route exact path="/moment" element={<Customertocustomer />} />
        <Route exact path="/orders" element={<CustomerOrder />} />
        <Route exact path="/history" element={<CustomerHistory />} />
        <Route exact path="/settings" element={<CustomerSettings />} />
      </Routes>
    </Router>
  );
};

export default App;
