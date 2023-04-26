import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  deletePostModalOpened: boolean;
  selectedPost: Post | null;
}

const initialState: AppState = {
  deletePostModalOpened: false,
  selectedPost: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { openDeletePostModal, closeDeletePostModal } = appSlice.actions;

export default appSlice;
