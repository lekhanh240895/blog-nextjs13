import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  deletePostModalOpened: boolean;
  deleteCategoryModalOpened: boolean;
  deleteProductModalOpened: boolean;
  selectedPost: Post | null;
  selectedCategory: Category | null;
  selectedProduct: Product | null;
  dashboardSidebarOpened: boolean;
  sidebarOpened: boolean;
  cartProductIds: string[];
  loginModalOpened: boolean;
}

const initialState: AppState = {
  deletePostModalOpened: false,
  deleteCategoryModalOpened: false,
  deleteProductModalOpened: false,
  selectedPost: null,
  selectedCategory: null,
  dashboardSidebarOpened: false,
  sidebarOpened: false,
  selectedProduct: null,
  cartProductIds: [],
  loginModalOpened: false,
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
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    openDeleteProductModal: (state, action) => {
      state.deleteProductModalOpened = true;
      state.selectedProduct = action.payload;
    },
    closeDeleteProductModal: (state) => {
      state.deleteProductModalOpened = false;
      state.selectedProduct = null;
    },
    setDashboardSidebarOpened: (state, action) => {
      state.dashboardSidebarOpened = action.payload;
    },
    setSidebarOpened: (state, action) => {
      state.sidebarOpened = action.payload;
    },
    addProduct: (state, action) => {
      state.cartProductIds.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartProductIds));
    },
    removeProduct: (state, action) => {
      state.cartProductIds.splice(
        state.cartProductIds.indexOf(action.payload),
        1
      );
      localStorage.setItem("cart", JSON.stringify(state.cartProductIds));
    },
    clearCart: (state) => {
      state.cartProductIds = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    setCart: (state, action) => {
      state.cartProductIds = action.payload;
    },
    setLoginModalOpened: (state, action) => {
      state.loginModalOpened = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openDeletePostModal,
  closeDeletePostModal,
  openDeleteCategoryModal,
  closeDeleteCategoryModal,
  setDashboardSidebarOpened,
  openDeleteProductModal,
  closeDeleteProductModal,
  setSidebarOpened,
  setSelectedCategory,
  addProduct,
  removeProduct,
  clearCart,
  setCart,
  setLoginModalOpened,
} = appSlice.actions;

export default appSlice;
