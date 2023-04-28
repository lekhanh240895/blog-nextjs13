import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AppState {
  deletePostModalOpened: boolean;
  deleteCategoryModalOpened: boolean;
  selectedPost: Post | null;
  selectedCategory: Category | null;
}

const initialState: AppState = {
  deletePostModalOpened: false,
  deleteCategoryModalOpened: false,
  selectedPost: null,
  selectedCategory: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openDeletePostModal: (state, action) => {
      state.deletePostModalOpened = true;
      state.selectedPost = action.payload;
    },
    closeDeletePostModal: (state) => {
      state.deletePostModalOpened = false;
      state.selectedPost = null;
    },
    openDeleteCategoryModal: (state, action) => {
      state.deleteCategoryModalOpened = true;
      state.selectedCategory = action.payload;
    },
    closeDeleteCategoryModal: (state) => {
      state.deleteCategoryModalOpened = false;
      state.selectedCategory = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openDeletePostModal,
  closeDeletePostModal,
  openDeleteCategoryModal,
  closeDeleteCategoryModal,
} = appSlice.actions;

export default appSlice;
