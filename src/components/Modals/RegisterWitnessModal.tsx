import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import { CustomFormInput } from '../Inputs/CustomFormInput'
import { ButtonPrimary } from '../Buttons/ButtonPrimary'
import { useEffect, useState } from 'react'
import { CustomFormTextArea } from '../Inputs/CustomFormTextArea'
import { WitnessRequestType } from '@/src/types/witness'
import { NotificationAction } from '../Notifications/Notification'
import { removeMasks, formatCPF, maskPhone } from "@/src/common/utils"

interface RegisterWitnessModalProps {
  isOpen: boolean
  onOpenChange: () => void
  handleCreateWitness: (witness: WitnessRequestType, onClose: () => void) => Promise<void>
}

function RegisterWitnessModal(props: RegisterWitnessModalProps) {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [eventDescription, setEventDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!props.isOpen) {
      setFirstName('')
      setLastName('')
      setPhone('')
      setCpf('')
      setAddress('')
      setEventDescription('')
      setEmail('')
    }
  }, [props.isOpen])

  function validate(witness: WitnessRequestType): string | null {
    if (!witness.firstName || witness.firstName.trim().length === 0) {
      return 'O nome não pode ser vazio.'
    }

    if (!witness.lastName || witness.lastName.trim().length === 0) {
      return 'O sobrenome não pode ser vazio.'
    }

    if (!witness.address || witness.address.trim().length === 0) {
      return 'O endereço não pode ser vazio.'
    }

    if (!witness.cpf || witness.cpf.trim().length === 0) {
      return 'O CPF não pode ser vazio.'
    }

    if (!witness.phone || witness.phone.trim().length === 0) {
      return 'O telefone não pode ser vazio.'
    }

    return null
  }

  async function handleOnClickCreateVictim(e: React.MouseEvent<HTMLButtonElement>, onClose: () => void) {
    e.preventDefault()

    setLoading(true)
    
    const witness: WitnessRequestType = {
      firstName,
      lastName,
      phone: removeMasks(phone),
      cpf: removeMasks(cpf),
      address,
      eventDescription,
      email,
      victimId: null
    }
    
    const error = validate(witness)
    
    if (!error) {
      await props.handleCreateWitness(witness, onClose)
    } else {
      NotificationAction.notificationWarning(error)
    }

    setLoading(false)
  }

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        radius='lg'
        scrollBehavior='inside'
        classNames={
          {
            header: 'text-primary mt-2',
            closeButton: 'text-primary mt-4 me-4 roudend-full border border-primary',
            base: 'rounded-[2rem]'
          }
        }
        isDismissable={false}
        backdrop='opaque'
        size='3xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cadastrar Testemunhas</ModalHeader>
              <ModalBody>
                <div className="flex gap-3 w-full">
                  <CustomFormInput value={firstName} onChange={(e) => setFirstName(e.target.value)} align="left" className="w-1/2" label="Nome" type="text" variant="md" />
                  <CustomFormInput value={lastName} onChange={(e) => setLastName(e.target.value)} align="left" className="w-1/2" label="Sobrenome" type="text" variant="md" />
                </div>
                <div className="flex gap-3 w-full mt-5">
                  <CustomFormInput value={formatCPF(cpf)} onChange={(e) => setCpf(e.target.value)} align="left" className="w-1/2" label="CPF" type="text" variant="md" maxLength={14} />
                  <CustomFormInput value={maskPhone(phone)} onChange={(e) => setPhone(e.target.value)} align="left" className="w-1/2" label="Telefone" type="text" variant="md" />
                </div>
                <div className="flex gap-3 items-center w-full mt-5">
                  <CustomFormInput value={email} onChange={(e) => setEmail(e.target.value)} align="left" className="w-1/2" label="E-mail" type="text" variant="md" />
                  <CustomFormInput value={address} onChange={(e) => setAddress(e.target.value)} align="left" className="w-1/2" label="Endereço" type="text" variant="md" />
                </div>
                <div className="flex gap-3 items-center justify-center w-full mt-10">
                  <CustomFormTextArea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className="w-full" label="Descrição do Ocorrido de Acordo com a Testemunha" variant="lg" />
                </div>
              </ModalBody>
              <ModalFooter className='mt-5'>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <ButtonPrimary variant='md' variantIcon='no-icon' onClick={(e) => handleOnClickCreateVictim(e, onClose)} isLoading={loading} disabled={loading}>
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
  RegisterWitnessModal
}
