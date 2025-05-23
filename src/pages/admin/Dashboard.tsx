import {
  FaShoppingBag,
  FaStore,
  FaMoneyBillWave,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import checkAuth, {
  type ReturnType,
  type UserType,
} from "../../helpers/checkAuth";
import { useNavigate } from "react-router-dom";
import InternalServerError from "../error/500";
import dayjs from "dayjs";
const AdminDashboard = () => {
  const [isServerError, setIsServerError] = useState(false);
  const [orderCountToday, setOrdersCountToday] = useState(0);
  const [ordersToday, setOrdersToday] = useState([]);
  const [storeCount, setStoreCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [popularStores, setPopularStores] = useState([]);
  const backendDomainName: string = "http://localhost:1500";
  // const [recentOrders, setRecentOrders] = [];
  // const { userData, setUserData } = useState<UserType | null>(null);
  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      const result = await checkAuth();
      const tokenStatus: boolean = result.status;
      const myUserData: UserType | undefined = result.data;
      console.log(myUserData);
      if (myUserData != undefined && myUserData.role !== "admin") {
        navigate("/login");
      }
      if (!tokenStatus) {
        navigate("/login");

        return;
      }
      const response = await axios.get(
        `${backendDomainName}/api/admin/dashboard`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "is response data");
      setActiveUsersCount(response.data.activeUsers.length);
      setStoreCount(response.data.storeCount);
      setOrdersCountToday(response.data.ordersToday.length);
      setOrdersToday(response.data.ordersToday);
      setPopularStores(response.data.randomFiveStores);
    } catch (error) {
      console.error("Error in fetchApi:", error);
      setIsServerError(true);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  // Mock data
  const kpiData = [
    {
      title: "Orders Today",
      value: orderCountToday,
      change: 12.5,
      changeType: "increase",
      icon: <FaShoppingBag className="text-rose-500" size={24} />,
    },
    {
      title: "Total Stores",
      value: storeCount,
      change: 4.2,
      changeType: "increase",
      icon: <FaStore className="text-rose-500" size={24} />,
    },
    {
      title: "Revenue",
      value: "$8,459",
      change: 2.4,
      changeType: "decrease",
      icon: <FaMoneyBillWave className="text-rose-500" size={24} />,
    },
    {
      title: "Active Users",
      value: activeUsersCount,
      suffix: "k",
      change: 8.3,
      changeType: "increase",
      icon: <FaUsers className="text-rose-500" size={24} />,
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-5331",
      store: "Burger King",
      customer: "John Smith",
      status: "Delivered",
      amount: "$24.50",
      date: "10 min ago",
    },
    {
      id: "#ORD-5330",
      store: "Pizza Hut",
      customer: "Sarah Johnson",
      status: "Preparing",
      amount: "$36.00",
      date: "25 min ago",
    },
    {
      id: "#ORD-5329",
      store: "Taco Bell",
      customer: "Michael Brown",
      status: "Cancelled",
      amount: "$18.75",
      date: "45 min ago",
    },
    {
      id: "#ORD-5328",
      store: "KFC",
      customer: "Emily Davis",
      status: "Delivered",
      amount: "$29.25",
      date: "1 hour ago",
    },
    {
      id: "#ORD-5327",
      store: "Subway",
      customer: "David Wilson",
      status: "On the way",
      amount: "$15.50",
      date: "1.5 hours ago",
    },
  ];

  return isServerError ? (
    <InternalServerError />
  ) : (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          {/* <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">View Reports</Button> */}
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
                      kpi.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {kpi.changeType === "increase" ? (
                      <FaArrowUp className="mr-1" />
                    ) : (
                      <FaArrowDown className="mr-1" />
                    )}
                    {kpi.change}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    vs last week
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-rose-50">{kpi.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card title="Top 5 Popular Stores">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Store
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Store Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {popularStores?.map((store, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {store.store_image ? (
                          <img
                            src={store.store_image || "/placeholder.svg"}
                            alt={`${store.store_name} profile`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaStore className="text-gray-400" size={24} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {store.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {store.order_count ||
                        Math.floor(Math.random() * 500) + 100}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {store.address_one ||
                        `${
                          Math.floor(Math.random() * 1000) + 1
                        } Main St, City, State`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          store.status === "Active" || !store.status
                            ? "success"
                            : store.status === "Pending"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {store.status || "Active"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card title="Recent Orders" subtitle="Latest 5 orders across all stores">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordersToday?.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.store_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Preparing" ||
                            order.status === "On the way"
                          ? "warning"
                          : order.status === "Cancelled"
                          ? "danger"
                          : "default"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.total_amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dayjs(order.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
