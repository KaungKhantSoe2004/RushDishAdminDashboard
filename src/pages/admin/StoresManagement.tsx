"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaCheck,
  FaBan,
  FaTimes,
  FaStore,
  FaStar,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const StoresManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewStoreModal, setShowNewStoreModal] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    city: "",
    owner: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  // Mock data
  const stores = [
    {
      id: 1,
      name: "Burger King",
      city: "New York",
      status: "Active",
      owner: "John Smith",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Pizza Hut",
      city: "Los Angeles",
      status: "Active",
      owner: "Sarah Johnson",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Taco Bell",
      city: "Chicago",
      status: "Pending",
      owner: "Michael Brown",
      rating: 0,
    },
    {
      id: 4,
      name: "KFC",
      city: "Houston",
      status: "Active",
      owner: "Emily Davis",
      rating: 3.8,
    },
    {
      id: 5,
      name: "Subway",
      city: "Phoenix",
      status: "Suspended",
      owner: "David Wilson",
      rating: 3.5,
    },
    {
      id: 6,
      name: "McDonald's",
      city: "Philadelphia",
      status: "Active",
      owner: "Lisa Anderson",
      rating: 4.0,
    },
    {
      id: 7,
      name: "Wendy's",
      city: "San Antonio",
      status: "Pending",
      owner: "Robert Martinez",
      rating: 0,
    },
    {
      id: 8,
      name: "Chipotle",
      city: "San Diego",
      status: "Active",
      owner: "Jennifer Taylor",
      rating: 4.3,
    },
    {
      id: 9,
      name: "Domino's",
      city: "Dallas",
      status: "Suspended",
      owner: "James Thomas",
      rating: 2.9,
    },
    {
      id: 10,
      name: "Starbucks",
      city: "San Jose",
      status: "Active",
      owner: "Patricia Garcia",
      rating: 4.1,
    },
  ];

  // Filter stores based on search term and status filter
  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      store.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore({
      ...newStore,
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

    if (!newStore.name.trim()) newErrors.name = "Store name is required";
    if (!newStore.city.trim()) newErrors.city = "City is required";
    if (!newStore.owner.trim()) newErrors.owner = "Owner name is required";
    if (!newStore.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newStore.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!newStore.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(newStore.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to your API
      console.log("Submitting new store:", newStore);

      // For demo purposes, we'll just close the modal
      setShowNewStoreModal(false);

      // Reset the form
      setNewStore({
        name: "",
        city: "",
        owner: "",
        address: "",
        phone: "",
        email: "",
        description: "",
      });

      // Show success message (in a real app, you might use a toast notification)
      alert("Store created successfully!");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center">
                  <FaStore className="mr-3 text-white/90" />
                  Stores Management
                </h1>
                <p className="text-indigo-100 text-lg">
                  Manage and monitor all your stores in one place
                </p>
              </div>
              <button
                onClick={() => setShowNewStoreModal(true)}
                className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
              >
                <FaPlus className="mr-2" />
                Add New Store
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FaCheck className="text-emerald-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Stores
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {stores.filter((s) => s.status === "Active").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-lg">
                <FaFilter className="text-amber-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-amber-600">
                  {stores.filter((s) => s.status === "Pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <FaBan className="text-red-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {stores.filter((s) => s.status === "Suspended").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaStore className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Stores
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {stores.length}
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
                placeholder="Search stores, cities, or owners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FaFilter className="text-indigo-600" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <button className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 bg-gray-50 hover:bg-white hover:border-indigo-300 transition-all duration-200">
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Stores Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Store Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStores.map((store, index) => (
                  <tr
                    key={store.id}
                    className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {store.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {store.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Store #{store.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                        {store.city}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          store.status
                        )}`}
                      >
                        {store.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaUser className="mr-2 text-gray-400" />
                        {store.owner}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {store.rating > 0 ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {renderStars(store.rating)}
                          </div>
                          <span className="text-sm font-medium text-gray-600">
                            {store.rating}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Not rated</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {store.status === "Pending" && (
                          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center">
                            <FaCheck className="mr-1" />
                            Approve
                          </button>
                        )}
                        {store.status === "Active" && (
                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center">
                            <FaBan className="mr-1" />
                            Suspend
                          </button>
                        )}
                        {store.status === "Suspended" && (
                          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center">
                            <FaCheck className="mr-1" />
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/admin/stores/${store.id}`)}
                          className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center"
                        >
                          <FaEye className="mr-1" />
                          View
                        </button>
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
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">20</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
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

        {/* New Store Modal */}
        {showNewStoreModal && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-white/60 backdrop-blur-sm"
            onClick={() => setShowNewStoreModal(false)}
          >
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
              <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto border border-gray-100 transform transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <FaStore className="mr-3" />
                      Add New Store
                    </h3>
                    <button
                      type="button"
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
                      onClick={() => setShowNewStoreModal(false)}
                      aria-label="Close"
                    >
                      <FaTimes className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="text-indigo-100 mt-2">
                    Fill in the details to add a new store to your network
                  </p>
                </div>

                {/* Modal Body */}
                <div className="p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaStore className="mr-2 text-indigo-500" />
                          Store Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={newStore.name}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.name
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-indigo-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter store name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="city"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                          City*
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={newStore.city}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.city
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-indigo-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
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
                          htmlFor="owner"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaUser className="mr-2 text-indigo-500" />
                          Owner Name*
                        </label>
                        <input
                          type="text"
                          name="owner"
                          id="owner"
                          value={newStore.owner}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.owner
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-indigo-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter owner name"
                        />
                        {errors.owner && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.owner}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaEnvelope className="mr-2 text-indigo-500" />
                          Email*
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={newStore.email}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.email
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-indigo-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
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
                          <FaPhone className="mr-2 text-indigo-500" />
                          Phone Number*
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={newStore.phone}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.phone
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-indigo-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="(123) 456-7890"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="address"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={newStore.address}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-indigo-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder="Enter full address"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="description"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaStore className="mr-2 text-indigo-500" />
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows={3}
                          value={newStore.description}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-indigo-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder="Enter store description"
                        />
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowNewStoreModal(false)}
                          className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
                        >
                          <FaPlus className="mr-2" />
                          Create Store
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

export default StoresManagement;
