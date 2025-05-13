"use client"

import { useNavigate, useLocation } from "react-router-dom"
import {
  FaHome,
  FaStore,
  FaMotorcycle,
  FaShoppingBag,
  FaUsers,
  FaMoneyBillWave,
  FaPercentage,
  FaChartBar,
  FaCog,
  FaBell,
  FaUtensils,
  FaWallet,
  FaListAlt,
  FaHistory,
  FaUserCircle,
  FaBars,
} from "react-icons/fa"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
  userRole: "admin" | "store" | "delivery"
}

const Sidebar = ({ isOpen, toggleSidebar, userRole }: SidebarProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const adminMenuItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: <FaHome /> },
    { path: "/admin/stores", name: "Stores", icon: <FaStore /> },
    { path: "/admin/delivery-staff", name: "Delivery Staff", icon: <FaMotorcycle /> },
    { path: "/admin/orders", name: "Orders", icon: <FaShoppingBag /> },
    { path: "/admin/users", name: "Users", icon: <FaUsers /> },
    { path: "/admin/earnings", name: "Earnings", icon: <FaMoneyBillWave /> },
    { path: "/admin/promotions", name: "Promotions", icon: <FaPercentage /> },
    { path: "/admin/reports", name: "Reports", icon: <FaChartBar /> },
    { path: "/admin/settings", name: "Settings", icon: <FaCog /> },
    { path: "/admin/notifications", name: "Notifications", icon: <FaBell /> },
  ]

  const storeMenuItems = [
    { path: "/store/dashboard", name: "Dashboard", icon: <FaHome /> },
    { path: "/store/orders", name: "Orders", icon: <FaShoppingBag /> },
    { path: "/store/menu", name: "Menu", icon: <FaUtensils /> },
    { path: "/store/promotions", name: "Promotions", icon: <FaPercentage /> },
    { path: "/store/payouts", name: "Payouts", icon: <FaWallet /> },
  ]

  const deliveryMenuItems = [
    { path: "/delivery/dashboard", name: "Dashboard", icon: <FaHome /> },
    { path: "/delivery/queue", name: "Delivery Queue", icon: <FaListAlt /> },
    { path: "/delivery/history", name: "History", icon: <FaHistory /> },
    { path: "/delivery/profile", name: "Profile", icon: <FaUserCircle /> },
  ]

  let menuItems
  let roleTitle

  switch (userRole) {
    case "admin":
      menuItems = adminMenuItems
      roleTitle = "Admin Panel"
      break
    case "store":
      menuItems = storeMenuItems
      roleTitle = "Store Management"
      break
    case "delivery":
      menuItems = deliveryMenuItems
      roleTitle = "Delivery Portal"
      break
    default:
      menuItems = adminMenuItems
      roleTitle = "Admin Panel"
  }

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b px-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-rose-500 flex items-center justify-center text-white">
                <FaUtensils />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-800">FoodDelivery</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
            >
              <FaBars />
            </button>
          </div>

          {/* Role title */}
          <div className="border-b py-3 px-4">
            <p className="text-sm font-medium text-rose-600">{roleTitle}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                      location.pathname === item.path
                        ? "bg-rose-50 text-rose-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* User profile */}
          <div className="border-t p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
