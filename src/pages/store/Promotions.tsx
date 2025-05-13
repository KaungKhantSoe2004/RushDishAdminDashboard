"use client"

import { useState } from "react"
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaPercentage, FaTag } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const StorePromotions = () => {
  const [activeTab, setActiveTab] = useState("active")

  // Mock data
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
    {
      id: 5,
      name: "Holiday Special",
      code: "HOLIDAY30",
      discount: "30%",
      minOrder: "$50",
      startDate: "Dec 1, 2025",
      endDate: "Dec 31, 2025",
      status: "Scheduled",
      usageCount: 0,
      description: "Special holiday discount for the festive season.",
    },
  ]

  // Filter promotions based on active tab
  const filteredPromotions = promotions.filter((promo) => {
    if (activeTab === "all") return true
    return promo.status.toLowerCase() === activeTab.toLowerCase()
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Promotions</h1>
        <Button icon={<FaPlus />}>Create Promotion</Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("all")}
          className={`py-4 px-6 border-b-2 font-medium text-sm ${
            activeTab === "all"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          All Promotions
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`py-4 px-6 border-b-2 font-medium text-sm ${
            activeTab === "active"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("scheduled")}
          className={`py-4 px-6 border-b-2 font-medium text-sm ${
            activeTab === "scheduled"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Scheduled
        </button>
        <button
          onClick={() => setActiveTab("expired")}
          className={`py-4 px-6 border-b-2 font-medium text-sm ${
            activeTab === "expired"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Expired
        </button>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promo) => (
          <Card key={promo.id}>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{promo.name}</h3>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant={
                        promo.status === "Active" ? "success" : promo.status === "Scheduled" ? "warning" : "danger"
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
                  <FaTag className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Promo Code</p>
                    <p className="text-sm font-medium text-gray-900">{promo.code}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaPercentage className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Discount</p>
                    <p className="text-sm font-medium text-gray-900">{promo.discount} off</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Validity</p>
                    <p className="text-sm font-medium text-gray-900">
                      {promo.startDate} - {promo.endDate}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500">{promo.description}</p>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <p className="text-sm text-gray-500">Used {promo.usageCount} times</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" icon={<FaEdit />}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" icon={<FaTrash />} className="text-red-500 hover:text-red-600">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPromotions.length === 0 && (
        <Card>
          <div className="py-12 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <FaPercentage size={32} />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No promotions found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {activeTab === "all"
                ? "You haven't created any promotions yet"
                : activeTab === "active"
                  ? "You don't have any active promotions"
                  : activeTab === "scheduled"
                    ? "You don't have any scheduled promotions"
                    : "You don't have any expired promotions"}
            </p>
            <div className="mt-6">
              <Button icon={<FaPlus />}>Create Promotion</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default StorePromotions
