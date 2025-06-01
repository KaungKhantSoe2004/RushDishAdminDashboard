"use client";

import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaStore,
  FaMotorcycle,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock order data
  const order = {
    id: `#ORD-${id}`,
    customer: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      email: "john.smith@example.com",
    },
    store: {
      name: "Burger King",
      address: "456 Broadway, New York, NY 10013",
      phone: "+1 (555) 987-6543",
    },
    rider: {
      name: "Michael Brown",
      phone: "+1 (555) 765-4321",
      vehicle: "Motorcycle",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      totalDeliveries: 1247,
      onTimeRate: 96,
      joinDate: "January 2023",
      vehicleDetails: {
        model: "Honda CB300R",
        plate: "NYC-4567",
        color: "Black",
      },
      currentLocation: "2 blocks away from delivery address",
      estimatedArrival: "3 minutes",
    },
    items: [
      { name: "Whopper Burger", quantity: 1, price: "$5.99" },
      { name: "Fries (Large)", quantity: 1, price: "$2.99" },
      { name: "Coca-Cola", quantity: 1, price: "$1.99" },
    ],
    status: "Delivered",
    amount: "$10.97",
    tax: "$0.98",
    deliveryFee: "$2.50",
    tip: "$1.00",
    total: "$15.45",
    paymentMethod: "Credit Card",
    orderDate: "May 10, 2025, 10:30 AM",
    deliveryTime: "May 10, 2025, 11:05 AM",
    timeline: [
      { status: "Order Placed", time: "10:30 AM", date: "May 10, 2025" },
      { status: "Order Accepted", time: "10:35 AM", date: "May 10, 2025" },
      { status: "Preparing", time: "10:40 AM", date: "May 10, 2025" },
      { status: "Ready for Pickup", time: "10:50 AM", date: "May 10, 2025" },
      { status: "Picked Up", time: "10:55 AM", date: "May 10, 2025" },
      { status: "Delivered", time: "11:05 AM", date: "May 10, 2025" },
    ],
  };

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
            onClick={() => navigate("/admin/orders")}
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Order {order.id}
            </h1>
            <div className="flex items-center mt-1">
              <Badge
                variant={
                  order.status === "Delivered"
                    ? "success"
                    : order.status === "Cancelled"
                    ? "danger"
                    : "warning"
                }
                className="mr-2"
              >
                {order.status}
              </Badge>
              <div className="flex items-center text-gray-500 text-sm">
                <FaCalendarAlt className="mr-1" size={12} />
                <span>{order.orderDate}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Print Receipt
          </Button>
          <Button variant="danger" size="sm" icon={<FaExclamationTriangle />}>
            Issue Refund
          </Button>
        </div>
      </div>

      {/* Order Timeline */}
      <Card title="Order Timeline">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {order.timeline.map((event, index) => (
              <div key={index} className="flex items-start">
                <div
                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                    index === order.timeline.length - 1
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      index === order.timeline.length - 1
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }`}
                  ></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {event.status}
                  </h3>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <FaClock className="mr-1" />
                    <span>
                      {event.time}, {event.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer & Rider Info */}
        <div className="space-y-6">
          <Card title="Customer Information">
            <div className="space-y-4">
              <div className="flex items-start">
                <FaUser className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-sm text-gray-500">{order.customer.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm text-gray-500">
                    {order.customer.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-sm text-gray-500">
                    {order.customer.address}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Delivery Agent Profile">
            <div className="space-y-6">
              {/* Agent Header */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={order.rider.photo || "/placeholder.svg"}
                    alt={order.rider.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {order.rider.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(order.rider.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {order.rider.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<FaPhone />}
                  className="flex-1"
                >
                  Call Agent
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Send Message
                </Button>
              </div>

              {/* Agent Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {order.rider.totalDeliveries}
                  </p>
                  <p className="text-xs text-gray-500">Total Deliveries</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {order.rider.onTimeRate}%
                  </p>
                  <p className="text-xs text-gray-500">On-Time Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {order.rider.rating}
                  </p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMotorcycle className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Vehicle</p>
                    <p className="text-sm text-gray-500">
                      {order.rider.vehicleDetails.model}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.rider.vehicleDetails.color} •{" "}
                      {order.rider.vehicleDetails.plate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Current Location
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.rider.currentLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Estimated Arrival
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      {order.rider.estimatedArrival}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaCalendarAlt className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Agent Since
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.rider.joinDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Delivery Time
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.deliveryTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Agent Actions */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Track Location
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Restaurant Information">
            <div className="space-y-4">
              <div className="flex items-start">
                <FaStore className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Store</p>
                  <p className="text-sm text-gray-500">{order.store.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-sm text-gray-500">{order.store.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm text-gray-500">{order.store.phone}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Order Items & Payment */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Order Items">
            <div className="overflow-x-auto">
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
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Payment Information">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  {order.amount}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="text-sm font-medium text-gray-900">{order.tax}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Delivery Fee</p>
                <p className="text-sm font-medium text-gray-900">
                  {order.deliveryFee}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Tip</p>
                <p className="text-sm font-medium text-gray-900">{order.tip}</p>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-bold text-gray-900">
                  {order.total}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-start">
                  <FaMoneyBillWave className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Payment Method
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Admin Actions */}
          <Card title="Admin Actions">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  icon={<FaMotorcycle />}
                >
                  Reassign Rider
                </Button>
                <Button variant="outline" className="flex-1" icon={<FaStore />}>
                  Contact Restaurant
                </Button>
                <Button variant="outline" className="flex-1" icon={<FaUser />}>
                  Contact Customer
                </Button>
              </div>
              <div className="pt-3 border-t">
                <Button
                  variant="danger"
                  fullWidth
                  icon={<FaExclamationTriangle />}
                >
                  Cancel Order & Issue Refund
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
