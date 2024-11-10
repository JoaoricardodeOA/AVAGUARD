import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, DateValue, TableBody, TableCell, TableColumn, TableHeader, TableRow, Table, Tooltip } from "@nextui-org/react"
import { DatePickerComponent } from '../DatePickers/DatePickerComponent'
import { CustomFormTextArea } from '../Inputs/CustomFormTextArea'
import { CustomFormInput } from '../Inputs/CustomFormInput'
import { DeleteIcon, EyeIcon, Upload } from 'lucide-react'
import { ButtonPrimary } from '../Buttons/ButtonPrimary'
import { ChangeEvent, useEffect, useState } from "react"
import { VictimIncidentType } from "@/src/types/incident"
import { getLocalTimeZone } from "@internationalized/date"
import { useDateFormatter } from "@react-aria/i18n"

interface RegisterIncidentModalProps {
  isOpen: boolean
  onOpenChange: () => void
  createVictimIncident: (victimIncident: VictimIncidentType, onClose: () => void) => Promise<void>
}

function RegisterIncidentModal(props: RegisterIncidentModalProps) {
  const [incidenteDate, setIncidentDate] = useState<DateValue | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [eventDescription, setEventDescription] = useState<string>('')
  let formatter = useDateFormatter({ dateStyle: "short" })
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!props.isOpen) {
      setIncidentDate(null)
      setFiles([])
      setEventDescription('')
    }
  }, [props.isOpen])

  function handleOnChangeIncidentDate(value: DateValue) {
    setIncidentDate(value)
  }

  async function onChangeFile(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    e.preventDefault()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      setFiles([...files, file])
    }
  }

  async function handleOnClickCreateVictimIncident(e: React.MouseEvent<HTMLButtonElement>, onClose: () => void) {
    e.preventDefault()

    setLoading(true)

    const req: VictimIncidentType = {
      eventDescription,
      files,
      date: incidenteDate ? formatter.format(incidenteDate.toDate(getLocalTimeZone())) : ''
    }

    await props.createVictimIncident(req, onClose)

    setLoading(false)
  }

  function handleOnClickViewFile(file: File) {
    const url = URL.createObjectURL(file)

    window.open(url, '_blank')
  }

  function handleOnClickRemoveFile(index: number) {
    const copyFiles = [...files]
    copyFiles.splice(index, 1)
    setFiles(copyFiles)
  }


  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        radius='lg'
        classNames={
          {
            header: 'text-primary mt-2',
            closeButton: 'text-primary mt-4 me-4 roudend-full border border-primary',
            base: 'rounded-[2rem]'
          }
        }
        isDismissable={false}
        backdrop='opaque'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Registrar Incidente</ModalHeader>
              <ModalBody>
                <DatePickerComponent
                  label="Data do Ocorrido"
                  variant="lg"
                  align="left"
                  value={incidenteDate}
                  handleOnChangeDate={handleOnChangeIncidentDate}
                />
                <CustomFormInput
                  variantIcon='left'
                  iconLeft={<Upload className='text-primary' />}
                  variant='lg'
                  type="file"
                  label="Arquivo"
                  align='left'
                  onChange={onChangeFile}
                />
                {
                  files.length > 0 && (
                    <Table removeWrapper>
                      <TableHeader>
                        <TableColumn style={{ width: '80%' }}>Nome</TableColumn>
                        <TableColumn style={{ width: '20%', textAlign: 'center' }}>Ação</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {
                          files.map((file, index) => (
                            <TableRow key={index}>
                              <TableCell>{file.name}</TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                <div className="flex items-center justify-center gap-2">
                                  <Tooltip content="Details">
                                    <button className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleOnClickViewFile(file)}>
                                      <EyeIcon size={18} />
                                    </button>
                                  </Tooltip>
                                  <Tooltip color="danger" content="Delete">
                                    <button className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleOnClickRemoveFile(index)}>
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
                <CustomFormTextArea
                  className="mt-5 w-full"
                  label="Descrição do Ocorrido"
                  variant="sm"
                  onChange={e => setEventDescription(e.target.value)}
                  value={eventDescription}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <ButtonPrimary variant='md' variantIcon='no-icon' onClick={(e) => handleOnClickCreateVictimIncident(e, onClose)} isLoading={loading} disabled={loading}>
                  Enviar
                </ButtonPrimary>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export {
  RegisterIncidentModal
}
