import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EntrepreneurPlaygroundRequest, EntrepreneurPlaygroundResult, MentoringRequest, MentoringRequestStatus, Project, Task, TeamMember } from '../../../models/project';

@Injectable({
  providedIn: 'root'
})
export class GestionProjetsService {
  private apiUrl = 'http://localhost:8090/api/projects';
  private docsUrl = 'http://localhost:8090/api/documents';
  private readonly MENTORING_KEY = 'pi_mentoring_requests';

  constructor(private http: HttpClient) { }

  // ──────────────────────────────────────────────
  // Mentoring Requests (localStorage-backed)
  // ──────────────────────────────────────────────

  private getAllRequests(): MentoringRequest[] {
    try {
      return JSON.parse(localStorage.getItem(this.MENTORING_KEY) || '[]');
    } catch { return []; }
  }

  private saveRequests(requests: MentoringRequest[]): void {
    localStorage.setItem(this.MENTORING_KEY, JSON.stringify(requests));
  }

  sendMentoringRequest(projectId: number, projectTitle: string, mentorId: number, mentorEmail: string, mentorName: string, message = ''): MentoringRequest {
    const all = this.getAllRequests();
    const existing = all.find(r => r.projectId === projectId && r.mentorId === mentorId);
    if (existing) return existing;

    const req: MentoringRequest = {
      id: `${Date.now()}-${mentorId}`,
      projectId, projectTitle, mentorId, mentorEmail, mentorName,
      message: message || `${mentorName} souhaite vous accompagner en tant que mentor.`,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    this.saveRequests([...all, req]);
    return req;
  }

  getMentoringRequestsForProject(projectId: number): MentoringRequest[] {
    return this.getAllRequests().filter(r => r.projectId === projectId);
  }

  getMentoringRequestByMentor(projectId: number, mentorId: number): MentoringRequest | null {
    return this.getAllRequests().find(r => r.projectId === projectId && r.mentorId === mentorId) || null;
  }

  respondToMentoringRequest(requestId: string, status: MentoringRequestStatus): void {
    const all = this.getAllRequests().map(r =>
      r.id === requestId ? { ...r, status, respondedAt: new Date().toISOString() } : r
    );
    this.saveRequests(all);
  }

  getAcceptedMentoringsForMentor(mentorId: number): MentoringRequest[] {
    return this.getAllRequests().filter(r => r.mentorId === mentorId && r.status === 'ACCEPTED');
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Tasks
  getTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${projectId}/tasks`);
  }

  getTask(projectId: number, taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${projectId}/tasks/${taskId}`);
  }

  createTask(projectId: number, task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${projectId}/tasks`, task);
  }

  updateTask(projectId: number, taskId: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${projectId}/tasks/${taskId}`, task);
  }

  deleteTask(projectId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/tasks/${taskId}`);
  }

  // Team members
  getTeamMembers(projectId: number): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.apiUrl}/${projectId}/team-members`);
  }

  scoreProject(projectId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${projectId}/score`, {});
  }

  generateRoadmap(projectId: number, feedback = ''): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${projectId}/roadmap`, { feedback });
  }

  analyzeProjectDescription(projectId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/analyze-description`, { projectId });
  }

  analyzePlagiarism(projectId: number, documentTexts: string[] = [], webSources: string[] = []): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${projectId}/plagiarism`, { documentTexts, webSources });
  }

  getProjectRecommendations(projectId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${projectId}/recommendations`, {});
  }

  analyzeEntrepreneurPlayground(projectId: number, payload: EntrepreneurPlaygroundRequest): Observable<EntrepreneurPlaygroundResult> {
    return this.http.post<EntrepreneurPlaygroundResult>(`${this.apiUrl}/${projectId}/entrepreneur-playground`, payload);
  }

  // Document Generation & Persistence
  getProjectDocuments(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.docsUrl}/project/${projectId}`);
  }

  saveDocument(payload: any): Observable<any> {
    return this.http.post<any>(this.docsUrl, payload);
  }

  updateDocument(docId: number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.docsUrl}/${docId}`, payload);
  }

  generateBmc(projectId: number): Observable<any> {
    return this.http.post<any>(`${this.docsUrl}/project/${projectId}/generate/bmc`, {});
  }

  generateSwot(projectId: number, marketContext: string = ''): Observable<any> {
    const params = marketContext ? { marketContext } : {};
    return this.http.post<any>(`${this.docsUrl}/project/${projectId}/generate/swot`, {}, { params: params as any });
  }

  generatePitch(projectId: number, targetMarket: string = ''): Observable<any> {
    const params = targetMarket ? { targetMarket } : {};
    return this.http.post<any>(`${this.docsUrl}/project/${projectId}/generate/pitch`, {}, { params: params as any });
  }

  deleteDocument(docId: number): Observable<void> {
    return this.http.delete<void>(`${this.docsUrl}/${docId}`);
  }
}
