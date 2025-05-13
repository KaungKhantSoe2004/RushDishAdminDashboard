"use client"

import { useState } from "react"
import { FaCalendarAlt, FaSearch, FaFilter } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const DeliveryHistory = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const deliveries = [
    {
      id: "#ORD-5320",
      store: "Burger King",
      customer: "John Smith",
      status: "Delivered",
      amount: "$24.50",
      earnings: "$5.50",
      date: "Today, 10:30 AM",
      deliveryTime: "18 min",
    },
    {
      id: "#ORD-5315",
      store: "Pizza Hut",
      customer: "Sarah Johnson",
      status: "Delivered",
      amount: "$36.00",
      earnings: "$6.75",
      date: "Today, 09:15 AM",
      deliveryTime: "22 min",
    },
    {
      id: "#ORD-5310",
      store: "Taco Bell",
      customer: "Michael Brown",
      status: "Cancelled",
      amount: "$18.75",
      earnings: "$2.00",
      date: "Yesterday, 7:45 PM",
      deliveryTime: "N/A",
    },
    {
      id: "#ORD-5305",
      store: "KFC",
      customer: "Emily Davis",
      status: "Delivered",
      amount: "$29.25",
      earnings: "$5.25",
      date: "Yesterday, 6:20 PM",
      deliveryTime: "15 min",
    },
    {
      id: "#ORD-5300",
      store: "Subway",
      customer: "David Wilson",
      status: "Delivered",
      amount: "$15.50",
      earnings: "$4.00",
      date: "Yesterday, 2:10 PM",
      deliveryTime: "20 min",
    },
    {
      id: "#ORD-5295",
      store: "McDonald's",
      customer: "Lisa Anderson",
      status: "Delivered",
      amount: "$22.75",
      earnings: "$5.00",
      date: "2 days ago, 8:30 PM",
      deliveryTime: "17 min",
    },
    {
      id: "#ORD-5290",
      store: "Wendy's",
      customer: "Robert Martinez",
      status: "Cancelled",
      amount: "$17.25",
      earnings: "$0.00",
      date: "2 days ago, 7:15 PM",
      deliveryTime: "N/A",
    },
    {
      id: "#ORD-5285",
      store: "Chipotle",
      customer: "Jennifer Taylor",
      status: "Delivered",
      amount: "$31.50",
      earnings: "$6.50",
      date: "2 days ago, 1:45 PM",
      deliveryTime: "25 min",
    },
  ]

  // Filter deliveries based on search term, status filter, and date filter
  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || delivery.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && delivery.date.includes("Today")) ||
      (dateFilter === "yesterday" && delivery.date.includes("Yesterday")) ||
      (dateFilter === "older" && delivery.date.includes("days ago"))

    return matchesSearch && matchesStatus && matchesDate
  })

  // Calculate total earnings
  const totalEarnings = filteredDeliveries.reduce((total, delivery) => {
    return total + Number.parseFloat(delivery.earnings.replace("$", ""))
  }, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Delivery History</h1>
        <Button variant="outline" size="sm" icon={<FaCalendarAlt />}>
          Export History
        </Button>
      </div>

      {/* Earnings Summary */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Earnings (Filtered)</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">${totalEarnings.toFixed(2)}</h3>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Completed Deliveries</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {filteredDeliveries.filter((d) => d.status === "Delivered").length}
            </h3>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Cancelled</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {filteredDeliveries.filter((d) => d.status === "Cancelled").length}
            </h3>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Average Delivery Time</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {Math.round(
                filteredDeliveries
                  .filter((d) => d.deliveryTime !== "N/A")
                  .reduce((total, d) => total + Number.parseInt(d.deliveryTime), 0) /
                  filteredDeliveries.filter((d) => d.deliveryTime !== "N/A").length,
              ) || 0}{" "}
              min
            </h3>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search deliveries..."
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
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Deliveries Table */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Earnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{delivery.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delivery.store}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delivery.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={delivery.status === "Delivered" ? "success" : "danger"}>{delivery.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delivery.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {delivery.earnings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delivery.deliveryTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delivery.date}</td>
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
                <span className="font-medium">{filteredDeliveries.length}</span> of{" "}
                <span className="font-medium">{filteredDeliveries.length}</span> results
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

export default DeliveryHistory
