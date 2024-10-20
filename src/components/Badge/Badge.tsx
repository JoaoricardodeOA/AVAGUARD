import { Chip } from "@nextui-org/react"
import { ReactNode } from "react"

interface ChipComponentProps {
    children: ReactNode
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
}

function ChipComponent(props: ChipComponentProps) {
    return (
        <Chip color={props.color} className="text-white">{props.children}</Chip>
    )
}

export {
    ChipComponent
}