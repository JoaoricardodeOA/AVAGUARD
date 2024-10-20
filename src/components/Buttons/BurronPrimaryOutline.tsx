import { Button } from "@nextui-org/button"
import { ReactElement } from "react"

interface BurronPrimaryOutlineProps {
    variant: 'sm' | 'md' | 'lg',
    variantIcon: 'no-icon' | 'left' | 'right',
    icon?: ReactElement
    children: string
    className?: string
}

export function BurronPrimaryOutline(props: BurronPrimaryOutlineProps) {
    return (
        <Button variant="bordered" size={props.variant} className={`border-primary border-small rounded-2xl text-primary text-xs font-normal ${props.className}`}>
            {
                props.variantIcon === "left" && props.icon && (
                    props.icon
                )
            }
            {props.children}
            {
                props.variantIcon === "right" && props.icon && (
                    props.icon
                )
            }
        </Button>
    )
}