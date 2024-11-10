import { useEffect, useRef, useState } from "react"
import { SelectComponent } from "./SelectComponent"
import { avaguardService } from "@/src/service/avaguardService"
import { ListItemsType } from "@/src/types/select"
import { NotificationAction } from "../Notifications/Notification"

interface GendersSelectComponentProps {
    handleChooseValue(value: string): void
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    label: string
    className?: string
    align?: 'left' | 'center' | 'right'
}

function GendersSelectComponent(props: GendersSelectComponentProps) {
    const [genders, setGenders] = useState<ListItemsType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const loadingRef = useRef<boolean>(true)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const response: any = await avaguardService.get('/listGenders')

        if (response?.validationError) {
            NotificationAction.notificationWarning(response?.validationError)
        } else if (response?.error) {
            NotificationAction.notificationError(response?.error)
        } else if (response?.genders) {
            setGenders(response.genders.map((gender: any) => ({ ID: gender.genderId, label: gender.name })))
        }

        setLoading(false)
        loadingRef.current = false
    }

    function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        props.handleChooseValue(e.target.value)
    }

    async function handleList(): Promise<void> {
        if (!loadingRef.current) {
            setLoading(true)
            loadingRef.current = true

            await init()

            setLoading(false)
            loadingRef.current = false
        }
    }

    return (
        <SelectComponent
            itens={genders}
            label={props.label}
            variant={props.variant}
            align={props.align}
            className={props.className}
            radius={props.radius}
            onChange={handleSelectionChange}
            onOpenChange={handleList}
            isLoading={loading}
        />
    )
}

export {
    GendersSelectComponent
}