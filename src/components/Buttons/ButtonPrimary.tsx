import { Button } from "@nextui-org/button"
import { ReactElement, MouseEvent } from "react"

interface ButtonPrimaryProps {
    variant: 'sm' | 'md' | 'lg'
    variantIcon: 'no-icon' | 'left' | 'right'
    icon?: ReactElement
    children: string
    className?: string
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void // Add onClick prop
    type?: 'button' | 'submit' | 'reset' // Optional type prop
    onPress?: (e: any) => void
    isLoading?: boolean
    disabled?: boolean
}

export function ButtonPrimary(props: ButtonPrimaryProps) {
    return (
        <Button
            size={props.variant}
            className={`bg-primary rounded-2xl text-white text-xs font-normal ${props.className}`}
            onClick={props.onClick} // Handle click event
            type={props.type} // Use type prop
            aria-label={props.children} // Improve accessibility
            onPress={props.onPress}
            isLoading={props.isLoading}
            disabled={props.disabled}
        >
            {
                props.variantIcon === "left" && props.icon && props.icon
            }
            {props.children}
            {
                props.variantIcon === "right" && props.icon && props.icon
            }
        </Button>
    )
}
