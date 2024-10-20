import { AlertInfo } from "@/src/components/Alerts/AlertInfo"
import { ButtonPrimary } from "@/src/components/Buttons/ButtonPrimary"
import { CardSession } from "@/src/components/Card/CardSession"
import { InputText } from "@/src/components/Inputs/InputText"
import { Navbar } from "@/src/components/navbar"
import { ListVictmisType } from "@/src/types/victmis"
import { ArrowRight, Search } from "lucide-react"
import { useState } from "react"

function HomeView() {
    const [search, setSearch] = useState<string>('')
    const [victims, setVictims] = useState<ListVictmisType[]>([
        {
            clientName: "Uninassau",
            victims: [
                {
                    imgURL: '/mulher-maravilha.png',
                    name: "Mulher Maravilha",
                    description: "Superman deu um tapa na bunda dela enquanto eles estavam em uma batalha conjunta. Esses incidentes acontecem com frequência, após ela expressar seu desconforto várias vezes, Superman desconsiderou...",
                    status: "warning"
                },
                {
                    imgURL: '/capita-marvel.png',
                    name: "Capitã Marvel",
                    description: "Enquanto estava em uma missão espacial, Capitão América constantemente fazia comentários sobre como a roupa dela a deixava atraente.",
                    status: "warning"
                },
            ]
        },
        {
            clientName: "Uninabuco",
            victims: [
                {
                    imgURL: '/mulher-maravilha.png',
                    name: "Mulher Maravilha",
                    description: "Superman deu um tapa na bunda dela enquanto eles estavam em uma batalha conjunta...",
                    status: "warning"
                },
                {
                    imgURL: '/mulher-maravilha.png',
                    name: "Mulher Maravilha",
                    description: "Superman deu um tapa na bunda dela enquanto eles estavam em uma batalha conjunta...",
                    status: "warning"
                },
                {
                    imgURL: '/mulher-maravilha.png',
                    name: "Mulher Maravilha",
                    description: "Superman deu um tapa na bunda dela enquanto eles estavam em uma batalha conjunta...",
                    status: "warning"
                },
                {
                    imgURL: '/mulher-maravilha.png',
                    name: "Mulher Maravilha",
                    description: "Superman deu um tapa na bunda dela enquanto eles estavam em uma batalha conjunta...",
                    status: "warning"
                },
                {
                    imgURL: '/mulher-maravilha.png',
                    name: "Mulher Maravilha",
                    description: "Superman deu um tapa na bunda dela enquanto eles estavam em uma batalha conjunta...",
                    status: "warning"
                },
                {
                    imgURL: '/mulher-maravilha.png',
                    name: "Mulher Maravilha",
                    description: "Superman deu um tapa na bunda dela enquanto eles estavam em uma batalha conjunta...",
                    status: "warning"
                },
                {
                    imgURL: '/mulher-maravilha.png',
                    name: "Mulher Maravilha",
                    description: "Superman deu um tapa na bunda dela enquanto eles estavam em uma batalha conjunta...",
                    status: "warning"
                },
                {
                    imgURL: '/mulher-maravilha.png',
                    name: "Mulher Maravilha",
                    description: "Superman deu um tapa na bunda dela enquanto eles estavam em uma batalha conjunta...",
                    status: "warning"
                },
            ]
        }
    ])

    const filteredVictims = victims.map(victimGroup => ({
        ...victimGroup,
        victims: victimGroup.victims.filter(victim =>
            victim.name.toLowerCase().includes(search.toLowerCase())
        )
    }))

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-14">
                <div className="flex items-center gap-3">
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
                    <ButtonPrimary className="w-1/4 text-sm font-light" variant="lg" variantIcon="right" icon={<ArrowRight size={18} />}>
                        Cadastro de Vitimas
                    </ButtonPrimary>
                </div>

                {
                    filteredVictims.every(victims => victims.victims.length === 0) ? (
                        <div className="mt-10">
                            <AlertInfo message="Nunhuma vítima cadastrada."/>
                        </div>
                    ) : (
                        filteredVictims.map(victimis => (
                            <CardSession key={victimis.clientName} clientName={victimis.clientName} victimis={victimis.victims} />
                        ))
                    )
                }
            </div>
        </>
    )
}

export { HomeView }
