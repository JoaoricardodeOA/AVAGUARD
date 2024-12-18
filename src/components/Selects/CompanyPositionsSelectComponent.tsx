import { useEffect, useRef, useState } from "react"
import { SelectComponent } from "./SelectComponent"
import { avaguardService } from "@/src/service/avaguardService"
import { ListItemsType } from "@/src/types/select"
import { NotificationAction } from "../Notifications/Notification"

interface CompanyPositionsSelectComponentProps {
    handleChooseValue(value: string): void
    companyId: string | null
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    label: string
    className?: string
    align?: 'left' | 'center' | 'right'
}

function CompanyPositionsSelectComponent(props: CompanyPositionsSelectComponentProps) {
    const [positions, setPositions] = useState<ListItemsType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const loadingRef = useRef<boolean>(true)

    useEffect(() => {
        init()
    }, [props.companyId])

    async function init() {
        if (props.companyId) {
            const response: any = await avaguardService.get(`/listCompanyPositionsByCompanyId?companyId=${props.companyId}`)

            if (response?.validationError) {
                NotificationAction.notificationWarning(response?.validationError)
            } else if (response?.error) {
                NotificationAction.notificationError(response?.error)
            } else if (response?.positions) {
                setPositions(response.positions.map((position: any) => ({ ID: position.companyPositionId, label: position.name })))
            }
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
            itens={positions}
            label={props.label}
            variant={props.variant}
            align={props.align}
            className={props.className}
            radius={props.radius}
            onChange={handleSelectionChange}
            disabled={!!props.companyId || false}
            onOpenChange={handleList}
            isLoading={loading}
        />
    )
}

export {
    CompanyPositionsSelectComponent
}