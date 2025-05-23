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
}
const initialState: DeliveryType = {
  deliveries: [],
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveries: (state, action): void => {
      console.log(action.payload, state);
    },
    removeDlivery: (state, action): void => {
      console.log(action.payload);
    },
  },
});
export default deliverySlice.reducer;
