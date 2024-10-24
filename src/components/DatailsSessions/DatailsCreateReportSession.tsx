import pages from "@/pages";
import { Pagination, TableHeader, TableColumn, TableBody, TableRow, useDisclosure, Table, TableCell, Tooltip, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon, Plus, Search } from "lucide-react";
import { ButtomPrimaryOutline } from "../Buttons/BurronPrimaryOutline";
import { InputText } from "../Inputs/InputText";
import { CustomFormInput } from "../Inputs/CustomFormInput";
import { SelectComponent } from "../Selects/SelectComponent";
import { useCallback, useState } from "react";
import { ListItemsType } from "@/src/types/select";

function DatailsCreateReportSession() {
    const modalRegisterIncident = useDisclosure()
    const modalRegisterWitness = useDisclosure()
    const [positions, setPositions] = useState<ListItemsType[]>([
        {
            ID: 'kneion',
            label: 'Gerente'
        },
        {
            ID: 'qcklqncjq',
            label: 'Bancada'
        }
    ])
    const [department, setDepartment] = useState<ListItemsType[]>([
        {
            ID: 'kneion',
            label: 'RH'
        },
        {
            ID: 'qcklqncjq',
            label: 'efw'
        }
    ])
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

    const renderCellWitnessTable = useCallback((incident: any, columnKey: any) => {
        const cellValue = incident[columnKey]

        switch (columnKey) {
            case "name":
                return (
                    <TableCell >{incident.name}</TableCell>
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

    const renderCellIncidents = useCallback((incident: any, columnKey: any) => {
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
                    <h1 className='text-shade-3 text-xl font-semibold uppercase'>Realizar Denúncia</h1>
                    <div className="flex items-center justify-end gap-3 flex-grow">
                        <ButtomPrimaryOutline variant="md" variantIcon='no-icon' onPress={modalRegisterWitness.onOpen}>
                            Registrar Testemunha
                        </ButtomPrimaryOutline>
                        <ButtomPrimaryOutline variant="md" variantIcon='no-icon' onPress={modalRegisterIncident.onOpen}>
                            Registrar Incidente
                        </ButtomPrimaryOutline>
                    </div>
                </div>
                <div className='mt-4 h-[520px]'>
                    <div className="flex gap-3 w-full">
                        <CustomFormInput align="left" className="w-1/3" label="Nome" type="text" variant="lg" />
                        <SelectComponent itens={positions} align="left" className="w-1/3" label="Cargo" variant="sm" />
                        <SelectComponent itens={department} align="left" className="w-1/3" label="Departamento" variant="sm" />
                    </div>
                    <div className="mt-4 flex gap-3 w-full">
                        <div className="w-1/2 flex items-end gap-2">
                            <SelectComponent className="flex-grow" itens={positions} align="left" label="Testemunhas" variant="sm" />
                            <ButtomPrimaryOutline className="mb-1" variant="md" variantIcon='no-icon' onPress={modalRegisterIncident.onOpen}>
                                <Plus />
                            </ButtomPrimaryOutline>
                        </div>
                        <div className="w-1/2 flex items-end gap-2">
                            <SelectComponent className="flex-grow" itens={department} align="left" label="Incidentes" variant="sm" />
                            <ButtomPrimaryOutline className="mb-1" variant="md" variantIcon='no-icon' onPress={modalRegisterIncident.onOpen}>
                                <Plus />
                            </ButtomPrimaryOutline>
                        </div>
                    </div>
                    <div className="flex">
                        <Table
                            aria-label="Example table with client side pagination"
                            classNames={{
                                wrapper: "h-full shadow-none",
                                th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
                            }}
                            className="h-full shadow-none"
                        >
                            <TableHeader>
                                <TableColumn key="name" style={{ width: '20%' }}>NOME</TableColumn>
                                <TableColumn key="actions" style={{ width: '20%', textAlign: 'center' }}>AÇÕES</TableColumn>
                            </TableHeader>
                            <TableBody items={witness}>
                                {(item: any) => (
                                    <TableRow key={item.id}>
                                        {(columnKey) => renderCellWitnessTable(item, columnKey)}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Table
                            aria-label="Example table with client side pagination"

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
                            <TableBody items={incidents}>
                                {(item: any) => (
                                    <TableRow key={item.id}>
                                        {(columnKey) => renderCellIncidents(item, columnKey)}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="ms-3 mt-4">
                        <CheckboxGroup>
                            <Checkbox value="buenos-aires">Assédio Sexual</Checkbox>
                            <Checkbox value="sydney">Assédio Moral</Checkbox>
                            <Checkbox value="san-francisco">Deseja Permanecer Anônimamente?</Checkbox>
                            <Checkbox value="london">Você aceita que todos os seus dados sejam usados no processo da denúncia?</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div className="mt-6 flex justify-end pb-6">
                        <ButtomPrimaryOutline className="mb-1" variant="lg" variantIcon='no-icon'>
                            Realizar Denuncia
                        </ButtomPrimaryOutline>
                    </div>
                </div>
            </div>

        </>
    )
}

export {
    DatailsCreateReportSession
}