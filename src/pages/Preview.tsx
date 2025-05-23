"use client";

import { useNavigate } from "react-router-dom";
import {
  FaCrown,
  FaStore,
  FaMotorcycle,
  FaArrowRight,
  FaSignInAlt,
} from "react-icons/fa";
import Button from "../components/Button";
import { useEffect } from "react";
import checkAuth from "../helpers/checkAuth";

const Preview = () => {
  const navigate = useNavigate();
  const fetchApi = async () => {
    try {
      const result = await checkAuth();
      console.log(result);
      if (result.status == true) {
        if (result.data && result.data.role == "delivery_agent") {
          navigate("/delivery/dashboard");
          return;
        } else if (result.data && result.data.role == "store") {
          navigate("/store/dashboard");
          return;
        } else if (result.data && result.data.role == "admin") {
          navigate("/admin/dashboard");
          return;
        } else {
          return;
        }
      }
    } catch (error) {
      console.log(error, "is error");
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white  shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-rose-500 flex items-center justify-center text-white">
                <FaStore />
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                FoodDelivery Admin
              </h1>
            </div>
            <p className="mt-2 md:mt-0 text-sm text-gray-500">
              A comprehensive dashboard for food delivery management
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose a Dashboard to Preview
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Explore the different interfaces designed for each role in the food
            delivery ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Admin Role */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="p-5 bg-rose-500 text-white flex items-center justify-center">
              <FaCrown className="text-5xl" />
            </div>
            <div className="px-6 py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Admin Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Complete control over stores, delivery staff, orders, and
                platform settings. Monitor performance and manage all aspects of
                the platform.
              </p>
              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span> Stores
                  management
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span> Delivery staff
                  oversight
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span> Orders tracking
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">✓</span> Revenue
                  analytics
                </li>
              </ul>
              <Button
                fullWidth
                icon={<FaArrowRight />}
                onClick={() => navigate("/admin/dashboard")}
                className="justify-center"
              >
                Preview Admin
              </Button>
            </div>
          </div>

          {/* Store Owner Role */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="p-5 bg-blue-500 text-white flex items-center justify-center">
              <FaStore className="text-5xl" />
            </div>
            <div className="px-6 py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Store Owner Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Manage your restaurant operations, menu items, and track orders.
                Monitor performance and handle customer feedback.
              </p>
              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span> Order management
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span> Menu
                  customization
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span> Promotions setup
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span> Sales analytics
                </li>
              </ul>
              <Button
                fullWidth
                icon={<FaArrowRight />}
                onClick={() => navigate("/store/dashboard")}
                className="justify-center bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
              >
                Preview Store Owner
              </Button>
            </div>
          </div>

          {/* Delivery Role */}
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="p-5 bg-green-500 text-white flex items-center justify-center">
              <FaMotorcycle className="text-5xl" />
            </div>
            <div className="px-6 py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Delivery Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Manage deliveries, track earnings, and optimize your delivery
                routes. Stay connected with customers and restaurants.
              </p>
              <ul className="text-sm text-gray-600 mb-8 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Delivery queue
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Earnings
                  tracking
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Delivery
                  history
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Online/offline
                  status
                </li>
              </ul>
              <Button
                fullWidth
                icon={<FaArrowRight />}
                onClick={() => navigate("/delivery/dashboard")}
                className="justify-center bg-green-500 hover:bg-green-600 focus:ring-green-500"
              >
                Preview Delivery
              </Button>
            </div>
          </div>
        </div>

        <div className=" mt-16 text-center">
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-rose-600 bg-white hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
          >
            <FaSignInAlt className="mr-3 -ml-1 h-5 w-5" />
            Get Started Now
          </button>
        </div>

        {/* Features section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 rounded-md bg-rose-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Real-time Analytics
              </h3>
              <p className="text-gray-600">
                Monitor performance metrics and make data-driven decisions with
                comprehensive dashboards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Order Tracking
              </h3>
              <p className="text-gray-600">
                Track orders in real-time from placement to delivery with status
                updates at every step.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 rounded-md bg-green-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Role-based Access
              </h3>
              <p className="text-gray-600">
                Tailored interfaces for admins, store owners, and delivery
                personnel with appropriate permissions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 rounded-md bg-purple-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Responsive Design
              </h3>
              <p className="text-gray-600">
                Fully responsive interface that works seamlessly across desktop,
                tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-rose-500 flex items-center justify-center text-white">
                <FaStore />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">
                FoodDelivery Admin Dashboard
              </span>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-gray-500">
              &copy; 2025 FoodDelivery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Preview;
