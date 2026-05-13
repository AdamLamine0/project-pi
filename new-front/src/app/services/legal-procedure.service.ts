import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LegalProcedureResponse,
  LegalDocumentResponse,
  CreateLegalProcedureRequest,
  ExpertDecisionRequest,
  ChecklistResponse,
  ExpertSummary,
  LegalAiAnalysisResponse,
  LegalChatRequest,
  LegalChatResponse,
  LegalProcedureStatsResponse,
} from '../models/legal-procedure.model';
import { USER_API_BASE } from '../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class LegalProcedureService {

  private readonly base      = `${USER_API_BASE}/legal-procedures`;
  private readonly usersBase = `${USER_API_BASE}/users`;

  constructor(private readonly http: HttpClient) {}

  private userHeader(userId: number): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ 'X-User-Id': String(userId) }) };
  }

  // ── ENTREPRENEUR ─────────────────────────────────────────────────────────────

  create(request: CreateLegalProcedureRequest, entrepreneurId: number): Observable<LegalProcedureResponse> {
    return this.http.post<LegalProcedureResponse>(
      this.base, request, this.userHeader(entrepreneurId)
    );
  }

  getMyProcedures(entrepreneurId: number): Observable<LegalProcedureResponse[]> {
    return this.http.get<LegalProcedureResponse[]>(
      `${this.base}/my-procedures`, this.userHeader(entrepreneurId)
    );
  }

  getAllProcedures(): Observable<LegalProcedureResponse[]> {
    return this.http.get<LegalProcedureResponse[]>(`${this.base}/admin/all`);
  }

  getById(id: string): Observable<LegalProcedureResponse> {
    return this.http.get<LegalProcedureResponse>(`${this.base}/${id}`);
  }

  getStats(): Observable<LegalProcedureStatsResponse> {
    return this.http.get<LegalProcedureStatsResponse>(`${this.base}/stats`);
  }

  submit(id: string, entrepreneurId: number): Observable<LegalProcedureResponse> {
    return this.http.post<LegalProcedureResponse>(
      `${this.base}/${id}/submit`, {}, this.userHeader(entrepreneurId)
    );
  }

  deleteDraft(id: string, entrepreneurId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/${id}`, this.userHeader(entrepreneurId)
    );
  }

  // ── CHECKLIST & DOCUMENTS ────────────────────────────────────────────────────

  getChecklist(procedureId: string): Observable<ChecklistResponse> {
    return this.http.get<ChecklistResponse>(`${this.base}/${procedureId}/checklist`);
  }

  /**
   * Uploads a file for a checklist item.
   * expiresAt was removed; neither the backend nor the frontend uses it anymore.
   */
  uploadDocument(
    procedureId: string,
    requirementCode: string,
    file: File
  ): Observable<LegalDocumentResponse> {
    const formData = new FormData();
    formData.append('requirementCode', requirementCode);
    formData.append('file', file);
    return this.http.post<LegalDocumentResponse>(
      `${this.base}/${procedureId}/documents`, formData
    );
  }

  getDocuments(procedureId: string): Observable<LegalDocumentResponse[]> {
    return this.http.get<LegalDocumentResponse[]>(
      `${this.base}/${procedureId}/documents`
    );
  }

  deleteDocument(procedureId: string, documentId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/${procedureId}/documents/${documentId}`
    );
  }

  analyzeWithAi(procedureId: string): Observable<LegalAiAnalysisResponse> {
    return this.http.post<LegalAiAnalysisResponse>(
      `${this.base}/${procedureId}/ai-analysis`, {}
    );
  }

  askLegalChat(request: LegalChatRequest): Observable<LegalChatResponse> {
    return this.http.post<LegalChatResponse>(
      `${this.base}/ai-chat`, request
    );
  }

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  getAssignedProcedures(expertId: number): Observable<LegalProcedureResponse[]> {
    return this.http.get<LegalProcedureResponse[]>(
      `${this.base}/expert/assigned`, this.userHeader(expertId)
    );
  }

  applyExpertDecision(
    id: string,
    request: ExpertDecisionRequest,
    expertId: number
  ): Observable<LegalProcedureResponse> {
    return this.http.post<LegalProcedureResponse>(
      `${this.base}/${id}/expert-decision`, request, this.userHeader(expertId)
    );
  }

  // ── EXPERTS LIST ─────────────────────────────────────────────────────────────

  getExperts(): Observable<ExpertSummary[]> {
    return this.http.get<ExpertSummary[]>(`${this.usersBase}/experts`);
  }
}
