
import { DatailsCreateReportSession } from '@/src/components/DatailsSessions/DatailsCreateReportSession'
import { DatailsIncitentsSession } from '@/src/components/DatailsSessions/DatailsIncitentsSession'
import { DatailsInformationSession } from '@/src/components/DatailsSessions/DatailsInformationSession'
import { DatailsWitnessSession } from '@/src/components/DatailsSessions/DatailsWitnessSession'
import { Navbar } from '@/src/components/navbar'
import { avaguardService } from '@/src/service/avaguardService'
import { Tabs, Tab, Spinner } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { GetVictimsResponseType, ListVictimsResponseType, ListVictimsType, VictimsWithInformationType } from '../HomeView/HomeViewType'
import { NotificationAction } from '@/src/components/Notifications/Notification'

function VictimDetailsView() {
  const [selected, setSelected] = useState("information")
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [victimId, setVictimId] = useState<string>('')
  const [victim, setVictim] = useState<VictimsWithInformationType>()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      init(id as string)
    }
  }, [id])


  async function init(id: string) {
    setLoading(true)
    const response = await avaguardService.get<GetVictimsResponseType>(`/getVictim?id=${id}`)

    if (response?.validationError) {
      NotificationAction.notificationWarning(response?.validationError)
      router.push('/home')
    } else if (response?.error) {
      NotificationAction.notificationError(response.error)
      router.push('/home')
    } else if (response?.victim) {
      setVictim(response.victim)
      setVictimId(id)
    }

    setLoading(false)
  }

  return (
    <>
      <Navbar />

      {
        loading ? (
          <div className="h-[90vh] flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className='mt-10 container max-w-screen-xl mx-auto px-10'>
            <div className='flex'>
              <div className='w-1/5'>
                <img className='rounded-full w-[70px] h-[70px]' src={'/mulher-maravilha.png'} alt="Imagem da Vitima" />
                <p className='text-neutral-700 text-3xl'>{victim?.victimName}</p>
                <p className='text-xs text-neutral-dGrey'>{victim?.email}</p>
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
                  <DatailsInformationSession victim={victim as VictimsWithInformationType} />
                )
              }
              {
                selected === 'incidents' && (
                  <DatailsIncitentsSession victim={victim as VictimsWithInformationType} />
                )
              }
              {
                selected === 'witnesses' && (
                  <DatailsWitnessSession victim={victim as VictimsWithInformationType} />
                )
              }
              {
                selected === 'register_report' && (
                  <DatailsCreateReportSession victim={victim as VictimsWithInformationType} />
                )
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export {
  VictimDetailsView
}