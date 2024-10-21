import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { NextUIProvider } from "@nextui-org/react"
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <div className={inter.variable}>
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  )
}
