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
    await axios.post(`/api/post/add`, {
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
    await axios.post(`/api/post/update`, {
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
    await axios.post(`/api/post/delete`, {
      id,
    });
    router.push("/posts");
  }
);

export const searchPostApi = async (
  searchValue: string,
  searchCategory: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.HOST_URL}/api/post/search`,
      {
        searchValue,
        searchCategory,
      }
    );
    return data;
  } catch (err) {
    return err;
  }
};
