import { useDisclosure, TableCell, Tooltip, Pagination, TableHeader, TableColumn, TableBody, TableRow, Table } from "@nextui-org/react"
import { EyeIcon, EditIcon, DeleteIcon, Search } from "lucide-react"
import { useState, useMemo, useCallback } from "react"
import { ButtomPrimaryOutline } from "../Buttons/BurronPrimaryOutline"
import { InputText } from "../Inputs/InputText"
import { RegisterWitnessModal } from "../Modals/RegisterWitnessModal"
import { RegisterIncidentModal } from "../Modals/RegisterIncidentModal"

function DatailsIncitentsSession() {
    const [page, setPage] = useState(1)
    const [incidents, setIncidents] = useState<any>([
        {
            id: "1",
            date: '03/12/2031',
            description: "CEO",
        },
        {
            id: "2",
            date: '03/12/2031',
            description: "Technical Lead",
        },
        {
            id: "3",
            date: '03/12/2031',
            description: "Senior Developer",
        },
        {
            id: "4",
            date: '03/12/2031',
            description: "Senior Developer",
        },
        {
            id: "5",
            date: '03/12/2031',
            description: "Senior Developer",
        },
        {
            id: "6",
            date: '03/12/2031',
            description: "Senior Developer",
        },
        {
            id: "7",
            date: '03/12/2031',
            description: "Senior Developer",
        },
        {
            id: "8",
            date: '03/12/2031',
            description: "Senior Developer",
        }
    ])
    const rowsPerPage = 10
    const pages = Math.ceil(incidents.length / rowsPerPage)
    const modalRegisterIncident = useDisclosure()
    const [search, setSearch] = useState<string>('')

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
                        {incident.description}
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
                            {(item: any) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => renderCell(item, columnKey)}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <RegisterIncidentModal isOpen={modalRegisterIncident.isOpen} onOpenChange={modalRegisterIncident.onOpenChange} />
        </>
    )
}

export {
    DatailsIncitentsSession
}