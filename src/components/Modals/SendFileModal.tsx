import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import { CustomFormInput } from '../Inputs/CustomFormInput'
import { Upload } from 'lucide-react'
import { ButtonPrimary } from '../Buttons/ButtonPrimary'
import { SelectComponent } from '../Selects/SelectComponent'
import { ChangeEvent, useEffect, useState } from 'react'
import { ListItemsType } from '@/src/types/select'
import { VictimFileType } from "@/src/types/victmis"

interface SendFileModalProps {
  isOpen: boolean
  onOpenChange: () => void
  createVictimFile: (victimFile: VictimFileType, onClose: () => void) => Promise<void> 
}

function SendFileModal(props: SendFileModalProps) {
  const [fileTypes, setFilesTypes] = useState<ListItemsType[]>([
    {
      ID: 'identidade',
      label: 'Identidade'
    }
  ])
  const [file, setFile] = useState<File | null>(null) 
  const [description, setDescription] = useState<string>('')
  const [fileType, setFileType] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!props.isOpen) {
      setFile(null)
      setDescription('')
      setFileType('')
    }
  }, [props.isOpen])

  async function onChange(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    e.preventDefault()

    if (e.target.files) {
      const file = e.target.files[0]

      setFile(file)
    }
  }

  async function handleOnClickCreateVictimFile(e: React.MouseEvent<HTMLButtonElement>, onClose: () => void) {
    e.preventDefault()

    setLoading(true)

    const req: VictimFileType = {
      description,
      fileType,
      file: file as File,
    } 

    await props.createVictimFile(req, onClose)
    
    setLoading(false)
  }

  function handleOnChangeFileType(e: any) {
    if(e.target.value) {
      setFileType(e.target.value)
    } else {
      setFileType('')
    }
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
              <ModalHeader className="flex flex-col gap-1">Enviar Arquivo</ModalHeader>
              <ModalBody>
                <CustomFormInput align="left" label="Descrição" type="text" variant="lg" onChange={(e) => setDescription(e.target.value)} value={description}/>
                <SelectComponent itens={fileTypes} align="left" label="Tipo do Arquivo" variant="sm" className='mt-5' onChange={e => handleOnChangeFileType(e)}/>
                <CustomFormInput
                  variantIcon='left'
                  iconLeft={<Upload className='text-primary' />}
                  variant='lg'
                  type="file"
                  label="Arquivo" align='left'
                  className='mt-5'
                  onChange={onChange}
                />
              </ModalBody>
              <ModalFooter className='mt-5'>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <ButtonPrimary variant='md' variantIcon='no-icon' onClick={(e) => handleOnClickCreateVictimFile(e, onClose)} isLoading={loading} disabled={loading}>
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
