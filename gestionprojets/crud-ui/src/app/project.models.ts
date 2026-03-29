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
  roadmapSteps?: RoadmapStepItem[];
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
