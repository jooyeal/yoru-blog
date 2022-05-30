import dynamic from "next/dynamic";
import { EditorProps } from "@toast-ui/react-editor";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { FormEvent, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/storeHook";
import { deletePostApi } from "../../services/postApi";
import Loading from "../../components/common/Loading";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "react-query";
import { addCommentApi } from "../../services/commentApi";
import Comment from "../../components/post/Comment";

const Viewer = dynamic<EditorProps>(
  () =>
    import("../../components/post/ForwardWrappedViewer").then((m) => m.default),
  { ssr: false }
);

export const ViewerWithForwardedRef = React.forwardRef((props: any, ref) => (
  <Viewer {...props} forwardedRef={ref} />
));

ViewerWithForwardedRef.displayName = "ForwardRefMarkdownViewer";

interface Props {
  post: any;
  comments: any;
  id: string;
}

const PostDetail: React.FC<Props> = ({ post, id, comments }) => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const postSelector = useAppSelector((state) => state.postManager);
  const [username, setUsername] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation(
    () => addCommentApi(id, username, password, comment),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    }
  );

  const postDelete = async () => {
    dispatch(deletePostApi({ id, router }));
  };

  const addComment = async (e: FormEvent) => {
    mutation.mutate();
  };

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {postSelector.status === "loading" && <Loading />}
      {isLoading && <Loading />}
      <div className="w-screen h-auto flex flex-col items-center justify-center gap-10 text-6xl break-all mobile:text-3xl">
        <div className="relative w-screen h-128">
          <Image src={post.thumbnail} layout="fill" objectFit="contain" />
        </div>
        <div className="p-2 font-bold">{post.title}</div>
        <div className="flex flex-wrap gap-2 justify-center p-4">
          {post.categories?.map((category: string, index: number) => (
            <div
              className="text-lg p-2 bg-purple-400 text-white rounded-lg"
              key={index}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="border-2 p-4">
          <ViewerWithForwardedRef initialValue={post.content} />
        </div>
      </div>
      <div className="p-4">
        <div className="border-2 p-4">
          <div className="font-bold text-xl mb-2">COMMENTS</div>
          <div className="flex flex-col gap-2">
            {comments.length === 0 && (
              <div className="flex justify-center h-20 items-center text-xl font-bold">
                COMMENTS ARE NOT FOUND
              </div>
            )}
            {comments?.map((comment: any, index: number) => (
              <Comment
                key={index}
                comment={comment}
                setIsLoading={setIsLoading}
              />
            ))}
          </div>
          <div className="border-t-2 flex items-center p-1">
            <form className="flex flex-col w-full" onSubmit={addComment}>
              <div>
                <div className="font-bold text-lg">NAME</div>
                <input
                  className="border rounded-md mr-2 outline-none p-2 w-full"
                  type="text"
                  maxLength={20}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="font-bold text-lg">PASSWORD</div>
                <input
                  className="border rounded-md mr-2 outline-none p-2 w-full"
                  type="password"
                  maxLength={20}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <div className="font-bold text-lg">COMMENT</div>
                <textarea
                  className="border rounded-md outline-none p-2 w-full resize-none"
                  rows={3}
                  required
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button className="p-2 border rounded-md">ADD</button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
      {isAdmin && (
        <div className="p-4 flex justify-end gap-2">
          <Link href={`/regist/${id}`}>
            <a className="border-2 p-2 rounded-md">MODIFY</a>
          </Link>
          <button className="border-2 p-2 rounded-md" onClick={postDelete}>
            DELETE
          </button>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get(
    `${process.env.HOST_URL}/api/post/${ctx.params?.id}`
    // `http://localhost:3000/api/post/${ctx.params?.id}`
  );
  const { data: comments } = await axios.get(
    `${process.env.HOST_URL}/api/comment/${ctx.params?.id}`
  );
  return {
    props: {
      post: data,
      comments,
      id: ctx.params?.id,
    },
  };
};

export default PostDetail;
