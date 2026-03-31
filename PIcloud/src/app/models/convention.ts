// ── Enums ─────────────────────────────────────────────────────────────────────

export enum StatutConvention {
  BROUILLON = 'BROUILLON',
  SIGNEE    = 'SIGNEE',
  ACTIVE    = 'ACTIVE',
  EXPIREE   = 'EXPIREE'
}

export enum StatutObjectif {
  EN_COURS = 'EN_COURS',
  ATTEINT  = 'ATTEINT',
  EN_RETARD = 'EN_RETARD',
  ANNULE   = 'ANNULE'
}

export enum ResponsableObjectif {
  USER      = 'USER',
  PARTENAIRE = 'PARTENAIRE',
  LES_DEUX  = 'LES_DEUX'
}

// ── DTOs ──────────────────────────────────────────────────────────────────────

export interface ObjectifResponse {
  id: number;
  conventionId: number;
  titre: string;
  description: string;
  responsable: ResponsableObjectif;
  dateEcheance: string;
  statut: StatutObjectif;
  commentaire: string;
  dateCreation: string;
}

export interface ConventionResponse {
  id: number;
  numeroConvention: string;
  userId: number;
  organisationPartenaireId: number;
  organisationPartenaireNom: string;
  dateDebut: string;
  dateFin: string;
  objectifs: ObjectifResponse[];
  statut: StatutConvention;
  documentUrl: string;
  signedAt: string;
  renouvellementDemandeParRole: string | null;
}

export interface ConventionRequest {
  organisationPartenaireId: number;
  userId: number;
  dateDebut: string;
  dateFin: string;
}

export interface ObjectifRequest {
  conventionId: number;
  titre: string;
  description?: string;
  responsable: ResponsableObjectif;
  dateEcheance?: string;
  commentaire?: string;
}

// ── Local form model (UI-only, flattened) ────────────────────────────────────
// Used in form-convention to collect objectifs before sending to API

export interface ObjectifFormItem {
  titre: string;
  description: string;
  dateEcheance: string;
}