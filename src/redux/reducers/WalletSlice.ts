import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WalletModel from "../../models/WalletModel";
// import type { RootState } from "../store";

// Define the initial state using that type
const initialState: WalletModel = {
  address: "",
};

export const walletSlice = createSlice({
  name: "wallet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateWalletAddress: (state, action: PayloadAction<string>) => {
      const newState = { ...state };
      newState.address = action.payload;
      return newState;
    },
  },
});

export const { updateWalletAddress } = walletSlice.actions;

export default walletSlice.reducer;
