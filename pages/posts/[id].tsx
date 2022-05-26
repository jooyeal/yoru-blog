import dynamic from "next/dynamic";
import { EditorProps } from "@toast-ui/react-editor";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

const Viewer = dynamic<EditorProps>(
  () => import("@toast-ui/react-editor").then((m) => m.Viewer),
  { ssr: false }
);

interface Props {
  post: any;
}

const PostDetail: React.FC<Props> = ({ post }) => {
  return (
    <div>
      <div className="w-screen h-96 flex items-center justify-center text-6xl break-all p-6 overflow-auto mobile:text-3xl">
        {post.title}
      </div>
      <div className="p-4">
        <div className="border-2 p-4">
          <Viewer initialValue={post.content} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/post/${ctx.params?.id}`
  );
  return {
    props: {
      post: data,
    },
  };
};

export default PostDetail;
