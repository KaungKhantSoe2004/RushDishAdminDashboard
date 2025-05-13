"use client"

import { useState } from "react"
import { FaSearch, FaFilter, FaCalendarAlt, FaEye, FaCheck, FaTimes, FaMotorcycle } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const StoreOrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("today")
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Mock data
  const orders = [
    {
      id: "#ORD-5331",
      customer: "John Smith",
      status: "New",
      amount: "$24.50",
      date: "Today, 10:30 AM",
      items: [
        { name: "Whopper Burger", quantity: 1, price: "$5.99" },
        { name: "Fries (Large)", quantity: 1, price: "$2.99" },
        { name: "Coca-Cola", quantity: 1, price: "$1.99" },
      ],
      address: "123 Main St, New York, NY 10001",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "#ORD-5330",
      customer: "Sarah Johnson",
      status: "Preparing",
      amount: "$36.00",
      date: "Today, 09:15 AM",
      items: [
        { name: "Chicken Royale", quantity: 2, price: "$9.98" },
        { name: "Onion Rings", quantity: 1, price: "$2.49" },
        { name: "Sprite", quantity: 2, price: "$3.98" },
      ],
      address: "456 Park Ave, New York, NY 10022",
      phone: "+1 (555) 987-6543",
    },
    {
      id: "#ORD-5329",
      customer: "Michael Brown",
      status: "Ready for Pickup",
      amount: "$18.75",
      date: "Today, 08:45 AM",
      items: [
        { name: "Whopper Burger", quantity: 1, price: "$5.99" },
        { name: "Chicken Nuggets", quantity: 1, price: "$4.99" },
        { name: "Chocolate Sundae", quantity: 1, price: "$2.29" },
      ],
      address: "789 Broadway, New York, NY 10003",
      phone: "+1 (555) 765-4321",
    },
    {
      id: "#ORD-5328",
      customer: "Emily Davis",
      status: "Delivered",
      amount: "$29.25",
      date: "Yesterday, 6:20 PM",
      items: [
        { name: "Double Whopper", quantity: 1, price: "$7.99" },
        { name: "Chicken Fries", quantity: 1, price: "$3.99" },
        { name: "Onion Rings", quantity: 1, price: "$2.49" },
      ],
      address: "321 5th Ave, New York, NY 10016",
      phone: "+1 (555) 654-3210",
    },
    {
      id: "#ORD-5327",
      customer: "David Wilson",
      status: "Cancelled",
      amount: "$15.50",
      date: "Yesterday, 2:10 PM",
      items: [
        { name: "Whopper Jr", quantity: 1, price: "$3.99" },
        { name: "Fries (Medium)", quantity: 1, price: "$2.49" },
        { name: "Coca-Cola", quantity: 1, price: "$1.99" },
      ],
      address: "654 Madison Ave, New York, NY 10022",
      phone: "+1 (555) 543-2109",
    },
  ]

  // Filter orders based on search term, status filter, and date filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">New</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-1">
              {orders.filter((order) => order.status === "New").length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Preparing</p>
            <h3 className="text-2xl font-bold text-yellow-600 mt-1">
              {orders.filter((order) => order.status === "Preparing").length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Ready</p>
            <h3 className="text-2xl font-bold text-green-600 mt-1">
              {orders.filter((order) => order.status === "Ready for Pickup").length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Delivered</p>
            <h3 className="text-2xl font-bold text-gray-600 mt-1">
              {orders.filter((order) => order.status === "Delivered").length}
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
                <option value="new">New</option>
                <option value="preparing">Preparing</option>
                <option value="ready for pickup">Ready for Pickup</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Split View: Orders List and Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1">
          <Card title="Orders">
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-gray-500">No orders match your filters.</p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedOrder?.id === order.id ? "border-rose-500 bg-rose-50" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{order.id}</h4>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "success"
                            : order.status === "Preparing" || order.status === "Ready for Pickup"
                              ? "warning"
                              : order.status === "New"
                                ? "info"
                                : "danger"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">Customer</p>
                        <p className="text-sm font-medium">{order.customer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Amount</p>
                        <p className="text-sm font-medium">{order.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Items</p>
                        <p className="text-sm font-medium">{order.items.length}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <Card title={`Order Details: ${selectedOrder.id}`}>
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedOrder.customer}</h3>
                    <p className="text-sm text-gray-500">{selectedOrder.phone}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.address}</p>
                  </div>
                  <Badge
                    variant={
                      selectedOrder.status === "Delivered"
                        ? "success"
                        : selectedOrder.status === "Preparing" || selectedOrder.status === "Ready for Pickup"
                          ? "warning"
                          : selectedOrder.status === "New"
                            ? "info"
                            : "danger"
                    }
                    className="text-sm px-3 py-1"
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Order Items</h4>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                              {item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </td>
                          <td className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {selectedOrder.items.reduce((total, item) => total + item.quantity, 0)}
                          </td>
                          <td className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                            {selectedOrder.amount}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {selectedOrder.status === "New" && (
                    <>
                      <Button icon={<FaCheck />} className="flex-1">
                        Accept Order
                      </Button>
                      <Button variant="outline" icon={<FaTimes />} className="flex-1 text-red-500 hover:text-red-600">
                        Reject Order
                      </Button>
                    </>
                  )}

                  {selectedOrder.status === "Preparing" && (
                    <Button icon={<FaCheck />} className="flex-1">
                      Mark as Ready for Pickup
                    </Button>
                  )}

                  {selectedOrder.status === "Ready for Pickup" && (
                    <Button icon={<FaMotorcycle />} className="flex-1">
                      Assign to Delivery
                    </Button>
                  )}

                  <Button variant="outline" icon={<FaEye />} className="flex-1">
                    Print Receipt
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="py-12 text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <FaEye size={32} />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Select an order to view details</h3>
                <p className="mt-2 text-sm text-gray-500">Click on an order from the list to view its details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default StoreOrdersManagement
