"use client"

import { useState } from "react"
import { FaMoneyBillWave, FaCalendarAlt, FaDownload, FaPlus } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const Payouts = () => {
  const [dateFilter, setDateFilter] = useState("all")

  // Mock data
  const payouts = [
    {
      id: "#PAY-5331",
      amount: "$1,245.50",
      status: "Completed",
      date: "May 1, 2025",
      method: "Bank Transfer",
      reference: "REF123456",
      orders: 45,
    },
    {
      id: "#PAY-5330",
      amount: "$987.25",
      status: "Completed",
      date: "Apr 1, 2025",
      method: "Bank Transfer",
      reference: "REF123455",
      orders: 38,
    },
    {
      id: "#PAY-5329",
      amount: "$1,102.75",
      status: "Completed",
      date: "Mar 1, 2025",
      method: "Bank Transfer",
      reference: "REF123454",
      orders: 42,
    },
    {
      id: "#PAY-5328",
      amount: "$856.50",
      status: "Completed",
      date: "Feb 1, 2025",
      method: "Bank Transfer",
      reference: "REF123453",
      orders: 33,
    },
    {
      id: "#PAY-5327",
      amount: "$1,345.00",
      status: "Completed",
      date: "Jan 1, 2025",
      method: "Bank Transfer",
      reference: "REF123452",
      orders: 51,
    },
  ]

  // Current balance
  const currentBalance = "$1,567.25"
  const pendingOrders = 23
  const estimatedNextPayout = "$1,567.25"
  const nextPayoutDate = "Jun 1, 2025"

  // Filter payouts based on date filter
  const filteredPayouts = payouts.filter((payout) => {
    if (dateFilter === "all") return true
    const payoutDate = new Date(payout.date)
    const currentDate = new Date()
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6)

    if (dateFilter === "3months" && payoutDate >= threeMonthsAgo) return true
    if (dateFilter === "6months" && payoutDate >= sixMonthsAgo) return true

    return false
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Payouts</h1>
        <Button variant="outline" size="sm" icon={<FaDownload />}>
          Download Reports
        </Button>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaMoneyBillWave size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Current Balance</p>
              <h3 className="text-2xl font-bold text-gray-800">{currentBalance}</h3>
              <p className="text-xs text-gray-500 mt-1">From {pendingOrders} pending orders</p>
            </div>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm font-medium text-gray-500">Next Payout</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{estimatedNextPayout}</h3>
            <div className="flex items-center mt-2">
              <FaCalendarAlt className="text-gray-400 mr-1" size={12} />
              <span className="text-xs text-gray-500">Estimated on {nextPayoutDate}</span>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Payout Method</p>
              <h3 className="text-lg font-medium text-gray-800 mt-1">Bank Transfer</h3>
              <p className="text-xs text-gray-500 mt-1">Account ending in ****1234</p>
            </div>
            <Button size="sm" icon={<FaPlus />}>
              Request Payout
            </Button>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Payout History</h2>
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Payouts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payout ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payout.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{payout.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="success">{payout.status}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm" icon={<FaDownload />}>
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPayouts.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <FaMoneyBillWave size={32} />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No payouts found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {dateFilter === "all"
                ? "You haven't received any payouts yet"
                : dateFilter === "3months"
                  ? "You haven't received any payouts in the last 3 months"
                  : "You haven't received any payouts in the last 6 months"}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Payouts
