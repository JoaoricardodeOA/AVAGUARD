import { decodeEmployeesRecordingStatus, maskPhone } from "@/src/common/utils"
import { EmployeesRecordingAnalysisModal } from "@/src/components/Modals/EmployeesRecordingAnalysisModal"
import { Navbar } from "@/src/components/navbar"
import { NotificationAction } from "@/src/components/Notifications/Notification"
import { EmployeesRecordingStatusEnum } from "@/src/enum/employees_recording"
import { avaguardService } from "@/src/service/avaguardService"
import { CountRealtimeEmployeesRecordingsType, ListRealtimeEmployeesRecordingsType, ListRealtimeEmployeesRecordingsUseCaseDTOOutput } from "@/src/types/employees_recording"
import { Card, CardBody, Chip, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure, User } from "@nextui-org/react"
import { EyeIcon, Play } from "lucide-react"
import { useSession } from "next-auth/react"
import React, { useMemo, useRef } from "react"
import { useEffect, useState } from "react"

const columns = [
    { name: "Funcionária", uid: "employee" },
    { name: "Data", uid: "date" },
    { name: "Empresa", uid: "company" },
    { name: "Status", uid: "status" },
    { name: "Ação", uid: "actions" },
]

function RealtimeRecordsView() {
    const [employeesRecordings, setEmployeesRecordings] = useState<ListRealtimeEmployeesRecordingsType[]>([])
    const [employeesRecordingsCount, setEmployeesRecordingsCount] = useState<CountRealtimeEmployeesRecordingsType | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const rowsPerPage = 8
    const [page, setPage] = useState(1)
    const pages = Math.ceil(employeesRecordings.length / rowsPerPage)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const modalEmployeesRecordingAnalysis = useDisclosure()
    const [selectedEmployeesRecording, setSelectedEmployeesRecording] = useState<ListRealtimeEmployeesRecordingsType | null>(null)
    const { data: session } = useSession()

    useEffect(() => {
        init()

        if (!intervalRef.current) {
            intervalRef.current = setInterval(reloadPage, 5000)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return employeesRecordings.slice(start, end)
    }, [page, employeesRecordings])

    async function init(): Promise<void> {
        const response = await avaguardService.get<ListRealtimeEmployeesRecordingsUseCaseDTOOutput>(`/listRealtimeEmployeesRecordings`)

        if (response?.validationError) {
            NotificationAction.notificationWarning(response?.validationError)
        } else if (response?.error) {
            NotificationAction.notificationError(response.error)
        } else if (response?.realtimeEmployees) {
            setEmployeesRecordings(response?.realtimeEmployees)
            setEmployeesRecordingsCount(response?.count || null)
        }

        setLoading(false)
    }

    async function reloadPage() {
        await init()
    }

    function getStatusColor(status: string): string {
        switch (status) {
            case EmployeesRecordingStatusEnum.IN_RECORDING:
                return 'bg-[#FFCC00]'
            case EmployeesRecordingStatusEnum.FINISHED:
                return 'bg-[#28a745]'
            case EmployeesRecordingStatusEnum.CANCELED:
                return 'bg-[#dc3545]'
            case EmployeesRecordingStatusEnum.IN_ANALYSIS:
                return 'bg-[#17a2b8]'
            case EmployeesRecordingStatusEnum.ANALYSIS_FINISHED:
                return 'bg-[#66bb6a]'
            default:
                return 'bg-[#6c757d]'
        }
    }

    if (loading) {
        return (
            <div className="h-[90vh] flex justify-center items-center">
                <Spinner size="lg" />
            </div>
        )
    }

    async function handleOnClickInitAnalysisEmployeesRecording(employeesRecording: ListRealtimeEmployeesRecordingsType) {
        const response = await avaguardService.post(`/initAnalysisEmployeesRecording`, {
            employeesRecordingId: employeesRecording.employeesRecordingId,
            userAnalyzing: session?.user?.id
        })

        if (response?.validationError) {
            NotificationAction.notificationWarning(response?.validationError)
        } else if (response?.error) {
            NotificationAction.notificationError(response.error)
        } else if (response?.employeesRecording) {
            setSelectedEmployeesRecording(employeesRecording)
            modalEmployeesRecordingAnalysis.onOpen()
            await init()
        }
    }

    async function handleOnClickViewAnalysisEmployeesRecording(employeesRecording: ListRealtimeEmployeesRecordingsType) {
        setSelectedEmployeesRecording(employeesRecording)
        modalEmployeesRecordingAnalysis.onOpen()
    }

    return (
        <>
            <Navbar />

            <div className="container max-w-screen-xl mx-auto px-10 mt-8">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-2xl text-shade-1 font-medium">Monitoriamento de Gravações</h1>
                </div>

                <div className="flex mt-6 items-center justify-around w-100">
                    <div className="flex gap-4">
                        <Card className="p-2 w-1/5">
                            <CardBody className={`text-[#FFCC00]`}>
                                <div>
                                    <div>
                                        <h1 className="text-lg font-medium">Em Andamento</h1>
                                    </div>
                                    <p className="text-xs font-medium text-neutral-grey">Quantidade total de funcionárias realizando gravações hoje.</p>
                                </div>
                                <p className="mt-6 text-xl font-bold">Total: {employeesRecordingsCount?.inRecordingCount}</p>
                            </CardBody>
                        </Card>
                        <Card className="p-2 w-1/5">
                            <CardBody className="text-[#28a745]">
                                <div>
                                    <div>
                                        <h1 className="text-xl font-medium">Finalizadas</h1>
                                    </div>
                                    <p className="text-xs font-medium text-neutral-grey">Quantidade total de funcionárias que já realizou gravações hoje.</p>
                                </div>
                                <p className="mt-6 text-xl font-bold">Total: {employeesRecordingsCount?.finishedCount}</p>
                            </CardBody>
                        </Card>
                        <Card className="p-2 w-1/5">
                            <CardBody className="text-[#17a2b8]">
                                <div>
                                    <div>
                                        <h1 className="text-xl font-medium">Em Análise</h1>
                                    </div>
                                    <p className="text-xs font-medium text-neutral-grey">Quantidade total de de gravações sendo análisadas.</p>
                                </div>
                                <p className="mt-6 text-xl font-bold">Total: {employeesRecordingsCount?.inAnalysisCount}</p>
                            </CardBody>
                        </Card>
                        <Card className="p-2 w-1/5">
                            <CardBody className="text-[#66bb6a]">
                                <div>
                                    <div>
                                        <h1 className="text-xl font-medium">Análize Finalizada</h1>
                                    </div>
                                    <p className="text-xs font-medium text-neutral-grey">Quantidade total de de gravações sendo análisadas.</p>
                                </div>
                                <p className="mt-6 text-xl font-bold">Total: {employeesRecordingsCount?.analysisFinishedCount}</p>
                            </CardBody>
                        </Card>
                        <Card className="p-2 w-1/5">
                            <CardBody className="text-[#dc3545]">
                                <div>
                                    <div>
                                        <h1 className="text-xl font-medium">Canceladas</h1>
                                    </div>
                                    <p className="text-xs font-medium text-neutral-grey">Quantidade total de de gravações sendo análisadas.</p>
                                </div>
                                <p className="mt-6 text-xl font-bold">Total: {employeesRecordingsCount?.canceledCount}</p>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                <div className="mt-4 h-[630px]">
                    <Table
                        aria-label="Example table with custom cells"
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
                        }}
                        className="h-full shadow-none"
                    >
                        <TableHeader columns={columns}>
                            <TableColumn style={{ width: '25%' }}>
                                Funcionária
                            </TableColumn>
                            <TableColumn style={{ width: '25%' }}>
                                Data
                            </TableColumn>
                            <TableColumn style={{ width: '25%' }}>
                                Empresa
                            </TableColumn>
                            <TableColumn style={{ width: '15%' }}>
                                Status
                            </TableColumn>
                            <TableColumn align={"center"}>
                                Ação
                            </TableColumn>
                        </TableHeader>
                        <TableBody items={items}>
                            {
                                items.map(employeesRecording => (
                                    <TableRow key={employeesRecording.employeesRecordingId}>
                                        <TableCell>
                                            <User
                                                avatarProps={{ radius: "lg", src: employeesRecording.avatar }}
                                                description={maskPhone(employeesRecording.phone)}
                                                name={employeesRecording.name}
                                            >
                                                {maskPhone(employeesRecording.phone)}
                                            </User>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{employeesRecording.date}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{employeesRecording.companyName}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                className="capitalize"
                                                size="sm"
                                                variant="flat"
                                                classNames={{
                                                    base: `
                                                    ${getStatusColor(employeesRecording.status)}
                                                    bg-gradient-to-br border-small border-white/50
                                                    shadow-pink-500/30`,
                                                    content: "drop-shadow shadow-black text-white",
                                                }}
                                            >
                                                {decodeEmployeesRecordingStatus(employeesRecording.status)}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-2">
                                                {
                                                    employeesRecording.status === EmployeesRecordingStatusEnum.FINISHED && (
                                                        <>
                                                            <Tooltip content="Iniciar Análise">
                                                                <button onClick={() => handleOnClickInitAnalysisEmployeesRecording(employeesRecording)}>
                                                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                        <Play size={18} />
                                                                    </span>
                                                                </button>
                                                            </Tooltip>
                                                        </>
                                                    )
                                                }
                                                {
                                                    employeesRecording.status === EmployeesRecordingStatusEnum.IN_ANALYSIS && (
                                                        <>
                                                            <Tooltip content="visualizar Análise">
                                                                <button onClick={() => handleOnClickViewAnalysisEmployeesRecording(employeesRecording)}>
                                                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                                        <EyeIcon size={18} />
                                                                    </span>
                                                                </button>
                                                            </Tooltip>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>

            <EmployeesRecordingAnalysisModal
                employeesRecording={selectedEmployeesRecording as ListRealtimeEmployeesRecordingsType}
                isOpen={modalEmployeesRecordingAnalysis.isOpen}
                onOpenChange={modalEmployeesRecordingAnalysis.onOpenChange}
            />
        </>
    )
}

export {
    RealtimeRecordsView
}