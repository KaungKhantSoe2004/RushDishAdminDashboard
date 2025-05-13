"use client"

import { useState } from "react"
import { FaCalendarAlt, FaDownload, FaChartLine, FaStore, FaMoneyBillWave } from "react-icons/fa"
import Card from "../../components/Card"
import Button from "../../components/Button"

const EarningsCommissions = () => {
  const [dateFilter, setDateFilter] = useState("month")

  // Mock data
  const earningsSummary = {
    totalRevenue: "$45,890",
    commissions: "$6,883.50",
    deliveryFees: "$4,589",
    netProfit: "$11,472.50",
    growth: "+12.5%",
  }

  // Mock store earnings data
  const storeEarnings = [
    { id: 1, name: "Burger King", orders: 245, revenue: "$5,678", commission: "$851.70", commissionRate: "15%" },
    { id: 2, name: "Pizza Hut", orders: 198, revenue: "$4,890", commission: "$733.50", commissionRate: "15%" },
    { id: 3, name: "Taco Bell", orders: 156, revenue: "$3,245", commission: "$486.75", commissionRate: "15%" },
    { id: 4, name: "KFC", orders: 178, revenue: "$4,123", commission: "$618.45", commissionRate: "15%" },
    { id: 5, name: "Subway", orders: 134, revenue: "$2,987", commission: "$448.05", commissionRate: "15%" },
    { id: 6, name: "McDonald's", orders: 267, revenue: "$5,432", commission: "$814.80", commissionRate: "15%" },
    { id: 7, name: "Wendy's", orders: 112, revenue: "$2,345", commission: "$351.75", commissionRate: "15%" },
    { id: 8, name: "Chipotle", orders: 145, revenue: "$3,678", commission: "$551.70", commissionRate: "15%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Earnings & Commissions</h1>
        <Button variant="outline" size="sm" icon={<FaDownload />}>
          Export Report
        </Button>
      </div>

      {/* Date Filter */}
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Earnings Overview</h2>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-rose-100 text-rose-600">
              <FaMoneyBillWave size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-800">{earningsSummary.totalRevenue}</h3>
                <span className="ml-2 text-xs font-medium text-green-600">{earningsSummary.growth}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaMoneyBillWave size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Commissions</p>
              <h3 className="text-2xl font-bold text-gray-800">{earningsSummary.commissions}</h3>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaMoneyBillWave size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Delivery Fees</p>
              <h3 className="text-2xl font-bold text-gray-800">{earningsSummary.deliveryFees}</h3>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FaMoneyBillWave size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Net Profit</p>
              <h3 className="text-2xl font-bold text-gray-800">{earningsSummary.netProfit}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Trend">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <FaChartLine className="mx-auto text-gray-400" size={48} />
              <p className="mt-4 text-gray-500">Revenue trend chart would go here</p>
            </div>
          </div>
        </Card>

        <Card title="Top Earning Stores">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <FaStore className="mx-auto text-gray-400" size={48} />
              <p className="mt-4 text-gray-500">Top earning stores chart would go here</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Store Earnings Table */}
      <Card title="Store-wise Earnings Breakdown">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {storeEarnings.map((store) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.revenue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{store.commission}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.commissionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default EarningsCommissions
