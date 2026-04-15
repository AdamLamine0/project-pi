import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LegalProcedureResponse,
  LegalDocumentResponse,
  CreateLegalProcedureRequest,
  ExpertDecisionRequest,
  ChecklistResponse,
} from '../models/legal-procedure.model';

@Injectable({ providedIn: 'root' })
export class LegalProcedureService {

  private readonly base = 'http://localhost:8090/api/legal-procedures';
  private readonly docsBase = 'http://localhost:8090/api/legal-documents';

  constructor(private readonly http: HttpClient) {}

  // ── Helpers ──────────────────────────────────────────────────────────────────

  private userHeader(userId: string): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ 'X-User-Id': userId }) };
  }

  // ── ENTREPRENEUR ─────────────────────────────────────────────────────────────

  /** Crée un dossier. entrepreneurId est transmis via header X-User-Id */
  create(request: CreateLegalProcedureRequest, entrepreneurId: string): Observable<LegalProcedureResponse> {
    return this.http.post<LegalProcedureResponse>(
      this.base, request, this.userHeader(entrepreneurId)
    );
  }

  /** Récupère uniquement les dossiers de l'entrepreneur connecté */
  getMyProcedures(entrepreneurId: string): Observable<LegalProcedureResponse[]> {
    return this.http.get<LegalProcedureResponse[]>(
      `${this.base}/my-procedures`, this.userHeader(entrepreneurId)
    );
  }

  /** Récupère un dossier par son id */
  getById(id: string): Observable<LegalProcedureResponse> {
    return this.http.get<LegalProcedureResponse>(`${this.base}/${id}`);
  }

  /** Soumet le dossier (BROUILLON → EN_COURS). Vérifie checklist côté backend */
  submit(id: string, entrepreneurId: string): Observable<LegalProcedureResponse> {
    return this.http.post<LegalProcedureResponse>(
      `${this.base}/${id}/submit`, {}, this.userHeader(entrepreneurId)
    );
  }

  /** Supprime un dossier en BROUILLON */
  deleteDraft(id: string, entrepreneurId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/${id}`, this.userHeader(entrepreneurId)
    );
  }

  // ── CHECKLIST & DOCUMENTS ────────────────────────────────────────────────────

  /** Récupère la checklist d'une procédure */
  getChecklist(procedureId: string): Observable<ChecklistResponse> {
    return this.http.get<ChecklistResponse>(`${this.base}/${procedureId}/checklist`);
  }

  /** Dépose un document pour un item de la checklist */
  uploadDocument(
    procedureId: string,
    requirementCode: string,
    file: File,
    expiresAt?: string
  ): Observable<LegalDocumentResponse> {
    const formData = new FormData();
    formData.append('requirementCode', requirementCode);
    formData.append('file', file);
    if (expiresAt) formData.append('expiresAt', expiresAt);

    return this.http.post<LegalDocumentResponse>(
      `${this.docsBase}/${procedureId}/upload`, formData
    );
  }

  /** Récupère tous les documents d'une procédure */
  getDocuments(procedureId: string): Observable<LegalDocumentResponse[]> {
    return this.http.get<LegalDocumentResponse[]>(
      `${this.docsBase}/procedure/${procedureId}`
    );
  }

  /** Supprime un document (seulement si BROUILLON) */
  deleteDocument(documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.docsBase}/${documentId}`);
  }

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  /** Récupère les dossiers EN_ATTENTE_EXPERT assignés à l'expert connecté */
  getAssignedProcedures(expertId: string): Observable<LegalProcedureResponse[]> {
    return this.http.get<LegalProcedureResponse[]>(
      `${this.base}/expert/assigned`, this.userHeader(expertId)
    );
  }

  /** L'expert valide ou refuse le dossier */
  applyExpertDecision(
    id: string,
    request: ExpertDecisionRequest,
    expertId: string
  ): Observable<LegalProcedureResponse> {
    return this.http.post<LegalProcedureResponse>(
      `${this.base}/${id}/expert-decision`, request, this.userHeader(expertId)
    );
  }
}
