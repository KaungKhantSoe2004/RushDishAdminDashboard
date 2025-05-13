"use client";

import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaBell,
  FaEnvelope,
  FaSms,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

const NotificationsLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data
  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      message: "A new order #ORD-5331 has been placed by John Smith.",
      type: "Order",
      channel: "Push",
      recipient: "Store Owner",
      status: "Delivered",
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      title: "Order Status Update",
      message: "Your order #ORD-5330 is now being prepared.",
      type: "Order",
      channel: "Email",
      recipient: "Customer",
      status: "Delivered",
      date: "Today, 09:45 AM",
    },
    {
      id: 3,
      title: "New Rider Registered",
      message: "A new delivery rider Michael Brown has registered.",
      type: "System",
      channel: "Email",
      recipient: "Admin",
      status: "Delivered",
      date: "Today, 09:15 AM",
    },
    {
      id: 4,
      title: "Payment Received",
      message: "Payment of $36.00 received for order #ORD-5330.",
      type: "Payment",
      channel: "SMS",
      recipient: "Store Owner",
      status: "Delivered",
      date: "Today, 09:10 AM",
    },
    {
      id: 5,
      title: "Order Delivered",
      message: "Your order #ORD-5328 has been delivered successfully.",
      type: "Order",
      channel: "Push",
      recipient: "Customer",
      status: "Delivered",
      date: "Yesterday, 6:25 PM",
    },
    {
      id: 6,
      title: "New Store Application",
      message: "A new store 'Pizza Palace' has applied to join the platform.",
      type: "System",
      channel: "Email",
      recipient: "Admin",
      status: "Delivered",
      date: "Yesterday, 3:45 PM",
    },
    {
      id: 7,
      title: "Weekly Report",
      message: "Your weekly sales report is now available.",
      type: "Report",
      channel: "Email",
      recipient: "Store Owner",
      status: "Delivered",
      date: "Yesterday, 9:00 AM",
    },
    {
      id: 8,
      title: "Order Cancelled",
      message: "Order #ORD-5327 has been cancelled by the customer.",
      type: "Order",
      channel: "Push",
      recipient: "Store Owner",
      status: "Delivered",
      date: "2 days ago, 2:15 PM",
    },
  ];

  // Filter notifications based on search term, type filter, and date filter
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      notification.type.toLowerCase() === typeFilter.toLowerCase();

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && notification.date.includes("Today")) ||
      (dateFilter === "yesterday" && notification.date.includes("Yesterday")) ||
      (dateFilter === "older" && notification.date.includes("days ago"));

    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Notifications & Logs
        </h1>
        <Button variant="outline" size="sm" icon={<FaCalendarAlt />}>
          Export Logs
        </Button>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-rose-100 text-rose-600">
              <FaBell size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Push Notifications
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {notifications.filter((n) => n.channel === "Push").length}
              </h3>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaEnvelope size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Email Notifications
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {notifications.filter((n) => n.channel === "Email").length}
              </h3>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaSms size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                SMS Notifications
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {notifications.filter((n) => n.channel === "SMS").length}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="order">Order</option>
                <option value="payment">Payment</option>
                <option value="system">System</option>
                <option value="report">Report</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="older">Older</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {notification.message}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        notification.channel === "Push"
                          ? "warning"
                          : notification.channel === "Email"
                          ? "info"
                          : "success"
                      }
                    >
                      {notification.channel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.recipient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="success">{notification.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {notification.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" icon={<FaEye />}>
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<FaTrash />}
                        className="text-red-500 hover:text-red-600"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">
                  {filteredNotifications.length}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {filteredNotifications.length}
                </span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <Button variant="outline" size="sm" className="rounded-l-md">
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-rose-50 text-rose-600"
                >
                  1
                </Button>
                <Button variant="outline" size="sm" className="rounded-r-md">
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotificationsLogs;
