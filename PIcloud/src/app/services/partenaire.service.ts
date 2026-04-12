import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import {
  OrganisationPartenaire,
  OrganisationPartenaireRequest,
  ContactInfoRequest,
  StatutPartenaire
} from '../models/partenaire';

@Injectable({ providedIn: 'root' })
export class PartenaireService {

  private apiUrl = 'http://localhost:8091/api/organisations';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  // ── Headers ───────────────────────────────────────────────────────────────

  private headers(): HttpHeaders {
    return new HttpHeaders({
      'X-User-Role': `ROLE_${this.auth.getRole()}`,
      'X-User-Id':   String(this.auth.getUserId())
    });
  }

  // ── Public endpoints ──────────────────────────────────────────────────────

  getAll(): Promise<OrganisationPartenaire[]> {
    return firstValueFrom(
      this.http.get<OrganisationPartenaire[]>(this.apiUrl, { headers: this.headers() })
    );
  }

  getById(id: number): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.get<OrganisationPartenaire>(`${this.apiUrl}/${id}`, { headers: this.headers() })
    );
  }

  getByStatut(statut: StatutPartenaire): Promise<OrganisationPartenaire[]> {
    return firstValueFrom(
      this.http.get<OrganisationPartenaire[]>(`${this.apiUrl}/statut/${statut}`, { headers: this.headers() })
    );
  }

  // ── PARTNER: find own organisation by scanning all orgs ──────────────────
  // We match by userId because /my-dashboard is not reliable.
  // GET /api/organisations has no role restriction — always works.

  async getMyDashboard(): Promise<OrganisationPartenaire> {
    const myUserId = Number(this.auth.getUserId());
    const all = await this.getAll();
    const mine = all.find(o => Number(o.userId) === myUserId);
    if (!mine) {
      throw new Error('Aucune organisation trouvée pour votre compte. Contactez un administrateur.');
    }
    return mine;
  }

  // ── PARTNER: update contact info ──────────────────────────────────────────

  updateContactInfo(id: number, request: ContactInfoRequest): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.put<OrganisationPartenaire>(
        `${this.apiUrl}/${id}/contact`, request, { headers: this.headers() }
      )
    );
  }

  // ── ADMIN endpoints ───────────────────────────────────────────────────────

  create(request: OrganisationPartenaireRequest): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.post<OrganisationPartenaire>(this.apiUrl, request, { headers: this.headers() })
    );
  }

  update(id: number, request: OrganisationPartenaireRequest): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.put<OrganisationPartenaire>(`${this.apiUrl}/${id}`, request, { headers: this.headers() })
    );
  }

  updateStatut(id: number, statut: StatutPartenaire): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.patch<OrganisationPartenaire>(
        `${this.apiUrl}/${id}/statut`,
        null,
        { params: { statut }, headers: this.headers() }
      )
    );
  }

  assignUser(orgId: number, userId: number): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.put<OrganisationPartenaire>(
        `${this.apiUrl}/${orgId}/assign-user/${userId}`, null, { headers: this.headers() }
      )
    );
  }

  delete(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers() })
    );
  }
}