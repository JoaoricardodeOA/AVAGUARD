import { useEffect, useRef, useState } from "react"
import { SelectComponent } from "./SelectComponent"
import { avaguardService } from "@/src/service/avaguardService"
import { ListItemsType } from "@/src/types/select"
import { NotificationAction } from "../Notifications/Notification"
import { ListVictimIncidentResponseType, VictimIncidentInformationType } from "@/src/types/incident"

interface VictimIncidentSelectComponentProps {
    handleChooseValue(value: VictimIncidentInformationType): void
    victimId: string | null
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    label: string
    className?: string
    align?: 'left' | 'center' | 'right'
}

function VictimIncidentSelectComponent(props: VictimIncidentSelectComponentProps) {
    const [loading, setLoading] = useState<boolean>(true)
    const [incidents, setIncidents] = useState<VictimIncidentInformationType[]>([])
    const [items, setItems] = useState<ListItemsType[]>([])
    const loadingRef = useRef<boolean>(true)

    useEffect(() => {
        if (props.victimId) {
            listVictimIncident(props.victimId)
        }
    }, [props.victimId])

    async function listVictimIncident(victimId: string) {
        if (props.victimId) {
            const response = await avaguardService.get<ListVictimIncidentResponseType>(`/listVictimIncidents?id=${victimId}`)

            if (response?.validationError) {
                NotificationAction.notificationWarning(response?.validationError)
            } else if (response?.error) {
                NotificationAction.notificationError(response.error)
            } else if (response?.incidents) {
                setIncidents(response.incidents)
                setItems(response.incidents.map(incident => ({ ID: incident.victimIncidentId, label: `${incident.date} / ${incident.eventDescription}` })))
            }
        }

        setLoading(false)
        loadingRef.current = false
    }

    function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const filter = incidents.find(incident => incident.victimIncidentId === e.target.value)

        if(filter) {
            props.handleChooseValue(filter)
        }
    }

    async function handleList(): Promise<void> {
        if (!loadingRef.current) {
            setLoading(true)
            loadingRef.current = true

            await listVictimIncident(props.victimId as string)

            setLoading(false)
            loadingRef.current = false
        }
    }

    return (
        <SelectComponent
            itens={items}
            label={props.label}
            variant={props.variant}
            align={props.align}
            className={props.className}
            radius={props.radius}
            onChange={handleSelectionChange}
            disabled={!!props.victimId || false}
            onOpenChange={handleList}
            isLoading={loading}
        />
    )
}

export {
    VictimIncidentSelectComponent
}