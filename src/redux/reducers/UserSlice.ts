import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserModel, { Watchlist } from "../../models/UserModel";

export const initialState: UserModel = {
  email: "",
  id: "",
  mfa: false,
  caching: false,
  watchlists: [],
  subscriptionTier: 0,
  firstName: "",
  lastName: "",
  nickname: "",
  profileImage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<Partial<UserModel>>) => {
      const newState = { ...state, ...action.payload };
      return newState;
    },
    updateWatchlists: (state, action: PayloadAction<Array<Watchlist>>) => {
      const newState = { ...state };
      newState.watchlists = action.payload;
      return newState;
    },
    clearUserData: (state) => {
      return { ...initialState };
    },
  },
});

export const { updateUserData, updateWatchlists, clearUserData } =
  userSlice.actions;

export default userSlice.reducer;
