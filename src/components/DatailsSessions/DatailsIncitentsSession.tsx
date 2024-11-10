import { useDisclosure, TableCell, Tooltip, Pagination, TableHeader, TableColumn, TableBody, TableRow, Table, Spinner } from "@nextui-org/react"
import { EyeIcon, EditIcon, DeleteIcon, Search } from "lucide-react"
import { useState, useMemo, useCallback, useEffect } from "react"
import { ButtomPrimaryOutline } from "../Buttons/BurronPrimaryOutline"
import { InputText } from "../Inputs/InputText"
import { RegisterIncidentModal } from "../Modals/RegisterIncidentModal"
import { VictimsWithInformationType } from "@/src/Views/HomeView/HomeViewType"
import { CreateVictimIncidentUseCaseDTOInputType, ListVictimIncidentResponseType, VictimIncidentInformationType, VictimIncidentType } from "@/src/types/incident"
import { avaguardService } from "@/src/service/avaguardService"
import { NotificationAction } from "../Notifications/Notification"
import { uploadFile } from "@/src/service/file"

interface DatailsIncitentsSessionProps {
    victim: VictimsWithInformationType
}

function DatailsIncitentsSession(props: DatailsIncitentsSessionProps) {
    const [page, setPage] = useState(1)
    const [incidents, setIncidents] = useState<VictimIncidentInformationType[]>([])
    const [search, setSearch] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [victim, setVictim] = useState<VictimsWithInformationType>()
    const rowsPerPage = 10
    const pages = Math.ceil(incidents.length / rowsPerPage)
    const modalRegisterIncident = useDisclosure()

    useEffect(() => {
        if(props.victim) {
            init(props.victim)
        }
    }, [props.victim])

    async function init(victim: VictimsWithInformationType) {
        setLoading(true)
        const response = await avaguardService.get<ListVictimIncidentResponseType>(`/listVictimIncidents?id=${victim.victimId}`)

        if (response?.validationError) {
            NotificationAction.notificationWarning(response?.validationError)
        } else if (response?.error) {
            NotificationAction.notificationError(response.error)
        } else if (response?.incidents) {
            setIncidents(response.incidents)
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

        return incidents.slice(start, end)
    }, [page, incidents])

    const renderCell = useCallback((incident: any, columnKey: any) => {
        const cellValue = incident[columnKey]

        switch (columnKey) {
            case "date":
                return (
                    <TableCell >{incident.date}</TableCell>
                )
            case "description":
                return (
                    <TableCell >
                        {incident.eventDescription}
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

    async function handleCreateIncident(victimIncident: VictimIncidentType, onClose: () => void): Promise<void> {
        try {
            const evidences: string[] = []

            for (let j = 0; j < victimIncident.files.length; j++) {
                const file = victimIncident.files[j];

                try {
                    const url = await uploadFile(file, 'victim-incident')

                    evidences.push(url)
                } catch (error: any) {
                    NotificationAction.notificationError(error.message)
                }
            }

            const victimIncidentInput: CreateVictimIncidentUseCaseDTOInputType = {
                date: victimIncident.date,
                eventDescription: victimIncident.eventDescription,
                evidences,
                victimId: victim?.victimId as string
            }

            const victimIncidentCreated = await avaguardService.post('/createVictimIncident', {
                ...victimIncidentInput
            })

            if(victimIncidentCreated.error) {
                NotificationAction.notificationError(victimIncidentCreated.error)
            } else if(victimIncidentCreated.validationError) {
                NotificationAction.notificationWarning(victimIncidentCreated.validationError)
            } else {
                NotificationAction.notificationSuccess('Incidente registrado com sucesso.')
                init(victim as VictimsWithInformationType)
                onClose()
            }
        } catch (error: any) {
            NotificationAction.notificationError(error.message)
        }
    }

    return (
        <>
            <div className='w-4/5 shadow-md p-10 pb-0 rounded-2xl shadow-tint-4 h-[630px] overflow-y-auto'>
                <div className='flex justify-between items-center gap-8'>
                    <h1 className='text-shade-3 text-xl font-semibold uppercase'>Relatórios de Incidentes</h1>
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
                        <ButtomPrimaryOutline className="w-1/4" variant="lg" variantIcon='no-icon' onPress={modalRegisterIncident.onOpen}>
                            Registrar Incidente
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
                                    <TableColumn key="date" style={{ width: '20%' }}>DATA</TableColumn>
                                    <TableColumn key="description" style={{ width: '60%' }}>DESCRIÇÃO</TableColumn>
                                    <TableColumn key="actions" style={{ width: '20%', textAlign: 'center' }}>AÇÕES</TableColumn>
                                </TableHeader>
                                <TableBody items={items}>
                                    {(item: VictimIncidentInformationType) => (
                                        <TableRow key={item.victimIncidentId}>
                                            {(columnKey) => renderCell(item, columnKey)}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )
                    }
                </div>
            </div>

            <RegisterIncidentModal isOpen={modalRegisterIncident.isOpen} onOpenChange={modalRegisterIncident.onOpenChange} createVictimIncident={handleCreateIncident} />
        </>
    )
}

export {
    DatailsIncitentsSession
}