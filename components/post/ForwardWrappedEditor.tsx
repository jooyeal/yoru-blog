import React from "react";
import { Editor } from "@toast-ui/react-editor";
import codeSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

const ForwardWrappedEditor = (props: any) => {
  const { forwardedRef } = props;
  return (
    <Editor
      {...props}
      ref={forwardedRef}
      height="600px"
      usageStatistics={false}
      useCommandShortcut={true}
      plugins={[codeSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
};

export default ForwardWrappedEditor;
