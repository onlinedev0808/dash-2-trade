import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = "";

export const breadcrumbsSlice = createSlice({
  name: "breadcrumbs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateBreadcrumbs: (state, action: PayloadAction<string>) => {
      const newState = action.payload;
      return newState;
    },
  },
});

export const { updateBreadcrumbs } = breadcrumbsSlice.actions;

export default breadcrumbsSlice.reducer;
