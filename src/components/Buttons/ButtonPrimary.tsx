import { Button } from "@nextui-org/button"
import { ReactElement } from "react"

interface ButtonPrimaryProps {
    variant: 'sm' | 'md' | 'lg',
    variantIcon: 'no-icon' | 'left' | 'right',
    icon?: ReactElement
    children: string
    className?: string
}

export function ButtonPrimary(props: ButtonPrimaryProps) {
    return (
        <Button size={props.variant} className={`bg-primary rounded-2xl text-white text-xs font-normal ${props.className}`}>
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