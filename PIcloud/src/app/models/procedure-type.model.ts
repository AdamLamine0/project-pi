export interface ProcedureRequirement {
  id?: string;
  procedureType: string;
  code: string;
  label: string;
  description?: string;
  required: boolean;
}

export interface ProcedureTypeOverview {
  procedureType: string;
  title: string;
  description: string;
  requiredDocuments: string[];
  procedureCount: number;
}

export interface ProcedureChecklistItem {
  code: string;
  label: string;
  required: boolean;
  uploaded: boolean;
  fileUrl?: string | null;
}

export interface ProcedureChecklist {
  procedureId: string;
  procedureType: string;
  items: ProcedureChecklistItem[];
}