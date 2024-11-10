import { useEffect, useRef, useState } from "react"
import { SelectComponent } from "./SelectComponent"
import { avaguardService } from "@/src/service/avaguardService"
import { ListItemsType } from "@/src/types/select"
import { NotificationAction } from "../Notifications/Notification"
import { ListVictimWitnessResponseType, VictimWitnessType } from "@/src/types/witness"

interface VictimWitnessSelectComponentProps {
    handleChooseValue(value: VictimWitnessType): void
    victimId: string | null
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    label: string
    className?: string
    align?: 'left' | 'center' | 'right'
}

function VictimWitnessSelectComponent(props: VictimWitnessSelectComponentProps) {
    const [loading, setLoading] = useState<boolean>(true)
    const [witness, setWitness] = useState<VictimWitnessType[]>([])
    const [items, setItems] = useState<ListItemsType[]>([])
    const loadingRef = useRef<boolean>(true)

    useEffect(() => {
        if (props.victimId) {
            listVictimWitness(props.victimId)
        }
    }, [props.victimId])

    async function listVictimWitness(victimId: string) {
        if (props.victimId) {
            const response = await avaguardService.get<ListVictimWitnessResponseType>(`/listWitnessByVictimId?id=${victimId}`)

            if (response?.validationError) {
                NotificationAction.notificationWarning(response?.validationError)
            } else if (response?.error) {
                NotificationAction.notificationError(response.error)
            } else if (response?.witness) {
                setWitness(response.witness)
                setItems(response.witness.map(witness => ({ ID: witness.victimWitnessId, label: `${witness.firstName} ${witness.lastName}` })))
            }
        }

        setLoading(false)
        loadingRef.current = false
    }

    function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const filter = witness.find(witness => witness.victimWitnessId === e.target.value)

        if(filter) {
            props.handleChooseValue(filter)
        }
    }

    async function handleList(): Promise<void> {
        if (!loadingRef.current) {
            setLoading(true)
            loadingRef.current = true

            await listVictimWitness(props.victimId as string)

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
    VictimWitnessSelectComponent
}