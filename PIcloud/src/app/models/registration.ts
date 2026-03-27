export type RegistrationStatus = 'INSCRIT' | 'LISTE_ATTENTE' | 'ANNULE' | 'PRESENT';

export interface EventRegistration {
  id: number;
  eventId: number;
  eventTitle: string;
  userId: number;
  status: RegistrationStatus;
  attended: boolean;
  checkInTime: string | null;
  registeredAt: string;
}