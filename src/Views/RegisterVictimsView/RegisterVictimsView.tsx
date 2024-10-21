import { BurronPrimaryOutline } from "@/src/components/Buttons/BurronPrimaryOutline"
import { ButtonPrimary } from "@/src/components/Buttons/ButtonPrimary"
import { DatePickerComponent } from "@/src/components/DatePickers/DatePickerComponent"
import { CustomFormInput } from "@/src/components/Inputs/CustomFormInput"
import { CustomFormTextArea } from "@/src/components/Inputs/CustomFormTextArea"
import { RegisterIncidentModal } from '@/src/components/Modals/RegisterIncidentModal'
import { RegisterWitnessModal } from '@/src/components/Modals/RegisterWitnessModal'
import { SendFileModal } from '@/src/components/Modals/SendFileModal'
import { Navbar } from "@/src/components/navbar"
import { SelectComponent } from "@/src/components/Selects/SelectComponent"
import { ListItemsType } from '@/src/types/select'
import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'

function RegisterVictimsView() {
    const modalRegisterIncident = useDisclosure()
    const modalSendFile = useDisclosure()
    const modalRegisterWitness = useDisclosure()
    const [companys, setCompanys] = useState<ListItemsType[]>([
        {
            ID: 'kneion',
            label: 'Uninassau'
        },
        {
            ID: 'qcklqncjq',
            label: 'Uninabuco'
        },
        {
            ID: 'kneion',
            label: 'Unimed'
        },
    ])
    const [genders, setGenders] = useState<ListItemsType[]>([
        {
            ID: 'kneion',
            label: 'Masculino'
        },
        {
            ID: 'qcklqncjq',
            label: 'Feminino'
        }
    ])
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

    return (
        <>
            <Navbar />

            <div className="mt-10 container max-w-screen-xl mx-auto px-10">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-2xl text-shade-1 font-medium">Cadastro de Vítimas</h1>
                    <div className="flex items-center gap-3">
                        <BurronPrimaryOutline variant="sm" variantIcon="no-icon" onPress={modalRegisterWitness.onOpen}>
                            Cadastrar Testemunhas
                        </BurronPrimaryOutline>
                        <BurronPrimaryOutline variant="sm" variantIcon="no-icon" onPress={modalSendFile.onOpen}>
                            Enviar Arquivos
                        </BurronPrimaryOutline>
                        <BurronPrimaryOutline variant="sm" variantIcon="no-icon" onPress={modalRegisterIncident.onOpen}>
                            Registrar Incidente
                        </BurronPrimaryOutline>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="flex gap-3 w-full">
                        <CustomFormInput align="left" className="w-1/3" label="Nome" type="text" variant="md" />
                        <CustomFormInput align="left" className="w-1/3" label="Sobrenome" type="text" variant="md" />
                        <CustomFormInput align="left" className="w-1/3" label="Idade" type="text" variant="md" />
                    </div>
                    <div className="flex gap-3 w-full mt-10">
                        <CustomFormInput align="left" className="w-1/3" label="Telefone" type="text" variant="md" />
                        <CustomFormInput align="left" className="w-1/3" label="RG" type="text" variant="md" />
                        <CustomFormInput align="left" className="w-1/3" label="CPF" type="text" variant="md" />
                    </div>
                    <div className="flex gap-3 items-center w-full mt-10">
                        <SelectComponent itens={genders} align="left" className="w-1/3" label="Selecione o Gênero" variant="sm" />
                        <CustomFormInput align="left" className="w-1/3" label="Endereço" type="text" variant="md" />
                        <CustomFormInput align="left" className="w-1/3" label="E-mail" type="text" variant="md" />
                    </div>
                    <div className="flex gap-3 items-center w-full mt-10">
                        <SelectComponent itens={companys} align="left" className="w-1/3" label="Empresa" variant="sm" />
                        <SelectComponent itens={positions} align="left" className="w-1/3" label="Cargo" variant="sm" />
                        <DatePickerComponent label="Data de Admissão" variant="lg" className="w-1/3" align="left" />
                    </div>
                    <div className="flex gap-3 items-center justify-center w-full mt-10">
                        <CustomFormTextArea className="w-full" label="Descrição do Ocorrido" variant="sm" />
                    </div>
                </div>
                <div className="mt-10 mb-10">
                    <ButtonPrimary className="w-[200px] mt-5 text-lg font-light" variant="lg" variantIcon="no-icon">
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