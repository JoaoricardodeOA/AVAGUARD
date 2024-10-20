import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@nextui-org/react"
import { ChipComponent } from "../Badge/Badge"

interface CardComponentProps {
    imgURL: string
    name: string
    description: string
    status: 'error' | 'warning' | 'success' | 'progress'
}

function CardComponent(props: CardComponentProps) {
    return (
        <Card className="w-[300px] p-2 flex flex-col flex-shrink-0 shadow-md">
            <CardHeader className="flex justify-center flex-col">
                <Image
                    alt="nextui logo"
                    height={40}
                    src={props.imgURL}
                    width={40}
                />
                <h1 className="mt-1 text-lg text-neutral-dGrey font-semibold">{props.name}</h1>
            </CardHeader>
            <CardBody>
                <p className="text-sm">{props.description}</p>
            </CardBody>
            <CardFooter>
                {
                    props.status === 'warning' && (
                        <ChipComponent color="warning">
                            Análise de Provas
                        </ChipComponent>
                    )
                }
                {
                    props.status === 'success' && (
                        <ChipComponent color="success">
                            Sucesso
                        </ChipComponent>
                    )
                }
                {
                    props.status === 'error' && (
                        <ChipComponent color="danger">
                            Erro
                        </ChipComponent>
                    )
                }
                {
                    props.status === 'error' && (
                        <ChipComponent color="primary">
                            Em Andamento
                        </ChipComponent>
                    )
                }
            </CardFooter>
        </Card>
    )
}

export {
    CardComponent
}