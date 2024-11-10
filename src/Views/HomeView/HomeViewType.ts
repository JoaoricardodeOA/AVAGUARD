type VictimsWithInformationType = {
    victimId: string;
    victimName: string;
    age: number;
    phone: string;
    email: string;
    address: string;
    cpf: string;
    genderId: string;
    genderName: string;
    companyId: string;
    companyName: string;
    companyPositionId: string;
    companyPositionName: string;
    eventDescription: string;
    avatar: string;
    admissionDate: string
}

type ListVictimsType = {
    companyId: string;
    companyName: string;
    victims: VictimsWithInformationType[];
}

type ListVictimsResponseType = {
    victims?: ListVictimsType[]
    error?: string
    validationError?: string
}

type GetVictimsResponseType = {
    victim?: VictimsWithInformationType
    error?: string
    validationError?: string
}

export type {
    VictimsWithInformationType,
    ListVictimsResponseType,
    ListVictimsType,
    GetVictimsResponseType
}