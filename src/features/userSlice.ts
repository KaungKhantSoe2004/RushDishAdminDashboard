import { createSlice } from "@reduxjs/toolkit";

interface UserState {
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
const initialState: UserState = {
  name: "",
  email: "",
  phoneOne: 900000,
  phoneTwo: 900000,
  addressOne: "",
  addressTwo: "",
  role: "admin",
  accountStatus: "",
  points: 0,
  loginCode: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action): void => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneOne = action.payload.phoneOne;
      state.phoneTwo = action.payload.phoneTwo;
      state.addressOne = action.payload.addressOne;
      state.addressTwo = action.payload.addressTwo;
      state.role = action.payload.role;
      state.accountStatus = action.payload.accountStatus;
      state.points = action.payload.points;
      state.loginCode = action.payload.loginCode;
    },
    logout: (state): void => {
      state.name = "";
      state.phoneOne = 0;
      state.phoneTwo = 0;
      state.addressOne = "";
      state.addressTwo = "";
      state.role = "admin";
      state.accountStatus = "";
      state.points = 0;
      state.loginCode = "";
    },

  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
