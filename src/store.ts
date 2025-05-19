import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { storeSlice } from "./features/storeSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    store: storeSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
