import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ChangeProcedureStatusRequest,
  LegalDocument,
  LegalProcedure,
  UpdateLegalDocumentStatusRequest,
  UpdateLegalProcedureRequest
} from '../models/legal-procedure.model';

@Injectable({
  providedIn: 'root'
})
export class LegalProcedureService {
  private readonly apiUrl = 'http://localhost:8090/api/legal-procedures';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LegalProcedure[]> {
    return this.http.get<LegalProcedure[]>(this.apiUrl);
  }

  getById(id: string): Observable<LegalProcedure> {
    return this.http.get<LegalProcedure>(`${this.apiUrl}/${id}`);
  }

  create(payload: any): Observable<LegalProcedure> {
    return this.http.post<LegalProcedure>(this.apiUrl, payload);
  }

  update(id: string, payload: UpdateLegalProcedureRequest): Observable<LegalProcedure> {
    return this.http.put<LegalProcedure>(`${this.apiUrl}/${id}`, payload);
  }

  changeStatus(id: string, payload: ChangeProcedureStatusRequest): Observable<LegalProcedure> {
    return this.http.patch<LegalProcedure>(`${this.apiUrl}/${id}/status`, payload);
  }

  archive(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/archive`, {});
  }

  deleteDraft(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadDocument(procedureId: string, documentType: string, file: File, expiresAt?: string): Observable<LegalDocument> {
    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('file', file);

    if (expiresAt) {
      formData.append('expiresAt', expiresAt);
    }

    return this.http.post<LegalDocument>(`${this.apiUrl}/${procedureId}/documents`, formData);
  }

  getDocuments(procedureId: string): Observable<LegalDocument[]> {
    return this.http.get<LegalDocument[]>(`${this.apiUrl}/${procedureId}/documents`);
  }

  updateDocumentStatus(
    procedureId: string,
    documentId: string,
    payload: UpdateLegalDocumentStatusRequest
  ): Observable<LegalDocument> {
    return this.http.patch<LegalDocument>(
      `${this.apiUrl}/${procedureId}/documents/${documentId}/status`,
      payload
    );
  }

  deleteDocument(procedureId: string, documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${procedureId}/documents/${documentId}`);
  }
}