"use client"

import { useState } from "react"
import { FaSearch, FaFilter, FaPlus, FaEye, FaBan, FaCheck, FaEnvelope } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      status: "Active",
      orders: 24,
      lastOrder: "May 10, 2025",
      joinDate: "Jan 15, 2023",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      status: "Active",
      orders: 18,
      lastOrder: "May 8, 2025",
      joinDate: "Feb 20, 2023",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      status: "Inactive",
      orders: 5,
      lastOrder: "Mar 15, 2025",
      joinDate: "Mar 10, 2023",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      status: "Active",
      orders: 32,
      lastOrder: "May 12, 2025",
      joinDate: "Dec 5, 2022",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      status: "Banned",
      orders: 7,
      lastOrder: "Feb 28, 2025",
      joinDate: "Apr 18, 2023",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      status: "Active",
      orders: 15,
      lastOrder: "May 5, 2025",
      joinDate: "May 22, 2023",
    },
    {
      id: 7,
      name: "Robert Martinez",
      email: "robert.martinez@example.com",
      status: "Active",
      orders: 9,
      lastOrder: "Apr 30, 2025",
      joinDate: "Jun 14, 2023",
    },
    {
      id: 8,
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      status: "Inactive",
      orders: 3,
      lastOrder: "Jan 15, 2025",
      joinDate: "Jul 8, 2023",
    },
  ]

  // Filter users based on search term and status filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <Button icon={<FaPlus />}>Add New User</Button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{users.length}</h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Active Users</p>
            <h3 className="text-2xl font-bold text-green-600 mt-1">
              {users.filter((user) => user.status === "Active").length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Inactive Users</p>
            <h3 className="text-2xl font-bold text-yellow-600 mt-1">
              {users.filter((user) => user.status === "Inactive").length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Banned Users</p>
            <h3 className="text-2xl font-bold text-red-600 mt-1">
              {users.filter((user) => user.status === "Banned").length}
            </h3>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search users..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
            </div>

            <Button variant="outline" size="sm">
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={user.status === "Active" ? "success" : user.status === "Inactive" ? "warning" : "danger"}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastOrder}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" icon={<FaEnvelope />}>
                        Email
                      </Button>
                      <Button variant="outline" size="sm" icon={<FaEye />}>
                        View
                      </Button>
                      {user.status === "Active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<FaBan />}
                          className="text-red-500 hover:text-red-600"
                        >
                          Ban
                        </Button>
                      )}
                      {user.status === "Banned" && (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<FaCheck />}
                          className="text-green-500 hover:text-green-600"
                        >
                          Unban
                        </Button>
                      )}
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
                <span className="font-medium">{filteredUsers.length}</span> of{" "}
                <span className="font-medium">{filteredUsers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <Button variant="outline" size="sm" className="rounded-l-md">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-rose-50 text-rose-600">
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
  )
}

export default UserManagement
