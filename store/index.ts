import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slices/postSlice";
import { postApi } from "../services/postQuery";

export const store = configureStore({
  reducer: {
    postManager: postSlice,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
