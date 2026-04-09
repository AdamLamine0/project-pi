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
}

export interface EventProgramRequest {
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  orderIndex?: number;
  type: ProgramSlotType;
}