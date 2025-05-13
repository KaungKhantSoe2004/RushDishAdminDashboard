"use client";

import { useState } from "react";
import {
  FaCalendarAlt,
  FaDownload,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Card from "../../components/Card";
import Button from "../../components/Button";

const ReportsAnalytics = () => {
  const [dateFilter, setDateFilter] = useState("month");

  // Mock data
  const overviewStats = {
    totalOrders: "1,245",
    totalRevenue: "$45,890",
    averageOrderValue: "$36.86",
    activeUsers: "2,567",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Reports & Analytics
        </h1>
        <Button variant="outline" size="sm" icon={<FaDownload />}>
          Export Reports
        </Button>
      </div>

      {/* Date Filter */}
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Overview</h2>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {overviewStats.totalOrders}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {overviewStats.totalRevenue}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">
              Average Order Value
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {overviewStats.averageOrderValue}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Active Users</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {overviewStats.activeUsers}
            </h3>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Orders & Revenue Trend">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <FaChartLine className="mx-auto text-gray-400" size={48} />
              <p className="mt-4 text-gray-500">
                Orders and revenue trend chart would go here
              </p>
            </div>
          </div>
        </Card>

        <Card title="Popular Categories">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <FaChartBar className="mx-auto text-gray-400" size={48} />
              <p className="mt-4 text-gray-500">
                Popular categories chart would go here
              </p>
            </div>
          </div>
        </Card>

        <Card title="User Demographics">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <FaChartPie className="mx-auto text-gray-400" size={48} />
              <p className="mt-4 text-gray-500">
                User demographics chart would go here
              </p>
            </div>
          </div>
        </Card>

        <Card title="Order Distribution by Location">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <FaMapMarkerAlt className="mx-auto text-gray-400" size={48} />
              <p className="mt-4 text-gray-500">
                Order distribution map would go here
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Report Types */}
      <Card title="Available Reports">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Sales Report</h3>
            <p className="mt-2 text-sm text-gray-500">
              Detailed breakdown of sales by store, category, and time period.
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={<FaDownload />}
              className="mt-4"
            >
              Download
            </Button>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              User Activity Report
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Analysis of user registrations, active users, and ordering
              patterns.
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={<FaDownload />}
              className="mt-4"
            >
              Download
            </Button>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              Delivery Performance
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Metrics on delivery times, rider performance, and customer
              satisfaction.
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={<FaDownload />}
              className="mt-4"
            >
              Download
            </Button>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              Store Performance
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Comparison of store performance, ratings, and order volumes.
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={<FaDownload />}
              className="mt-4"
            >
              Download
            </Button>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              Financial Summary
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Complete financial overview including revenue, commissions, and
              expenses.
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={<FaDownload />}
              className="mt-4"
            >
              Download
            </Button>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Custom Report</h3>
            <p className="mt-2 text-sm text-gray-500">
              Create a custom report with the metrics and dimensions you need.
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={<FaChartLine />}
              className="mt-4"
            >
              Create
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;
