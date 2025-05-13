"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  FaArrowLeft,
  FaCheck,
  FaBan,
  FaUtensils,
  FaShoppingBag,
  FaInfoCircle,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("menu")

  // Mock data
  const store = {
    id: Number(id),
    name: "Burger King",
    status: "Active",
    owner: "John Smith",
    email: "john@burgerking.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    joinDate: "Jan 15, 2023",
    rating: 4.5,
    totalOrders: 1256,
    totalRevenue: "$45,890",
    commission: "15%",
    description: "Burger King is an American multinational chain of hamburger fast food restaurants.",
    openingHours: "Mon-Sun: 10:00 AM - 10:00 PM",
    deliveryAreas: ["Manhattan", "Brooklyn", "Queens"],
  }

  // Mock menu items
  const menuItems = [
    { id: 1, name: "Whopper", category: "Burgers", price: "$5.99", image: "https://via.placeholder.com/80" },
    { id: 2, name: "Chicken Royale", category: "Chicken", price: "$4.99", image: "https://via.placeholder.com/80" },
    { id: 3, name: "Fries (Large)", category: "Sides", price: "$2.99", image: "https://via.placeholder.com/80" },
    { id: 4, name: "Onion Rings", category: "Sides", price: "$2.49", image: "https://via.placeholder.com/80" },
    { id: 5, name: "Coca-Cola", category: "Drinks", price: "$1.99", image: "https://via.placeholder.com/80" },
  ]

  // Mock orders
  const orders = [
    { id: "#ORD-5331", customer: "John Smith", status: "Delivered", amount: "$24.50", date: "Today, 10:30 AM" },
    { id: "#ORD-5330", customer: "Sarah Johnson", status: "Preparing", amount: "$36.00", date: "Today, 09:15 AM" },
    { id: "#ORD-5329", customer: "Michael Brown", status: "Cancelled", amount: "$18.75", date: "Yesterday, 7:45 PM" },
    { id: "#ORD-5328", customer: "Emily Davis", status: "Delivered", amount: "$29.25", date: "Yesterday, 6:20 PM" },
    { id: "#ORD-5327", customer: "David Wilson", status: "Delivered", amount: "$15.50", date: "Yesterday, 2:10 PM" },
  ]

  // Mock reviews
  const reviews = [
    { id: 1, customer: "John Smith", rating: 5, comment: "Great food and fast delivery!", date: "2 days ago" },
    {
      id: 2,
      customer: "Sarah Johnson",
      rating: 4,
      comment: "Food was good but delivery was a bit late.",
      date: "1 week ago",
    },
    {
      id: 3,
      customer: "Michael Brown",
      rating: 3,
      comment: "Average experience, nothing special.",
      date: "2 weeks ago",
    },
    {
      id: 4,
      customer: "Emily Davis",
      rating: 5,
      comment: "Excellent service and delicious food!",
      date: "3 weeks ago",
    },
    { id: 5, customer: "David Wilson", rating: 4, comment: "Good value for money.", date: "1 month ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            icon={<FaArrowLeft />}
            className="mr-4"
            onClick={() => navigate("/admin/stores")}
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{store.name}</h1>
            <div className="flex items-center mt-1">
              <Badge
                variant={store.status === "Active" ? "success" : store.status === "Pending" ? "warning" : "danger"}
                className="mr-2"
              >
                {store.status}
              </Badge>
              <div className="flex items-center text-yellow-500">
                <FaStar className="mr-1" />
                <span className="text-sm font-medium">{store.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {store.status === "Active" ? (
            <Button variant="danger" size="sm" icon={<FaBan />}>
              Suspend Store
            </Button>
          ) : (
            <Button variant="success" size="sm" icon={<FaCheck />} className="bg-green-500 hover:bg-green-600">
              Approve Store
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Store Profile */}
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500">
                {store.name.charAt(0)}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{store.name}</h3>
              <p className="text-sm text-gray-500">{store.description}</p>

              <div className="w-full mt-6 space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-sm text-gray-500">{store.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-sm text-gray-500">{store.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-500">{store.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaCalendarAlt className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Joined</p>
                    <p className="text-sm text-gray-500">{store.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Store Metrics">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaShoppingBag className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-700">Total Orders</span>
                </div>
                <span className="font-medium">{store.totalOrders}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaMoneyBillWave className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-700">Total Revenue</span>
                </div>
                <span className="font-medium">{store.totalRevenue}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaUsers className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-700">Commission Rate</span>
                </div>
                <span className="font-medium">{store.commission}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Tabs Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8">
              <button
                onClick={() => setActiveTab("menu")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "menu"
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <FaUtensils className="mr-2" />
                  Menu
                </div>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <FaShoppingBag className="mr-2" />
                  Orders
                </div>
              </button>

              <button
                onClick={() => setActiveTab("info")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "info"
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Info
                </div>
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "reviews"
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <FaStar className="mr-2" />
                  Reviews
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {/* Menu Tab */}
            {activeTab === "menu" && (
              <Card title="Menu Items">
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.price}</div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <Card title="Recent Orders">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
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
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                order.status === "Delivered"
                                  ? "success"
                                  : order.status === "Preparing"
                                    ? "warning"
                                    : "danger"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {/* Info Tab */}
            {activeTab === "info" && (
              <div className="space-y-6">
                <Card title="Business Information">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Description</h4>
                      <p className="mt-1 text-sm text-gray-500">{store.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Opening Hours</h4>
                      <p className="mt-1 text-sm text-gray-500">{store.openingHours}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Delivery Areas</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {store.deliveryAreas.map((area, index) => (
                          <Badge key={index} variant="default">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card title="Owner Information">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      {store.owner.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">{store.owner}</h4>
                      <p className="text-sm text-gray-500">{store.email}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <Card title="Customer Reviews">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            {review.customer.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900">{review.customer}</h4>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreDetail
