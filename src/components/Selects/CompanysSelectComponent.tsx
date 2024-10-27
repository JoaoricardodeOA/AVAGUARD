import { useEffect, useState } from "react"
import { SelectComponent } from "./SelectComponent"
import { avaguardService } from "@/src/service/avaguardService"
import { ListItemsType } from "@/src/types/select"
import { NotificationAction } from "../Notifications/Notification"

interface CompanysSelectComponentProps {
    handleChooseValue(value: string): void
    variant: 'sm' | 'md' | 'lg',
    radius?: "none" | "sm" | "md" | "lg" | "full"
    label: string
    className?: string
    align?: 'left' | 'center' | 'right'
}

function CompanysSelectComponent(props: CompanysSelectComponentProps) {
    const [companys, setCompanys] = useState<ListItemsType[]>([])

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const response: any = await avaguardService.get('/listCompanys')

        if (response?.validationError) {
            console.log(response?.validationError)
        } else if (response?.error) {
            NotificationAction.notificationError()
            console.log(response.error)
        } else if (response?.companys) {
            setCompanys(response.companys.map((company: any) => ({ ID: company.companyId, label: company.name })))
        }
    }

    function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        props.handleChooseValue(e.target.value)
    }

    return (
        <SelectComponent
            itens={companys}
            label={props.label}
            variant={props.variant}
            align={props.align}
            className={props.className}
            radius={props.radius}
            onChange={handleSelectionChange}
        />
    )
}

export {
    CompanysSelectComponent
}