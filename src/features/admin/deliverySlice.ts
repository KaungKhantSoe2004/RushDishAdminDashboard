import { createSlice } from "@reduxjs/toolkit";

interface DeliveryAgent {
  id: number;
  name: string;
  phone_one: string;
  phone_two: string | null;
  email: string;
  profile: string | null;
  vehicle_type: string;
  vehicle_number: string;
  current_latitude: number | null;
  current_longitude: number | null;
  last_login: Date | null;
  address_one: string | null;
  address_two: string | null;
  account_status: "active" | "inactive" | "suspended" | "pending"; // assuming these are possible values
  points: number;
  login_code: string | null;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}
interface DeliveryType {
  deliveries: Array<DeliveryAgent>;
  online_deli: string | number;
  offline_deli: string | number;
  total_deli: string | number;
  totalEarnings: string | number;
}
const initialState: DeliveryType = {
  deliveries: [],
  online_deli: 0,
  offline_deli: 0,
  total_deli: 0,
  totalEarnings: 0,
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveries: (state, action): void => {
      state.deliveries = action.payload;
    },
    setDeliveryPageCounts: (state, action): void => {
      state.offline_deli = action.payload.offline_deli;
      state.online_deli = action.payload.online_deli;
      state.total_deli = action.payload.total_deli;
      state.totalEarnings = action.payload.totalEarnings;
    },
    removeDlivery: (state, action): void => {
      console.log(action.payload);
    },
  },
});
export const { setDeliveries, setDeliveryPageCounts, removeDlivery } =
  deliverySlice.actions;
export default deliverySlice.reducer;
