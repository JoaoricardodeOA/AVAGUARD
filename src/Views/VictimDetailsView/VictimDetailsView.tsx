import { ButtomPrimaryOutline } from '@/src/components/Buttons/BurronPrimaryOutline'
import { ButtonPrimary } from '@/src/components/Buttons/ButtonPrimary'
import { InputText } from '@/src/components/Inputs/InputText'
import { Navbar } from '@/src/components/navbar'
import { Tabs, Tab } from '@nextui-org/react'
import { Search, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const variants = [
  "solid",
  "underlined",
  "bordered",
  "light",
]

function VictimDetailsView() {
  const [selected, setSelected] = useState("information")
  const [search, setSearch] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className='mt-10 container max-w-screen-xl mx-auto px-10'>
        <div className='flex'>
          <div className='w-1/5'>
            <img className='rounded-full w-[70px] h-[70px]' src="/supergirl.svg" alt="" />
            <p className='text-neutral-700 text-3xl'>Supergirl</p>
            <p className='text-xs text-neutral-dGrey'>supergirl@email.com</p>
            <div className="mt-28 flex flex-wrap gap-4">
              <Tabs
                classNames={{
                  tabList: "gap-6 p-0",
                  cursor: "bg-primary",
                  tab: "justify-start px-0 h-12",
                  tabContent: "group-data-[selected=true]:text-primary text-xl"
                }}
                isVertical
                variant={'underlined'}
                color='primary'
                aria-label="Tabs variants"
                selectedKey={selected}
                onSelectionChange={(e) => setSelected(e.toString())}
              >
                <Tab key="information" title="Informações" />
                <Tab key="incidents" title="Incidentes" />
                <Tab key="Testemunhas" title="Testemunhas" />
                <Tab key="Realizar Denúncia" title="Realizar Denúncia" />
              </Tabs>
            </div>
          </div>
          {
            selected === 'information' && (
              <div className='w-4/5 shadow-md p-10 rounded-2xl shadow-tint-4 h-[630px] overflow-y-auto'>
                <div>
                  <h1 className='text-shade-3 text-xl font-semibold uppercase'>Minhas Informações</h1>
                </div>
                <div className='mt-8 flex items-center'>
                  <div className='w-1/2 flex flex-col gap-8'>
                    <p className='text-tint-2 text-sm'>Nome Completo: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Telefone: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Email: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>CPF: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Empresa: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Data de Admissão: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Data do processo <span className='text-neutral-500'>Kara</span></p>
                  </div>
                  <div className='w-1/2 flex flex-col gap-8'>
                    <p className='text-tint-2 text-sm'>Nome Completo: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Telefone: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Email: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>CPF: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Empresa: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Data de Admissão: <span className='text-neutral-500'>Kara</span></p>
                    <p className='text-tint-2 text-sm'>Data do processo <span className='text-neutral-500'>Kara</span></p>
                  </div>
                </div>
                <p className='mt-8 text-tint-2 text-sm'>Descrição Geral do Ocorrido: <span className='text-neutral-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolor, veniam quibusdam ab corrupti nobis eveniet error distinctio minima delectus id aliquam totam ullam sed eaque. Fugit saepe eius obcaecati.</span></p>
              </div>
            )
          }
          {
            selected === 'incidents' && (
              <div className='w-4/5 shadow-md p-10 rounded-2xl shadow-tint-4 h-[630px] overflow-y-auto'>
                <div className='flex justify-between items-center gap-8'>
                  <h1 className='text-shade-3 text-xl font-semibold uppercase'>Relatórios de Incidentes</h1>
                  <div className="flex items-center gap-3 flex-grow">
                    <InputText
                      className="w-3/4"
                      type="text"
                      variantIcon="left"
                      iconLeft={
                        <div className="pe-3">
                          <Search className="text-primary" />
                        </div>
                      }
                      placeholder="Pesquisar..."
                      value={search}
                      onChange={onChange}
                    />
                    <ButtomPrimaryOutline className="w-1/4" variant="lg" variantIcon='no-icon'>
                      Registrar Incidente
                    </ButtomPrimaryOutline>
                  </div>
                </div>

              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export {
  VictimDetailsView
}