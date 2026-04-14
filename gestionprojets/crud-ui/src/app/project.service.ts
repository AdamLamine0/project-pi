import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AdminServiceInstance,
  AiAnalysisResult,
  CreateProjectPayload,
  CreateRoadmapStepPayload,
  ProjectItem,
  UpdateProjectPayload
} from './project.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly baseUrl = 'http://localhost:8090/api/projects';
  private readonly adminUrl = 'http://localhost:8090/api/admin';

  constructor(private readonly http: HttpClient) {}

  // ── Projects ──────────────────────────────────────────────────────────────

  getAll(): Observable<ProjectItem[]> {
    return this.http.get<ProjectItem[]>(this.baseUrl);
  }

  getById(id: string): Observable<ProjectItem> {
    return this.http.get<ProjectItem>(`${this.baseUrl}/${id}`);
  }

  create(payload: CreateProjectPayload): Observable<ProjectItem> {
    return this.http.post<ProjectItem>(this.baseUrl, payload, {
      headers: this.userHeader(payload.managerId)
    });
  }

  update(id: string, payload: UpdateProjectPayload, managerId: string): Observable<ProjectItem> {
    return this.http.put<ProjectItem>(`${this.baseUrl}/${id}`, payload, {
      headers: this.userHeader(managerId)
    });
  }

  remove(id: string, managerId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.userHeader(managerId)
    });
  }

  // ── Roadmap ───────────────────────────────────────────────────────────────

  addRoadmapStep(projectId: string, payload: CreateRoadmapStepPayload, userId: string): Observable<ProjectItem> {
    return this.http.post<ProjectItem>(`${this.baseUrl}/${projectId}/roadmap-steps`, payload, {
      headers: this.userHeader(userId)
    });
  }

  updateRoadmapStepStatus(projectId: string, stepId: string, status: string, userId: string): Observable<ProjectItem> {
    return this.http.put<ProjectItem>(
      `${this.baseUrl}/${projectId}/roadmap-steps/${stepId}/status?status=${encodeURIComponent(status)}`,
      {},
      { headers: this.userHeader(userId) }
    );
  }

  deleteRoadmapStep(projectId: string, stepId: string, userId: string): Observable<ProjectItem> {
    return this.http.delete<ProjectItem>(`${this.baseUrl}/${projectId}/roadmap-steps/${stepId}`, {
      headers: this.userHeader(userId)
    });
  }

  generateRoadmap(projectId: string, userId: string): Observable<ProjectItem> {
    return this.http.post<ProjectItem>(`${this.baseUrl}/${projectId}/generate-roadmap`, {}, {
      headers: this.userHeader(userId)
    });
  }

  getProgress(projectId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${projectId}/progress`);
  }

  // ── Documents ─────────────────────────────────────────────────────────────

  uploadDocument(projectId: string, file: File, type: string, title: string, userId: string): Observable<ProjectItem> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('title', title || file.name);
    return this.http.post<ProjectItem>(`${this.baseUrl}/${projectId}/documents`, formData, {
      headers: this.userHeader(userId)
    });
  }

  deleteDocument(projectId: string, documentId: string, userId: string): Observable<ProjectItem> {
    return this.http.delete<ProjectItem>(`${this.baseUrl}/${projectId}/documents/${documentId}`, {
      headers: this.userHeader(userId)
    });
  }

  downloadDocument(projectId: string, documentId: string, userId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${projectId}/documents/${documentId}/download`, {
      headers: this.userHeader(userId),
      responseType: 'blob'
    });
  }

  // ── AI ────────────────────────────────────────────────────────────────────

  getAiScore(projectId: string): Observable<AiAnalysisResult> {
    return this.http.get<AiAnalysisResult>(`${this.baseUrl}/${projectId}/ai/score`);
  }

  getAiStatus(projectId: string): Observable<AiAnalysisResult> {
    return this.http.get<AiAnalysisResult>(`${this.baseUrl}/${projectId}/ai/status`);
  }

  reanalyze(projectId: string, userId: string): Observable<ProjectItem> {
    return this.http.post<ProjectItem>(`${this.baseUrl}/${projectId}/ai/reanalyze`, {}, {
      headers: this.userHeader(userId)
    });
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  getDiscoveredServices(): Observable<AdminServiceInstance[]> {
    return this.http.get<AdminServiceInstance[]>(`${this.adminUrl}/services`);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private userHeader(userId: string): HttpHeaders {
    return new HttpHeaders({ 'X-User-Id': userId || 'manager-1' });
  }
}
