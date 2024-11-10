import { formatCPF, maskPhone, removeMasks } from '@/src/common/utils'
import { ButtomPrimaryOutline } from '@/src/components/Buttons/BurronPrimaryOutline'
import { ButtonPrimary } from "@/src/components/Buttons/ButtonPrimary"
import { DatePickerComponent } from "@/src/components/DatePickers/DatePickerComponent"
import { CustomFormInput } from "@/src/components/Inputs/CustomFormInput"
import { CustomFormTextArea } from "@/src/components/Inputs/CustomFormTextArea"
import { RegisterIncidentModal } from '@/src/components/Modals/RegisterIncidentModal'
import { RegisterWitnessModal } from '@/src/components/Modals/RegisterWitnessModal'
import { SendFileModal } from '@/src/components/Modals/SendFileModal'
import { Navbar } from "@/src/components/navbar"
import { NotificationAction } from '@/src/components/Notifications/Notification'
import { CompanyPositionsSelectComponent } from '@/src/components/Selects/CompanyPositionsSelectComponent'
import { CompanysSelectComponent } from '@/src/components/Selects/CompanysSelectComponent'
import { GendersSelectComponent } from '@/src/components/Selects/GendersSelectComponent'
import { avaguardService } from '@/src/service/avaguardService'
import { uploadFile } from '@/src/service/file'
import { CreateVictimIncidentUseCaseDTOInputType, VictimIncidentType } from '@/src/types/incident'
import { CreateVictimFileUseCaseDTOInput, CreateVictimUseCaseDTOInput, VictimFileType } from '@/src/types/victmis'
import { WitnessRequestType } from '@/src/types/witness'
import { getLocalTimeZone } from '@internationalized/date'
import { DateValue, useDisclosure } from '@nextui-org/react'
import { useDateFormatter } from '@react-aria/i18n'
import { error } from 'console'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

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
    const [admissionDate, setAdmissionDate] = useState<DateValue | null>(null)
    const [witness, setWitness] = useState<WitnessRequestType[]>([])
    const [incidents, setIncidents] = useState<VictimIncidentType[]>([])
    const [files, setFiles] = useState<VictimFileType[]>([])
    const [avatarFile, setAvatarFile] = useState<File>()
    let formatter = useDateFormatter({ dateStyle: "short" })
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    function handleChooseCompanyValue(value: any) {
        setCompanyId(value || null)
    }

    function handleChooseGenderValue(value: any) {
        setGenderId(value || null)
    }

    function handleChooseCompanyPositionValue(value: any) {
        setCompanyPositionId(value || null)
    }

    function handleOnChangeAdmissionDate(value: DateValue) {
        setAdmissionDate(value)
    }

    function validate(): string | null {
        return null
    }

    async function handleOnClickCreateVictim(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setLoading(true)

        const incidentsInput = await uploadFilesVictimIncidents(incidents)
        const filesInput = await uploadFilesVictimFiles(files)

        let avatar: string = ''
        if (avatarFile) {
            avatar = await uploadFile(avatarFile, 'general-files')
        }

        const req: CreateVictimUseCaseDTOInput = {
            firstName,
            lastName,
            age: age as number,
            email,
            address,
            cpf: removeMasks(cpf),
            genderId: genderId as string,
            companyId: companyId as string,
            companyPositionId: companyPositionId as string,
            phone: removeMasks(phone),
            eventDescription,
            avatar,
            admissionDate: admissionDate ? formatter.format(admissionDate.toDate(getLocalTimeZone())) : '',
            incidents: incidentsInput,
            files: filesInput,
            witness,
        }

        const response = await avaguardService.post('/createVictim', { ...req })

        if (!response.error) {
            NotificationAction.notificationSuccess('Vítima cadastrada com sucesso.')
            
            router.push('/home')
        } else {
            NotificationAction.notificationError(response.error)
        }

        setLoading(false)
    }

    async function handleCreateWitness(witnessRequest: WitnessRequestType, onClose: () => void): Promise<void> {
        setWitness([...witness, witnessRequest])

        NotificationAction.notificationSuccess('Testemunha registrado com sucesso.')

        onClose()
    }

    async function handleCreateIncident(victimIncident: VictimIncidentType, onClose: () => void): Promise<void> {
        setIncidents([...incidents, victimIncident])

        NotificationAction.notificationSuccess('Incidente registrado com sucesso.')

        onClose()
    }

    async function handleCreateFiles(file: VictimFileType, onClose: () => void): Promise<void> {
        setFiles([...files, file])

        NotificationAction.notificationSuccess('Arquivo registrado com sucesso.')

        onClose()
    }

    async function uploadFilesVictimIncidents(input: VictimIncidentType[]): Promise<CreateVictimIncidentUseCaseDTOInputType[]> {
        const incidents: CreateVictimIncidentUseCaseDTOInputType[] = []

        for (let i = 0; i < input.length; i++) {
            const incident = input[i];
            const evidences: string[] = []

            for (let j = 0; j < incident.files.length; j++) {
                const file = incident.files[j];

                try {
                    const url = await uploadFile(file, 'victim-incident')

                    evidences.push(url)
                } catch (error: any) {
                    NotificationAction.notificationError(error.message)
                }
            }

            const victimIncidentInput: CreateVictimIncidentUseCaseDTOInputType = {
                date: incident.date,
                eventDescription: incident.eventDescription,
                evidences,
                victimId: null
            }

            incidents.push(victimIncidentInput)
        }

        return incidents
    }

    async function uploadFilesVictimFiles(input: VictimFileType[]): Promise<CreateVictimFileUseCaseDTOInput[]> {
        const files: CreateVictimFileUseCaseDTOInput[] = []

        for (let i = 0; i < input.length; i++) {
            const file = input[i];

            try {
                const url = await uploadFile(file.file, 'victim-files')

                const victimFileInput: CreateVictimFileUseCaseDTOInput = {
                    description: file.description,
                    type: file.fileType,
                    url,
                    victimId: null
                }

                files.push(victimFileInput)
            } catch (error: any) {
                NotificationAction.notificationError(error.message)
            }
        }

        return files
    }

    async function onChangeFileAvatar(e: ChangeEvent<HTMLInputElement>): Promise<void> {
        e.preventDefault()

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]

            setAvatarFile(file)
        } else {
            setAvatarFile(undefined)
        }
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
                                avatarFile && (
                                    <div className="shrink-0">
                                        <img
                                            id="preview_img"
                                            className="h-16 w-16 object-cover rounded-full"
                                            src={URL.createObjectURL(avatarFile)}
                                            alt="Current profile photo"
                                        />
                                    </div>
                                )
                            }
                            <label className="block">
                                <span className="sr-only">Choose profile photo</span>
                                <input
                                    type="file"
                                    onChange={onChangeFileAvatar}
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
                        <CustomFormInput align="left" className="w-1/3" label="Telefone" type="text" variant="md" onChange={e => setPhone(e.target.value)} value={maskPhone(phone)} />
                        <CustomFormInput maxLength={14} align="left" className="w-1/3" label="CPF" type="text" variant="md" onChange={e => setCpf(e.target.value)} value={formatCPF(cpf)} />
                    </div>
                    <div className="flex gap-3 items-center w-full mt-10">
                        <GendersSelectComponent align="left" className="w-1/3" label="Selecione o Gênero" variant="sm" handleChooseValue={handleChooseGenderValue} />
                        <CustomFormInput align="left" className="w-1/3" label="Endereço" type="text" variant="md" onChange={e => setAddress(e.target.value)} value={address} />
                        <CustomFormInput align="left" className="w-1/3" label="E-mail" type="text" variant="md" onChange={e => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="flex gap-3 items-center w-full mt-10">
                        <CompanysSelectComponent align="left" className="w-1/3" label="Empresa" variant="sm" handleChooseValue={handleChooseCompanyValue} />
                        <CompanyPositionsSelectComponent align="left" className="w-1/3" label="Cargo" variant="sm" handleChooseValue={handleChooseCompanyPositionValue} companyId={companyId} />
                        <DatePickerComponent label="Data de Admissão" variant="lg" className="w-1/3" align="left" value={admissionDate} handleOnChangeDate={handleOnChangeAdmissionDate} />
                    </div>
                    <div className="flex gap-3 items-center justify-center w-full mt-10">
                        <CustomFormTextArea className="w-full" label="Descrição do Ocorrido" variant="sm" onChange={e => setEventDescription(e.target.value)} value={eventDescription} />
                    </div>
                </div>
                <div className="mt-10 mb-10">
                    <ButtonPrimary
                        className="w-[200px] mt-5 text-lg font-light"
                        variant="lg"
                        variantIcon="no-icon"
                        onClick={handleOnClickCreateVictim}
                        isLoading={loading}
                        disabled={loading}
                    >
                        Cadastrar
                    </ButtonPrimary>
                </div>
            </div>

            <RegisterWitnessModal isOpen={modalRegisterWitness.isOpen} onOpenChange={modalRegisterWitness.onOpenChange} handleCreateWitness={handleCreateWitness} />
            <RegisterIncidentModal isOpen={modalRegisterIncident.isOpen} onOpenChange={modalRegisterIncident.onOpenChange} createVictimIncident={handleCreateIncident} />
            <SendFileModal isOpen={modalSendFile.isOpen} onOpenChange={modalSendFile.onOpenChange} createVictimFile={handleCreateFiles} />
        </>
    )
}

export {
    RegisterVictimsView
}