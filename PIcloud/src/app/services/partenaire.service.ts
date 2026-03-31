import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { OrganisationPartenaire,OrganisationPartenaireRequest,ContactInfoRequest,StatutPartenaire } from '../models/partenaire';

@Injectable({ providedIn: 'root' })
export class PartenaireService {

  private apiUrl = 'http://localhost:8090/api/organisations';

  constructor(private http: HttpClient) {}

  // ── ANY AUTHENTICATED USER ──────────────────────────────────────

  getAll(): Promise<OrganisationPartenaire[]> {
    return firstValueFrom(this.http.get<OrganisationPartenaire[]>(this.apiUrl));
  }

 async getById(id: number): Promise<OrganisationPartenaire> {
  return firstValueFrom(
    this.http.get<OrganisationPartenaire>(`${this.apiUrl}/${id}`)
  );
}

  getByStatut(statut: StatutPartenaire): Promise<OrganisationPartenaire[]> {
    return firstValueFrom(
      this.http.get<OrganisationPartenaire[]>(`${this.apiUrl}/statut/${statut}`)
    );
  }

  // ── PARTNER: own dashboard ──────────────────────────────────────

  // GET /api/organisations/my-dashboard
  // Gateway injects X-User-Id and X-User-Role from the JWT automatically
  getMyDashboard(): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.get<OrganisationPartenaire>(`${this.apiUrl}/my-dashboard`)
    );
  }

  // PUT /api/organisations/{id}/contact
  updateContactInfo(id: number, request: ContactInfoRequest): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.put<OrganisationPartenaire>(`${this.apiUrl}/${id}/contact`, request)
    );
  }

  // ── ADMIN only ──────────────────────────────────────────────────

  // POST /api/organisations
  create(request: OrganisationPartenaireRequest): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.post<OrganisationPartenaire>(this.apiUrl, request)
    );
  }

  // PUT /api/organisations/{id}
  update(id: number, request: OrganisationPartenaireRequest): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.put<OrganisationPartenaire>(`${this.apiUrl}/${id}`, request)
    );
  }

  // PATCH /api/organisations/{id}/statut?statut=ACTIF
  updateStatut(id: number, statut: StatutPartenaire): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.patch<OrganisationPartenaire>(
        `${this.apiUrl}/${id}/statut`,
        null,
        { params: { statut } }
      )
    );
  }

  // PUT /api/organisations/{id}/assign-user/{userId}
  assignUser(orgId: number, userId: number): Promise<OrganisationPartenaire> {
    return firstValueFrom(
      this.http.put<OrganisationPartenaire>(
        `${this.apiUrl}/${orgId}/assign-user/${userId}`,
        null
      )
    );
  }

  // DELETE /api/organisations/{id}
  delete(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${id}`)
    );
  }
}