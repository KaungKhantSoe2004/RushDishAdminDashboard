"\"use client";

import { useState } from "react";
import {
  FaSave,
  FaGlobe,
  FaMoneyBillWave,
  FaBell,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";
import Card from "../../components/Card";
import Button from "../../components/Button";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Platform Settings</h1>
        <Button icon={<FaSave />}>Save Changes</Button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("general")}
          className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "general"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <FaGlobe className="mr-2" />
            General Settings
          </div>
        </button>

        <button
          onClick={() => setActiveTab("fees")}
          className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "fees"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2" />
            Fees & Commissions
          </div>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "notifications"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <FaBell className="mr-2" />
            Notifications
          </div>
        </button>

        <button
          onClick={() => setActiveTab("email")}
          className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "email"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            Email Templates
          </div>
        </button>

        <button
          onClick={() => setActiveTab("advanced")}
          className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === "advanced"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <FaCog className="mr-2" />
            Advanced
          </div>
        </button>
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <Card title="Platform Information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  defaultValue="FoodDelivery"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="support@fooddelivery.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  rows={3}
                  defaultValue="123 Main St, New York, NY 10001"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>
          </Card>

          <Card title="Regional Settings">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Language
                </label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Fees & Commissions Settings */}
      {activeTab === "fees" && (
        <div className="space-y-6">
          <Card title="Commission Rates">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Commission (%)
                </label>
                <input
                  type="number"
                  defaultValue="15"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Fee (%)
                </label>
                <input
                  type="number"
                  defaultValue="10"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
          </Card>

          <Card title="Transaction Fees">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Gateway Fee (%)
                </label>
                <input
                  type="number"
                  defaultValue="2.9"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Card title="Notification Preferences">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Order Notifications
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-500">
                    Send push notifications for new orders
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status Updates
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-500">
                    Send email notifications for order status updates
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Low Inventory Alerts
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-500">
                    Send email alerts for low inventory levels
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Email Templates Settings */}
      {activeTab === "email" && (
        <div className="space-y-6">
          <Card title="Order Confirmation Email">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  defaultValue="Your FoodDelivery Order Confirmation"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Body
                </label>
                <textarea
                  rows={5}
                  defaultValue="Dear {customer_name}, your order has been confirmed..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>
          </Card>

          <Card title="Delivery Update Email">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  defaultValue="Your FoodDelivery Order is on its way!"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Body
                </label>
                <textarea
                  rows={5}
                  defaultValue="Dear {customer_name}, your order is out for delivery..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Advanced Settings */}
      {activeTab === "advanced" && (
        <div className="space-y-6">
          <Card title="API Keys">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Maps API Key
                </label>
                <input
                  type="text"
                  placeholder="Enter API Key"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Gateway API Key
                </label>
                <input
                  type="text"
                  placeholder="Enter API Key"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>
          </Card>

          <Card title="Maintenance Mode">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-500">
                Enable maintenance mode
              </span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;
