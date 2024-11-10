import { VictimDetailsView } from '@/src/Views/VictimDetailsView/VictimDetailsView'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

export default function VictimDetails() {
  return (
    <VictimDetailsView />
  )
}   

export const getServerSideProps = async (context: any) => {
  const { req, res } = context
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
      return {
          redirect: {
              destination: '/login',
              permanent: false,
          },
      }
  }

  return {
      props: {}
  }
}