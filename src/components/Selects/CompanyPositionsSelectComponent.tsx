import { useEffect, useState } from "react"
import { SelectComponent } from "./SelectComponent"
import { avaguardService } from "@/src/service/avaguardService"
import { ListItemsType } from "@/src/types/select"

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

    useEffect(() => {
        init()
    }, [props.companyId])

    async function init() {
        if (props.companyId) {
            const response: any = await avaguardService.get(`/listCompanyPositionsByCompanyId?companyId=${props.companyId}`)

            if (response?.validationError) {
                console.log(response?.validationError)
            } else if (response?.error) {
                console.log(response.error)
            } else if (response?.positions) {
                setPositions(response.positions.map((position: any) => ({ ID: position.companyPositionId, label: position.name })))
            }
        }
    }

    function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        props.handleChooseValue(e.target.value)
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
        />
    )
}

export {
    CompanyPositionsSelectComponent
}