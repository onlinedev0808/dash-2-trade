import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TokenModel from "../../models/TokenModel";

// Define the initial state using that type
const initialState: Array<TokenModel> = [];

export const tokenSlice = createSlice({
  name: "token",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateTokenFeed: (state, action: PayloadAction<Array<TokenModel>>) => {
      const newState = [...action.payload];
      return newState;
    },
  },
});

export const { updateTokenFeed } = tokenSlice.actions;

export default tokenSlice.reducer;
