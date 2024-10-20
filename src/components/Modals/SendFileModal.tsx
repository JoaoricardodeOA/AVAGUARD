import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import { CustomFormInput } from '../Inputs/CustomFormInput'
import { Upload } from 'lucide-react'
import { ButtonPrimary } from '../Buttons/ButtonPrimary'
import { SelectComponent } from '../Selects/SelectComponent'
import { useState } from 'react'
import { ListItemsType } from '@/src/types/select'

interface SendFileModalProps {
  isOpen: boolean
  onOpenChange: () => void
}

function SendFileModal(props: SendFileModalProps) {
  const [fileTypes, setFilesTypes] = useState<ListItemsType[]>([
    {
      ID: 'identidade',
      label: 'Identidade'
    },
    {
      ID: 'cpf',
      label: 'CPF'
    },
    {
      ID: 'rg',
      label: 'RG'
    }
  ])

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
              <ModalHeader className="flex flex-col gap-1">Enviar Arquivo</ModalHeader>
              <ModalBody>
                <CustomFormInput align="left" label="Descrição" type="text" variant="lg" />
                <SelectComponent itens={fileTypes} align="left" label="Tipo do Arquivo" variant="sm" className='mt-5' />
                <CustomFormInput
                  variantIcon='left'
                  iconLeft={<Upload className='text-primary' />}
                  variant='lg'
                  type="file"
                  label="Arquivo" align='left'
                  className='mt-5'
                />
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
  SendFileModal
}
