import { Navbar } from "@/src/components/navbar"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased scrollbar-thin scrollbar-thumb-primary">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
