import { createSlice } from "@reduxjs/toolkit";
import {
  addPostApi,
  deletePostApi,
  updatePostApi,
} from "../../services/postApi";

// Define a type for the slice state
interface postSlice {
  status: string;
}

// Define the initial state using that type
const initialState: postSlice = {
  status: "",
};

export const postSlice = createSlice({
  name: "postManager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPostApi.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(addPostApi.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addPostApi.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(updatePostApi.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(updatePostApi.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updatePostApi.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(deletePostApi.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(deletePostApi.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deletePostApi.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export default postSlice.reducer;
