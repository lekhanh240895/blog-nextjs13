import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CommentState {
  selectedComment: Comment | null;
  comments: Comment[];
}

const initialState: CommentState = {
  selectedComment: null,
  comments: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setSelectedComment: (state, action) => {
      state.selectedComment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId: string) => {
    const response = await fetch("/api/comments?post=" + postId);
    return await response.json();
  }
);

// Action creators are generated for each case reducer function
export const { setSelectedComment } = commentSlice.actions;

export default commentSlice;
