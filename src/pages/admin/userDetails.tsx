import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingBag,
  FaCreditCard,
  FaHistory,
  FaEdit,
  FaBan,
  FaArrowLeft,
  FaCheck,
  FaExclamationTriangle,
  FaUserCog,
  FaLock,
  FaUnlock,
  FaTrash,
  FaDownload,
  FaChartLine,
  FaTag,
  FaHeart,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaGlobe,
  FaClock,
  FaUserFriends,
  FaShieldAlt,
  FaClipboardList,
  FaRegStar,
  FaStar,
} from "react-icons/fa";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock user data
  const user = {
    id: parseInt(id || "1"),
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    dateOfBirth: "1985-06-15",
    joinDate: "Jan 15, 2023",
    status: "Active",
    profileImage: null,
    preferences: "No nuts, low sugar",
    totalOrders: 24,
    totalSpent: 1245.8,
    lastLogin: "May 25, 2025, 3:45 PM",
    membershipTier: "Gold",
    paymentMethods: [
      {
        id: 1,
        type: "Credit Card",
        last4: "4242",
        expiry: "05/26",
        isDefault: true,
      },
      {
        id: 2,
        type: "PayPal",
        email: "john.smith@example.com",
        isDefault: false,
      },
    ],
    recentOrders: [
      {
        id: 1001,
        date: "May 10, 2025",
        total: 78.5,
        status: "Delivered",
        items: 3,
      },
      {
        id: 1002,
        date: "Apr 28, 2025",
        total: 124.99,
        status: "Delivered",
        items: 5,
      },
      {
        id: 1003,
        date: "Apr 15, 2025",
        total: 56.75,
        status: "Delivered",
        items: 2,
      },
      {
        id: 1004,
        date: "Mar 30, 2025",
        total: 89.99,
        status: "Delivered",
        items: 4,
      },
    ],
    activityLog: [
      {
        id: 1,
        action: "Logged in",
        date: "May 25, 2025, 3:45 PM",
        ip: "192.168.1.1",
      },
      {
        id: 2,
        action: "Updated profile",
        date: "May 20, 2025, 2:30 PM",
        ip: "192.168.1.1",
      },
      {
        id: 3,
        action: "Changed password",
        date: "May 15, 2025, 11:20 AM",
        ip: "192.168.1.1",
      },
      {
        id: 4,
        action: "Placed order #1001",
        date: "May 10, 2025, 9:15 AM",
        ip: "192.168.1.1",
      },
    ],
    notes: [
      {
        id: 1,
        text: "Customer requested follow-up about upcoming promotions",
        date: "May 22, 2025",
        author: "Admin",
      },
      {
        id: 2,
        text: "Inquired about loyalty program benefits",
        date: "May 18, 2025",
        author: "Support",
      },
    ],
    ratings: 4.5,
    reviewsCount: 12,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Inactive":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Banned":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-500" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/users")}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-4"
          >
            <FaArrowLeft className="mr-2" />
            <span className="font-medium">Back to Users</span>
          </button>

          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-20 w-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-3xl shadow-lg border-2 border-white/30">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt={user.name}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div className="ml-5">
                  <h1 className="text-3xl font-bold flex items-center">
                    {user.name}
                    <span
                      className={`ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </h1>
                  <p className="text-purple-100 flex items-center mt-1">
                    <FaEnvelope className="mr-2" />
                    {user.email}
                  </p>
                  <p className="text-purple-100 flex items-center mt-1">
                    <FaPhone className="mr-2" />
                    {user.phone}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center backdrop-blur-sm border border-white/20"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate(`/admin/users/${user.id}/email`)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center backdrop-blur-sm border border-white/20"
                >
                  <FaEnvelope className="mr-2" />
                  Send Email
                </button>
                {user.status === "Active" ? (
                  <button
                    onClick={() => setShowConfirmation(true)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center backdrop-blur-sm border border-red-500/30"
                  >
                    <FaBan className="mr-2" />
                    Ban User
                  </button>
                ) : (
                  <button className="bg-emerald-500/20 hover:bg-emerald-500/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center backdrop-blur-sm border border-emerald-500/30">
                    <FaCheck className="mr-2" />
                    Activate User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaShoppingBag className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {user.totalOrders}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaCreditCard className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${user.totalSpent.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 rounded-lg">
                <FaCalendarAlt className="text-pink-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Member Since
                </p>
                <p className="text-2xl font-bold text-pink-600">
                  {user.joinDate}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-lg">
                <FaStar className="text-amber-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-amber-600 mr-2">
                    {user.ratings}
                  </p>
                  <div className="flex">{renderStars(user.ratings)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === "profile"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <FaUser className="mr-2" />
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === "orders"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <FaShoppingBag className="mr-2" />
              Order History
            </button>
            <button
              onClick={() => setActiveTab("payment")}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === "payment"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <FaCreditCard className="mr-2" />
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === "activity"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <FaHistory className="mr-2" />
              Activity Log
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-6 py-4 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === "notes"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              <FaClipboardList className="mr-2" />
              Notes
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          {activeTab === "profile" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaUser className="mr-2 text-purple-600" />
                  Personal Information
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="grid gap-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Full Name
                      </span>
                      <span className="text-gray-900">{user.name}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Email</span>
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Phone</span>
                      <span className="text-gray-900">{user.phone}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Date of Birth
                      </span>
                      <span className="text-gray-900">{user.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-600 font-medium">
                        Member Since
                      </span>
                      <span className="text-gray-900">{user.joinDate}</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                  <FaUserCog className="mr-2 text-purple-600" />
                  Account Settings
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="grid gap-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Account Status
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Last Login
                      </span>
                      <span className="text-gray-900">{user.lastLogin}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-600 font-medium">
                        Membership Tier
                      </span>
                      <span className="text-gray-900 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                        {user.membershipTier}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-purple-600" />
                  Address Information
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="grid gap-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Street Address
                      </span>
                      <span className="text-gray-900">{user.address}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">City</span>
                      <span className="text-gray-900">{user.city}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">State</span>
                      <span className="text-gray-900">{user.state}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">
                        Zip Code
                      </span>
                      <span className="text-gray-900">{user.zipCode}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-600 font-medium">Country</span>
                      <span className="text-gray-900">{user.country}</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                  <FaHeart className="mr-2 text-purple-600" />
                  Preferences
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="grid gap-4">
                    <div className="flex justify-between py-3">
                      <span className="text-gray-600 font-medium">
                        Dietary Preferences
                      </span>
                      <span className="text-gray-900">
                        {user.preferences || "None specified"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  <button className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                    <FaLock className="mr-2" />
                    Reset Password
                  </button>
                  <button className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                    <FaTrash className="mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaShoppingBag className="mr-2 text-purple-600" />
                Order History
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {user.recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            #{order.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {order.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {order.items} items
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            ${order.total.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center ml-auto">
                            <FaEye className="mr-1" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-center">
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                  <FaHistory className="mr-2" />
                  View All Orders
                </button>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCreditCard className="mr-2 text-purple-600" />
                Payment Methods
              </h2>

              <div className="grid gap-6">
                {user.paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        {method.type === "Credit Card" ? (
                          <FaCreditCard className="text-purple-600 text-xl" />
                        ) : (
                          <FaGlobe className="text-purple-600 text-xl" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-lg font-semibold text-gray-900">
                            {method.type}
                          </p>
                          {method.isDefault && (
                            <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {method.type === "Credit Card"
                            ? `•••• •••• •••• ${method.last4} | Expires ${method.expiry}`
                            : method.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors duration-200">
                        <FaEdit className="text-sm" />
                      </button>
                      <button className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors duration-200">
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                  <FaPlus className="mr-2" />
                  Add Payment Method
                </button>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaHistory className="mr-2 text-purple-600" />
                Activity Log
              </h2>

              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                <div className="space-y-6">
                  {user.activityLog.map((activity) => (
                    <div key={activity.id} className="relative pl-10">
                      <div className="absolute left-0 top-2 h-8 w-8 rounded-full bg-purple-100 border-4 border-white flex items-center justify-center">
                        <FaClock className="text-purple-600 text-sm" />
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <p className="font-medium text-gray-900">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.date}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          IP: {activity.ip}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                  <FaDownload className="mr-2" />
                  Export Activity Log
                </button>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <FaClipboardList className="mr-2 text-purple-600" />
                  Admin Notes
                </h2>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                  <FaPlus className="mr-2" />
                  Add Note
                </button>
              </div>

              <div className="space-y-4">
                {user.notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-gray-900">{note.text}</p>
                      <div className="flex gap-2">
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors duration-200">
                          <FaEdit className="text-sm" />
                        </button>
                        <button className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors duration-200">
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <FaUser className="mr-1" />
                      <span className="mr-3">{note.author}</span>
                      <FaCalendarAlt className="mr-1" />
                      <span>{note.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {user.notes.length === 0 && (
                <div className="text-center py-10">
                  <FaClipboardList className="mx-auto text-gray-300 text-4xl mb-3" />
                  <p className="text-gray-500">No notes have been added yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Ban User Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 border border-gray-100">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <FaExclamationTriangle className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Ban User Account
              </h3>
              <p className="text-gray-600 mt-2">
                Are you sure you want to ban this user? They will no longer be
                able to access their account or place orders.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle ban user logic here
                  setShowConfirmation(false);
                }}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium shadow-lg flex items-center justify-center"
              >
                <FaBan className="mr-2" />
                Ban User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
