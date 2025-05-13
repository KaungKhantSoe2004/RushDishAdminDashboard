import { FaShoppingBag, FaMoneyBillWave, FaClock, FaStar, FaArrowUp, FaArrowDown } from "react-icons/fa"
import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"

const StoreOwnerDashboard = () => {
  // Mock data
  const kpiData = [
    {
      title: "Today's Orders",
      value: 24,
      change: 8.5,
      changeType: "increase",
      icon: <FaShoppingBag className="text-rose-500" size={24} />,
    },
    {
      title: "Income",
      value: "$1,459",
      change: 4.2,
      changeType: "increase",
      icon: <FaMoneyBillWave className="text-rose-500" size={24} />,
    },
    {
      title: "Avg Delivery Time",
      value: "24",
      suffix: "min",
      change: 2.4,
      changeType: "decrease",
      icon: <FaClock className="text-rose-500" size={24} />,
    },
    {
      title: "Rating",
      value: 4.8,
      suffix: "/5",
      change: 0.3,
      changeType: "increase",
      icon: <FaStar className="text-rose-500" size={24} />,
    },
  ]

  const pendingOrders = [
    { id: "#ORD-5331", customer: "John Smith", items: 3, status: "Preparing", amount: "$24.50", time: "10 min ago" },
    { id: "#ORD-5330", customer: "Sarah Johnson", items: 2, status: "New", amount: "$36.00", time: "15 min ago" },
    {
      id: "#ORD-5329",
      customer: "Michael Brown",
      items: 4,
      status: "Ready for Pickup",
      amount: "$18.75",
      time: "25 min ago",
    },
    { id: "#ORD-5328", customer: "Emily Davis", items: 1, status: "New", amount: "$29.25", time: "30 min ago" },
    { id: "#ORD-5327", customer: "David Wilson", items: 2, status: "Preparing", amount: "$15.50", time: "45 min ago" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Store Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            View Reports
          </Button>
          <Button size="sm">Manage Menu</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="border-l-4 border-l-rose-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {kpi.value}
                  {kpi.suffix || ""}
                </h3>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-xs font-medium flex items-center ${
                      kpi.changeType === "increase" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {kpi.changeType === "increase" ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                    {kpi.change}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs yesterday</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-rose-50">{kpi.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts and Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Sales This Week" className="lg:col-span-2">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Line chart showing sales over time would go here</p>
          </div>
        </Card>

        <Card title="Pending Orders" subtitle="Orders requiring action">
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <div key={order.id} className="flex flex-col p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{order.id}</h4>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                  <Badge
                    variant={
                      order.status === "Ready for Pickup"
                        ? "success"
                        : order.status === "Preparing"
                          ? "warning"
                          : "info"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="text-sm font-medium">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-medium">{order.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Items</p>
                    <p className="text-sm font-medium">{order.items}</p>
                  </div>
                </div>

                <div className="mt-3 flex space-x-2">
                  {order.status === "New" && (
                    <>
                      <Button size="sm" className="flex-1">
                        Accept
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Reject
                      </Button>
                    </>
                  )}
                  {order.status === "Preparing" && (
                    <Button size="sm" className="w-full">
                      Mark as Ready
                    </Button>
                  )}
                  {order.status === "Ready for Pickup" && (
                    <Button size="sm" className="w-full">
                      Complete Order
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default StoreOwnerDashboard
