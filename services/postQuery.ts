import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  title: string;
  content: string;
  thumbnail: string;
  categories: string[];
}

export interface Image {
  file: File;
  upload_preset: string;
  url: string;
}

type Posts = Post[];

export const postApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.HOST_URL }),
  endpoints: (builder) => ({
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (data) => ({
        url: `/api/post/add`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const imageApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.HOST_URL }),
  endpoints: (builder) => ({
    addImage: builder.mutation<Image, FormData>({
      query: (data) => ({
        url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddImageMutation } = imageApi;
export const { useAddPostMutation } = postApi;
