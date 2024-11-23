import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'

export interface SeriesType {
    name: string;
    data: number[];
    type: string;
    color: string;
}

export interface SeriesFormat {
    series: number[];
    categories: string[];
}

export interface ChartOptions {
    chart: {
        type: string;
        toolbar: {
            show: boolean
        }
    };
    colors?: string[]
    legend: {
        position: string;
    };
    dataLabels: {
        enabled?: boolean;
        formatter?: (val: number, opts: any) => string,
        style?: {
            fontSize: string;
            colors: string[];
        }
    };
    tooltip: {
        enabled: boolean;
        shared: boolean;
        y?: {
            formatter: (val: number) => string;
        };
    };
    noData: {
        text: string;
        align: string;
        verticalAlign: string;
        style: {
            fontSize: string;
        };
    };
    labels: string[]
    series: number[]
}

interface ApexChartProps {
    options: ChartOptions,
    series: number[],
    height: number | string
    type: string
}

function ApexChart(props: ApexChartProps) {
    const [Chart, setChart] = useState<any>(null)

    useEffect(() => {
        createComponent()
    }, [])

    async function createComponent() {
        const Chart = dynamic(() => import('react-apexcharts'))
        setChart(Chart)
    }

    console.log(props)

    return (
        <>
            {Chart && props.options && props.series &&
                <Chart
                    options={props.options}
                    series={props.series}
                    height={props.height}
                    type={props.type}
                ></Chart>
            }
        </>
    )
}

export {
    ApexChart
}