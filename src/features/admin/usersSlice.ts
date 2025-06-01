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
interface initialType {
  activeUsersCount: number;
  totalUsersCount: number;
  inactiveUsersCount: number;
  bannedUsersCount: number;
  users: Array<UserState>;
}
const initialState = {
  activeUsersCount: 0,
  totalUsersCount: 0,
  inactiveUsersCount: 0,
  bannedUsersCount: 0,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setReduxActiveUserCount: (state, action): void => {
      state.activeUsersCount = action.payload;
    },
    setReduxUsers: (state, action): void => {
      state.users = action.payload;
    },
    setReduxCounts: (state, action): void => {
      state.totalUsersCount = action.payload.total;
      state.inactiveUsersCount = action.payload.inactive;
      state.bannedUsersCount = action.payload.banned;
      state.activeUsersCount = action.payload.active;
    },
  },
});

// ✅ Export actions
export const { setReduxActiveUserCount, setReduxUsers, setReduxCounts } =
  userSlice.actions;

// ✅ Export reducer only
export default userSlice.reducer;
