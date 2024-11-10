type CreateVictimReportUseCaseDTOInputType = {
    aggressorName: string;
    aggressorCpf: string;
    reportType: string;
    isAnonymous: number;
    incidents: string[];
    witness: string[];
};

export type { CreateVictimReportUseCaseDTOInputType };
