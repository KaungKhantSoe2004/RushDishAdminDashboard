import { createSlice } from "@reduxjs/toolkit";

interface StoreState {
  name: string;
  phoneOne: number;
  phoneTwo: number;
  email: string;
  addressOne: string;
  addressTwo: string;
  role: string;
  accountStatus: string;
  points: number;
  loginCode: string;
}

interface initialStoreType {
  totalStoresCount: number;
  activeStoresCount: number;
  pendingStoresCount: number;
  suspendStoresCount: number;
  popularStores: Array<StoreState>;
  stores: Array<StoreState>;
}

const initialState: initialStoreType = {
  totalStoresCount: 0,
  activeStoresCount: 0,
  pendingStoresCount: 0,
  suspendStoresCount: 0,
  popularStores: [],
  stores: [],
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action) => {
      console.log(action.payload, state);
    },
    storeLogout: (state) => {
      console.log(state);
    },
    setReduxPopularStores: (state, action) => {
      state.popularStores = action.payload.popularStores;
    },
    setReduxStoreCount: (state, action) => {
      state.totalStoresCount = action.payload.storeCount;
    },
  },
});

export const {
  setStore,
  storeLogout,
  setReduxPopularStores,
  setReduxStoreCount,
} = storeSlice.actions;

// ✅ Export ONLY the reducer
export default storeSlice.reducer;
