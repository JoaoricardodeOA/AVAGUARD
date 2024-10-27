import { useEffect, useState } from "react"
import { SelectComponent } from "./SelectComponent"
import { avaguardService } from "@/src/service/avaguardService"
import { ListItemsType } from "@/src/types/select"

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

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const response: any = await avaguardService.get('/listGenders')

        if (response?.validationError) {
            console.log(response?.validationError)
        } else if (response?.error) {
            console.log(response.error)
        } else if (response?.genders) {
            setGenders(response.genders.map((gender: any) => ({ ID: gender.genderId, label: gender.name })))
        }
    }

    function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        props.handleChooseValue(e.target.value)
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
        />
    )
}

export {
    GendersSelectComponent
}