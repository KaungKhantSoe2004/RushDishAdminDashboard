"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch, FaFilter, FaCalendarAlt, FaEye } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const OrdersManagement = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")

  // Mock data
  const orders = [
    {
      id: "#ORD-5331",
      store: "Burger King",
      customer: "John Smith",
      status: "Delivered",
      amount: "$24.50",
      date: "Today, 10:30 AM",
      items: 3,
    },
    {
      id: "#ORD-5330",
      store: "Pizza Hut",
      customer: "Sarah Johnson",
      status: "Preparing",
      amount: "$36.00",
      date: "Today, 09:15 AM",
      items: 2,
    },
    {
      id: "#ORD-5329",
      store: "Taco Bell",
      customer: "Michael Brown",
      status: "Cancelled",
      amount: "$18.75",
      date: "Yesterday, 7:45 PM",
      items: 4,
    },
    {
      id: "#ORD-5328",
      store: "KFC",
      customer: "Emily Davis",
      status: "Delivered",
      amount: "$29.25",
      date: "Yesterday, 6:20 PM",
      items: 1,
    },
    {
      id: "#ORD-5327",
      store: "Subway",
      customer: "David Wilson",
      status: "On the way",
      amount: "$15.50",
      date: "Yesterday, 2:10 PM",
      items: 2,
    },
    {
      id: "#ORD-5326",
      store: "McDonald's",
      customer: "Lisa Anderson",
      status: "Delivered",
      amount: "$22.75",
      date: "2 days ago, 8:30 PM",
      items: 3,
    },
    {
      id: "#ORD-5325",
      store: "Wendy's",
      customer: "Robert Martinez",
      status: "Cancelled",
      amount: "$17.25",
      date: "2 days ago, 7:15 PM",
      items: 2,
    },
    {
      id: "#ORD-5324",
      store: "Chipotle",
      customer: "Jennifer Taylor",
      status: "Delivered",
      amount: "$31.50",
      date: "2 days ago, 1:45 PM",
      items: 4,
    },
  ]

  // Filter orders based on search term, status filter, and date filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && order.date.includes("Today")) ||
      (dateFilter === "yesterday" && order.date.includes("Yesterday")) ||
      (dateFilter === "older" && order.date.includes("days ago"))

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
        <Button variant="outline" size="sm" icon={<FaCalendarAlt />}>
          Export Orders
        </Button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{orders.length}</h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Delivered</p>
            <h3 className="text-2xl font-bold text-green-600 mt-1">
              {orders.filter((order) => order.status === "Delivered").length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <h3 className="text-2xl font-bold text-yellow-600 mt-1">
              {orders.filter((order) => ["Preparing", "On the way"].includes(order.status)).length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Cancelled</p>
            <h3 className="text-2xl font-bold text-red-600 mt-1">
              {orders.filter((order) => order.status === "Cancelled").length}
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
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
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

            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="delivered">Delivered</option>
                <option value="preparing">Preparing</option>
                <option value="on the way">On the way</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.store}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Preparing" || order.status === "On the way"
                            ? "warning"
                            : "danger"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<FaEye />}
                      onClick={() => navigate(`/admin/orders/${order.id.replace("#ORD-", "")}`)}
                    >
                      View
                    </Button>
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
                <span className="font-medium">{filteredOrders.length}</span> of{" "}
                <span className="font-medium">{filteredOrders.length}</span> results
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

export default OrdersManagement
