"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaBan,
  FaCheck,
  FaEnvelope,
  FaTimes,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserSlash,
} from "react-icons/fa";

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    dateOfBirth: "",
    gender: "",
    preferences: "",
  });
  const [errors, setErrors] = useState({});

  // Mock data
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      status: "Active",
      orders: 24,
      lastOrder: "May 10, 2025",
      joinDate: "Jan 15, 2023",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      status: "Active",
      orders: 18,
      lastOrder: "May 8, 2025",
      joinDate: "Feb 20, 2023",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      status: "Inactive",
      orders: 5,
      lastOrder: "Mar 15, 2025",
      joinDate: "Mar 10, 2023",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      status: "Active",
      orders: 32,
      lastOrder: "May 12, 2025",
      joinDate: "Dec 5, 2022",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      status: "Banned",
      orders: 7,
      lastOrder: "Feb 28, 2025",
      joinDate: "Apr 18, 2023",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      status: "Active",
      orders: 15,
      lastOrder: "May 5, 2025",
      joinDate: "May 22, 2023",
    },
    {
      id: 7,
      name: "Robert Martinez",
      email: "robert.martinez@example.com",
      status: "Active",
      orders: 9,
      lastOrder: "Apr 30, 2025",
      joinDate: "Jun 14, 2023",
    },
    {
      id: 8,
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      status: "Inactive",
      orders: 3,
      lastOrder: "Jan 15, 2025",
      joinDate: "Jul 8, 2023",
    },
  ];

  // Filter users based on search term and status filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newUser.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!newUser.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!newUser.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!newUser.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(newUser.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!newUser.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Submitting new user:", newUser);
      setShowNewUserModal(false);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        dateOfBirth: "",
        gender: "",
        preferences: "",
      });
      alert("User created successfully!");
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center">
                  <FaUsers className="mr-3 text-white/90" />
                  User Management
                </h1>
                <p className="text-purple-100 text-lg">
                  Manage and monitor all your platform users
                </p>
              </div>
              <button
                onClick={() => setShowNewUserModal(true)}
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
              >
                <FaPlus className="mr-2" />
                Add New User
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">
                  {users.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FaUserCheck className="text-emerald-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {users.filter((user) => user.status === "Active").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-100">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaUserTimes className="text-yellow-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Inactive Users
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {users.filter((user) => user.status === "Inactive").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <FaUserSlash className="text-red-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Banned Users
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter((user) => user.status === "Banned").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaFilter className="text-purple-600" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="banned">Banned</option>
                </select>
              </div>

              <button className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 bg-gray-50 hover:bg-white hover:border-purple-300 transition-all duration-200">
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {user.orders}
                      </div>
                      <div className="text-xs text-gray-500">total orders</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {user.lastOrder}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {user.joinDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center">
                          <FaEnvelope className="mr-1" />
                          Email
                        </button>
                        <button
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center"
                        >
                          <FaEye className="mr-1" />
                          View
                        </button>
                        {user.status === "Active" && (
                          <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center">
                            <FaBan className="mr-1" />
                            Ban
                          </button>
                        )}
                        {user.status === "Banned" && (
                          <button className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center">
                            <FaCheck className="mr-1" />
                            Unban
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex flex-1 justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">{filteredUsers.length}</span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredUsers.length}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-purple-500 bg-purple-50 text-sm font-medium text-purple-600">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New User Modal */}
        {showNewUserModal && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-white/80 backdrop-blur-md"
            onClick={() => setShowNewUserModal(false)}
          >
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
              <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto border border-gray-100 transform transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="px-8 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <FaUser className="mr-3" />
                      Add New User
                    </h3>
                    <button
                      type="button"
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
                      onClick={() => setShowNewUserModal(false)}
                      aria-label="Close"
                    >
                      <FaTimes className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="text-purple-100 mt-2">
                    Create a new user account for the platform
                  </p>
                </div>

                {/* Modal Body */}
                <div className="p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaUser className="mr-2 text-purple-500" />
                          First Name*
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={newUser.firstName}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.firstName
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter first name"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaUser className="mr-2 text-purple-500" />
                          Last Name*
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={newUser.lastName}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.lastName
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter last name"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.lastName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaEnvelope className="mr-2 text-purple-500" />
                          Email Address*
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={newUser.email}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.email
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="example@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaPhone className="mr-2 text-purple-500" />
                          Phone Number*
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={newUser.phone}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.phone
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="(123) 456-7890"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="city"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-purple-500" />
                          City*
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={newUser.city}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.city
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter city"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="dateOfBirth"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaCalendarAlt className="mr-2 text-purple-500" />
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          value={newUser.dateOfBirth}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-purple-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="gender"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaUser className="mr-2 text-purple-500" />
                          Gender
                        </label>
                        <select
                          name="gender"
                          id="gender"
                          value={newUser.gender}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-purple-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="address"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-purple-500" />
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={newUser.address}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-purple-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder="Enter full address"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="preferences"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaUser className="mr-2 text-purple-500" />
                          Dietary Preferences
                        </label>
                        <textarea
                          name="preferences"
                          id="preferences"
                          rows={3}
                          value={newUser.preferences}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-purple-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder="Enter any dietary preferences or restrictions"
                        />
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowNewUserModal(false)}
                          className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
                        >
                          <FaPlus className="mr-2" />
                          Create User
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
