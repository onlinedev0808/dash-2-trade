import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ChainModel, { SelectedItem } from "../../models/ChainModel";
import type { RootState } from "../store";

// Define the initial state using that type
const initialState: ChainModel = {
  selectedChain: undefined,
  selectedNetwork: undefined,
  selectedChainNetwork: undefined,
};

export const chainSlice = createSlice({
  name: "chain",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateSelectedChain: (state, action: PayloadAction<SelectedItem>) => {
      const newState = { ...state };
      newState.selectedChain = action.payload;
      return newState;
    },

    updateSelectedNetwork: (state, action: PayloadAction<SelectedItem>) => {
      const newState = { ...state };
      newState.selectedNetwork = action.payload;
      return newState;
    },

    updateSelectedChainNetwork: (
      state,
      action: PayloadAction<SelectedItem>
    ) => {
      const newState = { ...state };
      newState.selectedChainNetwork = action.payload;
      return newState;
    },
  },
});

export const {
  updateSelectedChain,
  updateSelectedNetwork,
  updateSelectedChainNetwork,
} = chainSlice.actions;

export default chainSlice.reducer;
