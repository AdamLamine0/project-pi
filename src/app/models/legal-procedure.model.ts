export type ProcedureType =
  | 'SARL' | 'SUARL' | 'LABEL_STARTUP'
  | 'PI' | 'FISCALITE' | 'CONFORMITE' | 'AUTRE';

export type ProcedureStatus =
  | 'BROUILLON' | 'EN_COURS' | 'EN_ATTENTE_EXPERT' | 'COMPLETE' | 'REFUSE';

export type DocumentStatus = 'NON_DEPOSE' | 'DEPOSE' | 'VALIDE' | 'REFUSE';

export interface LegalDocumentResponse {
  id: string;
  requirementCode: string;
  documentType: string;
  fileUrl: string;
  status: DocumentStatus;
  uploadedAt: string;
  // expiresAt supprimé
}

export interface LegalProcedureResponse {
  id: string;
  entrepreneurId: number;
  expertId: number;
  projectName: string;
  procedureType: ProcedureType;
  // description supprimé
  status: ProcedureStatus;
  remark?: string;
  completionRate: number;
  createdAt: string;
  submittedAt?: string;
  completedAt?: string;
  documents: LegalDocumentResponse[];
}

export interface CreateLegalProcedureRequest {
  projectName: string;
  procedureType: ProcedureType;
  expertId: number;
  // description supprimé
}

export interface ExpertDecisionRequest {
  approved: boolean;
  remark?: string | null;
}

export interface ExpertSummary {
  id: number;
  fullName: string;
  email: string;
}

export interface ChecklistItem {
  code: string;
  label: string;
  description?: string;
  required: boolean;
  uploaded: boolean;
  fileUrl?: string | null;
  documentId?: string | null;
}

export interface ChecklistResponse {
  procedureId: string;
  procedureType: ProcedureType;
  items: ChecklistItem[];
  uploadedCount: number;
  requiredCount: number;
  completionPercentage: number;
}

export const PROCEDURE_TYPE_LABELS: Record<ProcedureType, string> = {
  SARL: 'Création SARL',
  SUARL: 'Création SUARL',
  LABEL_STARTUP: 'Label Startup',
  PI: 'Propriété Intellectuelle',
  FISCALITE: 'Fiscalité',
  CONFORMITE: 'Conformité',
  AUTRE: 'Autre procédure',
};

export const PROCEDURE_TYPE_DESCRIPTIONS: Record<ProcedureType, string> = {
  SARL: "Création d'une Société à Responsabilité Limitée.",
  SUARL: "Création d'une Société Unipersonnelle à Responsabilité Limitée.",
  LABEL_STARTUP: "Obtention du label startup.",
  PI: "Protection de la propriété intellectuelle.",
  FISCALITE: "Assistance fiscale et démarches administratives.",
  CONFORMITE: "Vérification de conformité juridique.",
  AUTRE: "Autre procédure juridique.",
};

export const STATUS_LABELS: Record<ProcedureStatus, string> = {
  BROUILLON: 'Brouillon',
  EN_COURS: 'En cours',
  EN_ATTENTE_EXPERT: 'En attente expert',
  COMPLETE: 'Complété',
  REFUSE: 'Refusé',
};