import { EmployeesRecordingStatusEnum } from "../enum/employees_recording";

function removeMasks(value: string): string {
    return value.replace(/\D/g, "")
}

function formatCPF(value: string) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

function maskPhone(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
}

function parceValueToBRL(value: number) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

export function decodeEmployeesRecordingStatus(status: string): string {
    switch (status) {
        case EmployeesRecordingStatusEnum.IN_RECORDING:
            return 'Em gravação';
        case EmployeesRecordingStatusEnum.FINISHED:
            return 'Finalizado';
        case EmployeesRecordingStatusEnum.CANCELED:
            return 'Cancelado';
        case EmployeesRecordingStatusEnum.IN_ANALYSIS:
            return 'Em análise';
        case EmployeesRecordingStatusEnum.ANALYSIS_FINISHED:
            return 'Análise finalizada';
        default:
            return 'Status desconhecido';
    }
}

export {
    removeMasks,
    formatCPF,
    maskPhone,
    parceValueToBRL
}