export interface Speaker {
  id: number;
  fullName: string;
  title: string;
  company: string;
  bio: string;
  photoUrl: string | null;
  linkedinUrl: string | null;
  eventIds: number[];
}

export interface SpeakerRequest {
  fullName: string;
  title?: string;
  company?: string;
  bio?: string;
  photoUrl?: string;
  linkedinUrl?: string;
}