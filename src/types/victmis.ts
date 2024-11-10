import { CreateVictimIncidentUseCaseDTOInputType } from "./incident";
import { WitnessRequestType } from "./witness";

type VictimFileType = {
    description: string
    fileType: string
    file: File
}

type CreateVictimFileUseCaseDTOInput = {
    description: string;
    type: string;
    url: string;
    victimId: string | null;
};

type CreateVictimUseCaseDTOInput = {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    address: string;
    cpf: string;
    genderId: string;
    companyId: string;
    companyPositionId: string;
    phone: string;
    eventDescription: string;
    avatar: string;
    admissionDate: string;
    incidents: CreateVictimIncidentUseCaseDTOInputType[];
    files: CreateVictimFileUseCaseDTOInput[];
    witness: WitnessRequestType[];
};


export type {
    VictimFileType,
    CreateVictimFileUseCaseDTOInput,
    CreateVictimUseCaseDTOInput
}