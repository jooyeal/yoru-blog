import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

type Props = {};

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html>
        <Head />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css"
        />
        <link
          rel="stylesheet"
          href="https://uicdn.toast.com/editor-plugin-color-syntax/latest/toastui-editor-plugin-color-syntax.min.css"
        />
        <body className="transition-colors duration-700">
          <Main />
          <NextScript />
          <Script src="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.js"></Script>
          <Script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></Script>
          <Script src="https://uicdn.toast.com/editor-plugin-color-syntax/latest/toastui-editor-plugin-color-syntax.min.js"></Script>
        </body>
      </Html>
    );
  }
}

export default Document;
