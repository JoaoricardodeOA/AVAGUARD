import { useRef } from "react"
import { CardComponent } from "./CardComponent"
import { VictmiType } from "@/src/types/victmis"

interface CardSessionProps {
    clientName: string
    victimis: VictmiType[]
}

function CardSession(props: CardSessionProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null)
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

    return (
        <>
            {
                props.victimis.length > 0 && (
                    <div className="mt-10 pb-5">
                        <h1 className="text-2xl text-shade-1 font-semibold uppercase">{props.clientName}</h1>
                        <div
                            className="mt-5 scroll-container flex overflow-x-auto cursor-grab gap-5 shadow-none pb-5"
                            ref={scrollRef}
                            onMouseDown={mouseDownHandler}
                            onMouseLeave={mouseLeaveHandler}
                            onMouseUp={mouseUpHandler}
                            onMouseMove={mouseMoveHandler}
                        >
                            {
                                props.victimis.map((victim) => (
                                    <CardComponent imgURL={victim.imgURL} description={victim.description} name={victim.name} status={victim.status as "warning"} />
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