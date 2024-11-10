import { avaguardService } from "@/src/service/avaguardService"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from "next-auth/jwt"
import { format } from 'date-fns'
import { fromZonedTime } from 'date-fns-tz'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: any) {
        try {
          const data = await avaguardService.post(`/signIn`, {
            email: credentials?.email,
            password: credentials?.password
          })

          if (data?.error) {
            throw new Error(data?.error)
          } else if (data?.validationError) {
            throw new Error(data?.validationError)
          } else if (data?.user) {
            return {
              id: data?.user?.userId,
              email: data?.user?.email,
              userType: data?.user?.userType,
              name: `${data?.user?.firstName} ${data?.user?.lastName}`,
              image: '',
            }
          }

          throw new Error('Credenciais Inválidas')
        } catch (error: any) {
          throw new Error(error.message)
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: any }) {
      if (user) {
        token.id = user.id
        token.userType = user.userType

        const timeZone = "America/Sao_Paulo"
        const currentTime = new Date()
        const zonedTime = fromZonedTime(currentTime, timeZone)

        token.sessionStart = format(zonedTime, "yyyy-MM-dd HH:mm:ssXXX")
      }
      return token
    },
    async session({ session, token }: { session: any, token: JWT }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id
          session.user.userType = token.userType
          session.user.sessionStart = token.sessionStart
        }
        if (session.expires) {
          const expiresDate = new Date(session.expires)
          const zonedDate = fromZonedTime(expiresDate, 'America/Sao_Paulo')
        
          session.expires = format(zonedDate, "yyyy-MM-dd HH:mm:ssXXX")
        }
      }

      return session
    },
  },
}

export default NextAuth(authOptions)
