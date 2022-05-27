import React from "react";
import { Editor } from "@toast-ui/react-editor";
import codeSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

const ForwardWrappedEditor = (props: any) => {
  const { forwardedRef } = props;

  return (
    <Editor
      {...props}
      ref={forwardedRef}
      height="600px"
      usageStatistics={false}
      plugins={[codeSyntax, codeSyntaxHighlight]}
    />
  );
};

export default ForwardWrappedEditor;
