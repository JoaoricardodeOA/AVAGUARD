import { RegisterVictimsView } from "@/src/Views/RegisterVictimsView/RegisterVictimsView";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function RegisterVictims() {
    return (
        <RegisterVictimsView />
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