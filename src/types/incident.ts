type VictimIncidentType = {
    date: string
    files: File[]
    eventDescription: string
}

type CreateVictimIncidentUseCaseDTOInputType = {
    date: string;
    eventDescription: string;
    victimId: string | null;
    evidences: string[];
};

type VictimIncidentInformationType = {
    victimIncidentId: string;
    date: string;
    eventDescription: string;
    victimId: string;
    isDeleted: number;
    createdAt: Date;
    updatedAt: Date;
};

type ListVictimIncidentResponseType = {
    incidents?: VictimIncidentInformationType[]
    error?: string
    validationError?: string
}

export type {
    VictimIncidentType,
    CreateVictimIncidentUseCaseDTOInputType,
    VictimIncidentInformationType,
    ListVictimIncidentResponseType
}