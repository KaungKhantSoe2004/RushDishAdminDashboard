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
  users: Array<UserState>;
}
const initialState = {
  activeUsersCount: 0,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setReduxActiveUserCount: (state, action): void => {
      state.activeUsersCount = action.payload;
    },
  },
});

// ✅ Export actions
export const { setReduxActiveUserCount } = userSlice.actions;

// ✅ Export reducer only
export default userSlice.reducer;
