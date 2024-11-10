import { Pagination, TableHeader, TableColumn, TableBody, TableRow, useDisclosure, Table, TableCell, Tooltip, Checkbox, CheckboxGroup } from "@nextui-org/react"
import { DeleteIcon, EyeIcon } from "lucide-react"
import { ButtomPrimaryOutline } from "../Buttons/BurronPrimaryOutline"
import { CustomFormInput } from "../Inputs/CustomFormInput"
import { useCallback, useState } from "react"
import { formatCPF, removeMasks } from "@/src/common/utils"
import { CreateVictimIncidentUseCaseDTOInputType, VictimIncidentInformationType, VictimIncidentType } from "@/src/types/incident"
import { VictimWitnessType, WitnessRequestType } from "@/src/types/witness"
import { VictimsWithInformationType } from "@/src/Views/HomeView/HomeViewType"
import { VictimIncidentSelectComponent } from "../Selects/VictimIncidentSelectComponent"
import { VictimWitnessSelectComponent } from "../Selects/VictimWitnessSelectComponent"
import { RegisterIncidentModal } from "../Modals/RegisterIncidentModal"
import { RegisterWitnessModal } from "../Modals/RegisterWitnessModal"
import { avaguardService } from "@/src/service/avaguardService"
import { uploadFile } from "@/src/service/file"
import { init } from "next/dist/compiled/webpack/webpack"
import { NotificationAction } from "../Notifications/Notification"
import { CreateVictimReportUseCaseDTOInputType } from "@/src/types/report"
import { useRouter } from "next/router"

interface DatailsCreateReportSessionProps {
  victim: VictimsWithInformationType
}

function DatailsCreateReportSession(props: DatailsCreateReportSessionProps) {
  const [aggressorCpf, setAggressorCpf] = useState<string>('')
  const [aggressorName, setAggressorName] = useState<string>('')
  const [incidents, setIncidents] = useState<VictimIncidentInformationType[]>([])
  const [witness, setWitness] = useState<VictimWitnessType[]>([])
  const [reportTypeSexual, setReportTypeSexual] = useState<boolean>(false)
  const [reportTypeMoral, setReportTypeMoral] = useState<boolean>(false)
  const [isAnonymous, setIsAnonymous] = useState<number>(0)
  const [loadingCreateReport, setLoadingCreateReport] = useState<boolean>(false)
  const router = useRouter()
  const modalRegisterIncident = useDisclosure()
  const modalRegisterWitness = useDisclosure()

  function handleChooseVictimIncidentValue(value: VictimIncidentInformationType) {
    const filter = incidents.find(incident => incident.victimIncidentId === value.victimIncidentId)

    if (!filter) {
      setIncidents([...incidents, value])
    }
  }

  function handleChooseVictimWitnessValue(value: VictimWitnessType) {
    const filter = witness.find(witness => witness.victimWitnessId === value.victimWitnessId)

    if (!filter) {
      setWitness([...witness, value])
    }
  }

  function handleOnClickRemoveVictimIncidentValue(id: string) {
    const filter = incidents.filter(incident => incident.victimIncidentId !== id)

    setIncidents([...filter])
  }

  function handleOnClickRemoveVictimWitnessValue(id: string) {
    const filter = witness.filter(witness => witness.victimWitnessId !== id)

    setWitness([...filter])
  }

  function validate(req: CreateVictimReportUseCaseDTOInputType): string | null {
    if(!req.aggressorName.trim()) {
      return 'O nome do agressor é obrigatório.'
    }

    if(!req.aggressorCpf.trim()) {
      return 'O CPF do agressor é obrigatório.'
    }

    if(!req.reportType.trim()) {
      return 'É necessário informar o tipo da denuncia.'
    }

    return null
  }

  async function handleCreateIncident(victimIncident: VictimIncidentType, onClose: () => void): Promise<void> {
    try {
      const evidences: string[] = []

      for (let j = 0; j < victimIncident.files.length; j++) {
        const file = victimIncident.files[j];

        try {
          const url = await uploadFile(file, 'victim-incident')

          evidences.push(url)
        } catch (error: any) {
          NotificationAction.notificationError(error.message)
        }
      }

      const victimIncidentInput: CreateVictimIncidentUseCaseDTOInputType = {
        date: victimIncident.date,
        eventDescription: victimIncident.eventDescription,
        evidences,
        victimId: props.victim?.victimId as string
      }

      const victimIncidentCreated = await avaguardService.post('/createVictimIncident', {
        ...victimIncidentInput
      })

      if (victimIncidentCreated.error) {
        NotificationAction.notificationError(victimIncidentCreated.error)
      } else if (victimIncidentCreated.validationError) {
        NotificationAction.notificationWarning(victimIncidentCreated.validationError)
      } else {
        NotificationAction.notificationSuccess('Incidente registrado com sucesso.')
        onClose()
      }
    } catch (error: any) {
      NotificationAction.notificationError(error.message)
    }
  }

  async function handleCreateWitness(witnessRequest: WitnessRequestType, onClose: () => void): Promise<void> {
    const victimWitnessCreated = await avaguardService.post('/createVictimWitness', {
      ...witnessRequest,
      victimId: props.victim?.victimId
    })

    if (victimWitnessCreated.error) {
      NotificationAction.notificationError(victimWitnessCreated.error)
    } else if (victimWitnessCreated.validationError) {
      NotificationAction.notificationWarning(victimWitnessCreated.validationError)
    } else {
      NotificationAction.notificationSuccess('Incidente registrado com sucesso.')
      onClose()
    }
  }

  function decodeType(): string {
    if (reportTypeMoral && reportTypeSexual) {
      return 'moral_and_sexual'
    } else if (reportTypeMoral) {
      return 'moral'
    } else {
      return 'sexual'
    }
  }

  async function handleOnClickCreateReport(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    e.preventDefault()

    setLoadingCreateReport(true)
    
    const incidentsIDs = incidents.map(incident => incident.victimIncidentId)
    const witnessIDs = witness.map(witness => witness.victimWitnessId)
    
    const req: CreateVictimReportUseCaseDTOInputType = {
      aggressorName,
      aggressorCpf: removeMasks(aggressorCpf),
      isAnonymous,
      reportType: decodeType(),
      incidents: incidentsIDs,
      witness: witnessIDs
    }

    const error = validate(req)

    if(!error) {
      const report = await avaguardService.post('/createVictimReport', {
        ...req
      })
  
      if (report.error) {
        NotificationAction.notificationError(report.error)
      } else if (report.validationError) {
        NotificationAction.notificationWarning(report.validationError)
      } else {
        NotificationAction.notificationSuccess('Denuncia registrada com sucesso.')
        router.push('/home')
      }
    } else {
      NotificationAction.notificationWarning(error)
    }

    setLoadingCreateReport(false)
  }

  return (
    <>
      <div className='w-4/5 shadow-md p-10 pb-0 rounded-2xl shadow-tint-4 h-[630px] overflow-y-auto'>
        <div className='flex justify-between items-center gap-8'>
          <h1 className='text-shade-3 text-xl font-semibold uppercase'>Realizar Denúncia</h1>
          <div className="flex items-center justify-end gap-3 flex-grow">
            <ButtomPrimaryOutline variant="md" variantIcon='no-icon' onPress={modalRegisterWitness.onOpen}>
              Registrar Testemunha
            </ButtomPrimaryOutline>
            <ButtomPrimaryOutline variant="md" variantIcon='no-icon' onPress={modalRegisterIncident.onOpen}>
              Registrar Incidente
            </ButtomPrimaryOutline>
          </div>
        </div>
        <div className='mt-4 h-[520px]'>
          <div className="flex gap-3 w-full">
            <CustomFormInput align="left" className="w-1/2" label="Nome do Agressor" type="text" variant="lg" value={aggressorName} onChange={(e) => setAggressorName(e.target.value)} />
            <CustomFormInput align="left" maxLength={14} className="w-1/2" label="CPF do Agressor" type="text" variant="lg" value={formatCPF(aggressorCpf)} onChange={(e) => setAggressorCpf(e.target.value)} />
          </div>
          <div className="mt-4 flex gap-3 w-full">
            <div className="w-1/2 flex items-end gap-2">
              <VictimWitnessSelectComponent
                className="flex-grow"
                align="left"
                label="Testemunhas"
                variant="sm"
                victimId={props?.victim?.victimId}
                handleChooseValue={handleChooseVictimWitnessValue}
              />
            </div>
            <div className="w-1/2 flex items-end gap-2">
              <VictimIncidentSelectComponent
                className="flex-grow"
                align="left"
                label="Incidentes"
                variant="sm"
                victimId={props?.victim?.victimId}
                handleChooseValue={handleChooseVictimIncidentValue}
              />
            </div>
          </div>
          <div className="flex mb-8">
            {
              witness.length > 0 &&
              (
                <Table
                  aria-label="Example table with client side pagination"
                  classNames={{
                    wrapper: "h-full shadow-none",
                    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
                  }}
                  className="h-full shadow-none w-1/2 justify-self-start"
                >
                  <TableHeader>
                    <TableColumn key="name" style={{ width: '80%' }}>NOME</TableColumn>
                    <TableColumn key="actions" style={{ width: '20%', textAlign: 'center' }}>AÇÕES</TableColumn>
                  </TableHeader>
                  <TableBody items={witness}>
                    {
                      witness.map(value => (
                        <TableRow key={value.victimWitnessId}>
                          <TableCell >{`${value.firstName} ${value.lastName}`}</TableCell>
                          <TableCell style={{ textAlign: 'right' }}>
                            <div className="flex items-center justify-center gap-2">
                              <Tooltip content="Details">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                  <EyeIcon size={18} />
                                </span>
                              </Tooltip>
                              <Tooltip color="danger" content="Delete">
                                <button className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleOnClickRemoveVictimWitnessValue(value.victimWitnessId)}>
                                  <DeleteIcon size={18} />
                                </button>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              )
            }
            {
              incidents.length > 0 && (
                <Table
                  aria-label="Example table with client side pagination"

                  classNames={{
                    wrapper: "h-full shadow-none",
                    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
                  }}
                  className="h-full shadow-none w-1/2 ms-auto"
                >
                  <TableHeader>
                    <TableColumn key="date" style={{ width: '20%' }}>DATA</TableColumn>
                    <TableColumn key="description" style={{ width: '60%' }}>DESCRIÇÃO</TableColumn>
                    <TableColumn key="actions" style={{ width: '20%', textAlign: 'center' }}>AÇÕES</TableColumn>
                  </TableHeader>
                  <TableBody items={incidents}>
                    {
                      incidents.map(incident => (
                        <TableRow key={incident.victimIncidentId}>
                          <TableCell>{incident.date}</TableCell>
                          <TableCell>
                            {incident.eventDescription}
                          </TableCell>
                          <TableCell style={{ textAlign: 'right' }}>
                            <div className="flex items-center justify-center gap-2">
                              <Tooltip content="Details">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                  <EyeIcon size={18} />
                                </span>
                              </Tooltip>
                              <Tooltip color="danger" content="Delete">
                                <button className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleOnClickRemoveVictimIncidentValue(incident.victimIncidentId)}>
                                  <DeleteIcon size={18} />
                                </button>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              )
            }
          </div>
          <div className="ms-3 mt-4">
            <div className="mb-2">
              <Checkbox value="moral" onChange={(e) => setReportTypeSexual(e.target.checked)}>Assédio Sexual</Checkbox>
            </div>
            <div className="mb-2">
              <Checkbox value="sexual" onChange={(e) => setReportTypeMoral(e.target.checked)}>Assédio Moral</Checkbox>
            </div>
            <div className="mb-2">
              <Checkbox value="is_anonymous" onChange={(e) => setIsAnonymous(e.target.value ? 1 : 0)}>Deseja Permanecer Anônimamente?</Checkbox>
            </div>
          </div>
          <div className="mt-6 flex justify-end pb-6">
            <ButtomPrimaryOutline className="mb-1" variant="lg" variantIcon='no-icon' onClick={handleOnClickCreateReport} isLoading={loadingCreateReport} disabled={loadingCreateReport}>
              Realizar Denuncia
            </ButtomPrimaryOutline>
          </div>
        </div>
      </div>

      <RegisterWitnessModal isOpen={modalRegisterWitness.isOpen} onOpenChange={modalRegisterWitness.onOpenChange} handleCreateWitness={handleCreateWitness} />
      <RegisterIncidentModal isOpen={modalRegisterIncident.isOpen} onOpenChange={modalRegisterIncident.onOpenChange} createVictimIncident={handleCreateIncident} />
    </>
  )
}

export {
  DatailsCreateReportSession
}