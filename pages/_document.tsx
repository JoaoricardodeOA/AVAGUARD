import { Navbar } from "@/src/components/navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
