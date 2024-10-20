import { Input } from "@nextui-org/react"
import { ReactElement } from "react"

const classNames = {
    mainWrapper: [
        "bg-white",
        "hover:bg-white",
    ],
    label: "text-black/50 dark:text-white/90",
    input: [
        "bg-white",
        "text-black/90 dark:text-white/90",
        "placeholder:text-gray-400",
        "ps-10",
    ],
    innerWrapper: [
        "bg-transparent",
        "hover:bg-transparent",
    ],
    inputWrapper: [
        "ps-5",
        "py-6",
        "bg-white",
        "border",
        "border-gray-200",
        "rounded-full",
        "shadow-sm",
        "hover:bg-white",
        "focus:border-gray-400",
        "focus:bg-white",
    ],
}

interface InputTextProps {
    variantIcon: 'no-icon' | 'left' | 'right' | 'left-right'
    iconLeft?: ReactElement
    iconRight?: ReactElement
    type: string
    classNames?: any
    placeholder?: string
    label?: string
    className?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}


function InputText(props: InputTextProps) {
    return (
        <Input
            type={props.type}
            classNames={props.classNames || classNames}
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
            placeholder={props.placeholder}
            className={props.className}
            onChange={props.onChange}
            value={props.value}
        />
    )
}

export {
    InputText
}