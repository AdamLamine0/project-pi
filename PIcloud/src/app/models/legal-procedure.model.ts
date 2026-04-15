// ─── Enums (alignés sur le backend Spring Boot) ──────────────────────────────

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
  | 'EN_ATTENTE_EXPERT'
  | 'COMPLETE'
  | 'REFUSE';

export type DocumentStatus = 'NON_DEPOSE' | 'DEPOSE' | 'VALIDE' | 'REFUSE';

// ─── Réponses backend ─────────────────────────────────────────────────────────

export interface LegalDocumentResponse {
  id: string;
  requirementCode: string;
  documentType: string;
  fileUrl: string;
  status: DocumentStatus;
  uploadedAt: string;
  expiresAt?: string;
}

export interface LegalProcedureResponse {
  id: string;
  entrepreneurId: string;
  expertId: string;
  projectName: string;
  procedureType: ProcedureType;
  description?: string;
  status: ProcedureStatus;
  remark?: string;
  completionRate: number;
  createdAt: string;
  submittedAt?: string;
  completedAt?: string;
  documents: LegalDocumentResponse[];
}

// ─── Requêtes vers backend ────────────────────────────────────────────────────

/** entrepreneurId est injecté côté serveur via X-User-Id header — ne pas l'inclure ici */
export interface CreateLegalProcedureRequest {
  projectName: string;
  procedureType: ProcedureType;
  expertId: string;
  description?: string | null;
}

export interface ExpertDecisionRequest {
  approved: boolean;
  remark?: string | null;
}

// ─── Checklist ────────────────────────────────────────────────────────────────

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

// ─── Experts statiques ────────────────────────────────────────────────────────
// UUID format obligatoire (36 chars)

export interface ExpertSummary {
  id: string;
  fullName: string;
  email: string;
}

export const STATIC_EXPERTS: ExpertSummary[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    fullName: 'Maître Ahmed Ben Ali',
    email: 'ahmed.benali@cabinet.tn'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    fullName: 'Maître Sonia Trabelsi',
    email: 'sonia.trabelsi@cabinet.tn'
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    fullName: 'Maître Karim Mansour',
    email: 'karim.mansour@cabinet.tn'
  }
];

// ─── Labels d'affichage ───────────────────────────────────────────────────────

export const PROCEDURE_TYPE_LABELS: Record<ProcedureType, string> = {
  SARL: "Création SARL",
  SUARL: "Création SUARL",
  LABEL_STARTUP: "Label Startup",
  PI: "Propriété Intellectuelle",
  FISCALITE: "Fiscalité",
  CONFORMITE: "Conformité",
  AUTRE: "Autre procédure",
};

export const PROCEDURE_TYPE_DESCRIPTIONS: Record<ProcedureType, string> = {
  SARL: "Création d'une Société à Responsabilité Limitée avec statuts et immatriculation.",
  SUARL: "Création d'une Société Unipersonnelle à Responsabilité Limitée.",
  LABEL_STARTUP: "Obtention du label startup avec dossier juridique et technique.",
  PI: "Protection de la propriété intellectuelle (marque, brevet, etc.).",
  FISCALITE: "Assistance fiscale et démarches administratives fiscales.",
  CONFORMITE: "Vérification de conformité juridique et réglementaire.",
  AUTRE: "Autre procédure juridique selon le besoin du projet.",
};

export const STATUS_LABELS: Record<ProcedureStatus, string> = {
  BROUILLON: 'Brouillon',
  EN_COURS: 'En cours',
  EN_ATTENTE_EXPERT: 'En attente expert',
  COMPLETE: 'Complété',
  REFUSE: 'Refusé',
};