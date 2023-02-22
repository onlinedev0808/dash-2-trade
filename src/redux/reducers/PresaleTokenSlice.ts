import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PresaleTokenModel from "../../models/PresaleTokenModel";
// import type { RootState } from "../store";

// Define the initial state using that type
const initialState: Array<PresaleTokenModel> = [];

export const presaleTokenSlice = createSlice({
  name: "presaleToken",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updatePresaleTokenFeed: (
      state,
      action: PayloadAction<Array<PresaleTokenModel>>
    ) => {
      const newState = [...action.payload];
      return newState;
    },
  },
});

export const { updatePresaleTokenFeed } = presaleTokenSlice.actions;

export default presaleTokenSlice.reducer;
