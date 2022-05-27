import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NextRouter } from "next/router";

export const addPostApi = createAsyncThunk(
  "posts/fetchAddPost",
  async ({
    title,
    thumbnail,
    content,
    router,
  }: {
    title: string;
    thumbnail: string;
    content: string;
    router: NextRouter;
  }) => {
    await axios.post("/api/post/add", {
      title,
      thumbnail,
      content,
    });
    router.push("/posts");
  }
);

export const updatePostApi = createAsyncThunk(
  "posts/fetchUpdateApi",
  async ({
    id,
    title,
    thumbnail,
    content,
    router,
  }: {
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    router: NextRouter;
  }) => {
    await axios.post(`/api/post/update`, {
      id,
      title,
      thumbnail,
      content,
    });
    router.push("/posts");
  }
);

export const deletePostApi = createAsyncThunk(
  "posts/fetchDeleteApi",
  async ({ id, router }: { id: string; router: NextRouter }) => {
    await axios.post(`/api/post/delete`, {
      id,
    });
    router.push("/posts");
  }
);