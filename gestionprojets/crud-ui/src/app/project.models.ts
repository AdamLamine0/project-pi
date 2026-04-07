export interface ProjectItem {
  id?: string;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  budget: number;
  statut?: string;
  managerId: string;
  managerName?: string;
  memberIds: string[];
  priorite: string;
  categorie?: string;
  progressPercentage?: number;
  dateCreation?: string;
  dateModification?: string;
  roadmapSteps?: RoadmapStepItem[];
  documents?: ProjectDocumentItem[];
}

export interface ProjectDocumentItem {
  id: string;
  type: string;
  title: string;
  fileName: string;
  filePath: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface RoadmapStepItem {
  id: string;
  titre: string;
  description: string;
  statut: 'PENDING' | 'IN_PROGRESS' | 'DONE' | string;
  ordre: number;
  parent?: string;
  creePar?: string;
}

export interface CreateRoadmapStepPayload {
  titre: string;
  description: string;
  ordre: number;
  parent?: string;
  statut: 'PENDING' | 'IN_PROGRESS' | 'DONE' | string;
}

export interface CreateProjectPayload {
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  budget: number;
  managerId: string;
  memberIds: string[];
  priorite: string;
  categorie?: string;
}

export interface UpdateProjectPayload {
  titre?: string;
  description?: string;
  dateDebut?: string;
  dateFin?: string;
  budget?: number;
  statut?: string;
  memberIds?: string[];
  priorite?: string;
  categorie?: string;
}

export interface AdminServiceInstance {
  serviceName: string;
  instanceId?: string;
  host: string;
  port: number;
  uri: string;
  secure: boolean;
  status: string;
  metadata: Record<string, string>;
}
