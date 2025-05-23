"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaMapMarkerAlt,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMotorcycle,
  FaStar,
  FaDollarSign,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const DeliveryStaffManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewStaffModal, setShowNewStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    zone: "",
    vehicleType: "",
    licenseNumber: "",
    emergencyContact: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  // Mock data
  const deliveryStaff = [
    {
      id: 1,
      name: "John Smith",
      zone: "Manhattan",
      status: "Online",
      earningsToday: "$78.50",
      completedToday: 6,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      zone: "Brooklyn",
      status: "Online",
      earningsToday: "$65.25",
      completedToday: 5,
      rating: 4.5,
    },
    {
      id: 3,
      name: "Michael Brown",
      zone: "Queens",
      status: "Offline",
      earningsToday: "$0.00",
      completedToday: 0,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Emily Davis",
      zone: "Bronx",
      status: "Online",
      earningsToday: "$42.75",
      completedToday: 3,
      rating: 4.9,
    },
    {
      id: 5,
      name: "David Wilson",
      zone: "Staten Island",
      status: "Offline",
      earningsToday: "$0.00",
      completedToday: 0,
      rating: 4.6,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      zone: "Manhattan",
      status: "Online",
      earningsToday: "$91.00",
      completedToday: 7,
      rating: 4.4,
    },
    {
      id: 7,
      name: "Robert Martinez",
      zone: "Brooklyn",
      status: "Online",
      earningsToday: "$52.50",
      completedToday: 4,
      rating: 4.3,
    },
    {
      id: 8,
      name: "Jennifer Taylor",
      zone: "Queens",
      status: "Offline",
      earningsToday: "$0.00",
      completedToday: 0,
      rating: 4.7,
    },
  ];

  // Filter delivery staff based on search term and status filter
  const filteredStaff = deliveryStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.zone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      staff.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Count online and offline staff
  const onlineCount = deliveryStaff.filter(
    (staff) => staff.status === "Online"
  ).length;
  const offlineCount = deliveryStaff.filter(
    (staff) => staff.status === "Offline"
  ).length;
  const totalEarnings = deliveryStaff
    .reduce(
      (sum, staff) => sum + parseFloat(staff.earningsToday.replace("$", "")),
      0
    )
    .toFixed(2);
  const totalDeliveries = deliveryStaff.reduce(
    (sum, staff) => sum + staff.completedToday,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
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

    if (!newStaff.name.trim()) newErrors.name = "Name is required";
    if (!newStaff.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newStaff.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!newStaff.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(newStaff.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!newStaff.zone.trim()) newErrors.zone = "Zone is required";
    if (!newStaff.vehicleType.trim())
      newErrors.vehicleType = "Vehicle type is required";
    if (!newStaff.licenseNumber.trim())
      newErrors.licenseNumber = "License number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Submitting new staff:", newStaff);
      setShowNewStaffModal(false);
      setNewStaff({
        name: "",
        email: "",
        phone: "",
        zone: "",
        vehicleType: "",
        licenseNumber: "",
        emergencyContact: "",
        address: "",
      });
      alert("Delivery staff added successfully!");
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
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center">
                  <FaMotorcycle className="mr-3 text-white/90" />
                  Delivery Staff Management
                </h1>
                <p className="text-emerald-100 text-lg">
                  Monitor and manage your delivery team performance
                </p>
              </div>
              <button
                onClick={() => setShowNewStaffModal(true)}
                className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
              >
                <FaPlus className="mr-2" />
                Add New Staff
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
                  Online Staff
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {onlineCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-lg">
                <FaClock className="text-gray-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Offline Staff
                </p>
                <p className="text-2xl font-bold text-gray-600">
                  {offlineCount}
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
                  Today's Earnings
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalEarnings}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaMotorcycle className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Deliveries
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalDeliveries}
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
                placeholder="Search staff or zones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FaFilter className="text-emerald-600" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                >
                  <option value="all">All Statuses</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <button className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 bg-gray-50 hover:bg-white hover:border-emerald-300 transition-all duration-200">
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Staff Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Zone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Today's Earnings
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Completed
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
                {filteredStaff.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {staff.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {staff.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: #{staff.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                        {staff.zone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          staff.status === "Online"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-green-600">
                        {staff.earningsToday}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {staff.completedToday} orders
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex">{renderStars(staff.rating)}</div>
                        <span className="text-sm font-medium text-gray-600">
                          {staff.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/delivery/${staff.id}`)
                          }
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center"
                        >
                          <FaEye className="mr-1" />
                          View
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/delivery/assign-area/${staff.id}`)
                          }
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center"
                        >
                          <FaMapMarkerAlt className="mr-1" />
                          Assign Area
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
                    <span className="font-medium">{filteredStaff.length}</span>{" "}
                    of{" "}
                    <span className="font-medium">{filteredStaff.length}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-emerald-500 bg-emerald-50 text-sm font-medium text-emerald-600">
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

        {/* New Staff Modal */}
        {showNewStaffModal && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-white/80 backdrop-blur-md"
            onClick={() => setShowNewStaffModal(false)}
          >
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
              <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto border border-gray-100 transform transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="px-8 py-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <FaMotorcycle className="mr-3" />
                      Add New Delivery Staff
                    </h3>
                    <button
                      type="button"
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
                      onClick={() => setShowNewStaffModal(false)}
                      aria-label="Close"
                    >
                      <FaTimes className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="text-emerald-100 mt-2">
                    Add a new delivery staff member to your team
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
                          <FaUser className="mr-2 text-emerald-500" />
                          Full Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={newStaff.name}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.name
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter full name"
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
                          htmlFor="email"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaEnvelope className="mr-2 text-emerald-500" />
                          Email*
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={newStaff.email}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.email
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
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
                          <FaPhone className="mr-2 text-emerald-500" />
                          Phone Number*
                        </label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={newStaff.phone}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.phone
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
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
                          htmlFor="zone"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                          Delivery Zone*
                        </label>
                        <select
                          name="zone"
                          id="zone"
                          value={newStaff.zone}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.zone
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                        >
                          <option value="">Select a zone</option>
                          <option value="Manhattan">Manhattan</option>
                          <option value="Brooklyn">Brooklyn</option>
                          <option value="Queens">Queens</option>
                          <option value="Bronx">Bronx</option>
                          <option value="Staten Island">Staten Island</option>
                        </select>
                        {errors.zone && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.zone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="vehicleType"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMotorcycle className="mr-2 text-emerald-500" />
                          Vehicle Type*
                        </label>
                        <select
                          name="vehicleType"
                          id="vehicleType"
                          value={newStaff.vehicleType}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.vehicleType
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                        >
                          <option value="">Select vehicle type</option>
                          <option value="Motorcycle">Motorcycle</option>
                          <option value="Bicycle">Bicycle</option>
                          <option value="Car">Car</option>
                          <option value="Scooter">Scooter</option>
                        </select>
                        {errors.vehicleType && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.vehicleType}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="licenseNumber"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaUser className="mr-2 text-emerald-500" />
                          License Number*
                        </label>
                        <input
                          type="text"
                          name="licenseNumber"
                          id="licenseNumber"
                          value={newStaff.licenseNumber}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.licenseNumber
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter license number"
                        />
                        {errors.licenseNumber && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.licenseNumber}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="emergencyContact"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaPhone className="mr-2 text-emerald-500" />
                          Emergency Contact
                        </label>
                        <input
                          type="text"
                          name="emergencyContact"
                          id="emergencyContact"
                          value={newStaff.emergencyContact}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-emerald-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder="Emergency contact number"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="address"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={newStaff.address}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-emerald-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder="Enter full address"
                        />
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowNewStaffModal(false)}
                          className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
                        >
                          <FaPlus className="mr-2" />
                          Add Staff Member
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

export default DeliveryStaffManagement;
