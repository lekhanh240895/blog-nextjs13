import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/appSlice";
import postSlice from "../features/postSlice";
import categorySlice from "../features/categorySlice";
import productSlice from "../features/productSlice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    post: postSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
