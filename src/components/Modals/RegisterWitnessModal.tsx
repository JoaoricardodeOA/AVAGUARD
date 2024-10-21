import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import { CustomFormInput } from '../Inputs/CustomFormInput'
import { Upload } from 'lucide-react'
import { ButtonPrimary } from '../Buttons/ButtonPrimary'
import { SelectComponent } from '../Selects/SelectComponent'
import { useState } from 'react'
import { ListItemsType } from '@/src/types/select'
import { CustomFormTextArea } from '../Inputs/CustomFormTextArea'

interface RegisterWitnessModalProps {
  isOpen: boolean
  onOpenChange: () => void
}

function RegisterWitnessModal(props: RegisterWitnessModalProps) {
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
                  <CustomFormInput align="left" className="w-1/2" label="Nome" type="text" variant="md" />
                  <CustomFormInput align="left" className="w-1/2" label="Sobrenome" type="text" variant="md" />
                </div>
                <div className="flex gap-3 w-full mt-5">
                  <CustomFormInput align="left" className="w-1/2" label="RG" type="text" variant="md" />
                  <CustomFormInput align="left" className="w-1/2" label="CPF" type="text" variant="md" />
                </div>
                <div className="flex gap-3 items-center w-full mt-5">
                  <CustomFormInput align="left" className="w-1/2" label="Telefone" type="text" variant="md" />
                  <CustomFormInput align="left" className="w-1/2" label="Endereço" type="text" variant="md" />
                </div>
                <div className="flex gap-3 items-center w-full mt-5">
                  <SelectComponent itens={positions} align="left" className="w-1/2" label="Selecione o Cargo" variant="sm" />
                  <SelectComponent itens={[{ ID: "sim", label: "Sim" }, { ID: "nao", label: "Nâo" }]} align="left" className="w-1/2" label="Disponibilidade para Colaborar?" variant="sm" />
                </div>
                <div className="flex gap-3 items-center justify-center w-full mt-10">
                  <CustomFormTextArea className="w-full" label="Descrição do Ocorrido de Acordo com a Testemunha" variant="lg" />
                </div>
              </ModalBody>
              <ModalFooter className='mt-5'>
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
  RegisterWitnessModal
}
