import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate, VerificationResponse } from '../models/certificate';

@Injectable({ providedIn: 'root' })
export class CertificateService {

  private api = 'http://localhost:8090/api/certificates';

  constructor(private http: HttpClient) {}

  getMyCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(`${this.api}/me`);
  }

  downloadCertificate(id: number): Observable<Blob> {
    return this.http.get(`${this.api}/${id}/download`, {
      responseType: 'blob'
    });
  }

  verify(token: string): Observable<VerificationResponse> {
    return this.http.get<VerificationResponse>(
      `http://localhost:8090/api/verify/${token}`
    );
  }
}