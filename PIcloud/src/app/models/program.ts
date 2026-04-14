export type ProgramSlotType = 'PRESENTATION' | 'BREAK' | 'WORKSHOP' | 'QA' | 'KEYNOTE';

export interface EventProgram {
  id: number;
  eventId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  orderIndex: number;
  type: ProgramSlotType;
  // Speaker assigned to this slot (null when none)
  speakerId?: number | null;
  speakerName?: string | null;
  speakerTitle?: string | null;
  speakerCompany?: string | null;
  speakerPhotoUrl?: string | null;
  speakerLinkedinUrl?: string | null;
}

export interface EventProgramRequest {
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  orderIndex?: number;
  type?: ProgramSlotType;
  /** ID of an existing Speaker to assign. Omit to leave existing assignment unchanged. */
  speakerId?: number | null;
}