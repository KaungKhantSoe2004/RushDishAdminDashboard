import { configureStore } from "@reduxjs/toolkit";

import deliverySlice from "./features/admin/deliverySlice";
import OrderSlice from "./features/admin/ordersSlice";
import storeSlice from "./features/admin/storeSlice";
import adminSlice from "./features/admin/adminSlice";
import userSlice from "./features/admin/usersSlice";
export const store = configureStore({
  reducer: {
    admin: adminSlice,
    store: storeSlice,
    delivery: deliverySlice,
    orders: OrderSlice,
    users: userSlice,
    // admin Slice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
