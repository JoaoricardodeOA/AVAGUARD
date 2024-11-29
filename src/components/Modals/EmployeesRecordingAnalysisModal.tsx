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
import { ListRealtimeEmployeesRecordingsType } from "@/src/types/employees_recording"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface EmployeesRecordingAnalysisModalProps {
    isOpen: boolean
    onOpenChange: () => void
    employeesRecording: ListRealtimeEmployeesRecordingsType
    // finishEmployeesRecordingAnalysis: (victimIncident: VictimIncidentType, onClose: () => void) => Promise<void>
}

function EmployeesRecordingAnalysisModal(props: EmployeesRecordingAnalysisModalProps) {
    const [analysisDescription, setAnalysisDescription] = useState<string | null>(null)
    const [isHarassment, setIsHarassment] = useState<number>(0)
    const [employeesRecordingId, setEmployeesRecordingId] = useState<string>()

    useEffect(() => {
        if (!props.isOpen) {
            setAnalysisDescription(null)
            setIsHarassment(0)
            setEmployeesRecordingId('')
        }
    }, [props.isOpen])

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
                            <ModalHeader className="flex flex-col gap-1">Analizar Gravação</ModalHeader>
                            <ModalBody>
                                <div className="mt-3">
                                    <AudioPlayer
                                        autoPlay
                                        src={props.employeesRecording.url}
                                    />
                                </div>

                                <CustomFormTextArea
                                    className="mt-5 w-full"
                                    label="Descrição da Análise"
                                    variant="sm"
                                    onChange={e => setAnalysisDescription(e.target.value)}
                                    value={analysisDescription}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {/* <ButtonPrimary variant='md' variantIcon='no-icon' onClick={(e) => handleOnClickCreateVictimIncident(e, onClose)} isLoading={loading} disabled={loading}>
                                    Enviar
                                </ButtonPrimary> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export {
    EmployeesRecordingAnalysisModal
}
