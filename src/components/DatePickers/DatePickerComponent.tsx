import { DatePicker } from "@nextui-org/react"

interface DatePickerComponentProps {
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    label: string
    className?: string
    align?: 'left' | 'center' | 'right'
}

function DatePickerComponent(props: DatePickerComponentProps) {
    return (
        <div className={`${(props.align === "center" || !props.align) && "text-center"} ${(props.align === "left") && "text-start"} ${(props.align === "right") && "text-end"} ${props.className}`}>
            <p className="text-xl text-neutral-dGrey font-semibold mb-3">{props.label}</p>
            <DatePicker
                size={props.variant}
                variant="bordered"
                radius='full'
                classNames={{
                    input: [
                        "bg-white !important",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-gray-400",
                    ],
                    innerWrapper: [
                        "bg-white !important",
                        "hover:bg-white",
                    ],
                    inputWrapper: [
                        "bg-white !important",
                        "border",
                        "border-gray-200",
                        "rounded-full",
                        "shadow-sm",
                        "hover:bg-white",
                        "focus:bg-white",
                    ],
                    selectorIcon: [
                        "text-primary"
                    ]
                }}
                style={{
                    backgroundColor: 'white'
                }}
            />
        </div>
    )
}

export {
    DatePickerComponent
}