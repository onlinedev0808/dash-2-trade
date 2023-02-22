import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ExchangePayload,
  TimeframesPayload,
  IInitialState,
} from "../../models/ExchangeModel";

// Define the initial state using that type
const initialState: IInitialState = {
  items: {},
  timeframes: {},
};

export const exchangeSlice = createSlice({
  name: "exchanges",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateExchangeStore: (state, action: PayloadAction<ExchangePayload>) => {
      const newState = { ...state };
      const { symbol, exchange, markets } = action.payload;
      newState.items[symbol] = { exchange, markets };
      // return newState;
    },
    updateTimeframesStore: (
      state,
      action: PayloadAction<TimeframesPayload>
    ) => {
      const newState = { ...state };
      const { exchange, timeframes } = action.payload;
      newState.timeframes[exchange] = timeframes;
      // return newState;
    },
    cleanExchangeStore: (state, action: PayloadAction<string>) => {
      const newState = { ...state };
      if (newState.items[action.payload]) {
        delete newState.items[action.payload];
      }
      // return newState;
    },
  },
});

export const {
  updateExchangeStore,
  updateTimeframesStore,
  cleanExchangeStore,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
