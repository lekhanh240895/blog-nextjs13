import { createSlice } from "@reduxjs/toolkit";

interface AppState {}

const initialState: AppState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = appSlice.actions;

export default appSlice;
