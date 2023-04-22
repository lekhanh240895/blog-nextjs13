import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface PostState {
  editedPost: Post | null;
  posts: Post[];
}

const initialState: PostState = {
  editedPost: null,
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setEditedPost: (state, action) => {
      state.editedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("/api/posts");
  return response.data;
});

// Action creators are generated for each case reducer function
export const { setEditedPost } = postSlice.actions;

export default postSlice;
