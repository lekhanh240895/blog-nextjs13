import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  deletePostModalOpened: boolean;
  deleteCategoryModalOpened: boolean;
  deleteProductModalOpened: boolean;
  selectedPost: Post | null;
  selectedCategory: Category | null;
  selectedProduct: Product | null;
  sidebarOpened: boolean;
}

const initialState: AppState = {
  deletePostModalOpened: false,
  deleteCategoryModalOpened: false,
  deleteProductModalOpened: false,
  selectedPost: null,
  selectedCategory: null,
  sidebarOpened: false,
  selectedProduct: null,
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
    openDeleteProductModal: (state, action) => {
      state.deleteProductModalOpened = true;
      state.selectedProduct = action.payload;
    },
    closeDeleteProductModal: (state) => {
      state.deleteProductModalOpened = false;
      state.selectedProduct = null;
    },

    setSidebarOpened: (state, action) => {
      state.sidebarOpened = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openDeletePostModal,
  closeDeletePostModal,
  openDeleteCategoryModal,
  closeDeleteCategoryModal,
  setSidebarOpened,
  openDeleteProductModal,
  closeDeleteProductModal,
} = appSlice.actions;

export default appSlice;
