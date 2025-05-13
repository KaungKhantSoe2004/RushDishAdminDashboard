"use client"

import { useState } from "react"
import { FaPhone, FaStore, FaMotorcycle, FaUser } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const DeliveryQueue = () => {
  const [activeTab, setActiveTab] = useState("available")

  // Mock data
  const availableOrders = [
    {
      id: "#ORD-5331",
      status: "Ready for Pickup",
      store: {
        name: "Burger King",
        address: "123 Main St, New York",
        distance: "1.2 miles",
        phone: "+1 (555) 123-4567",
      },
      customer: {
        name: "John Smith",
        address: "456 Park Ave, New York",
        distance: "0.8 miles",
        phone: "+1 (555) 987-6543",
      },
      amount: "$24.50",
      items: 3,
      estimatedTime: "15-20 min",
      estimatedEarnings: "$5.50",
    },
    {
      id: "#ORD-5330",
      status: "Ready for Pickup",
      store: {
        name: "Pizza Hut",
        address: "789 Broadway, New York",
        distance: "0.5 miles",
        phone: "+1 (555) 234-5678",
      },
      customer: {
        name: "Sarah Johnson",
        address: "101 5th Ave, New York",
        distance: "1.5 miles",
        phone: "+1 (555) 876-5432",
      },
      amount: "$36.00",
      items: 2,
      estimatedTime: "20-25 min",
      estimatedEarnings: "$6.75",
    },
    {
      id: "#ORD-5329",
      status: "Ready for Pickup",
      store: {
        name: "Taco Bell",
        address: "567 Madison Ave, New York",
        distance: "1.8 miles",
        phone: "+1 (555) 345-6789",
      },
      customer: {
        name: "Michael Brown",
        address: "222 Lexington Ave, New York",
        distance: "0.9 miles",
        phone: "+1 (555) 765-4321",
      },
      amount: "$18.75",
      items: 4,
      estimatedTime: "15-20 min",
      estimatedEarnings: "$4.25",
    },
  ]

  const myOrders = [
    {
      id: "#ORD-5328",
      status: "On the way",
      store: {
        name: "KFC",
        address: "321 Lexington Ave, New York",
        distance: "0.3 miles",
        phone: "+1 (555) 456-7890",
      },
      customer: {
        name: "Emily Davis",
        address: "444 3rd Ave, New York",
        distance: "1.2 miles",
        phone: "+1 (555) 654-3210",
      },
      amount: "$29.25",
      items: 1,
      estimatedTime: "10-15 min",
      pickedUpAt: "10:30 AM",
    },
    {
      id: "#ORD-5327",
      status: "Picked up",
      store: {
        name: "Subway",
        address: "111 7th Ave, New York",
        distance: "0.2 miles",
        phone: "+1 (555) 567-8901",
      },
      customer: {
        name: "David Wilson",
        address: "777 8th Ave, New York",
        distance: "1.7 miles",
        phone: "+1 (555) 543-2109",
      },
      amount: "$15.50",
      items: 2,
      estimatedTime: "15-20 min",
      pickedUpAt: "10:15 AM",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Delivery Queue</h1>
        <div className="flex items-center">
          <span className="mr-3 font-medium text-gray-700">Status:</span>
          <span className="flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800">
            <FaMotorcycle className="mr-2" />
            Online
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("available")}
          className={`py-4 px-6 border-b-2 font-medium text-sm ${
            activeTab === "available"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Available Orders ({availableOrders.length})
        </button>
        <button
          onClick={() => setActiveTab("my-orders")}
          className={`py-4 px-6 border-b-2 font-medium text-sm ${
            activeTab === "my-orders"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          My Orders ({myOrders.length})
        </button>
      </div>

      {/* Available Orders */}
      {activeTab === "available" && (
        <div className="space-y-6">
          {availableOrders.length === 0 ? (
            <Card>
              <div className="py-12 text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <FaMotorcycle size={32} />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No available orders</h3>
                <p className="mt-2 text-sm text-gray-500">Check back soon for new delivery opportunities</p>
              </div>
            </Card>
          ) : (
            availableOrders.map((order) => (
              <Card key={order.id}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{order.id}</h3>
                      <div className="flex items-center mt-1">
                        <Badge variant="warning">{order.status}</Badge>
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
                        <FaStore className="text-rose-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-800">Pickup from: {order.store.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{order.store.address}</p>
                        <p className="text-xs text-gray-500 mt-1">Distance: {order.store.distance}</p>

                        <div className="mt-2 flex items-center">
                          <FaPhone className="text-gray-400" size={12} />
                          <a href={`tel:${order.store.phone}`} className="ml-1 text-xs text-blue-600">
                            {order.store.phone}
                          </a>
                        </div>
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

                  {/* Earnings & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="bg-green-50 px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-600">Estimated Earnings</p>
                      <p className="text-lg font-medium text-green-600">{order.estimatedEarnings}</p>
                    </div>
                    <Button className="w-full sm:w-auto">Accept Delivery</Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* My Orders */}
      {activeTab === "my-orders" && (
        <div className="space-y-6">
          {myOrders.length === 0 ? (
            <Card>
              <div className="py-12 text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <FaMotorcycle size={32} />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No active orders</h3>
                <p className="mt-2 text-sm text-gray-500">You don't have any active deliveries at the moment</p>
              </div>
            </Card>
          ) : (
            myOrders.map((order) => (
              <Card key={order.id}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{order.id}</h3>
                      <div className="flex items-center mt-1">
                        <Badge
                          variant={
                            order.status === "On the way"
                              ? "info"
                              : order.status === "Picked up"
                                ? "warning"
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
                        <FaStore className="text-rose-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-800">Pickup from: {order.store.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{order.store.address}</p>
                        <p className="text-xs text-gray-500 mt-1">Distance: {order.store.distance}</p>

                        <div className="mt-2 flex items-center">
                          <FaPhone className="text-gray-400" size={12} />
                          <a href={`tel:${order.store.phone}`} className="ml-1 text-xs text-blue-600">
                            {order.store.phone}
                          </a>
                        </div>
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
                    {order.status === "Picked up" && (
                      <>
                        <Button className="flex-1">Delivered</Button>
                        <Button variant="outline" className="flex-1">
                          View Map
                        </Button>
                      </>
                    )}

                    {order.status === "On the way" && (
                      <>
                        <Button className="flex-1">Arrived at Customer</Button>
                        <Button variant="outline" className="flex-1">
                          View Map
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default DeliveryQueue
