import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased flex h-screen w-full justify-center items-center bg-gray-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
