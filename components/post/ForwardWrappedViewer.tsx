import React from "react";
import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

const ForwardWrappedViewer = (props: any) => {
  const { forwardedRef } = props;
  return (
    <Viewer
      {...props}
      ref={forwardedRef}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
};

export default ForwardWrappedViewer;
