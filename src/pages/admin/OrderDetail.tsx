"use client"

import { useParams, useNavigate } from "react-router-dom"
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
} from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

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
  }

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
            <h1 className="text-2xl font-bold text-gray-800">Order {order.id}</h1>
            <div className="flex items-center mt-1">
              <Badge
                variant={order.status === "Delivered" ? "success" : order.status === "Cancelled" ? "danger" : "warning"}
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
                    index === order.timeline.length - 1 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      index === order.timeline.length - 1 ? "bg-green-600" : "bg-gray-600"
                    }`}
                  ></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{event.status}</h3>
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
                  <p className="text-sm text-gray-500">{order.customer.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-sm text-gray-500">{order.customer.address}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Delivery Information">
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMotorcycle className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Rider</p>
                  <p className="text-sm text-gray-500">{order.rider.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm text-gray-500">{order.rider.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaMotorcycle className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Vehicle</p>
                  <p className="text-sm text-gray-500">{order.rider.vehicle}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaClock className="mt-1 mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Delivery Time</p>
                  <p className="text-sm text-gray-500">{order.deliveryTime}</p>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.price}</td>
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
                <p className="text-sm font-medium text-gray-900">{order.amount}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="text-sm font-medium text-gray-900">{order.tax}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Delivery Fee</p>
                <p className="text-sm font-medium text-gray-900">{order.deliveryFee}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Tip</p>
                <p className="text-sm font-medium text-gray-900">{order.tip}</p>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-base font-bold text-gray-900">{order.total}</p>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-start">
                  <FaMoneyBillWave className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Payment Method</p>
                    <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Admin Actions */}
          <Card title="Admin Actions">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1" icon={<FaMotorcycle />}>
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
                <Button variant="danger" fullWidth icon={<FaExclamationTriangle />}>
                  Cancel Order & Issue Refund
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
