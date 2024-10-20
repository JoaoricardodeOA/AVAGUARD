import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react"
import { DatePickerComponent } from '../DatePickers/DatePickerComponent'
import { CustomFormTextArea } from '../Inputs/CustomFormTextArea'
import { CustomFormInput } from '../Inputs/CustomFormInput'
import { Upload } from 'lucide-react'
import { ButtonPrimary } from '../Buttons/ButtonPrimary'

interface RegisterIncidentModalProps {
  isOpen: boolean
  onOpenChange: () => void
}

function RegisterIncidentModal(props: RegisterIncidentModalProps) {
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
                />
                <CustomFormInput
                  variantIcon='left'
                  iconLeft={<Upload className='text-primary' />}
                  variant='lg'
                  type="file"
                  label="Arquivo" align='left'
                />
                <CustomFormTextArea
                  className="mt-5 w-full"
                  label="Descrição do Ocorrido"
                  variant="sm"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <ButtonPrimary variant='md' variantIcon='no-icon' onPress={onClose}>
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
