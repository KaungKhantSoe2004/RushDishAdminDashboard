import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { storeSlice } from "./features/storeSlice";
import deliverySlice from "./features/deliverySlice";
import OrderSlice from "./features/ordersSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    store: storeSlice,
    delivery: deliverySlice,
    orders: OrderSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
