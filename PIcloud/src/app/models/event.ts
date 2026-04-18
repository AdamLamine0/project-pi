export type EventType = 'WEBINAIRE' | 'WORKSHOP' | 'PITCH' | 'BOOTCAMP' | 'CONFERENCE';
export type EventStatus = 'BROUILLON' | 'PUBLIE' | 'ANNULE' | 'TERMINE';
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
  createdAt: string;
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