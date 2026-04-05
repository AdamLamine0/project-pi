import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import {
  ConventionRequest,
  ConventionResponse,
  ObjectifRequest,
  ObjectifResponse,
  StatutConvention,
  StatutObjectif
} from '../models/convention';

@Injectable({ providedIn: 'root' })
export class ConventionService {

  private base    = 'http://localhost:8090/api/conventions';
  private objBase = 'http://localhost:8090/api/objectifs';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  // ── Headers ───────────────────────────────────────────────────────────────
  // Backend checks exact strings: "ROLE_USER", "ROLE_PARTNER", "ROLE_ADMIN"
  // These MUST be sent on every request or the backend throws 500/403.

  private headers(): HttpHeaders {
    return new HttpHeaders({
      'X-User-Role': `ROLE_${this.auth.getRole()}`,
      'X-User-Id':   String(this.auth.getUserId())
    });
  }

  // ── Conventions ───────────────────────────────────────────────────────────

  getAll(): Promise<ConventionResponse[]> {
    return firstValueFrom(
      this.http.get<ConventionResponse[]>(this.base, { headers: this.headers() })
    );
  }

  getById(id: number): Promise<ConventionResponse> {
    return firstValueFrom(
      this.http.get<ConventionResponse>(`${this.base}/${id}`, { headers: this.headers() })
    );
  }

  getByUser(userId: number): Promise<ConventionResponse[]> {
    return firstValueFrom(
      this.http.get<ConventionResponse[]>(`${this.base}/user/${userId}`, { headers: this.headers() })
    );
  }

  getByOrganisation(orgId: number): Promise<ConventionResponse[]> {
    return firstValueFrom(
      this.http.get<ConventionResponse[]>(`${this.base}/organisation/${orgId}`, { headers: this.headers() })
    );
  }

  create(req: ConventionRequest): Promise<ConventionResponse> {
    return firstValueFrom(
      this.http.post<ConventionResponse>(this.base, req, { headers: this.headers() })
    );
  }

  update(id: number, req: ConventionRequest): Promise<ConventionResponse> {
    return firstValueFrom(
      this.http.put<ConventionResponse>(`${this.base}/${id}`, req, { headers: this.headers() })
    );
  }

  updateStatut(id: number, statut: StatutConvention): Promise<ConventionResponse> {
    return firstValueFrom(
      this.http.patch<ConventionResponse>(
        `${this.base}/${id}/statut?statut=${statut}`, {}, { headers: this.headers() }
      )
    );
  }

  delete(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.base}/${id}`, { headers: this.headers() })
    );
  }

  // ── Confirm ───────────────────────────────────────────────────────────────

  confirmer(id: number, signature?: string): Promise<ConventionResponse> {
  return firstValueFrom(
    this.http.post<ConventionResponse>(
      `${this.base}/${id}/confirmer`,
      signature ? { signature } : {},
      { headers: this.headers() }
    )
  );
  }
  
  annuler(id: number): Promise<ConventionResponse> {
  return firstValueFrom(
    this.http.post<ConventionResponse>(
      `${this.base}/${id}/annuler`, {}, { headers: this.headers() }
    )
  );
}


  // ── Renewal ───────────────────────────────────────────────────────────────

  demanderRenouvellement(id: number): Promise<ConventionResponse> {
    return firstValueFrom(
      this.http.patch<ConventionResponse>(
        `${this.base}/${id}/renouvellement/demander`, {}, { headers: this.headers() }
      )
    );
  }

  accepterRenouvellement(id: number, newTerms: ConventionRequest): Promise<ConventionResponse> {
    return firstValueFrom(
      this.http.post<ConventionResponse>(
        `${this.base}/${id}/renouvellement/accepter`, newTerms, { headers: this.headers() }
      )
    );
  }

  // ── Objectifs ─────────────────────────────────────────────────────────────

  getObjectifs(conventionId: number): Promise<ObjectifResponse[]> {
    return firstValueFrom(
      this.http.get<ObjectifResponse[]>(`${this.objBase}/convention/${conventionId}`, { headers: this.headers() })
    );
  }

  createObjectif(req: ObjectifRequest): Promise<ObjectifResponse> {
    return firstValueFrom(
      this.http.post<ObjectifResponse>(this.objBase, req, { headers: this.headers() })
    );
  }

  updateObjectif(id: number, req: ObjectifRequest): Promise<ObjectifResponse> {
    return firstValueFrom(
      this.http.put<ObjectifResponse>(`${this.objBase}/${id}`, req, { headers: this.headers() })
    );
  }

  updateObjectifStatut(id: number, statut: StatutObjectif, commentaire?: string): Promise<ObjectifResponse> {
    let url = `${this.objBase}/${id}/statut?statut=${statut}`;
    if (commentaire) url += `&commentaire=${encodeURIComponent(commentaire)}`;
    return firstValueFrom(
      this.http.patch<ObjectifResponse>(url, {}, { headers: this.headers() })
    );
  }

  deleteObjectif(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.objBase}/${id}`, { headers: this.headers() })
    );
  }
  downloadConventionPdf(id: number): void {
  this.http.get(`${this.base}/${id}/pdf`, {
    headers: this.headers(), // ← utilise les mêmes headers que tous les autres appels
    responseType: 'blob'
  }).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `convention-${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    error: (err) => console.error('Erreur téléchargement PDF', err)
  });
}
}