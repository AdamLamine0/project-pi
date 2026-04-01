export type ProcedureType =
  | 'SARL'
  | 'SUARL'
  | 'LABEL_STARTUP'
  | 'PI'
  | 'FISCALITE'
  | 'CONFORMITE'
  | 'AUTRE';

export type ProcedureStatus =
  | 'BROUILLON'
  | 'EN_COURS'
  | 'EN_ATTENTE_INSTITUTION'
  | 'VALIDE_PARTIELLEMENT'
  | 'COMPLETE'
  | 'ABANDONNE'
  | 'REFUSE'
  | 'ARCHIVE';

export type DocumentStatus =
  | 'EN_ATTENTE'
  | 'VALIDE_PAR_EXPERT'
  | 'REJETE'
  | 'EXPIRE';

export interface LegalDocument {
  id: string;
  documentType: string;
  fileUrl: string;
  status: DocumentStatus;
  uploadedAt: string;
  expiresAt?: string;
}

export interface LegalProcedure {
  id: string;
  entrepreneurId: string;
  expertId?: string;
  procedureType: ProcedureType;
  status: ProcedureStatus;
  completionRate: number;
  createdAt: string;
  submittedAt?: string;
  completedAt?: string;
  notes?: string;
  documents: LegalDocument[];
}

export interface CreateLegalProcedureRequest {
  entrepreneurId: string;
  expertId?: string | null;
  procedureType: ProcedureType;
  notes?: string | null;
}

export interface UpdateLegalProcedureRequest {
  expertId?: string | null;
  procedureType?: ProcedureType | null;
  notes?: string | null;
}

export interface ChangeProcedureStatusRequest {
  status: ProcedureStatus;
}

export interface CreateLegalDocumentRequest {
  documentType: string;
  fileUrl: string;
  expiresAt?: string | null;
}

export interface UpdateLegalDocumentStatusRequest {
  status: DocumentStatus;
}