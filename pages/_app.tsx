import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { NextUIProvider } from "@nextui-org/react"
import { Roboto } from 'next/font/google'
import '@fontsource/roboto'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { SessionProvider } from "next-auth/react"

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700"]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextUIProvider>
        <div className={roboto.className}>
          <ReactNotifications />
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </SessionProvider>
  )
}
