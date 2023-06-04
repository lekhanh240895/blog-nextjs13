import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    }),
});

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch("/api/categories");
    return await response.json();
  }
);

// Action creators are generated for each case reducer function
export const {} = categorySlice.actions;

export default categorySlice;
