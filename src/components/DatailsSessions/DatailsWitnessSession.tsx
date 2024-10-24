import { useDisclosure, TableCell, Tooltip, Pagination, TableHeader, TableColumn, TableBody, TableRow, Table } from "@nextui-org/react"
import { EyeIcon, EditIcon, DeleteIcon, Search } from "lucide-react"
import { useState, useMemo, useCallback } from "react"
import { ButtomPrimaryOutline } from "../Buttons/BurronPrimaryOutline"
import { InputText } from "../Inputs/InputText"
import { RegisterIncidentModal } from "../Modals/RegisterIncidentModal"
import { RegisterWitnessModal } from "../Modals/RegisterWitnessModal"

function DatailsWitnessSession() {
    const [page, setPage] = useState(1)
    const [witness, setWitness] = useState<any>([
        {
            id: "1",
            name: "João Silva",
            address: "Rua das Flores, 123",
            position: "CEO",
        },
        {
            id: "2",
            name: "Maria Oliveira",
            address: "Avenida Brasil, 456",
            position: "Gerente de Operações",
        },
        {
            id: "3",
            name: "Pedro Santos",
            address: "Rua dos Limoeiros, 789",
            position: "Desenvolvedor Senior",
        },
        {
            id: "4",
            name: "Ana Pereira",
            address: "Travessa dos Pinhais, 234",
            position: "Analista de Marketing",
        },
        {
            id: "5",
            name: "Carlos Souza",
            address: "Praça Central, 98",
            position: "Diretor Financeiro",
        },
        {
            id: "6",
            name: "Luciana Costa",
            address: "Rua das Palmeiras, 567",
            position: "Coordenadora de RH",
        },
        {
            id: "7",
            name: "Ricardo Lima",
            address: "Avenida dos Coqueiros, 654",
            position: "Analista de Sistemas",
        },
        {
            id: "8",
            name: "Fernanda Rodrigues",
            address: "Rua dos Ipês, 345",
            position: "Designer Gráfico",
        }
    ])
    const rowsPerPage = 10
    const pages = Math.ceil(witness.length / rowsPerPage)
    const modalRegisterWitness = useDisclosure()
    const [search, setSearch] = useState<string>('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return witness.slice(start, end)
    }, [page, witness])

    const renderCell = useCallback((incident: any, columnKey: any) => {
        const cellValue = incident[columnKey]

        switch (columnKey) {
            case "name":
                return (
                    <TableCell >{incident.name}</TableCell>
                )
            case "address":
                return (
                    <TableCell >
                        {incident.address}
                    </TableCell>
                )
            case "position":
                return (
                    <TableCell >
                        {incident.position}
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
                            <TableColumn key="position" style={{ width: '40%' }}>CARGO</TableColumn>
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

            <RegisterWitnessModal isOpen={modalRegisterWitness.isOpen} onOpenChange={modalRegisterWitness.onOpenChange} />
        </>
    )
}

export {
    DatailsWitnessSession
}