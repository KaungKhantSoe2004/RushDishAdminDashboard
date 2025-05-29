"use client";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";

import AdminDashboard from "./pages/admin/Dashboard";
import StoresManagement from "./pages/admin/StoresManagement";
import StoreDetail from "./pages/admin/StoreDetail";
import DeliveryStaffManagement from "./pages/admin/DeliveryStaffManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import OrderDetail from "./pages/admin/OrderDetail";
import UserManagement from "./pages/admin/UserManagement";
import EarningsCommissions from "./pages/admin/EarningsCommissions";
import PromotionsBanners from "./pages/admin/PromotionsBanners";
import ReportsAnalytics from "./pages/admin/ReportsAnalytics";
import Settings from "./pages/admin/Settings";
import NotificationsLogs from "./pages/admin/NotificationsLogs";

// Store Owner Pages
import StoreOwnerDashboard from "./pages/store/Dashboard";
import StoreOrdersManagement from "./pages/store/OrdersManagement";
import MenuManagement from "./pages/store/MenuManagement";
import StorePromotions from "./pages/store/Promotions";
import Payouts from "./pages/store/Payouts";

// Delivery Guy Pages
import DeliveryDashboard from "./pages/delivery/Dashboard";
import DeliveryQueue from "./pages/delivery/DeliveryQueue";
import DeliveryHistory from "./pages/delivery/DeliveryHistory";
import DeliveryProfile from "./pages/delivery/Profile";
import Preview from "./pages/Preview";
import LoginPage from "./pages/login";
import DeliveryView from "./pages/admin/deliveryView";
import AssignArea from "./pages/admin/DeliveryAssignArea";
import UserDetails from "./pages/admin/userDetails";
import EmailCompose from "./pages/admin/email-compose";

function App() {
  // In a real app, this would come from authentication
  const [userRole, setUserRole] = useState<"admin" | "store" | "delivery">(
    "admin"
  );

  const handleRoleChange = (role: "admin" | "store" | "delivery") => {
    setUserRole(role);
  };

  return (
    <Router>
      <Routes>
        {/* Preview/Landing Page */}
        <Route path="/" element={<Preview />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <Layout userRole="admin" onRoleChange={handleRoleChange}>
              <Routes>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/stores" element={<StoresManagement />} />
                <Route path="/stores/:id" element={<StoreDetail />} />
                <Route
                  path="/delivery-staff"
                  element={<DeliveryStaffManagement />}
                />
                <Route path="/delivery/view/:id" element={<DeliveryView />} />
                <Route path="/delivery/area/:id" element={<AssignArea />} />
                <Route path="/orders" element={<OrdersManagement />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/users/email/:id" element={<EmailCompose />} />
                <Route path="/earnings" element={<EarningsCommissions />} />
                <Route path="/promotions" element={<PromotionsBanners />} />
                <Route path="/reports" element={<ReportsAnalytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<NotificationsLogs />} />
                <Route
                  path="*"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
              </Routes>
            </Layout>
          }
        />

        {/* Store Owner Routes */}
        <Route
          path="/store/*"
          element={
            <Layout userRole="store" onRoleChange={handleRoleChange}>
              <Routes>
                <Route path="/dashboard" element={<StoreOwnerDashboard />} />
                <Route path="/orders" element={<StoreOrdersManagement />} />
                <Route path="/menu" element={<MenuManagement />} />
                <Route path="/promotions" element={<StorePromotions />} />
                <Route path="/payouts" element={<Payouts />} />
                <Route
                  path="*"
                  element={<Navigate to="/store/dashboard" replace />}
                />
              </Routes>
            </Layout>
          }
        />

        {/* Delivery Guy Routes */}
        <Route
          path="/delivery/*"
          element={
            <Layout userRole="delivery" onRoleChange={handleRoleChange}>
              <Routes>
                <Route path="/dashboard" element={<DeliveryDashboard />} />
                <Route path="/queue" element={<DeliveryQueue />} />
                <Route path="/history" element={<DeliveryHistory />} />
                <Route path="/profile" element={<DeliveryProfile />} />
                <Route
                  path="*"
                  element={<Navigate to="/delivery/dashboard" replace />}
                />
              </Routes>
            </Layout>
          }
        />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
