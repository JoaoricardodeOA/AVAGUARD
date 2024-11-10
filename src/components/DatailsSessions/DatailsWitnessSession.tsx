import { useDisclosure, TableCell, Tooltip, Pagination, TableHeader, TableColumn, TableBody, TableRow, Table, Spinner } from "@nextui-org/react"
import { EyeIcon, EditIcon, DeleteIcon, Search } from "lucide-react"
import { useState, useMemo, useCallback, useEffect } from "react"
import { ButtomPrimaryOutline } from "../Buttons/BurronPrimaryOutline"
import { InputText } from "../Inputs/InputText"
import { RegisterIncidentModal } from "../Modals/RegisterIncidentModal"
import { RegisterWitnessModal } from "../Modals/RegisterWitnessModal"
import { ListVictimWitnessResponseType, VictimWitnessType, WitnessRequestType } from "@/src/types/witness"
import { VictimsWithInformationType } from "@/src/Views/HomeView/HomeViewType"
import { avaguardService } from "@/src/service/avaguardService"
import { NotificationAction } from "../Notifications/Notification"

interface DatailsWitnessSessionProps {
    victim: VictimsWithInformationType
}

function DatailsWitnessSession(props: DatailsWitnessSessionProps) {
    const [page, setPage] = useState(1)
    const [witness, setWitness] = useState<VictimWitnessType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [victim, setVictim] = useState<VictimsWithInformationType>()
    const rowsPerPage = 10
    const pages = Math.ceil(witness.length / rowsPerPage)
    const modalRegisterWitness = useDisclosure()
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        if (props.victim) {
            init(props.victim)
        }
    }, [props.victim])

    async function init(victim: VictimsWithInformationType) {
        setLoading(true)
        const response = await avaguardService.get<ListVictimWitnessResponseType>(`/listWitnessByVictimId?id=${victim.victimId}`)

        if (response?.validationError) {
            NotificationAction.notificationWarning(response?.validationError)
        } else if (response?.error) {
            NotificationAction.notificationError(response.error)
        } else if (response?.witness) {
            setWitness(response.witness)
            setVictim(victim)
        }

        setLoading(false)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return witness.slice(start, end)
    }, [page, witness])

    const renderCell = useCallback((witness: any, columnKey: any) => {
        const cellValue = witness[columnKey]

        switch (columnKey) {
            case "name":
                return (
                    <TableCell>{`${witness.firstName} ${witness.lastName}`}</TableCell>
                )
            case "address":
                return (
                    <TableCell >
                        {witness.address}
                    </TableCell>
                )
            case "actions":
                return (
                    <TableCell style={{ textAlign: 'right' }}>
                        <div className="flex items-center justify-center gap-2">
                            <Tooltip content="Details">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EyeIcon size={18} />
                                </span>
                            </Tooltip>
                            <Tooltip content="Edit">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EditIcon size={18} />
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon size={18} />
                                </span>
                            </Tooltip>
                        </div>
                    </TableCell>
                )
            default:
                return <TableCell>{cellValue}</TableCell>
        }
    }, [])

    async function handleCreateWitness(witnessRequest: WitnessRequestType, onClose: () => void): Promise<void> {
        const victimWitnessCreated = await avaguardService.post('/createVictimWitness', {
            ...witnessRequest,
            victimId: victim?.victimId
        })

        if (victimWitnessCreated.error) {
            NotificationAction.notificationError(victimWitnessCreated.error)
        } else if (victimWitnessCreated.validationError) {
            NotificationAction.notificationWarning(victimWitnessCreated.validationError)
        } else {
            NotificationAction.notificationSuccess('Incidente registrado com sucesso.')
            init(victim as VictimsWithInformationType)
            onClose()
        }
    }

    return (
        <>
            <div className='w-4/5 shadow-md p-10 pb-0 rounded-2xl shadow-tint-4 h-[630px] overflow-y-auto'>
                <div className='flex justify-between items-center gap-8'>
                    <h1 className='text-shade-3 text-xl font-semibold uppercase'>Testemunhas</h1>
                    <div className="flex items-center gap-3 flex-grow">
                        <InputText
                            className="w-3/4"
                            type="text"
                            variantIcon="left"
                            iconLeft={
                                <div className="pe-3">
                                    <Search className="text-primary" />
                                </div>
                            }
                            placeholder="Pesquisar..."
                            value={search}
                            onChange={onChange}
                        />
                        <ButtomPrimaryOutline className="w-1/4" variant="lg" variantIcon='no-icon' onPress={modalRegisterWitness.onOpen}>
                            Registrar Testemunha
                        </ButtomPrimaryOutline>
                    </div>
                </div>
                <div className='mt-4 h-[520px]'>
                    {
                        loading ? (
                            <div className="flex justify-center items-center h-full">
                                <Spinner size="lg" />
                            </div>
                        ) : (
                            <Table
                                aria-label="Example table with client side pagination"
                                bottomContent={
                                    <div className="flex w-full justify-end">
                                        <Pagination
                                            isCompact
                                            showControls
                                            showShadow
                                            color="primary"
                                            page={page}
                                            total={pages}
                                            onChange={(page) => setPage(page)}
                                        />
                                    </div>
                                }
                                classNames={{
                                    wrapper: "h-full shadow-none",
                                    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
                                }}
                                className="h-full shadow-none"
                            >
                                <TableHeader>
                                    <TableColumn key="name" style={{ width: '20%' }}>NOME</TableColumn>
                                    <TableColumn key="address" style={{ width: '40%' }}>ENDEREÇO</TableColumn>
                                    <TableColumn key="actions" style={{ width: '20%', textAlign: 'center' }}>AÇÕES</TableColumn>
                                </TableHeader>
                                <TableBody items={items}>
                                    {(item: VictimWitnessType) => (
                                        <TableRow key={item.victimWitnessId}>
                                            {(columnKey) => renderCell(item, columnKey)}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )
                    }
                </div>
            </div>

            <RegisterWitnessModal isOpen={modalRegisterWitness.isOpen} onOpenChange={modalRegisterWitness.onOpenChange} handleCreateWitness={handleCreateWitness} />
        </>
    )
}

export {
    DatailsWitnessSession
}