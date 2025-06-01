"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserSlash,
  FaUserCircle,
  FaImage,
  FaIdCard,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import axios from "axios";
import { setReduxCounts, setReduxUsers } from "../../features/admin/usersSlice";
import InternalServerError from "../error/500";
import ProtectRoute from "../../helpers/protectRoute";
import dayjs from "dayjs";

const UserManagement = () => {
  const navigate = useNavigate();
  const [isServerError, setIsServerError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [statusFilter, setStatusFilter] = useState("all");
  const backendDomainName: string = "http://localhost:1500";
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const ReduxUser = useSelector((store: RootState) => store.users);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    phone_one: "",
    phone_two: "",
    profile: null as File | null,
    address_one: "",
    address_two: "",
  });
  const [totalUsersCount, setTotalUserscount] = useState(
    ReduxUser.totalUsersCount
  );
  const [activeUsersCount, setActiveUsersCount] = useState(
    ReduxUser.activeUsersCount
  );
  const [inactiveUsersCount, setInactiveUsersCount] = useState(
    ReduxUser.inactiveUsersCount
  );
  const [bannedUsersCount, setBannedUsersCount] = useState(
    ReduxUser.bannedUsersCount
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  // Mock data
  const [users, setUsers] = useState([]);

  // Filter users based on search term and status filter
  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      statusFilter === "all" ||
      user.account_status.toLowerCase() === statusFilter.toLowerCase();

    return matchesStatus;
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewUser({
        ...newUser,
        profile: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newUser.username.trim()) newErrors.username = "Username is required";
    if (!newUser.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!newUser.password.trim()) {
      newErrors.password = "Password is required";
    } else if (newUser.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!newUser.phone_one.trim()) {
      newErrors.phone_one = "Primary phone number is required";
    } else if (!/^\+959\d{7,9}$/.test(newUser.phone_one)) {
      newErrors.phone_one = "Phone number must be in format +959xxxxxxx";
    }
    if (newUser.phone_two.trim() && !/^\+959\d{7,9}$/.test(newUser.phone_two)) {
      newErrors.phone_two = "Phone number must be in format +959xxxxxxx";
    }
    if (!newUser.address_one.trim())
      newErrors.address_one = "Primary address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (validateForm()) {
        // console.log("Submitting new user:", newUser);
        const formData = new FormData();
        formData.append("name", newUser.username);
        formData.append("email", newUser.email);
        formData.append("phone_one", newUser.phone_one);
        formData.append("phone_two", newUser.phone_two);
        formData.append("address_one", newUser.address_one);
        formData.append("address_two", newUser.address_two);
        formData.append("password", newUser.password);
        if (newUser.profile !== null) {
          formData.append("profile", newUser.profile);
        }
        console.log("oki formdata is here");
        const response = await axios.post(
          `${backendDomainName}/api/admin/addUser`,
          formData,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        console.log("what are you doiung bro");
        if (response.status === 200 || response.status === 201) {
          setShowNewUserModal(false);

          setNewUser({
            username: "",
            email: "",
            password: "",
            phone_one: "",
            phone_two: "",
            profile: null,
            address_one: "",
            address_two: "",
          });
          setProfilePreview(null);
          alert("User created successfully!");
        } else {
          console.log("no ok");
          return;
        }
        return;
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to create store. Please try again.");
      }
    }
  };

  const getStatusColor = (status: string) => {
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
  const fetchData = async (searchTerm?: string, pageNumber?: string) => {
    try {
      setLoading(true);
      if (!ProtectRoute()) {
        navigate("/login");
        return;
      }
      let uri: string;
      if (searchTerm == "" && pageNumber == "") {
        uri = `http://localhost:1500/api/admin/userList`;
      } else if (searchTerm != "" && searchTerm != undefined) {
        uri = `http://localhost:1500/api/admin/userList?search=${searchTerm}`;
      } else {
        uri = `http://localhost:1500/api/admin/userList?page=${pageNumber}`;
      }
      const response = await axios.get(uri, {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.status == 200) {
        setReduxUsers(response.data.data);
        setReduxCounts(response.data.counts);
        setUsers(response.data.data);
        setTotalUserscount(response.data.counts.total);
        setActiveUsersCount(response.data.counts.active);
        setInactiveUsersCount(response.data.counts.inactive);
        setBannedUsersCount(response.data.counts.banned);
        setPages(response.data.pagination.pages);
        setPage(response.data.pagination.page);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setIsServerError(true);
    }
  };

  useEffect(() => {
    fetchData("", "");
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
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center md:justify-start"
              >
                <FaPlus className="mr-2" />
                Add New User
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalUsersCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <FaUserCheck className="text-emerald-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {activeUsersCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaUserTimes className="text-yellow-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Inactive Users
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {inactiveUsersCount}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-red-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <FaUserSlash className="text-red-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Banned Users
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {bannedUsersCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-96 flex">
              <input
                type="text"
                placeholder="Search by name, username or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value == "") {
                    fetchData("", "");
                  }
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors duration-200"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                onClick={() => {
                  fetchData(searchTerm, "");
                }}
                className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-xl py-3 flex items-center space-x-2 border border-indigo-600 transition-colors duration-200"
              >
                <FaSearch className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                        <div className="h-12 w-12 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {user.profile ? (
                            <img
                              src={user.profile || "/placeholder.svg"}
                              alt={user.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            user.name.charAt(0)
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500 flex flex-col">
                            {/* <span>@{user.username}</span> */}
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          user.account_status
                        )}`}
                      >
                        {user.account_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {user.ordercount}
                      </div>
                      {/* <div className="text-xs text-gray-500">total orders</div> */}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {dayjs(user.last_order_date).format("MMM D, YYYY")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {dayjs(user.created_at).format("MMM D, YYYY")}
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
                        {user.account_status === "Active" && (
                          <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center">
                            <FaBan className="mr-1" />
                            Ban
                          </button>
                        )}
                        {user.account_status === "Banned" && (
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
                    of <span className="font-medium">{totalUsersCount}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    {pages.map((each, index) => (
                      <button
                        onClick={() => {
                          fetchData("", each.toString());
                        }}
                        key={index}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300  text-sm font-medium  hover:bg-gray-500 ${
                          each == page
                            ? "bg-blue-800 text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {each}
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

        {/* New User Modal */}
        {showNewUserModal && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm"
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
                <div className="p-8 max-h-[70vh] overflow-y-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Profile Picture Upload */}
                      <div className="sm:col-span-2 flex flex-col items-center justify-center mb-4">
                        <div className="relative">
                          <div className="h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg mb-2">
                            {profilePreview ? (
                              <img
                                src={profilePreview || "/placeholder.svg"}
                                alt="Profile Preview"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <FaUserCircle />
                            )}
                          </div>
                          <label
                            htmlFor="profile"
                            className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
                          >
                            <FaImage className="h-4 w-4" />
                          </label>
                          <input
                            type="file"
                            id="profile"
                            name="profile"
                            accept="image/*"
                            onChange={handleProfileChange}
                            className="hidden"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Upload profile picture (optional)
                        </p>
                      </div>

                      {/* Username */}
                      <div className="space-y-2">
                        <label
                          htmlFor="username"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaIdCard className="mr-2 text-purple-500" />
                          Username*
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          value={newUser.username}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.username
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter username"
                        />
                        {errors.username && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.username}
                          </p>
                        )}
                      </div>

                      {/* Email */}
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

                      {/* Password */}
                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="password"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaIdCard className="mr-2 text-purple-500" />
                          Password*
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={newUser.password}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.password
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="Enter password (minimum 8 characters)"
                        />
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {/* Phone One */}
                      <div className="space-y-2">
                        <label
                          htmlFor="phone_one"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaPhone className="mr-2 text-purple-500" />
                          Primary Phone*
                        </label>
                        <input
                          type="text"
                          name="phone_one"
                          id="phone_one"
                          value={newUser.phone_one}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.phone_one
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="+959xxxxxxxx"
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
                          <FaPhone className="mr-2 text-purple-500" />
                          Secondary Phone
                        </label>
                        <input
                          type="text"
                          name="phone_two"
                          id="phone_two"
                          value={newUser.phone_two}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.phone_two
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                          placeholder="+959xxxxxxxx (optional)"
                        />
                        {errors.phone_two && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.phone_two}
                          </p>
                        )}
                      </div>

                      {/* Address One */}
                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="address_one"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-purple-500" />
                          Primary Address*
                        </label>
                        <input
                          type="text"
                          name="address_one"
                          id="address_one"
                          value={newUser.address_one}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.address_one
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-purple-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
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
                          <FaMapMarkerAlt className="mr-2 text-purple-500" />
                          Secondary Address
                        </label>
                        <input
                          type="text"
                          name="address_two"
                          id="address_two"
                          value={newUser.address_two}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-purple-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                          placeholder="Enter secondary address (optional)"
                        />
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <div className="flex flex-col sm:flex-row justify-end gap-4">
                        <button
                          type="button"
                          onClick={() => setShowNewUserModal(false)}
                          className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
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
