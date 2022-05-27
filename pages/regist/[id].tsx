import axios from "axios";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Loading from "../../components/common/Loading";
import { updatePostApi } from "../../services/postApi";
import { useAppDispatch, useAppSelector } from "../../store/storeHook";

const Editor = dynamic(
  () => import("../../components/post/ForwardWrappedEditor"),
  { ssr: false }
);
// 2. Pass down to child components using forwardRef
const EditorWithForwardedRef = React.forwardRef((props: any, ref) => (
  <Editor {...props} forwardedRef={ref} />
));

interface Props {
  post: any;
  id: string;
}

const Modify: React.FC<Props> = ({ post, id }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const postSelctor = useAppSelector((state) => state.postManager);
  const markdownRef = useRef<any>(null);
  const [title, setTitle] = useState<string>(post.title);
  const [markdown, setMarkdown] = useState<string>(post.content);
  const [thumbnail, setThumbnail] = useState<File>();

  const handleEditorChange = () => {
    if (markdownRef) {
      setMarkdown(markdownRef.current.getInstance().getMarkdown());
    }
  };

  const handleThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];
    setThumbnail(img);
  };

  const addPost = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    let url = "/default.jpeg";
    if (thumbnail) {
      formData.append("file", thumbnail);
      formData.append("upload_preset", process.env.CLOUDINARY_PRESET || "");

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
        formData
      );
      url = data.url;
    }
    dispatch(
      updatePostApi({ id, title, thumbnail: url, content: markdown, router })
    );
  };
  return (
    <>
      {postSelctor.status === "loading" && <Loading />}
      <div className="p-6">
        <div className="text-3xl font-bold">POST REGIST PAGE</div>
        <form onSubmit={addPost}>
          <div className="p-4">
            <p className="text-xl">TITLE</p>
            <input
              className="border-2 w-full rounded-md outline-none p-2"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              maxLength={50}
              required
            />
          </div>
          <div className="p-4">
            <p className="text-xl">THUMBNAIL</p>
            <input
              className="border-2 w-full rounded-md outline-none p-2"
              type="file"
              onChange={handleThumbnail}
            />
          </div>
          <div className="p-4">
            <p className="text-xl">CONTENT</p>
            <EditorWithForwardedRef
              previewStyle="vertical"
              initialEditType="markdown"
              onChange={handleEditorChange}
              ref={markdownRef}
              initialValue={markdown}
            />
          </div>
          <div className="p-4 flex justify-end">
            <button className="p-2 rounded-md border-2" type="submit">
              MODIFY
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get(
    `${process.env.HOST_URL}/api/post/${ctx.params?.id}`
    // `http://localhost:3000/api/post/${ctx.params?.id}`
  );
  return {
    props: {
      post: data,
      id: ctx.params?.id,
    },
  };
};

export default Modify;
