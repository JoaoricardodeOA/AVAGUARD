import { ListItemsType } from '@/src/types/select'
import { Select, SelectItem } from "@nextui-org/react"

interface SelectComponentProps {
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    label: string
    className?: string
    align?: 'left' | 'center' | 'right'
    itens: ListItemsType[]
    onChange?: (e: any) => void
    disabled?: boolean
}

function SelectComponent(props: SelectComponentProps) {
    return (
        <div className={`${(props.align === "center" || !props.align) && "text-center"} ${(props.align === "left") && "text-start"} ${(props.align === "right") && "text-end"} ${props.className}`}>
            <p className="text-xl text-neutral-dGrey font-semibold mb-3">{props.label}</p>
            <Select
                label={props.label}
                size={props.variant}
                classNames={{
                    mainWrapper: [
                        "bg-white",
                        "hover:bg-white",
                    ],
                    label: "text-black/50 dark:text-white/90",
                    innerWrapper: [
                        "bg-transparent",
                        "hover:bg-transparent",
                    ],
                    trigger: [
                        "ps-5",
                        "bg-white",
                        "border",
                        "border-gray-200",
                        "rounded-full",
                        "shadow-sm",
                        "hover:bg-white",
                        "focus:border-gray-400",
                        "focus:bg-white",
                    ],
                    selectorIcon: [
                        "text-primary"
                    ]
                }}
                onChange={props.onChange}
                disabled={props.disabled || false}
            >
                {props.itens.map((item) => (
                    <SelectItem key={item.ID}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}

export {
    SelectComponent
}