"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaStar,
  FaDollarSign,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaHistory,
  FaChartLine,
} from "react-icons/fa";

const DeliveryView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the delivery staff member
  const staffMember = {
    id: id,
    name: "John Smith",
    email: "john.smith@delivery.com",
    phone: "+1 (555) 123-4567",
    zone: "Manhattan",
    status: "Online",
    vehicleType: "Motorcycle",
    licenseNumber: "MC123456",
    joinDate: "2023-01-15",
    address: "123 Main St, New York, NY 10001",
    emergencyContact: "+1 (555) 987-6543",
    rating: 4.8,
    totalDeliveries: 1247,
    totalEarnings: "$12,450.75",
    todayEarnings: "$78.50",
    todayDeliveries: 6,
    avgDeliveryTime: "28 mins",
    completionRate: "98.5%",
  };

  const recentDeliveries = [
    {
      id: "DEL001",
      orderNumber: "#ORD-2024-001",
      customer: "Alice Johnson",
      restaurant: "Pizza Palace",
      amount: "$24.50",
      time: "2:30 PM",
      status: "Delivered",
      duration: "25 mins",
    },
    {
      id: "DEL002",
      orderNumber: "#ORD-2024-002",
      customer: "Bob Wilson",
      restaurant: "Burger House",
      amount: "$18.75",
      time: "1:45 PM",
      status: "Delivered",
      duration: "22 mins",
    },
    {
      id: "DEL003",
      orderNumber: "#ORD-2024-003",
      customer: "Carol Davis",
      restaurant: "Sushi Express",
      amount: "$32.00",
      time: "12:15 PM",
      status: "Delivered",
      duration: "35 mins",
    },
  ];

  const performanceData = [
    { month: "Jan", earnings: 2100, deliveries: 156 },
    { month: "Feb", earnings: 2350, deliveries: 178 },
    { month: "Mar", earnings: 2200, deliveries: 165 },
    { month: "Apr", earnings: 2450, deliveries: 189 },
    { month: "May", earnings: 2600, deliveries: 201 },
    { month: "Jun", earnings: 2750, deliveries: 215 },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/delivery")}
            className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to Delivery Staff
          </button>

          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold mr-6">
                  {staffMember.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {staffMember.name}
                  </h1>
                  <p className="text-emerald-100 text-lg">
                    Delivery Staff Member
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        staffMember.status === "Online"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {staffMember.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center">
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FaCheckCircle className="text-emerald-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Deliveries
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {staffMember.totalDeliveries}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaDollarSign className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {staffMember.totalEarnings}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-100">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaStar className="text-yellow-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-yellow-600 mr-2">
                    {staffMember.rating}
                  </p>
                  <div className="flex">{renderStars(staffMember.rating)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg Delivery Time
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {staffMember.avgDeliveryTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: FaUser },
                {
                  id: "deliveries",
                  label: "Recent Deliveries",
                  icon: FaHistory,
                },
                { id: "performance", label: "Performance", icon: FaChartLine },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{staffMember.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{staffMember.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{staffMember.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{staffMember.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Work Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Delivery Zone</p>
                        <p className="font-medium">{staffMember.zone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaMotorcycle className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Vehicle Type</p>
                        <p className="font-medium">{staffMember.vehicleType}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">License Number</p>
                        <p className="font-medium">
                          {staffMember.licenseNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Emergency Contact
                        </p>
                        <p className="font-medium">
                          {staffMember.emergencyContact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "deliveries" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Deliveries
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Restaurant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentDeliveries.map((delivery) => (
                        <tr key={delivery.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {delivery.orderNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {delivery.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {delivery.restaurant}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {delivery.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {delivery.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {delivery.duration}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {delivery.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                      Monthly Earnings
                    </h4>
                    <div className="space-y-3">
                      {performanceData.map((data) => (
                        <div
                          key={data.month}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-600">
                            {data.month}
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            ${data.earnings}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                      Monthly Deliveries
                    </h4>
                    <div className="space-y-3">
                      {performanceData.map((data) => (
                        <div
                          key={data.month}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-600">
                            {data.month}
                          </span>
                          <span className="text-sm font-medium text-blue-600">
                            {data.deliveries}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryView;
