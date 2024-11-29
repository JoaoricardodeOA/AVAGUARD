export type EmployeesRecording = {
    employeesRecordingId: string;
    date: Date;
    status: string;
    employeesId: string;
    description: string | null;
    analysisDescription: string | null;
    isHarassment: number | null;
    url: string | null;
    userAnalyzing: string | null;
    createdAt: Date;
    updatedAt: Date;
};


export type ListRealtimeEmployeesRecordingsType = {
    employeesRecordingId: number
    name: string
    phone: string
    avatar: string
    companyName: string
    status: string
    date: string
    url: string
}

export type CountRealtimeEmployeesRecordingsType = {
    inRecordingCount: number
    finishedCount: number
    canceledCount: number
    inAnalysisCount: number
    analysisFinishedCount: number
}

export type ListRealtimeEmployeesRecordingsUseCaseDTOOutput = {
    realtimeEmployees?: ListRealtimeEmployeesRecordingsType[]
    count?: CountRealtimeEmployeesRecordingsType | null
    error?: string
    validationError?: string
}

export type InitAnalysisEmployeesRecordingUseCaseDTOOutput = {
    employeesRecording?: EmployeesRecording[]
    error?: string
    validationError?: string
}