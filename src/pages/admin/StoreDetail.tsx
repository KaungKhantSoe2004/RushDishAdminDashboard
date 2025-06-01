"use client";

import type React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import ProtectRoute from "../../helpers/protectRoute";

interface Store {
  id: number;
  name: string;
  status: string;
  owner: string;
  email: string;
  phone_one: string;
  phone_two?: string;
  address_one: string;
  address_two?: string;
  joinDate: string;
  rating: number;
  totalOrders: number;
  totalRevenue: string;
  commission: string;
  description: string;
  openingHours: string;
  deliveryAreas: string[];
  profile?: string;
  profileImg: File | null;
}

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  validFrom: string;
  validTo: string;
  status: "active" | "inactive" | "expired";
  minOrder?: string;
}

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

interface Order {
  id: string;
  customer: string;
  status: string;
  amount: string;
  date: string;
}

interface Review {
  id: number;
  customer: string;
  rating: number;
  comment: string;
  date: string;
}

// Simple SVG Icons
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const BanIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" />
  </svg>
);

const UtensilsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12.88 11.53z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z" />
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.01 3.01 0 0 0 17.1 6H16c-.8 0-1.54.37-2.03.97L12 9.5l-1.97-2.53A2.99 2.99 0 0 0 8 6H6.9c-1.3 0-2.44.84-2.86 2.05L1.5 16H4v6h4v-6h2v6h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5z" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

const CameraIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0-8c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0-1L9 4H7l-1 1H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3l-1-1h-2L12 6z" />
  </svg>
);

const GiftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
  </svg>
);

export default function StoreDetailPage() {
  const [activeTab, setActiveTab] = useState("menu");
  const [file, setFile] = useState<null | File>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (id == undefined) {
    navigate(-1);
  }
  const [storeId, setStoreId] = useState(id);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(
    null
  );

  // Store data state
  const [store, setStore] = useState<Store>({
    id: Number(storeId),
    name: "Burger King",
    status: "Active",
    owner: "John Smith",
    email: "john@burgerking.com",
    phone_one: "+1 (555) 123-4567",
    phone_two: "+1 (555) 123-4568",
    address_one: "123 Main St, New York, NY 10001",
    address_two: "Suite 100",
    joinDate: "Jan 15, 2023",
    rating: 4.5,
    totalOrders: 1256,
    totalRevenue: "$45,890",
    commission: "15%",
    description:
      "Burger King is an American multinational chain of hamburger fast food restaurants.",
    openingHours: "Mon-Sun: 10:00 AM - 10:00 PM",
    deliveryAreas: ["Manhattan", "Brooklyn", "Queens"],
    profile: "/placeholder.svg?height=100&width=100",
    profileImg: null,
  });

  const [editForm, setEditForm] = useState<Store>(store);

  // Validation state
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [isFormValid, setIsFormValid] = useState(true);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""));
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateRating = (rating: number): boolean => {
    return rating >= 0 && rating <= 5;
  };

  const validateForm = (formData: Store): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    // Required field validations
    if (!validateRequired(formData.name)) {
      errors.name = "Store name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Store name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      errors.name = "Store name must be less than 100 characters";
    }

    if (!validateRequired(formData.owner)) {
      errors.owner = "Owner name is required";
    } else if (formData.owner.trim().length < 2) {
      errors.owner = "Owner name must be at least 2 characters";
    } else if (formData.owner.trim().length > 50) {
      errors.owner = "Owner name must be less than 50 characters";
    }

    if (!validateRequired(formData.email)) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!validateRequired(formData.phone_one)) {
      errors.phone_one = "Primary phone is required";
    } else if (!validatePhone(formData.phone_one)) {
      errors.phone_one = "Please enter a valid phone number";
    }

    // Optional phone validation
    if (
      formData.phone_two &&
      formData.phone_two.trim() !== "" &&
      !validatePhone(formData.phone_two)
    ) {
      errors.phone_two = "Please enter a valid phone number";
    }

    if (!validateRequired(formData.address_one)) {
      errors.address_one = "Primary address is required";
    } else if (formData.address_one.trim().length < 10) {
      errors.address_one = "Address must be at least 10 characters";
    } else if (formData.address_one.trim().length > 200) {
      errors.address_one = "Address must be less than 200 characters";
    }

    // Optional address validation
    if (
      formData.address_two &&
      formData.address_two.trim() !== "" &&
      formData.address_two.trim().length > 200
    ) {
      errors.address_two = "Address must be less than 200 characters";
    }

    if (!validateRating(formData.rating)) {
      errors.rating = "Rating must be between 0 and 5";
    }

    return errors;
  };

  const handleInputChange = (field: keyof Store, value: string | number) => {
    const updatedForm = { ...editForm, [field]: value };
    setEditForm(updatedForm);

    // Real-time validation
    const errors = validateForm(updatedForm);
    setValidationErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  // Promotions state
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 20% off on all burgers during weekends",
      discount: "20%",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      status: "active",
      minOrder: "$15",
    },
    {
      id: 2,
      title: "Free Delivery",
      description: "Free delivery on orders above $25",
      discount: "Free Delivery",
      validFrom: "2024-01-01",
      validTo: "2024-06-30",
      status: "active",
      minOrder: "$25",
    },
  ]);

  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    title: "",
    description: "",
    discount: "",
    validFrom: "",
    validTo: "",
    status: "active",
    minOrder: "",
  });

  // Mock data
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Whopper",
      category: "Burgers",
      price: "$5.99",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Chicken Royale",
      category: "Chicken",
      price: "$4.99",
      image:
        "https://images.unsplash.com/photo-1562967914-608f82629710?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Fries (Large)",
      category: "Sides",
      price: "$2.99",
      image:
        "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Onion Rings",
      category: "Sides",
      price: "$2.49",
      image:
        "https://images.unsplash.com/photo-1639024471283-03518883512d?w=80&h=80&fit=crop&crop=center",
    },
    {
      id: 5,
      name: "Coca-Cola",
      category: "Drinks",
      price: "$1.99",
      image:
        "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=80&h=80&fit=crop&crop=center",
    },
  ];

  const orders: Order[] = [
    {
      id: "#ORD-5331",
      customer: "John Smith",
      status: "Delivered",
      amount: "$24.50",
      date: "Today, 10:30 AM",
    },
    {
      id: "#ORD-5330",
      customer: "Sarah Johnson",
      status: "Preparing",
      amount: "$36.00",
      date: "Today, 09:15 AM",
    },
    {
      id: "#ORD-5329",
      customer: "Michael Brown",
      status: "Cancelled",
      amount: "$18.75",
      date: "Yesterday, 7:45 PM",
    },
    {
      id: "#ORD-5328",
      customer: "Emily Davis",
      status: "Delivered",
      amount: "$29.25",
      date: "Yesterday, 6:20 PM",
    },
    {
      id: "#ORD-5327",
      customer: "David Wilson",
      status: "Delivered",
      amount: "$15.50",
      date: "Yesterday, 2:10 PM",
    },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      customer: "John Smith",
      rating: 5,
      comment: "Great food and fast delivery!",
      date: "2 days ago",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      rating: 4,
      comment: "Food was good but delivery was a bit late.",
      date: "1 week ago",
    },
    {
      id: 3,
      customer: "Michael Brown",
      rating: 3,
      comment: "Average experience, nothing special.",
      date: "2 weeks ago",
    },
    {
      id: 4,
      customer: "Emily Davis",
      rating: 5,
      comment: "Excellent service and delicious food!",
      date: "3 weeks ago",
    },
    {
      id: 5,
      customer: "David Wilson",
      rating: 4,
      comment: "Good value for money.",
      date: "1 month ago",
    },
  ];

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!ProtectRoute()) {
        navigate("/login");
        return;
      }
      // Replace with your actual API call
      const response = await axios.get(
        `http://localhost:1500/api/admin/eachStore/${storeId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status != 200) {
        throw new Error("Failed to fetch store data");
      }

      const data = await response.data;
      setStore(data.data);
      console.log(data.data.profile);
      setEditForm(data.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching store data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setError(null);

      // Validate form before submission
      const errors = validateForm(editForm);
      setValidationErrors(errors);

      if (Object.keys(errors).length > 0) {
        setError("Please fix the validation errors before submitting");
        setIsFormValid(false);
        return;
      }

      console.log(editForm);
      const formData = new FormData();
      if (storeId !== undefined) {
        formData.append("id", storeId);
      }
      formData.append("name", editForm.name.trim());
      formData.append("owner", editForm.owner.trim());
      formData.append("email", editForm.email.trim());
      formData.append("phone_one", editForm.phone_one.trim());
      formData.append("phone_two", editForm.phone_two?.trim() || "");
      formData.append("address_one", editForm.address_one.trim());
      formData.append("address_two", editForm.address_two?.trim() || "");
      formData.append("status", editForm.status);
      formData.append("rating", editForm.rating.toString());
      console.log(file);
      if (file) {
        formData.append("storeLogo", file);
      }
      console.log(formData);
      const response = await axios.post(
        `http://localhost:1500/api/admin/updateStore`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status != 200) {
        throw new Error("Failed to update store");
        return;
      }

      setStore(editForm);
      setIsEditing(false);
      setValidationErrors({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update store");
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("failed to update store");
      }
    }
  };

  const handleDelete = async () => {
    try {
      setError(null);

      const response = await axios.delete(
        `http://localhost:1500/api/admin/deleteStore/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        navigate(-1);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete store status"
      );
    }
  };

  const handleAddPromotion = () => {
    if (
      newPromotion.title &&
      newPromotion.description &&
      newPromotion.discount
    ) {
      const promotion: Promotion = {
        id: Date.now(),
        title: newPromotion.title!,
        description: newPromotion.description!,
        discount: newPromotion.discount!,
        validFrom: newPromotion.validFrom!,
        validTo: newPromotion.validTo!,
        status: newPromotion.status as "active" | "inactive" | "expired",
        minOrder: newPromotion.minOrder,
      };

      setPromotions([...promotions, promotion]);
      setNewPromotion({
        title: "",
        description: "",
        discount: "",
        validFrom: "",
        validTo: "",
        status: "active",
        minOrder: "",
      });
      setIsPromotionDialogOpen(false);
    }
  };

  const handleDeletePromotion = (id: number) => {
    setPromotions(promotions.filter((p) => p.id !== id));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      if (!file.type.match("image.*")) {
        alert("File type must be img");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File data must be 5 mb or lower");
        return;
      }
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditForm({ ...editForm, profile: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
      case "preparing":
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
      case "cancelled":
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, [storeId]);

  useEffect(() => {
    setEditForm(store);
  }, [store]);

  useEffect(() => {
    if (!isEditing) {
      setValidationErrors({});
      setIsFormValid(true);
    }
  }, [isEditing]);

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
    <div className="container mx-auto p-6 space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
          <WarningIcon />
          <span className="text-red-800 ml-2">{error}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{store.name}</h1>
            <div className="flex items-center mt-1 gap-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                  store.status
                )}`}
              >
                {store.status}
              </span>
              <div className="flex items-center text-yellow-500">
                <StarIcon filled />
                <span className="text-sm font-medium ml-1">{store.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
            onClick={() => {
              if (isEditing) {
                // Reset form to original store data when canceling
                setEditForm(store);
              }
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? <CloseIcon /> : <EditIcon />}
            <span className="ml-2">{isEditing ? "Cancel" : "Edit"}</span>
          </button>
          {store.status === "Active" ? (
            <button
              className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              onClick={() => handleStatusChange("Suspended")}
            >
              <BanIcon />
              <span className="ml-2">Suspend Store</span>
            </button>
          ) : (
            <button
              className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-green-700 flex items-center"
              onClick={() => handleDelete()}
            >
              <FaTrash />
              <span className="ml-2">Delete</span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Store Profile */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {(isEditing ? editForm.profile : store.profile) ? (
                      <img
                        src={
                          isEditing && editForm.profile
                            ? editForm.profile.startsWith("data:")
                              ? editForm.profile
                              : editForm.profile.startsWith("http")
                              ? editForm.profile
                              : `http://localhost:1500/${editForm.profile}`
                            : store.profile
                            ? store.profile.startsWith("data:")
                              ? store.profile
                              : store.profile.startsWith("http")
                              ? store.profile
                              : `http://localhost:1500/${store.profile}`
                            : ""
                        }
                        alt={store.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <span
                      className={`text-2xl font-semibold text-gray-600 ${
                        (isEditing ? editForm.profile : store.profile)
                          ? "hidden"
                          : ""
                      }`}
                    >
                      {store.name.charAt(0)}
                    </span>
                  </div>
                  {isEditing && (
                    <label className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                      <CameraIcon />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {isEditing ? (
                  <div className="w-full mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Store Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          validationErrors.name
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        value={editForm.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        maxLength={100}
                      />
                      {validationErrors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="owner"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Owner <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="owner"
                        type="text"
                        required
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          validationErrors.owner
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        value={editForm.owner}
                        onChange={(e) =>
                          handleInputChange("owner", e.target.value)
                        }
                        maxLength={50}
                      />
                      {validationErrors.owner && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.owner}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        disabled
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          validationErrors.email
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        value={editForm.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                      {validationErrors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone_one"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Primary Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone_one"
                        type="tel"
                        required
                        pattern="^(\+95|09)\d{7,10}$"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          validationErrors.phone_one
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        value={editForm.phone_one}
                        onChange={(e) =>
                          handleInputChange("phone_one", e.target.value)
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                      {validationErrors.phone_one && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.phone_one}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone_two"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Secondary Phone
                      </label>
                      <input
                        id="phone_two"
                        type="tel"
                        required
                        pattern="^(\+95|09)\d{7,10}$"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          validationErrors.phone_two
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        value={editForm.phone_two || ""}
                        onChange={(e) =>
                          handleInputChange("phone_two", e.target.value)
                        }
                        placeholder="+1 (555) 123-4568"
                      />
                      {validationErrors.phone_two && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.phone_two}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="address_one"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Primary Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="address_one"
                        type="text"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          validationErrors.address_one
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        value={editForm.address_one}
                        onChange={(e) =>
                          handleInputChange("address_one", e.target.value)
                        }
                        maxLength={200}
                      />
                      {validationErrors.address_one && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.address_one}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="address_two"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Secondary Address
                      </label>
                      <input
                        id="address_two"
                        type="text"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          validationErrors.address_two
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        value={editForm.address_two || ""}
                        onChange={(e) =>
                          handleInputChange("address_two", e.target.value)
                        }
                        maxLength={200}
                      />
                      {validationErrors.address_two && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.address_two}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="rating"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Rating <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          validationErrors.rating
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        value={editForm.rating}
                        onChange={(e) =>
                          handleInputChange(
                            "rating",
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                      {validationErrors.rating && (
                        <p className="mt-1 text-sm text-red-600">
                          {validationErrors.rating}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Account Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={editForm.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSaveEdit}
                      disabled={!isFormValid}
                      className={`w-full px-4 py-2 rounded-md flex items-center justify-center ${
                        isFormValid
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <SaveIcon />
                      <span className="ml-2">Save Changes</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="mt-4 text-xl font-semibold text-gray-800">
                      {store.name}
                    </h3>
                    <p className="text-sm text-gray-500 text-center">
                      {store.description}
                    </p>

                    <div className="w-full mt-6 space-y-4">
                      <div className="flex items-start">
                        <MapIcon />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700">
                            Address
                          </p>
                          <p className="text-sm text-gray-500">
                            {store.address_one}
                          </p>
                          {store.address_two && (
                            <p className="text-sm text-gray-500">
                              {store.address_two}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <PhoneIcon />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700">
                            Phone
                          </p>
                          <p className="text-sm text-gray-500">
                            {store.phone_one}
                          </p>
                          {store.phone_two && (
                            <p className="text-sm text-gray-500">
                              {store.phone_two}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <EmailIcon />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700">
                            Email
                          </p>
                          <p className="text-sm text-gray-500">{store.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <CalendarIcon />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-700">
                            Joined
                          </p>
                          <p className="text-sm text-gray-500">
                            {store.joinDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Store Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShoppingBagIcon />
                    <span className="text-sm text-gray-700 ml-2">
                      Total Orders
                    </span>
                  </div>
                  <span className="font-medium">{store.totalOrders}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DollarIcon />
                    <span className="text-sm text-gray-700 ml-2">
                      Total Revenue
                    </span>
                  </div>
                  <span className="font-medium">{store.totalRevenue}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <UsersIcon />
                    <span className="text-sm text-gray-700 ml-2">
                      Commission Rate
                    </span>
                  </div>
                  <span className="font-medium">{store.commission}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tabs Content */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {[
                  { id: "menu", label: "Menu", icon: UtensilsIcon },
                  { id: "orders", label: "Orders", icon: ShoppingBagIcon },
                  { id: "promotions", label: "Promotions", icon: GiftIcon },
                  { id: "info", label: "Info", icon: InfoIcon },
                  { id: "reviews", label: "Reviews", icon: StarIcon },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "menu" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Menu Items
                  </h3>
                  <div className="space-y-4">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=${encodeURIComponent(
                              item.name.charAt(0)
                            )}`;
                          }}
                        />
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {item.category}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Orders
                  </h3>
                  <div className="overflow-x-auto">
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
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {order.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "promotions" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Promotions
                      </h3>
                      <p className="text-sm text-gray-500">
                        Manage store promotions and offers
                      </p>
                    </div>
                    <button
                      onClick={() => setIsPromotionDialogOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <PlusIcon />
                      <span className="ml-2">Add Promotion</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {promotions.map((promotion) => (
                      <div
                        key={promotion.id}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{promotion.title}</h4>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(
                                  promotion.status
                                )}`}
                              >
                                {promotion.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {promotion.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Discount: {promotion.discount}</span>
                              <span>
                                Valid: {promotion.validFrom} to{" "}
                                {promotion.validTo}
                              </span>
                              {promotion.minOrder && (
                                <span>Min Order: {promotion.minOrder}</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeletePromotion(promotion.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    ))}
                    {promotions.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No promotions found. Add your first promotion to get
                        started.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "info" && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Business Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Description
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {store.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Opening Hours
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {store.openingHours}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Delivery Areas
                        </h4>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {store.deliveryAreas.map((area, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Owner Information
                    </h3>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-600">
                          {store.owner.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          {store.owner}
                        </h4>
                        <p className="text-sm text-gray-500">{store.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Customer Reviews
                  </h3>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-semibold text-gray-600">
                                {review.customer.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">
                                {review.customer}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {review.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} filled={i < review.rating} />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-600">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Dialog */}
      {isPromotionDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Add New Promotion
                </h3>
                <button
                  onClick={() => setIsPromotionDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <CloseIcon />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Create a new promotion for this store.
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="promo-title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="promo-title"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPromotion.title}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter promotion title"
                  />
                </div>
                <div>
                  <label
                    htmlFor="promo-description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="promo-description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPromotion.description}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter promotion description"
                  />
                </div>
                <div>
                  <label
                    htmlFor="promo-discount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Discount
                  </label>
                  <input
                    id="promo-discount"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPromotion.discount}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        discount: e.target.value,
                      })
                    }
                    placeholder="e.g., 20% or $5 off"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="promo-from"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Valid From
                    </label>
                    <input
                      id="promo-from"
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newPromotion.validFrom}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          validFrom: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="promo-to"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Valid To
                    </label>
                    <input
                      id="promo-to"
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newPromotion.validTo}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          validTo: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="promo-min-order"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Minimum Order (Optional)
                  </label>
                  <input
                    id="promo-min-order"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPromotion.minOrder}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        minOrder: e.target.value,
                      })
                    }
                    placeholder="e.g., $25"
                  />
                </div>
                <div>
                  <label
                    htmlFor="promo-status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="promo-status"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPromotion.status}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        status: e.target.value as
                          | "active"
                          | "inactive"
                          | "expired",
                      })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsPromotionDialogOpen(false)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPromotion}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Promotion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
