export type EventType = 'WEBINAIRE' | 'WORKSHOP' | 'PITCH' | 'BOOTCAMP' | 'CONFERENCE';

export type EventStatus =
  | 'BROUILLON'
  | 'EN_ATTENTE_VALIDATION'
  | 'APPROUVE'
  | 'PUBLIE'
  | 'REJETE'
  | 'ANNULE'
  | 'TERMINE';

export type LocationType = 'PRESENTIEL' | 'DISTANCIEL' | 'HYBRIDE';

export interface Event {
  id: number;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  startDate: string;
  locationType: LocationType;
  capacityMax: number;
  coverImageUrl: string | null;
  targetSector: string[];
  targetStage: string[];
  organizerId: number;
  organizerRole: string;
  createdAt: string;
  // workflow fields (friend's addition)
  rejectionReason: string | null;
  validatedBy: number | null;
  validatedAt: string | null;
  submittedAt: string | null;
  organizerName: string | null;
  organizerEmail: string | null;
}

export interface EventRequest {
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  locationType: LocationType;
  capacityMax: number;
  coverImageUrl?: string;
  targetSector: string[];
  targetStage: string[];
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  type?: EventType;
  status?: EventStatus;
  startDate?: string;
  locationType?: LocationType;
  capacityMax?: number;
  coverImageUrl?: string;
  targetSector?: string[];
  targetStage?: string[];
}