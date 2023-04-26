import { createSlice } from "@reduxjs/toolkit";

interface PostState {
  editedPost: Post | null;
}

const initialState: PostState = {
  editedPost: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setEditedPost: (state, action) => {
      state.editedPost = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEditedPost } = postSlice.actions;

export default postSlice;
