"use client";

import { useState } from "react";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import logout from "../helpers/logout";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  toggleSidebar: () => void;
  userRole: "admin" | "store" | "delivery";
  onRoleChange: (role: "admin" | "store" | "delivery") => void;
}

const Topbar = ({ toggleSidebar, userRole, onRoleChange }: TopbarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const signOut = async () => {
    console.log("singing out");
    const logoutStatus = await logout();
    if (logoutStatus == true) {
      navigate("/login");
    } else {
      return;
    }
  };
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-6">
      {/* Left section */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
        >
          <FaBars />
        </button>
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Role switcher (for demo purposes) */}
        <div className="hidden md:block">
          <select
            value={userRole}
            onChange={(e) =>
              onRoleChange(e.target.value as "admin" | "store" | "delivery")
            }
            className="rounded-md border border-gray-300 py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="admin">Admin</option>
            <option value="store">Store Owner</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-600 relative"
          >
            <FaBell />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-rose-500 text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border">
              <div className="px-4 py-2 border-b">
                <h3 className="text-sm font-semibold">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 hover:bg-gray-50 border-b"
                  >
                    <p className="text-sm text-gray-800">
                      New order received from Store #{item}
                    </p>
                    <p className="text-xs text-gray-500">2 min ago</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-center">
                <button className="text-sm text-rose-600 hover:text-rose-700">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
          >
            <FaUserCircle className="text-gray-500 text-xl" />
            <span className="hidden md:inline text-sm font-medium text-gray-700">
              John Doe
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FaUserCircle className="mr-2 text-gray-500" />
                Profile
              </button>
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FaCog className="mr-2 text-gray-500" />
                Settings
              </button>
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FaQuestionCircle className="mr-2 text-gray-500" />
                Help
              </button>
              <div className="border-t my-1"></div>
              <button
                onClick={() => {
                  signOut();
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2 text-gray-500" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
