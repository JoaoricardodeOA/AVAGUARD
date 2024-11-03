import { DatePicker, DateValue } from "@nextui-org/react"
import { startOfWeek, startOfMonth, getLocalTimeZone, today } from "@internationalized/date"
import { useLocale, useDateFormatter } from "@react-aria/i18n"

interface DatePickerComponentProps {
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    label: string
    className?: string
    align?: 'left' | 'center' | 'right'
    handleOnChangeDate: (value: DateValue) => void
    value: DateValue | null
}

function DatePickerComponent(props: DatePickerComponentProps) {
    let defaultDate = today(getLocalTimeZone())
    let { locale } = useLocale()
    let formatter = useDateFormatter({ dateStyle: "short" })

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
                onChange={(dateString) => {
                    // formatter.format(dateString.toDate(getLocalTimeZone()))
                    props.handleOnChangeDate(dateString)
                }}
                value={props.value}
            />
        </div>
    )
}

export {
    DatePickerComponent
}