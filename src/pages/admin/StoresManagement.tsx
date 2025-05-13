"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch, FaFilter, FaPlus, FaEye, FaCheck, FaBan } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const StoresManagement = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data
  const stores = [
    { id: 1, name: "Burger King", city: "New York", status: "Active", owner: "John Smith", rating: 4.5 },
    { id: 2, name: "Pizza Hut", city: "Los Angeles", status: "Active", owner: "Sarah Johnson", rating: 4.2 },
    { id: 3, name: "Taco Bell", city: "Chicago", status: "Pending", owner: "Michael Brown", rating: 0 },
    { id: 4, name: "KFC", city: "Houston", status: "Active", owner: "Emily Davis", rating: 3.8 },
    { id: 5, name: "Subway", city: "Phoenix", status: "Suspended", owner: "David Wilson", rating: 3.5 },
    { id: 6, name: "McDonald's", city: "Philadelphia", status: "Active", owner: "Lisa Anderson", rating: 4.0 },
    { id: 7, name: "Wendy's", city: "San Antonio", status: "Pending", owner: "Robert Martinez", rating: 0 },
    { id: 8, name: "Chipotle", city: "San Diego", status: "Active", owner: "Jennifer Taylor", rating: 4.3 },
    { id: 9, name: "Domino's", city: "Dallas", status: "Suspended", owner: "James Thomas", rating: 2.9 },
    { id: 10, name: "Starbucks", city: "San Jose", status: "Active", owner: "Patricia Garcia", rating: 4.1 },
  ]

  // Filter stores based on search term and status filter
  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || store.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Stores Management</h1>
        <Button icon={<FaPlus />}>Add New Store</Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <Button variant="outline" size="sm">
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Stores Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Store Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        {store.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{store.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        store.status === "Active" ? "success" : store.status === "Pending" ? "warning" : "danger"
                      }
                    >
                      {store.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {store.rating > 0 ? `${store.rating}/5` : "Not rated"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {store.status === "Pending" && (
                        <Button
                          variant="success"
                          size="sm"
                          icon={<FaCheck />}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Approve
                        </Button>
                      )}
                      {store.status === "Active" && (
                        <Button variant="danger" size="sm" icon={<FaBan />}>
                          Suspend
                        </Button>
                      )}
                      {store.status === "Suspended" && (
                        <Button
                          variant="success"
                          size="sm"
                          icon={<FaCheck />}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Activate
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<FaEye />}
                        onClick={() => navigate(`/admin/stores/${store.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                <span className="font-medium">20</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <Button variant="outline" size="sm" className="rounded-l-md">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-rose-50 text-rose-600">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm" className="rounded-r-md">
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default StoresManagement
