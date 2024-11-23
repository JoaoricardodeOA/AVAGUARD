import { RealtimeRecordsView } from "@/src/Views/RealtimeRecordsView/RealtimeRecordsView"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

export default function RealtimeRecords() {
    return (
        <RealtimeRecordsView />
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