import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiOrigin } from '../../core/api-origin';
import {
  NdaAgreement,
  NdaSignResponse,
  NdaStatusResponse,
  SignNdaPayload,
} from '../models/data-room.models';

@Injectable({
  providedIn: 'root',
})
export class NdaService {
  private readonly base = `${apiOrigin()}/api/dataroom`;

  constructor(private http: HttpClient) {}

  createNda(dataRoomId: string): Observable<NdaAgreement> {
    return this.http.post<NdaAgreement>(
      `${this.base}/${encodeURIComponent(dataRoomId)}/nda/create`,
      {},
      { headers: this.actorHeaders() }
    );
  }

  getNda(dataRoomId: string): Observable<NdaAgreement> {
    return this.http.get<NdaAgreement>(
      `${this.base}/${encodeURIComponent(dataRoomId)}/nda`,
      { headers: this.actorHeaders() }
    );
  }

  signNda(dataRoomId: string, payload: SignNdaPayload): Observable<NdaSignResponse> {
    return this.http.post<NdaSignResponse>(
      `${this.base}/${encodeURIComponent(dataRoomId)}/nda/sign`,
      payload,
      { headers: this.actorHeaders() }
    );
  }

  getNdaStatus(dataRoomId: string): Observable<NdaStatusResponse> {
    return this.http.get<NdaStatusResponse>(
      `${this.base}/${encodeURIComponent(dataRoomId)}/nda/status`,
      { headers: this.actorHeaders() }
    );
  }

  getCertificate(dataRoomId: string): Observable<Blob> {
    return this.http.get(
      `${this.base}/${encodeURIComponent(dataRoomId)}/nda/certificate`,
      { headers: this.actorHeaders(), responseType: 'blob' }
    );
  }

  private actorHeaders(): HttpHeaders {
    const role = this.resolveBackendRole();
    const userId = this.safeStorageGet('app.currentUserId') || this.safeStorageGet('userId') || 'dev-investor';
    return new HttpHeaders({
      'X-User-Id': userId,
      'X-User-Role': role,
    });
  }

  private resolveBackendRole(): 'INVESTOR' | 'STARTUP' | 'ADMIN' {
    const rawRole = this.safeStorageGet('app.currentUserRole') || this.safeStorageGet('role') || 'INVESTOR';
    for (const candidate of rawRole.split(',')) {
      const normalized = candidate.trim().replace(/^ROLE_/, '').toUpperCase();
      if (normalized === 'ADMIN') return 'ADMIN';
      if (normalized === 'ENTREPRENEUR' || normalized === 'STARTUP') return 'STARTUP';
      if (normalized === 'INVESTOR') return 'INVESTOR';
    }
    return 'INVESTOR';
  }

  private safeStorageGet(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  }
}
