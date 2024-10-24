import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { NextUIProvider } from "@nextui-org/react"
import { Roboto } from 'next/font/google'
import '@fontsource/roboto'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700"]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  )
}
