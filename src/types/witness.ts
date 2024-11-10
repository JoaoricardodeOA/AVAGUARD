type WitnessRequestType = {
  firstName: string
  lastName: string
  phone: string
  cpf: string
  address: string
  eventDescription: string
  email: string
  victimId: string | null
}

type VictimWitnessType = {
  victimWitnessId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  cpf: string;
  eventDescription: string;
  victimId: string;
  isDeleted: number;
  createdAt: Date;
  updatedAt: Date;
};


type ListVictimWitnessResponseType = {
  witness?: VictimWitnessType[]
  error?: string
  validationError?: string
}

export type {
  WitnessRequestType,
  ListVictimWitnessResponseType,
  VictimWitnessType
}