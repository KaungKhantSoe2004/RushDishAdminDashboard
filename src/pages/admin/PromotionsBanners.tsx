"use client";

import { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaPercentage,
  FaImage,
} from "react-icons/fa";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

const PromotionsBanners = () => {
  const [activeTab, setActiveTab] = useState("promotions");

  // Mock promotions data
  const promotions = [
    {
      id: 1,
      name: "Summer Special",
      code: "SUMMER25",
      discount: "25%",
      minOrder: "$20",
      startDate: "Jun 1, 2025",
      endDate: "Aug 31, 2025",
      status: "Active",
      usageCount: 156,
      description: "Get 25% off on all orders above $20 during summer.",
    },
    {
      id: 2,
      name: "Welcome Discount",
      code: "WELCOME15",
      discount: "15%",
      minOrder: "$15",
      startDate: "Jan 1, 2025",
      endDate: "Dec 31, 2025",
      status: "Active",
      usageCount: 342,
      description: "15% off for new customers on their first order.",
    },
    {
      id: 3,
      name: "Weekend Special",
      code: "WEEKEND10",
      discount: "10%",
      minOrder: "$25",
      startDate: "Jan 1, 2025",
      endDate: "Dec 31, 2025",
      status: "Active",
      usageCount: 89,
      description: "10% off on all weekend orders above $25.",
    },
    {
      id: 4,
      name: "Spring Sale",
      code: "SPRING20",
      discount: "20%",
      minOrder: "$30",
      startDate: "Mar 1, 2025",
      endDate: "May 31, 2025",
      status: "Expired",
      usageCount: 203,
      description: "Spring season special discount.",
    },
  ];

  // Mock banners data
  const banners = [
    {
      id: 1,
      title: "Summer Sale",
      image: "https://via.placeholder.com/800x300",
      startDate: "Jun 1, 2025",
      endDate: "Aug 31, 2025",
      status: "Active",
      position: "Home Page Top",
      clicks: 245,
    },
    {
      id: 2,
      title: "New Restaurants",
      image: "https://via.placeholder.com/800x300",
      startDate: "May 1, 2025",
      endDate: "Jul 31, 2025",
      status: "Active",
      position: "Home Page Middle",
      clicks: 187,
    },
    {
      id: 3,
      title: "Free Delivery Weekend",
      image: "https://via.placeholder.com/800x300",
      startDate: "Jun 15, 2025",
      endDate: "Jun 16, 2025",
      status: "Scheduled",
      position: "Home Page Top",
      clicks: 0,
    },
    {
      id: 4,
      title: "Easter Special",
      image: "https://via.placeholder.com/800x300",
      startDate: "Apr 1, 2025",
      endDate: "Apr 10, 2025",
      status: "Expired",
      position: "Home Page Top",
      clicks: 312,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Promotions & Banners
        </h1>
        <Button icon={<FaPlus />}>
          {activeTab === "promotions" ? "Create Promotion" : "Add Banner"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("promotions")}
          className={`py-4 px-6 border-b-2 font-medium text-sm ${
            activeTab === "promotions"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <FaPercentage className="mr-2" />
            Promotions
          </div>
        </button>

        <button
          onClick={() => setActiveTab("banners")}
          className={`py-4 px-6 border-b-2 font-medium text-sm ${
            activeTab === "banners"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <FaImage className="mr-2" />
            Banners
          </div>
        </button>
      </div>

      {/* Promotions Tab */}
      {activeTab === "promotions" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <Card key={promo.id}>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {promo.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Badge
                        variant={
                          promo.status === "Active"
                            ? "success"
                            : promo.status === "Scheduled"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {promo.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-rose-100 text-rose-600">
                    <FaPercentage />
                  </div>
                </div>

                <div className="mt-4 space-y-3 flex-1">
                  <div className="flex items-center">
                    <div className="text-gray-400 mr-2">Code:</div>
                    <div className="text-sm font-medium text-gray-900">
                      {promo.code}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="text-gray-400 mr-2">Discount:</div>
                    <div className="text-sm font-medium text-gray-900">
                      {promo.discount} off
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="text-gray-400 mr-2">Min Order:</div>
                    <div className="text-sm font-medium text-gray-900">
                      {promo.minOrder}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <div className="text-sm text-gray-500">
                      {promo.startDate} - {promo.endDate}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">{promo.description}</p>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Used {promo.usageCount} times
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" icon={<FaEdit />}>
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<FaTrash />}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Banners Tab */}
      {activeTab === "banners" && (
        <div className="space-y-6">
          {banners.map((banner) => (
            <Card key={banner.id}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {banner.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Badge
                          variant={
                            banner.status === "Active"
                              ? "success"
                              : banner.status === "Scheduled"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {banner.status}
                        </Badge>
                        <span className="ml-2 text-sm text-gray-500">
                          {banner.position}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 flex-1">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-gray-400 mr-2" />
                      <div className="text-sm text-gray-500">
                        {banner.startDate} - {banner.endDate}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="text-gray-400 mr-2">Clicks:</div>
                      <div className="text-sm font-medium text-gray-900">
                        {banner.clicks}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                    <Button variant="outline" size="sm" icon={<FaEdit />}>
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<FaTrash />}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromotionsBanners;
