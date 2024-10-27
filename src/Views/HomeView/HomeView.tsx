import { AlertInfo } from "@/src/components/Alerts/AlertInfo"
import { ButtonPrimary } from "@/src/components/Buttons/ButtonPrimary"
import { CardSession } from "@/src/components/Card/CardSession"
import { InputText } from "@/src/components/Inputs/InputText"
import { Navbar } from "@/src/components/navbar"
import { avaguardService } from "@/src/service/avaguardService"
import { ArrowRight, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { ListVictimsResponseType, ListVictimsType } from "./HomeViewType"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/router"

function HomeView() {
    const [search, setSearch] = useState<string>('')
    const [victims, setVictims] = useState<ListVictimsType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        init()
    }, [])

    async function init() {
        setLoading(true)
        const response = await avaguardService.get<ListVictimsResponseType>('/listVictims')

        if (response?.validationError) {

        } else if (response?.error) {
            console.log(response.error)
        } else if (response?.victims) {
            setVictims(response.victims)
        }
        setLoading(false)
    }

    const filteredVictims = victims.map(victimGroup => ({
        ...victimGroup,
        victims: victimGroup.victims.filter(victim =>
            victim.victimName.toLowerCase().includes(search.toLowerCase())
        )
    }))

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    function handleOnClickRedirectCreateVictim(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        router.push('/registerVictims')
    }

    return (
        <>
            <Navbar />

            {
                loading ? (
                    <div className="h-[90vh] flex justify-center items-center">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <div className="container max-w-screen-xl mx-auto px-10 mt-14">
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
                            <ButtonPrimary className="w-1/4 text-sm font-light" variant="lg" variantIcon="right" icon={<ArrowRight size={18} />} onClick={handleOnClickRedirectCreateVictim}>
                                Cadastro de Vitimas
                            </ButtonPrimary>
                        </div>

                        {
                            filteredVictims.every(victims => victims.victims.length === 0) ? (
                                <div className="mt-10">
                                    <AlertInfo message="Nunhuma vítima cadastrada." />
                                </div>
                            ) : (
                                filteredVictims.map(victimis => (
                                    <CardSession key={victimis.companyId} clientName={victimis.companyName} victimis={victimis.victims} />
                                ))
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export { HomeView }
