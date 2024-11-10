import { useRef } from "react"
import { CardComponent } from "./CardComponent"
import { VictimsWithInformationType } from "@/src/Views/HomeView/HomeViewType"
import { useRouter } from "next/router"

interface CardSessionProps {
    clientName: string
    victimis: VictimsWithInformationType[]
}

function CardSession(props: CardSessionProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const router = useRouter()
    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        isDown = true
        if (scrollRef.current) {
            scrollRef.current.classList.add('active')
        }
        startX = e.pageX - (scrollRef.current?.offsetLeft || 0)
        scrollLeft = scrollRef.current?.scrollLeft || 0
    }

    const mouseLeaveHandler = () => {
        isDown = false
        if (scrollRef.current) {
            scrollRef.current.classList.remove('active')
        }
    }

    const mouseUpHandler = () => {
        isDown = false
        if (scrollRef.current) {
            scrollRef.current.classList.remove('active')
        }
    }

    const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk
        }
    }

    function handleOnClickRedirect(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
        e.preventDefault()
        
        router.push(`/victimDetails?id=${id}`)
    }

    return (
        <>
            {
                props.victimis.length > 0 && (
                    <div className="mt-10 pb-5">
                        <h1 className="text-2xl text-shade-1 font-semibold uppercase">{props.clientName}</h1>
                        <div
                            className="mt-5 scroll-container flex overflow-x-auto gap-5 shadow-none pb-5"
                            ref={scrollRef}
                            onMouseDown={mouseDownHandler}
                            onMouseLeave={mouseLeaveHandler}
                            onMouseUp={mouseUpHandler}
                            onMouseMove={mouseMoveHandler}
                        >
                            {
                                props.victimis.map((victim) => (
                                    <div onClick={(e) => handleOnClickRedirect(e, victim.victimId)}>
                                        <CardComponent id={victim.victimId} imgURL={victim.avatar} description={victim.eventDescription} name={victim.victimName} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export {
    CardSession
}