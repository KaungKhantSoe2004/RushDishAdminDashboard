"use client"

import { useState } from "react"
import { FaUser, FaMotorcycle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaEdit } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const DeliveryProfile = () => {
  const [isEditing, setIsEditing] = useState(false)

  // Mock profile data
  const profile = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    joinDate: "Jan 15, 2023",
    rating: 4.8,
    totalDeliveries: 256,
    totalEarnings: "$1,890",
    vehicle: "Motorcycle",
    licenseNumber: "DL-123456",
    vehicleRegistration: "NY-789012",
    zones: ["Manhattan", "Brooklyn"],
    availability: {
      monday: { morning: true, afternoon: true, evening: false },
      tuesday: { morning: true, afternoon: true, evening: false },
      wednesday: { morning: true, afternoon: true, evening: false },
      thursday: { morning: false, afternoon: true, evening: true },
      friday: { morning: false, afternoon: true, evening: true },
      saturday: { morning: false, afternoon: false, evening: true },
      sunday: { morning: false, afternoon: false, evening: false },
    },
  }

  // Reviews
  const reviews = [
    {
      id: 1,
      customer: "Sarah Johnson",
      rating: 5,
      comment: "Very professional and delivered on time!",
      date: "2 days ago",
    },
    {
      id: 2,
      customer: "Michael Brown",
      rating: 4,
      comment: "Good service, food was still hot.",
      date: "1 week ago",
    },
    {
      id: 3,
      customer: "Emily Davis",
      rating: 5,
      comment: "Excellent delivery, very polite!",
      date: "2 weeks ago",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <Button
          variant={isEditing ? "outline" : "primary"}
          icon={isEditing ? null : <FaEdit />}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-500">
                {profile.name.charAt(0)}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{profile.name}</h3>
              <div className="flex items-center mt-1">
                <Badge variant="success">Active</Badge>
                <div className="flex items-center ml-2 text-yellow-500">
                  <FaStar className="mr-1" />
                  <span className="text-sm font-medium">{profile.rating}</span>
                </div>
              </div>

              <div className="w-full mt-6 space-y-4">
                <div className="flex items-start">
                  <FaPhone className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={profile.phone}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-500">{profile.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        defaultValue={profile.email}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-500">{profile.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    {isEditing ? (
                      <textarea
                        defaultValue={profile.address}
                        rows={2}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    ) : (
                      <p className="text-sm text-gray-500">{profile.address}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMotorcycle className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Vehicle</p>
                    {isEditing ? (
                      <select
                        defaultValue={profile.vehicle}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option>Motorcycle</option>
                        <option>Car</option>
                        <option>Bicycle</option>
                        <option>Scooter</option>
                      </select>
                    ) : (
                      <p className="text-sm text-gray-500">{profile.vehicle}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && <Button className="mt-6 w-full">Save Changes</Button>}
            </div>
          </Card>

          <Card title="Delivery Metrics">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaMotorcycle className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-700">Total Deliveries</span>
                </div>
                <span className="font-medium">{profile.totalDeliveries}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaStar className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-700">Rating</span>
                </div>
                <span className="font-medium">{profile.rating}/5</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaUser className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-700">Member Since</span>
                </div>
                <span className="font-medium">{profile.joinDate}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-700">Delivery Zones</span>
                </div>
                <div className="flex flex-wrap justify-end gap-1">
                  {profile.zones.map((zone, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {zone}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Additional Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Information */}
          <Card title="Vehicle Information">
            <div className="space-y-4">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    <input
                      type="text"
                      defaultValue={profile.licenseNumber}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Registration</label>
                    <input
                      type="text"
                      defaultValue={profile.vehicleRegistration}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">License Number</p>
                    <p className="text-sm text-gray-500 mt-1">{profile.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Vehicle Registration</p>
                    <p className="text-sm text-gray-500 mt-1">{profile.vehicleRegistration}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Availability */}
          <Card title="Availability Schedule">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Morning (6AM-12PM)
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Afternoon (12PM-6PM)
                    </th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Evening (6PM-12AM)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(profile.availability).map(([day, slots]) => (
                    <tr key={day}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {day}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-center">
                        {isEditing ? (
                          <input
                            type="checkbox"
                            defaultChecked={slots.morning}
                            className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                          />
                        ) : (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              slots.morning ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {slots.morning ? "Available" : "Unavailable"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-center">
                        {isEditing ? (
                          <input
                            type="checkbox"
                            defaultChecked={slots.afternoon}
                            className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                          />
                        ) : (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              slots.afternoon ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {slots.afternoon ? "Available" : "Unavailable"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-center">
                        {isEditing ? (
                          <input
                            type="checkbox"
                            defaultChecked={slots.evening}
                            className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                          />
                        ) : (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              slots.evening ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {slots.evening ? "Available" : "Unavailable"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Reviews */}
          <Card title="Recent Reviews">
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {review.customer.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{review.customer}</h4>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DeliveryProfile
