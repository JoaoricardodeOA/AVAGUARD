import { Input } from "@nextui-org/input"
import { ReactElement } from 'react'

interface CustomFormInputProps {
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    type: string
    label: string
    className?: string
    align?: 'left' | 'center' | 'right'
    variantIcon?: 'no-icon' | 'left' | 'right' | 'left-right'
    iconLeft?: ReactElement
    iconRight?: ReactElement
}

function CustomFormInput(props: CustomFormInputProps) {
    return (
        <div className={`${(props.align === "center" || !props.align) && "text-center"} ${(props.align === "left") && "text-start"} ${(props.align === "right") && "text-end"} ${props.className}`}>
            <p className="text-xl text-neutral-dGrey font-semibold mb-3">{props.label}</p>
            <Input
                type={props.type}
                size={props.variant}
                classNames={{
                    mainWrapper: [
                        "bg-white",
                        "hover:bg-white",
                    ],
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-white",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-gray-400",
                    ],
                    innerWrapper: [
                        "bg-transparent",
                        "hover:bg-transparent",
                    ],
                    inputWrapper: [
                        "bg-white",
                        "border",
                        "border-gray-200",
                        "rounded-full",
                        "shadow-sm",
                        "hover:bg-white",
                        "focus:border-gray-400",
                        "focus:bg-white",
                    ],
                }}
                startContent={
                    (props.variantIcon === 'left' || props.variantIcon === 'left-right') && props.iconLeft && (
                        props.iconLeft
                    )
                }
                endContent={
                    (props.variantIcon === 'right' || props.variantIcon === 'left-right') && props.iconRight && (
                        props.iconRight
                    )
                }
            />
        </div>
    )
}

export {
    CustomFormInput
}