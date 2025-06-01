"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
  FaTrash,
  FaDownload,
  FaHeart,
  FaEye,
  FaGlobe,
  FaClock,
  FaClipboardList,
  FaRegStar,
  FaStar,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import ProtectRoute from "../../helpers/protectRoute";
import axios from "axios";
import dayjs from "dayjs";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
    phone_one: "",
    phone_two: "",
    address_one: "",
    address_two: "",
    profile: null as File | null,
    account_status: "",
  });
  const [updateErrors, setUpdateErrors] = useState<Record<string, string>>({});
  const [updateProfilePreview, setUpdateProfilePreview] = useState<
    string | null
  >(null);

  // Mock user data
  const [recentOrders, setRecentOrders] = useState([]);
  const [user, setUser] = useState({
    id: Number.parseInt(id || "1"),
    name: "",
    email: "",
    phone_one: "",
    phone_two: "",
    address_one: "123 Main Street, Apt 4B",
    address_two: "2345 Pearl Street, yangon",
    created_at: "Jan 15, 2023",
    account_status: "active",
    profile: null,
    totalOrders: 24,
    totalSpent: 1245.8,
    lastLogin: "May 25, 2025, 3:45 PM",

    activityLog: [
      {
        id: 1,
        action: "Logged in",
        date: "May 25, 2025, 3:45 PM",
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
    ],
  });

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

  const handleUpdateInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });

    // Clear error for this field when user types
    if (updateErrors[name]) {
      setUpdateErrors({
        ...updateErrors,
        [name]: "",
      });
    }
  };

  const handleUpdateProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUpdateUser({
        ...updateUser,
        profile: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdateProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateUpdateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!updateUser.name.trim()) newErrors.name = "Name is required";
    if (!updateUser.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(updateUser.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!updateUser.phone_one.trim()) {
      newErrors.phone_one = "Primary phone number is required";
    } else if (!/^\+959\d{7,9}$/.test(updateUser.phone_one)) {
      newErrors.phone_one = "Phone number must be in format +959xxxxxxx";
    }
    if (!updateUser.phone_two.trim()) {
      newErrors.phone_two = "Secondary phone number is required";
    } else if (!/^\+959\d{7,9}$/.test(updateUser.phone_two)) {
      newErrors.phone_two = "Phone number must be in format +959xxxxxxx";
    }
    if (!updateUser.address_one.trim())
      newErrors.address_one = "Primary address is required";
    if (!updateUser.address_two.trim())
      newErrors.address_two = "Secondary address is required";
    if (!updateUser.account_status.trim())
      newErrors.account_status = "Account status is required";

    setUpdateErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateUpdateForm()) {
      console.log("Updating user:", updateUser);
      setShowUpdateModal(false);
      alert("User updated successfully!");
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      if (!ProtectRoute()) {
        navigate("/login");
        return;
      }
      // Replace with your actual API call
      const response = await axios.get(
        `http://localhost:1500/api/admin/eachUser/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "is response data");
      if (response.status != 200) {
        throw new Error("Failed to fetch store data");
      } else {
        setUser(response.data.data);
        setUpdateUser(response.data.data);
        setRecentOrders(response.data.recentOrders);
        console.log(recentOrders);
      }

      // const data = await response.data;
      // setUser(data.data);
      // setUpdateUser(data.data);
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
                  onClick={() => setShowUpdateModal(true)}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  {user.orderCount}
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
                  ${user.totalSpent}
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
                  {dayjs(user.created_at).format("YYYY-MM-DD HH:mm:ss")}
                </p>
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
                      <span className="text-gray-900">{user.phone_one}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-600 font-medium">
                        Member Since
                      </span>
                      <span className="text-gray-900">
                        {dayjs(user.created_at).format("YYYY-MM-DD HH:mm:ss")}
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
                        Primary Address
                      </span>
                      <span className="text-gray-900">{user.address_one}</span>
                    </div>
                    {/* <div className="flex justify-between py-3 border-b border-gray-100">
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
                    </div> */}
                    <div className="flex justify-between py-3">
                      <span className="text-gray-600 font-medium">
                        Second Address
                      </span>
                      <span className="text-gray-900">{user.address_two}</span>
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
                    {recentOrders.map((order) => (
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
                            {dayjs(order.created_at).format("")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {order.item_count} items
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            ${order.total_amount}
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

      {/* Update User Modal */}
      {showUpdateModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm"
          onClick={() => setShowUpdateModal(false)}
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
                    <FaEdit className="mr-3" />
                    Update User Profile
                  </h3>
                  <button
                    type="button"
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
                    onClick={() => setShowUpdateModal(false)}
                    aria-label="Close"
                  >
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-purple-100 mt-2">
                  Update user account information and settings
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <form onSubmit={handleUpdateSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Profile Picture Upload */}
                    <div className="sm:col-span-2 flex flex-col items-center justify-center mb-4">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg mb-2">
                          {updateProfilePreview ? (
                            <img
                              src={updateProfilePreview || "/placeholder.svg"}
                              alt="Profile Preview"
                              className="h-full w-full object-cover"
                            />
                          ) : user.profileImage ? (
                            <img
                              src={user.profileImage || "/placeholder.svg"}
                              alt="Current Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FaUser />
                          )}
                        </div>
                        <label
                          htmlFor="update_profile"
                          className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
                        >
                          <FaEdit className="h-4 w-4" />
                        </label>
                        <input
                          type="file"
                          id="update_profile"
                          name="profile"
                          accept="image/*"
                          onChange={handleUpdateProfileChange}
                          className="hidden"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Upload profile picture (optional)
                      </p>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="update_name"
                        className="flex items-center text-sm font-semibold text-gray-700"
                      >
                        <FaUser className="mr-2 text-purple-500" />
                        Full Name*
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="update_name"
                        value={updateUser.name}
                        onChange={handleUpdateInputChange}
                        className={`block w-full rounded-xl border-2 ${
                          updateErrors.name
                            ? "border-red-300 ring-2 ring-red-100"
                            : "border-gray-200 focus:border-purple-500"
                        } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                        placeholder="Enter full name"
                      />
                      {updateErrors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {updateErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="update_email"
                        className="flex items-center text-sm font-semibold text-gray-700"
                      >
                        <FaEnvelope className="mr-2 text-purple-500" />
                        Email Address*
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="update_email"
                        value={updateUser.email}
                        onChange={handleUpdateInputChange}
                        className={`block w-full rounded-xl border-2 ${
                          updateErrors.email
                            ? "border-red-300 ring-2 ring-red-100"
                            : "border-gray-200 focus:border-purple-500"
                        } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                        placeholder="example@email.com"
                      />
                      {updateErrors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {updateErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone One */}
                    <div className="space-y-2">
                      <label
                        htmlFor="update_phone_one"
                        className="flex items-center text-sm font-semibold text-gray-700"
                      >
                        <FaPhone className="mr-2 text-purple-500" />
                        Primary Phone*
                      </label>
                      <input
                        type="text"
                        name="phone_one"
                        id="update_phone_one"
                        value={updateUser.phone_one}
                        onChange={handleUpdateInputChange}
                        className={`block w-full rounded-xl border-2 ${
                          updateErrors.phone_one
                            ? "border-red-300 ring-2 ring-red-100"
                            : "border-gray-200 focus:border-purple-500"
                        } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                        placeholder="+959xxxxxxxx"
                      />
                      {updateErrors.phone_one && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {updateErrors.phone_one}
                        </p>
                      )}
                    </div>

                    {/* Phone Two */}
                    <div className="space-y-2">
                      <label
                        htmlFor="update_phone_two"
                        className="flex items-center text-sm font-semibold text-gray-700"
                      >
                        <FaPhone className="mr-2 text-purple-500" />
                        Secondary Phone*
                      </label>
                      <input
                        type="text"
                        name="phone_two"
                        id="update_phone_two"
                        value={updateUser.phone_two}
                        onChange={handleUpdateInputChange}
                        className={`block w-full rounded-xl border-2 ${
                          updateErrors.phone_two
                            ? "border-red-300 ring-2 ring-red-100"
                            : "border-gray-200 focus:border-purple-500"
                        } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                        placeholder="+959xxxxxxxx"
                      />
                      {updateErrors.phone_two && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {updateErrors.phone_two}
                        </p>
                      )}
                    </div>

                    {/* Address One */}
                    <div className="space-y-2 sm:col-span-2">
                      <label
                        htmlFor="update_address_one"
                        className="flex items-center text-sm font-semibold text-gray-700"
                      >
                        <FaMapMarkerAlt className="mr-2 text-purple-500" />
                        Primary Address*
                      </label>
                      <input
                        type="text"
                        name="address_one"
                        id="update_address_one"
                        value={updateUser.address_one}
                        onChange={handleUpdateInputChange}
                        className={`block w-full rounded-xl border-2 ${
                          updateErrors.address_one
                            ? "border-red-300 ring-2 ring-red-100"
                            : "border-gray-200 focus:border-purple-500"
                        } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                        placeholder="Enter primary address"
                      />
                      {updateErrors.address_one && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {updateErrors.address_one}
                        </p>
                      )}
                    </div>

                    {/* Address Two */}
                    <div className="space-y-2 sm:col-span-2">
                      <label
                        htmlFor="update_address_two"
                        className="flex items-center text-sm font-semibold text-gray-700"
                      >
                        <FaMapMarkerAlt className="mr-2 text-purple-500" />
                        Secondary Address*
                      </label>
                      <input
                        type="text"
                        name="address_two"
                        id="update_address_two"
                        value={updateUser.address_two}
                        onChange={handleUpdateInputChange}
                        className={`block w-full rounded-xl border-2 ${
                          updateErrors.address_two
                            ? "border-red-300 ring-2 ring-red-100"
                            : "border-gray-200 focus:border-purple-500"
                        } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                        placeholder="Enter secondary address"
                      />
                      {updateErrors.address_two && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {updateErrors.address_two}
                        </p>
                      )}
                    </div>

                    {/* Account Status */}
                    <div className="space-y-2 sm:col-span-2">
                      <label
                        htmlFor="update_account_status"
                        className="flex items-center text-sm font-semibold text-gray-700"
                      >
                        <FaUserCog className="mr-2 text-purple-500" />
                        Account Status*
                      </label>
                      <select
                        name="account_status"
                        id="update_account_status"
                        value={updateUser.account_status}
                        onChange={handleUpdateInputChange}
                        className={`block w-full rounded-xl border-2 ${
                          updateErrors.account_status
                            ? "border-red-300 ring-2 ring-red-100"
                            : "border-gray-200 focus:border-purple-500"
                        } px-4 py-3 shadow-sm focus:ring-2 focus:ring-purple-100 transition-all duration-200 bg-gray-50 hover:bg-white`}
                      >
                        <option value="">Select account status</option>
                        <option value="Active">Active</option>
                        <option value="Banned">Banned</option>
                      </select>
                      {updateErrors.account_status && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {updateErrors.account_status}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <div className="flex flex-col sm:flex-row justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setShowUpdateModal(false)}
                        className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                      >
                        <FaCheck className="mr-2" />
                        Update User
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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
