import { Card, CardBody,  CardHeader } from "@nextui-org/react"

interface CardComponentProps {
    imgURL: string
    name: string
    description: string
}

function CardComponent(props: CardComponentProps) {
    return (
        <Card className="w-[300px] p-2 flex flex-col flex-shrink-0 shadow-md cursor-grab">
            <CardHeader className="flex justify-center flex-col">
                <img
                    alt="nextui logo"
                    src={props.imgURL}
                    className="rounded-full"
                    style={{ width: '60px', height: '60px' }}
                />
                <h1 className="mt-1 text-lg text-neutral-dGrey font-semibold">{props.name}</h1>
            </CardHeader>
            <CardBody>
                <p className="text-sm">{props.description}</p>
            </CardBody>
        </Card>
    )
}

export {
    CardComponent
}