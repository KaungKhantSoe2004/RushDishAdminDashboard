"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaSave,
  FaUser,
  FaMotorcycle,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

const AssignArea = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedZones, setSelectedZones] = useState(["Manhattan"]);
  const [selectedShifts, setSelectedShifts] = useState(["morning"]);

  // Mock data for the delivery staff member
  const staffMember = {
    id: id,
    name: "John Smith",
    currentZone: "Manhattan",
    vehicleType: "Motorcycle",
    status: "Online",
  };

  const availableZones = [
    {
      id: "manhattan",
      name: "Manhattan",
      description: "Downtown and Midtown areas",
      activeOrders: 45,
      avgDeliveryTime: "25 mins",
      difficulty: "High",
    },
    {
      id: "brooklyn",
      name: "Brooklyn",
      description: "Brooklyn Heights, DUMBO, Williamsburg",
      activeOrders: 32,
      avgDeliveryTime: "30 mins",
      difficulty: "Medium",
    },
    {
      id: "queens",
      name: "Queens",
      description: "Long Island City, Astoria",
      activeOrders: 28,
      avgDeliveryTime: "35 mins",
      difficulty: "Medium",
    },
    {
      id: "bronx",
      name: "Bronx",
      description: "South Bronx, Yankee Stadium area",
      activeOrders: 18,
      avgDeliveryTime: "32 mins",
      difficulty: "Low",
    },
    {
      id: "staten-island",
      name: "Staten Island",
      description: "St. George, Stapleton",
      activeOrders: 12,
      avgDeliveryTime: "40 mins",
      difficulty: "Low",
    },
  ];

  const shifts = [
    {
      id: "morning",
      name: "Morning Shift",
      time: "6:00 AM - 2:00 PM",
      description: "Breakfast and lunch rush",
      demand: "High",
    },
    {
      id: "afternoon",
      name: "Afternoon Shift",
      time: "2:00 PM - 10:00 PM",
      description: "Lunch and dinner rush",
      demand: "Very High",
    },
    {
      id: "night",
      name: "Night Shift",
      time: "10:00 PM - 6:00 AM",
      description: "Late night orders",
      demand: "Medium",
    },
  ];

  const handleZoneToggle = (zoneName) => {
    setSelectedZones((prev) =>
      prev.includes(zoneName)
        ? prev.filter((z) => z !== zoneName)
        : [...prev, zoneName]
    );
  };

  const handleShiftToggle = (shiftId) => {
    setSelectedShifts((prev) =>
      prev.includes(shiftId)
        ? prev.filter((s) => s !== shiftId)
        : [...prev, shiftId]
    );
  };

  const handleSave = () => {
    console.log("Saving assignment:", {
      zones: selectedZones,
      shifts: selectedShifts,
    });
    alert("Area assignment updated successfully!");
    navigate("/admin/delivery");
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case "Very High":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/delivery")}
            className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to Delivery Staff
          </button>

          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold mr-6">
                  {staffMember.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Assign Delivery Areas
                  </h1>
                  <p className="text-emerald-100 text-lg">
                    Configure zones and shifts for {staffMember.name}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSave}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center"
              >
                <FaSave className="mr-2" />
                Save Assignment
              </button>
            </div>
          </div>
        </div>

        {/* Staff Info Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Staff Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center">
              <FaUser className="text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{staffMember.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Current Zone</p>
                <p className="font-medium">{staffMember.currentZone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaMotorcycle className="text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="font-medium">{staffMember.vehicleType}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="text-emerald-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    staffMember.status === "Online"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {staffMember.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Zones */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaMapMarkerAlt className="mr-3 text-emerald-500" />
              Delivery Zones
            </h2>
            <div className="space-y-4">
              {availableZones.map((zone) => (
                <div
                  key={zone.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                    selectedZones.includes(zone.name)
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                  onClick={() => handleZoneToggle(zone.name)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          selectedZones.includes(zone.name)
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedZones.includes(zone.name) && (
                          <FaCheckCircle className="text-white text-xs" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {zone.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {zone.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(
                        zone.difficulty
                      )}`}
                    >
                      {zone.difficulty}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Active Orders</p>
                      <p className="font-medium text-blue-600">
                        {zone.activeOrders}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Avg Delivery Time</p>
                      <p className="font-medium text-gray-900">
                        {zone.avgDeliveryTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shift Schedule */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaCheckCircle className="mr-3 text-emerald-500" />
              Shift Schedule
            </h2>
            <div className="space-y-4">
              {shifts.map((shift) => (
                <div
                  key={shift.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                    selectedShifts.includes(shift.id)
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                  onClick={() => handleShiftToggle(shift.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          selectedShifts.includes(shift.id)
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedShifts.includes(shift.id) && (
                          <FaCheckCircle className="text-white text-xs" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {shift.name}
                        </h3>
                        <p className="text-sm text-gray-500">{shift.time}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDemandColor(
                        shift.demand
                      )}`}
                    >
                      {shift.demand} Demand
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{shift.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Assignment Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Selected Zones</h3>
              {selectedZones.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedZones.map((zone) => (
                    <span
                      key={zone}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
                    >
                      {zone}
                      <button
                        onClick={() => handleZoneToggle(zone)}
                        className="ml-2 text-emerald-600 hover:text-emerald-800"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No zones selected</p>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">
                Selected Shifts
              </h3>
              {selectedShifts.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedShifts.map((shiftId) => {
                    const shift = shifts.find((s) => s.id === shiftId);
                    return (
                      <span
                        key={shiftId}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {shift?.name}
                        <button
                          onClick={() => handleShiftToggle(shiftId)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No shifts selected</p>
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => navigate("/admin/delivery")}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
              >
                <FaSave className="mr-2" />
                Save Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignArea;
