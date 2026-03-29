import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateProjectPayload,
  CreateRoadmapStepPayload,
  ProjectItem,
  UpdateProjectPayload
} from './project.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly baseUrl = 'http://localhost:8097/api/projects';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<ProjectItem[]> {
    return this.http.get<ProjectItem[]>(this.baseUrl);
  }

  create(payload: CreateProjectPayload): Observable<ProjectItem> {
    return this.http.post<ProjectItem>(this.baseUrl, payload, {
      headers: this.withUserHeader(payload.managerId)
    });
  }

  update(id: string, payload: UpdateProjectPayload, managerId: string): Observable<ProjectItem> {
    return this.http.put<ProjectItem>(`${this.baseUrl}/${id}`, payload, {
      headers: this.withUserHeader(managerId)
    });
  }

  remove(id: string, managerId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.withUserHeader(managerId)
    });
  }

  addRoadmapStep(projectId: string, payload: CreateRoadmapStepPayload, userId: string): Observable<ProjectItem> {
    return this.http.post<ProjectItem>(`${this.baseUrl}/${projectId}/roadmap-steps`, payload, {
      headers: this.withUserHeader(userId)
    });
  }

  updateRoadmapStepStatus(
    projectId: string,
    stepId: string,
    status: string,
    userId: string
  ): Observable<ProjectItem> {
    return this.http.put<ProjectItem>(
      `${this.baseUrl}/${projectId}/roadmap-steps/${stepId}/status?status=${encodeURIComponent(status)}`,
      {},
      { headers: this.withUserHeader(userId) }
    );
  }

  deleteRoadmapStep(projectId: string, stepId: string, userId: string): Observable<ProjectItem> {
    return this.http.delete<ProjectItem>(`${this.baseUrl}/${projectId}/roadmap-steps/${stepId}`, {
      headers: this.withUserHeader(userId)
    });
  }

  generateRoadmap(projectId: string, userId: string): Observable<ProjectItem> {
    return this.http.post<ProjectItem>(`${this.baseUrl}/${projectId}/generate-roadmap`, {}, {
      headers: this.withUserHeader(userId)
    });
  }

  getProgress(projectId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${projectId}/progress`);
  }

  private withUserHeader(managerId: string): HttpHeaders {
    return new HttpHeaders({ 'X-User-Id': managerId || 'manager-1' });
  }
}
