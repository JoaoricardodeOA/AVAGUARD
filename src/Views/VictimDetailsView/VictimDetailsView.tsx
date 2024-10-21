import { Navbar } from '@/src/components/navbar'

function VictimDetailsView() {
  return (
    <>
      <Navbar />
      <div className='mt-10 container max-w-screen-xl mx-auto px-10'>
        <div className='flex'>
          <div className='w-1/4'>scc</div>
          <div className='w-3/4 shadow-md p-10 rounded-2xl shadow-tint-4 h-[630px] overflow-y-auto'>
            <div>
              <h1 className='text-shade-3 text-xl font-semibold uppercase'>Minhas Informações</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {
  VictimDetailsView
}