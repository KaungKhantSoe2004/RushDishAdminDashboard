"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
  FaLock,
  FaPhoneAlt,
  FaUserTag,
  FaImage,
  FaUpload,
  FaSpinner,
  FaChevronDown,
  FaClock,
} from "react-icons/fa";
import checkAuth, { type UserType } from "../../helpers/checkAuth";
import axios from "axios";
import { useDispatch } from "react-redux";
import InternalServerError from "../error/500";
import {
  setReduxStorePageStoreCount,
  setStore,
} from "../../features/admin/storeSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

interface Store {
  id: string;
  profile: string | null;
  name: string;
  owner: string;
  email: string;
  location: string;
  status: "Active" | "Pending" | "Suspended";
  rating: number;
}

interface NewStore {
  name: string;
  owner: string;
  email: string;
  password: string;
  phoneOne: string;
  phoneTwo: string;
  addressOne: string;
  addressTwo: string;
  role: string;
  rating: number;
  profileImg: File | null;
}

interface FormErrors {
  [key: string]: string;
}

const StoresManagement = () => {
  const backendDomainName: string = "http://localhost:1500";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ReduxStores = useSelector((store: RootState) => store.store);
  const [isServerError, setIsServerError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewStoreModal, setShowNewStoreModal] = useState(false);
  const [pages, setPages] = useState([1]);
  const [loadingStoreId, setLoadingStoreId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [newStore, setNewStore] = useState<NewStore>({
    name: "",
    owner: "",
    email: "",
    password: "",
    phoneOne: "",
    phoneTwo: "",
    addressOne: "",
    addressTwo: "",
    role: "",
    rating: 0,
    profileImg: null,
  });
  const [totalStoresCount, setTotalStoresCount] = useState(
    ReduxStores.totalStoresCount
  );
  const [activeStoresCount, setActiveStoresCount] = useState(
    ReduxStores.activeStoresCount
  );
  const [pendingStoresCount, setPendingStoresCount] = useState(
    ReduxStores.pendingStoresCount
  );
  const [suspendedStoresCount, setSuspendedStoresCount] = useState(
    ReduxStores.suspendStoresCount
  );
  const [stores, setStores] = useState<Store[]>(ReduxStores.stores);
  const [errors, setErrors] = useState<FormErrors>({});

  // Filter stores based on search term and status filter
  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      store.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Handle store status change with proper state isolation
  const handleStatusChange = async (
    storeId: string,
    newStatus: "Active" | "Pending" | "Suspended"
  ) => {
    // Prevent multiple simultaneous updates
    if (loadingStoreId) return;

    setLoadingStoreId(storeId);
    setOpenDropdownId(null);

    try {
      const response = await axios.put(
        `${backendDomainName}/api/admin/stores/${storeId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Create new stores array with updated store
        const updatedStores = stores.map((store) =>
          store.id === storeId ? { ...store, status: newStatus } : store
        );

        // Update local state
        setStores(updatedStores);

        // Update Redux state
        dispatch(setStore(updatedStores));

        // Recalculate counts
        const newCounts = {
          active: updatedStores.filter((s) => s.status === "Active").length,
          pending: updatedStores.filter((s) => s.status === "Pending").length,
          suspended: updatedStores.filter((s) => s.status === "Suspended")
            .length,
          total: updatedStores.length,
        };

        setActiveStoresCount(newCounts.active);
        setPendingStoresCount(newCounts.pending);
        setSuspendedStoresCount(newCounts.suspended);
        setTotalStoresCount(newCounts.total);

        dispatch(setReduxStorePageStoreCount(newCounts));

        // Show success message
        const actionText =
          newStatus === "Active"
            ? "activated"
            : newStatus === "Suspended"
            ? "suspended"
            : "set to pending";
        alert(`Store ${actionText} successfully!`);
      }
    } catch (error) {
      console.error("Error updating store status:", error);
      alert("Failed to update store status. Please try again.");
    } finally {
      setLoadingStoreId(null);
    }
  };

  // Handle dropdown toggle with better event management
  const handleDropdownToggle = (e: React.MouseEvent, storeId: string) => {
    e.stopPropagation();
    e.preventDefault();

    // Close if same dropdown is clicked, open if different
    if (openDropdownId === storeId) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(storeId);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStore((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match("image.*")) {
        setErrors((prev) => ({
          ...prev,
          profileImg: "Please select an image file",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          profileImg: "File size should be less than 5MB",
        }));
        return;
      }

      setNewStore((prev) => ({
        ...prev,
        profileImg: file,
      }));

      // Clear any previous errors
      if (errors.profileImg) {
        setErrors((prev) => ({
          ...prev,
          profileImg: "",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!newStore.name.trim()) newErrors.name = "Store name is required";
    if (!newStore.owner.trim()) newErrors.owner = "Owner name is required";
    if (!newStore.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newStore.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!newStore.password) newErrors.password = "Password is required";
    if (!newStore.phoneOne.trim())
      newErrors.phoneOne = "Primary phone is required";
    if (!newStore.addressOne.trim())
      newErrors.addressOne = "Primary address is required";
    if (!newStore.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newStore.name);
      formData.append("owner", newStore.owner);
      formData.append("email", newStore.email);
      formData.append("password", newStore.password);
      formData.append("phoneOne", newStore.phoneOne);
      formData.append("phoneTwo", newStore.phoneTwo || "");
      formData.append("addressOne", newStore.addressOne);
      formData.append("addressTwo", newStore.addressTwo || "");
      formData.append("role", newStore.role);
      formData.append("rating", newStore.rating.toString());
      if (newStore.profileImg) {
        formData.append("storeLogo", newStore.profileImg);
      }

      // Submit to your API endpoint
      const response = await axios.post(
        `${backendDomainName}/api/admin/addStore`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        // Handle success
        setShowNewStoreModal(false);
        // Reset form
        setNewStore({
          name: "",
          owner: "",
          email: "",
          password: "",
          phoneOne: "",
          phoneTwo: "",
          addressOne: "",
          addressTwo: "",
          role: "",
          rating: 0,
          profileImg: null,
        });
        setErrors({});

        // Refresh store list
        fetchApi();
        alert("Store created successfully!");
      }
    } catch (error) {
      console.error("Error creating store:", error);
      alert("Failed to create store. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <FaCheck className="w-3 h-3 text-emerald-600" />;
      case "Pending":
        return <FaClock className="w-3 h-3 text-amber-600" />;
      case "Suspended":
        return <FaBan className="w-3 h-3 text-red-600" />;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const fetchApi = async () => {
    try {
      const result = await checkAuth();
      const tokenStatus: boolean = result.status;
      const myUserData: UserType | undefined = result.data;
      if (myUserData != undefined && myUserData.role !== "admin") {
        navigate("/login");
      }
      if (!tokenStatus) {
        navigate("/login");
        return;
      }
      const response = await axios.get(
        `${backendDomainName}/api/admin/stores`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(setReduxStorePageStoreCount(response.data.counts));
      setPages(response.data.pagination.pages);
      dispatch(setStore(response.data.data));
      setStores(response.data.data);
      setActiveStoresCount(response.data.counts.active);
      setPendingStoresCount(response.data.counts.pending);
      setSuspendedStoresCount(response.data.counts.suspended);
      setTotalStoresCount(response.data.counts.total);
    } catch (error) {
      console.error("Error in fetchApi:", error);
      setIsServerError(true);
    }
  };

  // Close dropdown when clicking outside - improved version
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if click is outside any dropdown container
      if (!target.closest("[data-dropdown-container]")) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdownId]);

  useEffect(() => {
    fetchApi();
  }, []);

  return isServerError ? (
    <InternalServerError />
  ) : (
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
                  {activeStoresCount}
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
                  {pendingStoresCount}
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
                  {suspendedStoresCount}
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
                  {totalStoresCount}
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
                {filteredStores.map((store) => (
                  <tr
                    key={store.id}
                    className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {store.profile ? (
                          <img
                            src={`http://localhost:1500/${store.profile}`}
                            alt={store.name}
                            className="h-12 w-12 flex-shrink-0 rounded-xl object-cover shadow-lg"
                          />
                        ) : (
                          <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {store.name.charAt(0)}
                          </div>
                        )}
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
                        {store.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative" data-dropdown-container>
                        <button
                          type="button"
                          onClick={(e) => handleDropdownToggle(e, store.id)}
                          disabled={loadingStoreId === store.id}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            store.status
                          )} hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {loadingStoreId === store.id ? (
                            <FaSpinner className="w-3 h-3 mr-1 animate-spin" />
                          ) : (
                            <span className="mr-1">
                              {getStatusIcon(store.status)}
                            </span>
                          )}
                          {store.status}
                          <FaChevronDown
                            className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                              openDropdownId === store.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Status Dropdown - Only show for the specific store */}
                        {openDropdownId === store.id && (
                          <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="py-1">
                              {store.status !== "Active" && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(store.id, "Active");
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-emerald-50 flex items-center transition-colors duration-200"
                                >
                                  <FaCheck className="w-3 h-3 mr-2 text-emerald-600" />
                                  Active
                                </button>
                              )}
                              {store.status !== "Pending" && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(store.id, "Pending");
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-amber-50 flex items-center transition-colors duration-200"
                                >
                                  <FaClock className="w-3 h-3 mr-2 text-amber-600" />
                                  Pending
                                </button>
                              )}
                              {store.status !== "Suspended" && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(store.id, "Suspended");
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center transition-colors duration-200"
                                >
                                  <FaBan className="w-3 h-3 mr-2 text-red-600" />
                                  Suspended
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
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
                    <span className="font-medium">{filteredStores.length}</span>{" "}
                    of <span className="font-medium">{stores.length}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>

                    {pages.map((each) => (
                      <button
                        key={each}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                      {/* Store Name */}
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
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none`}
                          placeholder="Enter store name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Owner Name */}
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
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none`}
                          placeholder="Enter owner name"
                        />
                        {errors.owner && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.owner}
                          </p>
                        )}
                      </div>

                      {/* Email */}
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
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none`}
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
                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaLock className="mr-2 text-indigo-500" />
                          Password*
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={newStore.password}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.password
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-indigo-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none`}
                          placeholder="Enter password"
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
                          htmlFor="phoneOne"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaPhone className="mr-2 text-indigo-500" />
                          Primary Phone*
                        </label>
                        <input
                          type="text"
                          name="phoneOne"
                          id="phoneOne"
                          value={newStore.phoneOne}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.phoneOne
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-indigo-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none`}
                          placeholder="(123) 456-7890"
                        />
                        {errors.phoneOne && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.phoneOne}
                          </p>
                        )}
                      </div>

                      {/* Phone Two */}
                      <div className="space-y-2">
                        <label
                          htmlFor="phoneTwo"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaPhoneAlt className="mr-2 text-indigo-500" />
                          Secondary Phone
                        </label>
                        <input
                          type="text"
                          name="phoneTwo"
                          id="phoneTwo"
                          value={newStore.phoneTwo}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-indigo-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none"
                          placeholder="(123) 456-7890"
                        />
                      </div>

                      {/* Address One */}
                      <div className="space-y-2">
                        <label
                          htmlFor="addressOne"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                          Primary Address*
                        </label>
                        <input
                          type="text"
                          name="addressOne"
                          id="addressOne"
                          value={newStore.addressOne}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.addressOne
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-indigo-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none`}
                          placeholder="Enter primary address"
                        />
                        {errors.addressOne && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.addressOne}
                          </p>
                        )}
                      </div>

                      {/* Address Two */}
                      <div className="space-y-2">
                        <label
                          htmlFor="addressTwo"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                          Secondary Address
                        </label>
                        <input
                          type="text"
                          name="addressTwo"
                          id="addressTwo"
                          value={newStore.addressTwo}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-indigo-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none"
                          placeholder="Enter secondary address"
                        />
                      </div>

                      {/* Role */}
                      <div className="space-y-2">
                        <label
                          htmlFor="role"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaUserTag className="mr-2 text-indigo-500" />
                          Role*
                        </label>
                        <select
                          name="role"
                          id="role"
                          value={newStore.role}
                          onChange={handleInputChange}
                          className={`block w-full rounded-xl border-2 ${
                            errors.role
                              ? "border-red-300 ring-2 ring-red-100"
                              : "border-gray-200 focus:border-indigo-500"
                          } px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none`}
                        >
                          <option value="">Select role</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="staff">Staff</option>
                        </select>
                        {errors.role && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.role}
                          </p>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="space-y-2">
                        <label
                          htmlFor="rating"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaStar className="mr-2 text-indigo-500" />
                          Rating
                        </label>
                        <select
                          name="rating"
                          id="rating"
                          value={newStore.rating}
                          onChange={handleInputChange}
                          className="block w-full rounded-xl border-2 border-gray-200 focus:border-indigo-500 px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white focus:outline-none"
                        >
                          <option value="0">Select rating</option>
                          <option value="1">1 Star</option>
                          <option value="2">2 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="5">5 Stars</option>
                        </select>
                      </div>

                      {/* Profile Image Upload */}
                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="profileImg"
                          className="flex items-center text-sm font-semibold text-gray-700"
                        >
                          <FaImage className="mr-2 text-indigo-500" />
                          Profile Image
                        </label>
                        <div className="flex items-center">
                          <label
                            htmlFor="profileImg"
                            className="cursor-pointer flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 transition-all duration-200 w-full"
                          >
                            <input
                              type="file"
                              name="profileImg"
                              id="profileImg"
                              onChange={handleFileChange}
                              className="hidden"
                              accept="image/*"
                            />
                            {newStore.profileImg ? (
                              <div className="flex items-center">
                                <img
                                  src={
                                    URL.createObjectURL(newStore.profileImg) ||
                                    "/placeholder.svg" ||
                                    "/placeholder.svg"
                                  }
                                  alt="Preview"
                                  className="h-12 w-12 rounded-full object-cover mr-3"
                                />
                                <span>Change image</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <FaUpload className="mr-2 text-gray-400" />
                                <span>Click to upload profile image</span>
                              </div>
                            )}
                          </label>
                        </div>
                        {errors.profileImg && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.profileImg}
                          </p>
                        )}
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
