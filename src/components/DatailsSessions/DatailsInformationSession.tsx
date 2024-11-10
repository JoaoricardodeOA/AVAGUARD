import { formatCPF, maskPhone } from "@/src/common/utils"
import { VictimsWithInformationType } from "@/src/Views/HomeView/HomeViewType"

interface DatailsInformationSessionProps {
    victim: VictimsWithInformationType
}


function DatailsInformationSession(props: DatailsInformationSessionProps) {
    return (
        <div className='w-4/5 shadow-md p-10 rounded-2xl shadow-tint-4 h-[630px] overflow-y-auto'>
            <div>
                <h1 className='text-shade-3 text-xl font-semibold uppercase'>Minhas Informações</h1>
            </div>
            <div className='mt-8 flex items-center'>
                <div className='w-1/2 flex flex-col gap-8'>
                    <p className='text-tint-2 text-sm'>Nome Completo: <span className='text-neutral-500'>{props.victim.victimName}</span></p>
                    <p className='text-tint-2 text-sm'>Telefone: <span className='text-neutral-500'>{maskPhone(props.victim.phone)}</span></p>
                    <p className='text-tint-2 text-sm'>Email: <span className='text-neutral-500'>{props.victim.email}</span></p>
                    <p className='text-tint-2 text-sm'>CPF: <span className='text-neutral-500'>{formatCPF(props.victim.cpf)}</span></p>
                    <p className='text-tint-2 text-sm'>Cargo: <span className='text-neutral-500'>{props.victim.companyPositionName}</span></p>
                    <p className='text-tint-2 text-sm'>Data de Admissão: <span className='text-neutral-500'>{props.victim.admissionDate}</span></p>
                </div>
                <div className='w-1/2 flex flex-col gap-8'>
                    <p className='text-tint-2 text-sm'>Idade: <span className='text-neutral-500'>{props.victim.age}</span></p>
                    <p className='text-tint-2 text-sm'>Gênero: <span className='text-neutral-500'>{props.victim.genderName}</span></p>
                    <p className='text-tint-2 text-sm'>Endereço: <span className='text-neutral-500'>{props.victim.address}</span></p>
                    <p className='text-tint-2 text-sm'>Empresa: <span className='text-neutral-500'>{props.victim.companyName}</span></p>
                </div>
            </div>
            <p className='mt-8 text-tint-2 text-sm'>Descrição Geral do Ocorrido: <span className='text-neutral-500'>{props.victim.eventDescription}</span></p>
        </div>
    )
}

export {
    DatailsInformationSession 
}