import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProjectPayload, ProjectItem, UpdateProjectPayload } from './project.models';

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

  private withUserHeader(managerId: string): HttpHeaders {
    return new HttpHeaders({ 'X-User-Id': managerId || 'manager-1' });
  }
}
