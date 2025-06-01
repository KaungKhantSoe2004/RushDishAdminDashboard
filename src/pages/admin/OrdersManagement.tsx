"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaCalendarAlt, FaEye } from "react-icons/fa";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import axios from "axios";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import {
  setOrdersPageCount,
  setReduxOrders,
} from "../../features/admin/ordersSlice";
import type { RootState } from "../../store";
import InternalServerError from "../error/500";
import ProtectRoute from "../../helpers/protectRoute";

const OrdersManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isServerError, setIsServerError] = useState(false);
  const [pages, setPages] = useState([1]);
  const [page, setPage] = useState(1);
  const ReduxOrders = useSelector((store: RootState) => store.orders);
  const dispatch = useDispatch();
  const [totalOrdersCount, setTotalOrdersCount] = useState(
    ReduxOrders.totalOrders
  );
  const [deliveredCount, setDeliveredCount] = useState(
    ReduxOrders.deliveredOrders
  );
  const [inProgressCount, setInProgressCount] = useState(
    ReduxOrders.progressOrders
  );
  const [cancelledCount, setCancelledCount] = useState(
    ReduxOrders.cancelledOrders
  );
  // Mock data
  const [orders, setOrders] = useState(ReduxOrders.orders);

  // Filter orders based on search term, status filter, and date filter
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesStatus;
  });

  const fetchApi = async (searchTerm?: string, pageNumber?: string) => {
    try {
      setLoading(true);
      if (!ProtectRoute()) {
        navigate("/login");
        return;
      }
      let uri: string;
      if (searchTerm == "" && pageNumber == "") {
        uri = `http://localhost:1500/api/admin/orderList`;
      } else if (pageNumber != "") {
        uri = `http://localhost:1500/api/admin/orderList?page=${pageNumber}`;
      } else {
        uri = `http://localhost:1500/api/admin/orderList?search=${searchTerm}`;
      }
      const response = await axios.get(uri, {
        withCredentials: true,
      });
      if (response.status == 200) {
        dispatch(setOrdersPageCount(response.data.counts));
        dispatch(setReduxOrders(response.data.data));
        setTotalOrdersCount(response.data.counts.totalOrders);
        setDeliveredCount(response.data.counts.deliveredOrders);
        setInProgressCount(response.data.counts.progressOrders);
        setCancelledCount(response.data.counts.cancelledOrders);
        setOrders(response.data.data);
        setPages(response.data.pagination.pages);
        setPage(response.data.pagination.page);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsServerError(true);
      // if (error.response.data.message) {
      //   alert(error.response.data.message);
      // } else {
      //   alert("Something went wrong");
      // }
    }
  };
  useEffect(() => {
    fetchApi("", "");
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading store details...</p>
        </div>
      </div>
    );
  }
  return isServerError ? (
    <InternalServerError />
  ) : (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
        <Button variant="outline" size="sm" icon={<FaCalendarAlt />}>
          Export Orders
        </Button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {orders.length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Delivered</p>
            <h3 className="text-2xl font-bold text-green-600 mt-1">
              {orders.filter((order) => order.status === "Delivered").length}
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <h3 className="text-2xl font-bold text-yellow-600 mt-1">
              {
                orders.filter((order) =>
                  ["Preparing", "On the way"].includes(order.status)
                ).length
              }
            </h3>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Cancelled</p>
            <h3 className="text-2xl font-bold text-red-600 mt-1">
              {orders.filter((order) => order.status === "Cancelled").length}
            </h3>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-96 flex">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value == "") {
                  fetchApi("", "");
                }
              }}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              onClick={() => {
                fetchApi(searchTerm, "");
              }}
              className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-xl py-3 flex items-center space-x-2 border border-indigo-600 transition-colors duration-200"
            >
              <FaSearch className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
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
              {filteredOrders.map((order) => (
                <tr key={order.order_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.store_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Preparing" ||
                            order.status === "On the way"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.profit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.created_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<FaEye />}
                      onClick={() =>
                        navigate(`/admin/orders/${order.order_id}`)
                      }
                    >
                      View
                    </Button>
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
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredOrders.length}</span> of{" "}
                <span className="font-medium">{filteredOrders.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <Button variant="outline" size="sm" className="rounded-l-md">
                  Previous
                </Button>
                {pages.map((page, index) => (
                  <Button
                    variant="outline"
                    size="sm"
                    key={index}
                    onClick={() => {
                      fetchApi("", page.toString());
                    }}
                    className={`${
                      page == page
                        ? "bg-blue-500 text-black"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="sm" className="rounded-r-md">
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrdersManagement;
