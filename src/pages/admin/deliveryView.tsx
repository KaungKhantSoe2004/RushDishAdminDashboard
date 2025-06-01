"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
  FaSpinner,
  FaTimes,
  FaCamera,
} from "react-icons/fa";
import axios from "axios";
import dayjs from "dayjs";
import ProtectRoute from "../../helpers/protectRoute";

// Interfaces
interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone_one: string;
  address_one: string;
  account_status: string;
  vehicle_type: string;
  vehicle_number: string;
  address_two: string;
  phone_two: string;
  rating: number;
  completed_orders: number;
  total_profit: string;
  today_profit: string;
  profile?: string;
}

interface orderState {
  id: string;
  name: string;
  status: string;
  total_amount: string;
  created_at: string;
}

// Orders Table Component
function OrdersTable({
  orders,
  getStatusBadgeClass,
}: {
  orders: orderState[];
  getStatusBadgeClass: (status: string) => string;
}) {
  const [loading, setLoading] = useState(false);

  // This function could be used to simulate loading when fetching more data
  const loadMoreOrders = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center">
            <FaSpinner className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="mt-2 text-sm text-gray-600">Loading orders...</p>
          </div>
        </div>
      )}

      {orders?.length == 0 ? (
        <div>No orders</div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders?.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.total_amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dayjs(order.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Optional: Add a load more button */}
      {loading && (
        <div className="mt-4 text-center">
          <button
            onClick={loadMoreOrders}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Loading...
          </button>
        </div>
      )}
    </div>
  );
}

// Edit Staff Modal Component
function EditStaffModal({
  isOpen,
  onClose,
  staffMember,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  staffMember: StaffMember;
  onSave: (updatedStaff: StaffMember) => void;
}) {
  const [formData, setFormData] = useState<StaffMember>(staffMember);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Reset form data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(staffMember);
      setSelectedImage(null);
      setImagePreview(null);
    }
  }, [isOpen, staffMember]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    console.log(formData);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would upload the image first and get the URL
      const updatedFormData = { ...formData };
      const updateFormData = new FormData();
      updateFormData.append("id", formData.id);
      updateFormData.append("name", formData.name);
      updateFormData.append("email", formData.email);
      updateFormData.append("phone_one", formData.phone_one);
      updateFormData.append("phone_two", formData.phone_two);
      updateFormData.append("address_one", formData.address_one);
      updateFormData.append("address_two", formData.address_two);
      updateFormData.append("vehicle_type", formData.vehicle_type);
      updateFormData.append("vehicle_number", formData.vehicle_number);
      updateFormData.append("rating", formData.rating.toString());
      updateFormData.append("status", formData.account_status);
      if (selectedImage) {
        updateFormData.append("profile", selectedImage);
      }
      const response = await axios.post(
        `http://localhost:1500/api/admin/updateDelivery`,
        updateFormData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status != 200) {
        throw new Error("Failed to update store");

        return;
      } else {
        alert("Delivery Agent profile updated Successfully");
      }
      onSave(updatedFormData);
    } catch (error) {
      console.error("Error saving staff data:", error);
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occured while updateing ");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const getCurrentImageUrl = () => {
    if (imagePreview) return imagePreview;
    if (staffMember.profile) return staffMember.profile;
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/90 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Staff Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSaving}
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Content - All fields in one section */}
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Staff Information
            </h3>

            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                  {getCurrentImageUrl() ? (
                    <img
                      src={getCurrentImageUrl()! || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-100">
                      <span className="text-4xl font-bold text-emerald-600">
                        {formData.name}
                      </span>
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg"
                >
                  <FaCamera className="w-4 h-4" />
                </label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Click the camera icon to update profile picture
                </p>
                {selectedImage && (
                  <p className="text-xs text-emerald-600 mt-1">
                    New image selected: {selectedImage.name}
                  </p>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone_one"
                  name="phone_one"
                  value={formData.phone_one}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="emergencyContact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  id="phone_two"
                  name="phone_two"
                  value={formData.phone_two || formData.phone_two || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address_one"
                name="address_one"
                value={formData.address_one}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Work Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="zone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Delivery Zone
                </label>
                <input
                  type="text"
                  id="address_two"
                  name="address_two"
                  value={formData.address_two}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="vehicleType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Vehicle Type
                </label>
                <select
                  id="vehicle_type"
                  name="vehicle_type"
                  value={formData.vehicle_type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="Motorcycle">ဆိုင်ကယ်</option>
                  <option value="Car">ကား</option>
                  <option value="Bicycle">စက်ဘီး</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="licenseNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  License Number
                </label>
                <input
                  type="text"
                  id="vehicle_number"
                  name="vehicle_number"
                  value={formData.vehicle_number}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="account_status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Account Status
              </label>
              <select
                id="account_status"
                name="account_status"
                value={formData.account_status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center"
            >
              {isSaving ? (
                <>
                  <FaSpinner className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Component
export default function DeliveryView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock data for the delivery staff member
  const [staffMember, setStaffMember] = useState<StaffMember | undefined>(
    undefined
  );
  interface orderState {
    id: string;
    name: string;
    status: string;
    total_amount: string;
    created_at: string;
  }
  const [orders, setOrders] = useState<orderState[]>([]);

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      if (!ProtectRoute()) {
        navigate("/login");
        return;
      }
      const response = await axios.get(
        `http://localhost:1500/api/admin/eachDelivery/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status != 200) {
        console.log("error fetching data");
        throw new Error("Failed to fetch store data");
      } else {
        setStaffMember(response.data.data);
        setOrders(response.data.recentOrders || []);
      }

      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching staff data"
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <FaSpinner className="h-12 w-12 animate-spin text-emerald-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            Loading staff details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to Delivery Staff
          </button>

          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
              <div className="flex items-center flex-col sm:flex-row gap-4">
                <div className="h-20 w-20 rounded-2xl overflow-hidden bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {staffMember?.profile ? (
                    <img
                      src={
                        staffMember?.profile
                          ? `http://localhost:1500/${staffMember.profile}`
                          : "/placeholder.svg"
                      }
                      alt={staffMember?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    staffMember?.name
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-center sm:text-left">
                    {staffMember?.name}
                  </h1>
                  <p className="text-emerald-100 text-lg text-center sm:text-left">
                    Delivery Staff Member
                  </p>
                  <div className="flex items-center mt-2 justify-center sm:justify-start">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        staffMember?.account_status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {staffMember?.account_status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                  {staffMember?.completed_orders || 0}
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
                  {staffMember?.total_profit || 0}
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
                    {staffMember?.rating}
                  </p>
                  <div className="flex">{renderStars(staffMember.rating)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {staffMember?.completionRate}
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[{ id: "overview", label: "Overview", icon: FaUser }].map(
                (tab) => (
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
                )
              )}
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
                        <p className="font-medium">{staffMember?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{staffMember?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{staffMember?.phone_one}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">
                          {staffMember?.address_one}
                        </p>
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
                        <p className="font-medium">
                          {staffMember?.address_one}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaMotorcycle className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Vehicle Type</p>
                        <p className="font-medium">
                          {staffMember?.vehicle_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">License Number</p>
                        <p className="font-medium">
                          {staffMember?.vehicle_number}
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
                          {staffMember?.phone_two || staffMember?.phone_one}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Orders
            </h3>
            <OrdersTable
              orders={orders}
              getStatusBadgeClass={getStatusBadgeClass}
            />
          </div>
        </div>
      </div>

      {/* Edit Staff Modal */}
      <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        staffMember={staffMember}
        onSave={(updatedStaff) => {
          setStaffMember(updatedStaff);
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
}
