
import { DatailsCreateReportSession } from '@/src/components/DatailsSessions/DatailsCreateReportSession'
import { DatailsIncitentsSession } from '@/src/components/DatailsSessions/DatailsIncitentsSession'
import { DatailsInformationSession } from '@/src/components/DatailsSessions/DatailsInformationSession'
import { DatailsWitnessSession } from '@/src/components/DatailsSessions/DatailsWitnessSession'
import { Navbar } from '@/src/components/navbar'
import { Tabs, Tab } from '@nextui-org/react'
import React from 'react'
import { useState } from 'react'

function VictimDetailsView() {
  const [selected, setSelected] = useState("information")

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
                <Tab key="witnesses" title="Testemunhas" />
                <Tab key="register_report" title="Realizar Denúncia" />
              </Tabs>
            </div>
          </div>
          {
            selected === 'information' && (
              <DatailsInformationSession />
            )
          }
          {
            selected === 'incidents' && (
              <DatailsIncitentsSession />
            )
          }
          {
            selected === 'witnesses' && (
              <DatailsWitnessSession />
            )
          }
          {
            selected === 'register_report' && (
              <DatailsCreateReportSession />
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