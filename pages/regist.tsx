import dynamic from "next/dynamic";
import React, { FormEvent, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

const Editor = dynamic(
  () => import("../components/post/ForwardWrappedEditor"),
  { ssr: false }
);
// 2. Pass down to child components using forwardRef
const EditorWithForwardedRef = React.forwardRef((props: any, ref) => (
  <Editor {...props} forwardedRef={ref} />
));

EditorWithForwardedRef.displayName = "ForwardRefMarkdownEditor";

interface Props {}

const Regist = (props: Props) => {
  const markdownRef = useRef<any>(null);
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const handleEditorChange = () => {
    if (markdownRef) {
      setMarkdown(markdownRef.current.getInstance().getMarkdown());
    }
  };
  const addPost = async (e: FormEvent) => {
    e.preventDefault();
    await axios.post("/api/post/add", { title, content: markdown });
  };
  return (
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
          <EditorWithForwardedRef
            previewStyle="vertical"
            initialEditType="markdown"
            onChange={handleEditorChange}
            ref={markdownRef}
          />
        </div>
        <div className="p-4 flex justify-end">
          <button className="p-2 rounded-md border-2" type="submit">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default Regist;
