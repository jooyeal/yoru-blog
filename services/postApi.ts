import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NextRouter } from "next/router";

export const addPostApi = createAsyncThunk(
  "posts/fetchAddPost",
  async ({
    title,
    thumbnail,
    content,
    categories,
    router,
  }: {
    title: string;
    thumbnail: string;
    content: string;
    categories: Array<string>;
    router: NextRouter;
  }) => {
    await axios.post(`${process.env.HOST_URL}/api/post/add`, {
      title,
      thumbnail,
      categories,
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
    categories,
    router,
  }: {
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    categories: Array<string>;
    router: NextRouter;
  }) => {
    await axios.post(`${process.env.HOST_URL}/api/post/update`, {
      id,
      title,
      thumbnail,
      categories,
      content,
    });
    router.push("/posts");
  }
);

export const deletePostApi = createAsyncThunk(
  "posts/fetchDeleteApi",
  async ({ id, router }: { id: string; router: NextRouter }) => {
    await axios.post(`${process.env.HOST_URL}/api/post/delete`, {
      id,
    });
    router.push("/posts");
  }
);
