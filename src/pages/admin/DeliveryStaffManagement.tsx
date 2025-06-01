"use client";

import { useEffect, useState } from "react";
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
  FaUpload,
  FaLock,
} from "react-icons/fa";
import checkAuth, { type UserType } from "../../helpers/checkAuth";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import {
  setDeliveries,
  setDeliveryPageCounts,
} from "../../features/admin/deliverySlice";
import InternalServerError from "../error/500";
import ProtectRoute from "../../helpers/protectRoute";

const DeliveryStaffManagement = () => {
  const [isServerError, setIsServerError] = useState(false);
  const [pages, setPages] = useState([1]);
  const [page, setPage] = useState(1);
  const backendDomainName: string = "http://localhost:1500";
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewStaffModal, setShowNewStaffModal] = useState(false);
  const ReduxDelivery = useSelector((store: RootState) => store.delivery);
  const [loading, setLoading] = useState(false);
  const [onlineCount, setOnlineCount] = useState(ReduxDelivery.online_deli);
  const [offlineCount, setOfflineCount] = useState(ReduxDelivery.offline_deli);
  const [totalDeliveries, setTotalDeliveries] = useState(
    ReduxDelivery.total_deli
  );
  const [totalEarnings, setTotalEarnings] = useState(
    ReduxDelivery.totalEarnings
  );
  const dispatch = useDispatch();
  const [profilePreview, setProfilePreview] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone_one: "",
    phone_two: "",
    address_one: "",
    address_two: "",
    email: "",
    profile: null,
    vehicle_type: "",
    vehicle_number: "",
    rating: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Mock data
  const [deliveryStaff, setDeliveryStaff] = useState<[]>(
    ReduxDelivery.deliveries
  );

  // Filter delivery staff based on search term and status filter
  const filteredStaff = deliveryStaff.filter((staff) => {
    const matchesStatus =
      statusFilter === "all" ||
      staff.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesStatus;
  });

  // Count online and offline staff

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          profile: "Please select a valid image file (JPEG, PNG, GIF)",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          profile: "File size must be less than 5MB",
        });
        return;
      }

      setNewStaff({
        ...newStaff,
        profile: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.profile) {
        setErrors({
          ...errors,
          profile: null,
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!newStaff.name.trim()) {
      newErrors.name = "Name is required";
    } else if (newStaff.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Phone one validation
    if (!newStaff.phone_one.trim()) {
      newErrors.phone_one = "Primary phone number is required";
    } else if (
      !/^[0-9+\-\s()]{10,15}$/.test(newStaff.phone_one.replace(/\s/g, ""))
    ) {
      newErrors.phone_one = "Please enter a valid phone number";
    }

    // Phone two validation (optional but if provided, must be valid)
    if (
      newStaff.phone_two.trim() &&
      !/^[0-9+\-\s()]{10,15}$/.test(newStaff.phone_two.replace(/\s/g, ""))
    ) {
      newErrors.phone_two = "Please enter a valid phone number";
    }

    // Address one validation
    if (!newStaff.address_one.trim()) {
      newErrors.address_one = "Primary address is required";
    } else if (newStaff.address_one.trim().length < 10) {
      newErrors.address_one = "Address must be at least 10 characters";
    }

    // Address two is optional, no validation needed

    // Email validation
    if (!newStaff.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newStaff.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Profile image validation
    if (!newStaff.profile) {
      newErrors.profile = "Profile image is required";
    }

    // Vehicle type validation
    if (!newStaff.vehicle_type.trim()) {
      newErrors.vehicle_type = "Vehicle type is required";
    }

    // Vehicle number validation
    if (!newStaff.vehicle_number.trim()) {
      newErrors.vehicle_number = "Vehicle number is required";
    } else if (newStaff.vehicle_number.trim().length < 3) {
      newErrors.vehicle_number = "Vehicle number must be at least 3 characters";
    }

    // Rating validation
    if (!newStaff.rating.trim()) {
      newErrors.rating = "Rating is required";
    } else {
      const rating = Number.parseFloat(newStaff.rating);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        newErrors.rating = "Rating must be between 1 and 5";
      }
    }

    // Password validation
    if (!newStaff.password.trim()) {
      newErrors.password = "Password is required";
    } else if (newStaff.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newStaff.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        console.log("Submitting new staff:", newStaff);
        const postForm = new FormData();
        postForm.append("name", newStaff.name);
        postForm.append("email", newStaff.email);
        postForm.append("phone_one", newStaff.phone_one);
        postForm.append("phone_two", newStaff.phone_two);
        postForm.append("address_one", newStaff.address_one);
        postForm.append("address_two", newStaff.address_two);
        postForm.append("vehicle_type", newStaff.vehicle_type);
        postForm.append("vehicle_number", newStaff.vehicle_number);
        postForm.append("rating", newStaff.rating);
        postForm.append("password", newStaff.password);
        if (newStaff.profile) {
          postForm.append("profile", newStaff.profile);
        }
        // console.log(postForm);
        const response = await axios.post(
          `${backendDomainName}/api/admin/addDelivery`,
          postForm,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200 || response.status === 201) {
          setShowNewStaffModal(false);
          setNewStaff({
            name: "",
            phone_one: "",
            phone_two: "",
            address_one: "",
            address_two: "",
            email: "",
            profile: null,
            vehicle_type: "",
            vehicle_number: "",
            rating: "",
            password: "",
          });
          setProfilePreview(null);
          alert("Delivery staff added successfully!");
        } else {
          if (response.status < 600) {
            alert("Error: " + response.data.message);
          }
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An Error occured while adding new agent");
      }
      setErrors({
        form: "An error occured while adding new staff. Pleast try again",
      });
    }
  };

  const handleSearch = () => {
    fetchApi(searchTerm, "");
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
  const fetchApi = async (mySearchTerm?: string, paginationNumber?: string) => {
    try {
      setLoading(true);

      if (!ProtectRoute()) {
        navigate("/login");
        return;
      }
      let uri: string;
      if (mySearchTerm == "" && paginationNumber == "") {
        uri = `${backendDomainName}/api/admin/delivery`;
      } else if (paginationNumber !== "" && paginationNumber !== undefined) {
        uri = `${backendDomainName}/api/admin/delivery?page=${paginationNumber}`;
      } else {
        uri = `${backendDomainName}/api/admin/delivery?search=${mySearchTerm}`;
      }
      const response = await axios.get(uri, {
        withCredentials: true,
      });
      console.log(response.data);
      dispatch(setDeliveries(response.data.data));
      dispatch(setDeliveryPageCounts(response.data.counts));

      setOnlineCount(response.data.counts.online_deli);
      setOfflineCount(response.data.counts.offline_deli);
      setTotalDeliveries(response.data.counts.total_deli);
      setTotalEarnings(response.data.counts.totalEarnings);
      setDeliveryStaff(response.data.data);
      setPages(response.data.pagination.pages);
      setPage(response.data.pagination.page);
      setLoading(false);
    } catch (error) {
      setIsServerError(true);
      setErrors(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApi("", "");
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading store details...</p>
        </div>
      </div>
    );
  }
  return isServerError ? (
    <InternalServerError />
  ) : (
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
                  Ks {Number(totalEarnings)}
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
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-96">
                <input
                  type="text"
                  placeholder="Search staff or zones..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value == "") {
                      fetchApi("", "");
                    }
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center whitespace-nowrap"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
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
                        {staff.profile ? (
                          <img
                            src={
                              staff.profile
                                ? `http://localhost:1500/${staff.profile}`
                                : "/placeholder.svg"
                            }
                            alt={`${staff.name} profile`}
                            className="h-12 w-12 flex-shrink-0 rounded-xl object-cover shadow-lg border-2 border-emerald-200"
                            onError={(e) => {
                              // Fallback to default avatar if image fails to load
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        {!staff.profile && (
                          <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {staff.name.charAt(0)}
                          </div>
                        )}
                        {staff.profile && (
                          <div
                            className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 items-center justify-center text-white font-bold text-lg shadow-lg"
                            style={{ display: "none" }}
                          >
                            {staff.name.charAt(0)}
                          </div>
                        )}
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
                          staff.account_status === "Online"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                      >
                        {staff.account_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-green-600">
                        {staff.today_profit}
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
                            navigate(`/admin/delivery/view/${staff.id}`)
                          }
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center"
                        >
                          <FaEye className="mr-1" />
                          View
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/delivery/area/${staff.id}`)
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
                    <span className="font-medium">{10}</span> of{" "}
                    <span className="font-medium">{totalDeliveries}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    {pages?.map((pageNumber, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          fetchApi("", pageNumber.toString());
                        }}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium  hover:bg-gray-500 ${
                          pageNumber == page
                            ? "bg-blue-800 text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
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
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto border border-gray-100 transform transition-all max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="px-8 py-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-t-2xl sticky top-0 z-10">
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
                      {/* Name */}
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

                      {/* Phone One */}
                      <div className="space-y-2">
                        <label
                          htmlFor="phone_one"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaPhone className="mr-2 text-emerald-500" />
                          Primary Phone*
                        </label>
                        <input
                          type="text"
                          name="phone_one"
                          id="phone_one"
                          value={newStaff.phone_one}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.phone_one
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter primary phone number"
                        />
                        {errors.phone_one && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.phone_one}
                          </p>
                        )}
                      </div>

                      {/* Phone Two */}
                      <div className="space-y-2">
                        <label
                          htmlFor="phone_two"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaPhone className="mr-2 text-emerald-500" />
                          Secondary Phone
                        </label>
                        <input
                          type="text"
                          name="phone_two"
                          id="phone_two"
                          value={newStaff.phone_two}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.phone_two
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter secondary phone number (optional)"
                        />
                        {errors.phone_two && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.phone_two}
                          </p>
                        )}
                      </div>

                      {/* Email */}
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

                      {/* Address One */}
                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="address_one"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                          Primary Address*
                        </label>
                        <input
                          type="text"
                          name="address_one"
                          id="address_one"
                          value={newStaff.address_one}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.address_one
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter primary address"
                        />
                        {errors.address_one && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.address_one}
                          </p>
                        )}
                      </div>

                      {/* Address Two */}
                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="address_two"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                          Secondary Address
                        </label>
                        <input
                          type="text"
                          name="address_two"
                          id="address_two"
                          value={newStaff.address_two}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-emerald-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder="Enter secondary address (optional)"
                        />
                      </div>

                      {/* Profile Image */}
                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="profile"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaUpload className="mr-2 text-emerald-500" />
                          Profile Image*
                        </label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            name="profile"
                            id="profile"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 ${
                              errors.profile ? "border-red-300" : ""
                            }`}
                          />
                          {profilePreview && (
                            <div className="flex-shrink-0">
                              <img
                                src={profilePreview || "/placeholder.svg"}
                                alt="Profile preview"
                                className="h-16 w-16 rounded-xl object-cover border-2 border-emerald-200"
                              />
                            </div>
                          )}
                        </div>
                        {errors.profile && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.profile}
                          </p>
                        )}
                      </div>

                      {/* Vehicle Type */}
                      <div className="space-y-2">
                        <label
                          htmlFor="vehicle_type"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMotorcycle className="mr-2 text-emerald-500" />
                          Vehicle Type*
                        </label>
                        <select
                          name="vehicle_type"
                          id="vehicle_type"
                          value={newStaff.vehicle_type}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.vehicle_type
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                        >
                          <option value="">Select vehicle type</option>
                          <option value="ဆိုင်ကယ်">ဆိုင်ကယ်</option>
                          <option value="စက်ဘီး">စက်ဘီး</option>
                          <option value="ကား">ကား</option>
                        </select>
                        {errors.vehicle_type && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.vehicle_type}
                          </p>
                        )}
                      </div>

                      {/* Vehicle Number */}
                      <div className="space-y-2">
                        <label
                          htmlFor="vehicle_number"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMotorcycle className="mr-2 text-emerald-500" />
                          Vehicle Number*
                        </label>
                        <input
                          type="text"
                          name="vehicle_number"
                          id="vehicle_number"
                          value={newStaff.vehicle_number}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.vehicle_number
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter vehicle number"
                        />
                        {errors.vehicle_number && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.vehicle_number}
                          </p>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="space-y-2">
                        <label
                          htmlFor="rating"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaStar className="mr-2 text-emerald-500" />
                          Initial Rating*
                        </label>
                        <input
                          type="number"
                          name="rating"
                          id="rating"
                          min="1"
                          max="5"
                          step="0.1"
                          value={newStaff.rating}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.rating
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter rating (1-5)"
                        />
                        {errors.rating && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.rating}
                          </p>
                        )}
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaLock className="mr-2 text-emerald-500" />
                          Password*
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={newStaff.password}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.password
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-emerald-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-emerald-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter password"
                        />
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => {
                            setShowNewStaffModal(false);
                            setProfilePreview(null);
                            setErrors({});
                          }}
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
