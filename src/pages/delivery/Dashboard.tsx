"use client"

import { useState } from "react"
import {
  FaShoppingBag,
  FaMoneyBillWave,
  FaToggleOn,
  FaToggleOff,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
} from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const DeliveryDashboard = () => {
  const [isOnline, setIsOnline] = useState(true)

  // Mock data
  const earningsToday = "$78.50"
  const completedDeliveries = 6

  const activeOrders = [
    {
      id: "#ORD-5331",
      status: "Ready for Pickup",
      store: {
        name: "Burger King",
        address: "123 Main St, New York",
        distance: "1.2 miles",
      },
      customer: {
        name: "John Smith",
        address: "456 Park Ave, New York",
        distance: "0.8 miles",
        phone: "+1 (555) 123-4567",
      },
      amount: "$24.50",
      items: 3,
      estimatedTime: "15-20 min",
    },
    {
      id: "#ORD-5330",
      status: "On the way",
      store: {
        name: "Pizza Hut",
        address: "789 Broadway, New York",
        distance: "0.5 miles",
      },
      customer: {
        name: "Sarah Johnson",
        address: "101 5th Ave, New York",
        distance: "1.5 miles",
        phone: "+1 (555) 987-6543",
      },
      amount: "$36.00",
      items: 2,
      estimatedTime: "10-15 min",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Delivery Dashboard</h1>
        <div className="flex items-center">
          <span className="mr-3 font-medium text-gray-700">Status:</span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center px-4 py-2 rounded-full ${
              isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {isOnline ? (
              <>
                <FaToggleOn className="mr-2 text-green-600" size={20} />
                Online
              </>
            ) : (
              <>
                <FaToggleOff className="mr-2 text-gray-600" size={20} />
                Offline
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-rose-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Earnings Today</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{earningsToday}</h3>
              <p className="text-xs text-gray-500 mt-2">From {completedDeliveries} completed deliveries</p>
            </div>
            <div className="p-3 rounded-full bg-rose-50">
              <FaMoneyBillWave className="text-rose-500" size={24} />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-l-rose-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Orders</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{activeOrders.length}</h3>
              <p className="text-xs text-gray-500 mt-2">
                {activeOrders.length === 0
                  ? "No active orders"
                  : activeOrders.length === 1
                    ? "1 order in progress"
                    : `${activeOrders.length} orders in progress`}
              </p>
            </div>
            <div className="p-3 rounded-full bg-rose-50">
              <FaShoppingBag className="text-rose-500" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Active Orders */}
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-800">Active Orders</h2>

        {activeOrders.length === 0 ? (
          <Card>
            <div className="py-6 text-center">
              <p className="text-gray-500">No active orders at the moment.</p>
              {!isOnline && (
                <Button className="mt-4" onClick={() => setIsOnline(true)}>
                  Go Online to Receive Orders
                </Button>
              )}
            </div>
          </Card>
        ) : (
          activeOrders.map((order) => (
            <Card key={order.id}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{order.id}</h3>
                    <div className="flex items-center mt-1">
                      <Badge
                        variant={
                          order.status === "Ready for Pickup"
                            ? "warning"
                            : order.status === "On the way"
                              ? "info"
                              : "default"
                        }
                      >
                        {order.status}
                      </Badge>
                      <span className="ml-2 text-sm text-gray-500">{order.estimatedTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{order.amount}</p>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </div>
                </div>

                {/* Store Info */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-rose-100 rounded-full">
                      <FaMapMarkerAlt className="text-rose-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-800">Pickup from: {order.store.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{order.store.address}</p>
                      <p className="text-xs text-gray-500 mt-1">Distance: {order.store.distance}</p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FaUser className="text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-800">Deliver to: {order.customer.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{order.customer.address}</p>
                      <p className="text-xs text-gray-500 mt-1">Distance: {order.customer.distance}</p>

                      <div className="mt-2 flex items-center">
                        <FaPhone className="text-gray-400" size={12} />
                        <a href={`tel:${order.customer.phone}`} className="ml-1 text-xs text-blue-600">
                          {order.customer.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  {order.status === "Ready for Pickup" && (
                    <>
                      <Button className="flex-1">Picked Up</Button>
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                    </>
                  )}

                  {order.status === "On the way" && (
                    <>
                      <Button className="flex-1">Delivered</Button>
                      <Button variant="outline" className="flex-1">
                        Issue Reported
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default DeliveryDashboard
