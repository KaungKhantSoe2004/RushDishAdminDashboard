"use client";

import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

const DeliveryStaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data
  const deliveryStaff = [
    {
      id: 1,
      name: "John Smith",
      zone: "Manhattan",
      status: "Online",
      earningsToday: "$78.50",
      completedToday: 6,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      zone: "Brooklyn",
      status: "Online",
      earningsToday: "$65.25",
      completedToday: 5,
      rating: 4.5,
    },
    {
      id: 3,
      name: "Michael Brown",
      zone: "Queens",
      status: "Offline",
      earningsToday: "$0.00",
      completedToday: 0,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Emily Davis",
      zone: "Bronx",
      status: "Online",
      earningsToday: "$42.75",
      completedToday: 3,
      rating: 4.9,
    },
    {
      id: 5,
      name: "David Wilson",
      zone: "Staten Island",
      status: "Offline",
      earningsToday: "$0.00",
      completedToday: 0,
      rating: 4.6,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      zone: "Manhattan",
      status: "Online",
      earningsToday: "$91.00",
      completedToday: 7,
      rating: 4.4,
    },
    {
      id: 7,
      name: "Robert Martinez",
      zone: "Brooklyn",
      status: "Online",
      earningsToday: "$52.50",
      completedToday: 4,
      rating: 4.3,
    },
    {
      id: 8,
      name: "Jennifer Taylor",
      zone: "Queens",
      status: "Offline",
      earningsToday: "$0.00",
      completedToday: 0,
      rating: 4.7,
    },
  ];

  // Filter delivery staff based on search term and status filter
  const filteredStaff = deliveryStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.zone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      staff.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Count online and offline staff
  const onlineCount = deliveryStaff.filter(
    (staff) => staff.status === "Online"
  ).length;
  const offlineCount = deliveryStaff.filter(
    (staff) => staff.status === "Offline"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Delivery Staff Management
        </h1>
        <Button icon={<FaPlus />}>Add New Staff</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <div className="h-8 w-8 flex items-center justify-center">
                <span className="text-xl font-bold">{onlineCount}</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-800">Online</h3>
              <p className="text-sm text-gray-500">
                Currently active delivery staff
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gray-100 text-gray-600">
              <div className="h-8 w-8 flex items-center justify-center">
                <span className="text-xl font-bold">{offlineCount}</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-800">Offline</h3>
              <p className="text-sm text-gray-500">
                Currently inactive delivery staff
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-rose-100 text-rose-600">
              <div className="h-8 w-8 flex items-center justify-center">
                <span className="text-xl font-bold">
                  {deliveryStaff.length}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-800">Total</h3>
              <p className="text-sm text-gray-500">
                Total registered delivery staff
              </p>
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
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <Button variant="outline" size="sm">
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Staff Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Earnings Today
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed Today
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        {staff.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {staff.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        {staff.zone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        staff.status === "Online" ? "success" : "default"
                      }
                    >
                      {staff.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {staff.earningsToday}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {staff.completedToday}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {staff.rating}/5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" icon={<FaEye />}>
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Assign Area
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
                <span className="font-medium">{filteredStaff.length}</span> of{" "}
                <span className="font-medium">{filteredStaff.length}</span>{" "}
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

export default DeliveryStaffManagement;
