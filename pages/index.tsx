import WelcomeView from "@/src/Views/WelcomeView/WelcomeView"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

export default function Welcome() {
  return (
    <WelcomeView />
  )
}

export const getServerSideProps = async (context: any) => {
  const { req, res } = context
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}