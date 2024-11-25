import { parseDateFromDDMMYYYY } from "@/src/common/dates"
import { ApexChart, ChartOptions, SeriesFormat } from "@/src/components/ApexChart/Chart"
import { Navbar } from "@/src/components/navbar"
import { Card, CardBody, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react"
import { EyeIcon } from "lucide-react"
import React from "react"
import { useEffect, useState } from "react"

type DataType = "RECIPES" | "EXPENSE"

interface Transaction {
    date: string // formato DD/MM/YYYY
    type: DataType
    price: number
}

interface FormattedData {
    labels: string[]
    recipes: number[]
    expenses: number[]
}

interface DailyTotals {
    [key: string]: {
        recipes: number
        expenses: number
    }
}

const columns = [
    { name: "Funcionária", uid: "employee" },
    { name: "Empresa", uid: "company" },
    { name: "Status", uid: "status" },
    { name: "Ação", uid: "actions" },
]

const users = [
    {
        id: 2,
        name: "Zoey Lang",
        position: "CEO",
        company: "Management",
        status: "in_recording",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        phone: "(81) 99876-0892",
    },
    {
        id: 3,
        name: "Jane Fisher",
        position: "CEO",
        company: "Management",
        status: "in_recording",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        phone: "(81) 99876-0892",
    },
    {
        id: 5,
        name: "Kristen Copper",
        position: "CEO",
        company: "Management",
        status: "finish",
        avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
        phone: "(81) 99876-0892",
    }
]

export { columns, users }

function RealtimeRecordsView() {
    const [options, setOptions] = useState<ChartOptions>()
    const [series, setSeries] = useState<SeriesFormat>()

    useEffect(() => {
        createComponent()
    }, [])

    async function createComponent(): Promise<void> {
        const recipes: Transaction[] = [
            { date: "01/11/2024", type: "RECIPES", price: 1200.5 },
            { date: "02/11/2024", type: "RECIPES", price: 2500.0 },
            { date: "03/11/2024", type: "RECIPES", price: 1800.75 },
            { date: "01/11/2024", type: "RECIPES", price: 400.25 },
            { date: "04/11/2024", type: "RECIPES", price: 3200.0 },
        ]
        const expense: Transaction[] = [
            { date: "01/11/2024", type: "EXPENSE", price: 800.0 },
            { date: "02/11/2024", type: "EXPENSE", price: 1200.0 },
            { date: "03/11/2024", type: "EXPENSE", price: 750.25 },
            { date: "04/11/2024", type: "EXPENSE", price: 950.0 },
            { date: "04/11/2024", type: "EXPENSE", price: 400.0 },
        ]

        const formattedData: FormattedData = transformData([...recipes, ...expense])
        const series: SeriesFormat = seriesFormat([
            formattedData.recipes,
            formattedData.expenses,
            formattedData.labels,
        ])

        const options: ChartOptions = formattedOptions(series)

        setOptions(options)
        setSeries(series)
    }

    function seriesFormat(data: any[]): SeriesFormat {
        return {
            series: [10, 20],
            categories: ["Em gravação", "Gravação Finalizada"],
        }
    }

    function transformData(data: Transaction[]): FormattedData {
        const formattedData: FormattedData = {
            labels: [],
            recipes: [],
            expenses: [],
        }

        const dailyTotals: DailyTotals = {}

        data.forEach((item: Transaction) => {
            const date = parseDateFromDDMMYYYY(item.date)

            if (!formattedData.labels.includes(date)) {
                formattedData.labels.push(date)
            }

            if (!dailyTotals[date]) {
                dailyTotals[date] = {
                    recipes: 0,
                    expenses: 0,
                }
            }

            if (item.type === "RECIPES") {
                dailyTotals[date].recipes += item.price
            } else if (item.type === "EXPENSE") {
                dailyTotals[date].expenses += item.price
            }
        })

        formattedData.labels.forEach((label) => {
            formattedData.recipes.push(dailyTotals[label].recipes)
            formattedData.expenses.push(dailyTotals[label].expenses)
        })

        return formattedData
    }

    function formattedOptions(series: SeriesFormat): ChartOptions {
        const options: ChartOptions = {
            chart: {
                type: "pie",
                toolbar: {
                    show: false
                }
            },
            colors: ["#a7adfb", "#db3d3a"],
            legend: {
                position: "bottom",
            },
            dataLabels: {
                enabled: true
            },
            tooltip: {
                enabled: true,
                shared: false,
            },
            noData: {
                text: "Sem Dados",
                align: "center",
                verticalAlign: "middle",
                style: {
                    fontSize: "20px",
                },
            },
            labels: series.categories || [],
            series: series.series || []
        }

        return options
    }

    return (
        <>
            <Navbar />

            <div className="container max-w-screen-xl mx-auto px-10 mt-14">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-2xl text-shade-1 font-medium">Monitoriamento de Gravações</h1>
                </div>

                <div className="flex mt-12 items-center justify-around w-100">
                    <div className="flex gap-4">
                        <Card className="p-4 w-1/3">
                            <CardBody>
                                <div>
                                    <div>
                                        <h1 className="text-xl font-medium text-tint-3">Total de Gravações em Andamento</h1>
                                    </div>
                                    <p className="text-xs font-medium text-neutral-grey">Quantidade total de funcionárias realizando gravações hoje.</p>
                                </div>
                                <p className="mt-6 text-xl font-bold text-tint-3">50</p>
                            </CardBody>
                        </Card>
                        <Card className="p-4 w-1/3">
                            <CardBody>
                                <div>
                                    <div>
                                        <h1 className="text-xl font-medium" style={{ color: "#db3d3a" }}>Total de Gravações Finalizadas</h1>
                                    </div>
                                    <p className="text-xs font-medium text-neutral-grey">Quantidade total de funcionárias que já realizou gravações hoje.</p>
                                </div>
                                <p className="mt-6 text-xl font-bold" style={{ color: "#db3d3a" }}>45</p>
                            </CardBody>
                        </Card>
                        <Card className="p-4 w-1/3">
                            <CardBody>
                                <div>
                                    <div>
                                        <h1 className="text-xl font-medium text-action-success">Total de Gravações em Análise</h1>
                                    </div>
                                    <p className="text-xs font-medium text-neutral-grey">Quantidade total de de gravações sendo análisadas.</p>
                                </div>
                                <p className="mt-6 text-xl font-bold text-action-success">45</p>
                            </CardBody>
                        </Card>
                    </div>
                    {/* <div className="w-1/2">
                        <ApexChart type="pie" options={options as ChartOptions} series={series?.series as number[]} height={300} />
                    </div> */}
                </div>

                <div className="mt-8">
                    <Table aria-label="Example table with custom cells">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={users}>
                            {
                                users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <User
                                                avatarProps={{ radius: "lg", src: user.avatar }}
                                                description={user.phone}
                                                name={user.name}
                                            >
                                                {user.phone}
                                            </User>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{user.company}</p>
                                                <p className="text-bold text-sm capitalize text-default-400">{user.position}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                className="capitalize"
                                                size="sm"
                                                variant="flat"
                                                classNames={{
                                                    base: `
                                                    ${user.status === "in_recording" ? "bg-[#a7adfb]" : ""} 
                                                    ${user.status === "finish" ? "bg-[#db3d3a]" : ""}
                                                    bg-gradient-to-br border-small border-white/50
                                                    shadow-pink-500/30`,
                                                    content: "drop-shadow shadow-black text-white",
                                                }}
                                            >
                                                {user.status === 'finish' ? 'Gravação Finalizada' : 'Gravação em Andamento'}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <div className="relative flex items-center justify-center gap-2">
                                                <Tooltip content="Visualizar Gravação">
                                                    <button onClick={() => window.open('https://www.youtube.com/watch?v=h8UC1VtLr9w', "blank")}>
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                            <EyeIcon size={18} />
                                                        </span>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export {
    RealtimeRecordsView
}