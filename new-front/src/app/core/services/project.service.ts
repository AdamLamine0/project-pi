import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GestionProjetsService } from '../../modules/gestion-projets/services/gestion-projets.service';
import { Project } from '../../models/project';

/**
 * Core ProjectService that wraps GestionProjetsService
 * Provides a simplified API for components outside the gestion-projets module
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private gestionProjetsService = inject(GestionProjetsService);

  /**
   * Get all projects
   */
  listProjects(): Observable<Project[]> {
    return this.gestionProjetsService.getProjects();
  }

  /**
   * Get a single project by ID
   */
  getProject(id: number): Observable<Project> {
    return this.gestionProjetsService.getProject(id);
  }

  /**
   * Create a new project
   */
  createProject(project: Project): Observable<Project> {
    return this.gestionProjetsService.createProject(project);
  }

  /**
   * Update an existing project
   */
  updateProject(id: number, project: Project): Observable<Project> {
    return this.gestionProjetsService.updateProject(id, project);
  }

  /**
   * Delete a project
   */
  deleteProject(id: number): Observable<void> {
    return this.gestionProjetsService.deleteProject(id);
  }

  /**
   * Generate roadmap for a project
   */
  generateRoadmap(projectId: number, feedback?: string): Observable<any> {
    return this.gestionProjetsService.generateRoadmap(projectId, feedback);
  }

  /**
   * Score a project using ML
   */
  scoreProject(projectId: number): Observable<any> {
    return this.gestionProjetsService.scoreProject(projectId);
  }

  /**
   * Analyze project description
   */
  analyzeDescription(projectId: number): Observable<any> {
    return this.gestionProjetsService.analyzeProjectDescription(projectId);
  }

  /**
   * Get project recommendations
   */
  getRecommendations(projectId: number): Observable<any> {
    return this.gestionProjetsService.getProjectRecommendations(projectId);
  }

  /**
   * Entrepreneur playground analysis
   */
  analyzePlayground(projectId: number, payload: any): Observable<any> {
    return this.gestionProjetsService.analyzeEntrepreneurPlayground(projectId, payload);
  }

  /**
   * Generate BMC document
   */
  generateBmc(projectId: number): Observable<any> {
    return this.gestionProjetsService.generateBmc(projectId);
  }

  /**
   * Generate SWOT document
   */
  generateSwot(projectId: number, marketContext?: string): Observable<any> {
    return this.gestionProjetsService.generateSwot(projectId, marketContext);
  }

  /**
   * Generate Pitch Deck
   */
  generatePitch(projectId: number, targetMarket?: string): Observable<any> {
    return this.gestionProjetsService.generatePitch(projectId, targetMarket);
  }

  /**
   * Get project documents
   */
  getDocuments(projectId: number): Observable<any[]> {
    return this.gestionProjetsService.getProjectDocuments(projectId);
  }
}
