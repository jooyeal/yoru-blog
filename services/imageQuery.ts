import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Image {
  file: File;
  upload_preset: string;
}

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
