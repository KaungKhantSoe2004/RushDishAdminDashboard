"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCrown,
  FaStore,
  FaMotorcycle,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const backendDomain: string = "http://localhost:1500";
  console.log(backendDomain, "is backend domain");
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const adminHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await axios.post(
        `${backendDomain}/api/admin/adminLogin`,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status == 200) {
        setIsLoading(false);
        navigate("/admin/dashboard");
      }
    } catch (error: Error | any) {
      if (error.response.data.message) {
        setIsLoading(false);
        setError(error.response.data.message);
        console.log("it is ok bro");
      }
    }
  };

  const handleLogin = async (e: Event) => {
    console.log("loggin in");
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // dispatch({});
    setTimeout(() => {
      setIsLoading(false);
      if (!email || !password || email == "" || password == "") {
        console.log("error");
        return;
      }
      // In a real app, you would verify credentials with your backend
      switch (selectedRole) {
        case "admin":
          adminHandler(email, password);
          break;

        case "store":
          navigate("/store/dashboard");
          break;
        case "delivery":
          navigate("/delivery/dashboard");
          break;
        default:
          navigate("/admin/dashboard");
      }
    }, 1500);
  };

  const roleOptions = [
    {
      id: "admin",
      label: "Admin",
      icon: <FaCrown className="text-xl" />,
      description: "Platform administrator with full access",
      color: "bg-rose-500",
    },
    {
      id: "store",
      label: "Store Owner",
      icon: <FaStore className="text-xl" />,
      description: "Manage your restaurant operations",
      color: "bg-blue-500",
    },
    {
      id: "delivery",
      label: "Delivery Agent",
      icon: <FaMotorcycle className="text-xl" />,
      description: "Manage deliveries and track earnings",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center text-white">
            <FaStore className="text-2xl" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          FoodDelivery Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account based on your role
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select your role
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {roleOptions.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`cursor-pointer rounded-lg border ${
                    selectedRole === role.id
                      ? `border-2 ${role.color.replace(
                          "bg",
                          "border"
                        )} ring-2 ${role.color.replace(
                          "bg",
                          "ring"
                        )} ring-opacity-20`
                      : "border-gray-300 hover:border-gray-400"
                  } p-4 transition-all duration-200`}
                >
                  <div className="flex items-center">
                    <div
                      className={`${role.color} w-10 h-10 rounded-full flex items-center justify-center text-white mr-3`}
                    >
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {role.label}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-3 pl-10 pr-10 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-rose-500 hover:text-rose-600"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleLogin}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  selectedRole === "admin"
                    ? "bg-rose-500 hover:bg-rose-600"
                    : selectedRole === "store"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-green-500 hover:bg-green-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  selectedRole === "admin"
                    ? "focus:ring-rose-500"
                    : selectedRole === "store"
                    ? "focus:ring-blue-500"
                    : "focus:ring-green-500"
                } transition-colors duration-200 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  `Sign in as ${
                    roleOptions.find((r) => r.id === selectedRole)?.label
                  }`
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to FoodDelivery?
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Contact support for account creation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center">
        <p className="text-xs text-gray-500">
          &copy; 2025 FoodDelivery. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
