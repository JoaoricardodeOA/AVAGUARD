import { ButtomPrimaryOutline } from '@/src/components/Buttons/BurronPrimaryOutline'
import { ButtonPrimary } from "@/src/components/Buttons/ButtonPrimary"
import { DatePickerComponent } from "@/src/components/DatePickers/DatePickerComponent"
import { CustomFormInput } from "@/src/components/Inputs/CustomFormInput"
import { CustomFormTextArea } from "@/src/components/Inputs/CustomFormTextArea"
import { RegisterIncidentModal } from '@/src/components/Modals/RegisterIncidentModal'
import { RegisterWitnessModal } from '@/src/components/Modals/RegisterWitnessModal'
import { SendFileModal } from '@/src/components/Modals/SendFileModal'
import { Navbar } from "@/src/components/navbar"
import { CompanyPositionsSelectComponent } from '@/src/components/Selects/CompanyPositionsSelectComponent'
import { CompanysSelectComponent } from '@/src/components/Selects/CompanysSelectComponent'
import { GendersSelectComponent } from '@/src/components/Selects/GendersSelectComponent'
import { SelectComponent } from "@/src/components/Selects/SelectComponent"
import { avaguardService } from '@/src/service/avaguardService'
import { ListItemsType } from '@/src/types/select'
import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'

function RegisterVictimsView() {
    const modalSendFile = useDisclosure()
    const modalRegisterIncident = useDisclosure()
    const modalRegisterWitness = useDisclosure()
    const [companyId, setCompanyId] = useState<string | null>(null)
    const [genderId, setGenderId] = useState<string | null>(null)
    const [companyPositionId, setCompanyPositionId] = useState<string | null>(null)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [age, setAge] = useState<number>()
    const [phone, setPhone] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [eventDescription, setEventDescription] = useState<string>('')

    const [preview, setPreview] = useState<string | null>(null)

    function handleChooseCompanyValue(value: any) {
        setCompanyId(value)
    }

    function handleChooseGenderValue(value: any) {
        setGenderId(value)
    }

    function handleChooseCompanyPositionValue(value: any) {
        setCompanyPositionId(value)
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setPreview(previewUrl)

            event.target.addEventListener('change', () => URL.revokeObjectURL(previewUrl), { once: true })
        } else {
            setPreview(null)
        }
    }

    async function handleOnClickCreateVictim(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        await avaguardService.post('/createVictim', {
            companyId,
            genderId,
            companyPositionId,
            firstName,
            lastName,
            age,
            phone,
            cpf,
            address,
            email,
            eventDescription
        })
    }

    return (
        <>
            <Navbar />

            <div className="mt-10 container max-w-screen-xl mx-auto px-10">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-2xl text-shade-1 font-medium">Cadastro de Vítimas</h1>
                    <div className="flex items-center gap-3">
                        <ButtomPrimaryOutline variant="sm" variantIcon="no-icon" onPress={modalRegisterWitness.onOpen}>
                            Cadastrar Testemunhas
                        </ButtomPrimaryOutline>
                        <ButtomPrimaryOutline variant="sm" variantIcon="no-icon" onPress={modalSendFile.onOpen}>
                            Enviar Arquivos
                        </ButtomPrimaryOutline>
                        <ButtomPrimaryOutline variant="sm" variantIcon="no-icon" onPress={modalRegisterIncident.onOpen}>
                            Registrar Incidente
                        </ButtomPrimaryOutline>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="flex gap-3 w-full">
                        <div className="w-1/3 flex items-center gap-3">
                            {
                                preview && (
                                    <div className="shrink-0">
                                        <img
                                            id="preview_img"
                                            className="h-16 w-16 object-cover rounded-full"
                                            src={preview}
                                            alt="Current profile photo"
                                        />
                                    </div>
                                )
                            }
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className={`
                                        block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50 file:text-primary
                                        hover:file:bg-violet-100
                                    `}
                                />
                            </label>
                        </div>
                        <CustomFormInput align="left" className="w-1/3" label="Nome" type="text" variant="md" onChange={e => setFirstName(e.target.value)} value={firstName} />
                        <CustomFormInput align="left" className="w-1/3" label="Sobrenome" type="text" variant="md" onChange={e => setLastName(e.target.value)} value={lastName} />
                    </div>
                    <div className="flex gap-3 w-full mt-10">
                        <CustomFormInput align="left" className="w-1/3" label="Idade" type="number" variant="md" onChange={e => setAge(parseInt(e.target.value))} value={age} />
                        <CustomFormInput align="left" className="w-1/3" label="Telefone" type="text" variant="md" onChange={e => setPhone(e.target.value)} value={phone} />
                        <CustomFormInput align="left" className="w-1/3" label="CPF" type="text" variant="md" onChange={e => setCpf(e.target.value)} value={cpf} />
                    </div>
                    <div className="flex gap-3 items-center w-full mt-10">
                        <GendersSelectComponent align="left" className="w-1/3" label="Selecione o Gênero" variant="sm" handleChooseValue={handleChooseGenderValue} />
                        <CustomFormInput align="left" className="w-1/3" label="Endereço" type="text" variant="md" onChange={e => setAddress(e.target.value)} value={address} />
                        <CustomFormInput align="left" className="w-1/3" label="E-mail" type="text" variant="md" onChange={e => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="flex gap-3 items-center w-full mt-10">
                        <CompanysSelectComponent align="left" className="w-1/3" label="Empresa" variant="sm" handleChooseValue={handleChooseCompanyValue} />
                        <CompanyPositionsSelectComponent align="left" className="w-1/3" label="Cargo" variant="sm" handleChooseValue={handleChooseCompanyPositionValue} companyId={companyId} />
                        <DatePickerComponent label="Data de Admissão" variant="lg" className="w-1/3" align="left" />
                    </div>
                    <div className="flex gap-3 items-center justify-center w-full mt-10">
                        <CustomFormTextArea className="w-full" label="Descrição do Ocorrido" variant="sm" onChange={e => setEventDescription(e.target.value)} value={eventDescription} />
                    </div>
                </div>
                <div className="mt-10 mb-10">
                    <ButtonPrimary className="w-[200px] mt-5 text-lg font-light" variant="lg" variantIcon="no-icon" onClick={handleOnClickCreateVictim}>
                        Cadastrar
                    </ButtonPrimary>
                </div>
            </div>

            <RegisterWitnessModal isOpen={modalRegisterWitness.isOpen} onOpenChange={modalRegisterWitness.onOpenChange} />
            <RegisterIncidentModal isOpen={modalRegisterIncident.isOpen} onOpenChange={modalRegisterIncident.onOpenChange} />
            <SendFileModal isOpen={modalSendFile.isOpen} onOpenChange={modalSendFile.onOpenChange} />
        </>
    )
}

export {
    RegisterVictimsView
}