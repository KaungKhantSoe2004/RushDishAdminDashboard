import { createSlice } from "@reduxjs/toolkit";

// Interface for the items JSONB structure (adjust according to your actual item structure)
export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  options?: {
    [key: string]: string | number;
  };
  specialInstructions?: string;
}

// Main Order interface
export interface Order {
  id: number;
  store_id: number;
  user_id: number;
  delivery_id: number;
  items: OrderItem[]; // or Record<string, any> if structure varies
  item_count: number;
  total_amount: number;
  pickup_time: Date | null;
  is_paid: boolean;
  address: string;
  instructions: string;
  customer_pickup_time: Date | null;
  promotion_id: number | null;
  status: string;
  created_at: Date;
  updated_at: Date;
}

interface RecentOrderType {
  id: number;
  user_id: number;
  store_id: number;
  store_name: string;
  customer: string;
  address: string;
  status: string;
  is_paid: boolean;
  item_count: number;
  total_amount: string;
  delivery_id: number;
  promotion_id: number;
  instuctions: string;
  pickup_time: string; // ISO string
  customer_pickup_time: string; // ISO string
  created_at: string; // ISO string
  updated_at: string; // ISO string
  items: OrderItem[];
}
interface stateType {
  ordersCountToday: number;
  recentOrders: Array<RecentOrderType>;
  orders: Array<RecentOrderType>;

  totalOrders: number;
  deliveredOrders: number;
  porgressOrders: number;
  cancelledOrders: number;
}
const initialState: stateType = {
  ordersCountToday: 0,
  recentOrders: [],
  orders: [],

  totalOrders: 0,
  deliveredOrders: 0,
  porgressOrders: 0,
  cancelledOrders: 0,
};
const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersPageCount: (state, action): void => {
      state.totalOrders = action.payload.totalOrders;
      state.deliveredOrders = action.payload.deliveredOrders;
      state.porgressOrders = action.payload.progressOrders;
      state.cancelledOrders = action.payload.cancelledOrders;
    },
    setDashboardCount: (state, action): void => {
      state.ordersCountToday = action.payload;
    },
    setReduxOrdersToday: (state, action): void => {
      state.ordersCountToday = action.payload;
    },
    setReduxRecentOrders: (state, action): void => {
      state.recentOrders = action.payload;
    },
  },
});
export const {
  setOrdersPageCount,
  setDashboardCount,
  setReduxOrdersToday,
  setReduxRecentOrders,
} = OrderSlice.actions;
export default OrderSlice.reducer;
