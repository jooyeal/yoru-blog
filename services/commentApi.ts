import axios from "axios";

export const addCommentApi = async (
  postId: string,
  username: string,
  password: string,
  comment: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.HOST_URL}/api/comment/add`,
      {
        postId,
        username,
        password,
        comment,
      }
    );
    return data;
  } catch (err) {
    return err;
  }
};

export const updateCommentApi = async (
  postId: string,
  comment: string,
  password: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.HOST_URL}/api/comment/update`,
      {
        postId,
        password,
        comment,
      }
    );
    return data;
  } catch (err: any) {
    return { statusCode: err.response.status, errorMessage: err.response.data };
  }
};

export const deleteCommentApi = async (postId: string, password: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.HOST_URL}/api/comment/delete`,
      {
        postId,
        password,
      }
    );
    return data;
  } catch (err: any) {
    return { statusCode: err.response.status, errorMessage: err.response.data };
  }
};
