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
    setComments: (state, action) => {
      state.comments = action.payload;
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
    const response = await axios.get("/api/comments?post=" + postId);
    return response.data;
  }
);

// Action creators are generated for each case reducer function
export const { setSelectedComment, setComments } = commentSlice.actions;

export default commentSlice;
