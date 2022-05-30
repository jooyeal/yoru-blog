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
import CommentForm from "../../components/post/CommentForm";

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
  const [isNewComment, setIsNewComment] = useState<boolean>(false);

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
      <div className="p-4">
        <div className="border-2 p-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl mb-2">COMMENTS</div>
            <div>
              {!isNewComment && (
                <div className="flex justify-end">
                  <button
                    className="mt-2 border rounded-md p-2"
                    onClick={() => setIsNewComment(true)}
                  >
                    NEW COMMENT
                  </button>
                </div>
              )}
            </div>
          </div>
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
          {isNewComment && (
            <CommentForm
              id={id}
              fetch={addCommentApi}
              setCancel={setIsNewComment}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      </div>
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
