import React from "react";
import { Editor } from "@toast-ui/react-editor";
import codeSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-java";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";

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
