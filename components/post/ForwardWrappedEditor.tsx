import React from "react";
import { Editor } from "@toast-ui/react-editor";

const ForwardWrappedEditor = (props: any) => {
  const { forwardedRef } = props;

  // 3. Pass down forwardRef to Editor(the real component that needs)
  return (
    <Editor
      {...props}
      ref={forwardedRef}
      height="600px"
      usageStatistics={false}
    />
  );
};

export default ForwardWrappedEditor;
