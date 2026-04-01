import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  Opportunity, CreateOpportunityDTO,
  OpportunityApplication, ApplyDTO
} from '../../shared/models/opportunity.model';
import { Page } from '../../shared/models/page.model';

@Injectable({ providedIn: 'root' })
export class MarketplaceService {

  private apiUrl = `${environment.apiUrl}/marketplace`;

  constructor(private http: HttpClient) {}

  // ── Opportunities ──────────────────────────────

  createOpportunity(dto: CreateOpportunityDTO): Observable<Opportunity> {
    return this.http.post<Opportunity>(this.apiUrl, dto);
  }

  getAllOpportunities(page = 0, size = 10): Observable<Page<Opportunity>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Opportunity>>(this.apiUrl, { params });
  }

  getBySector(sector: string): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(`${this.apiUrl}/sector/${sector}`);
  }

  getByType(type: string): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(`${this.apiUrl}/type/${type}`);
  }

  getMyOpportunities(publisherId: string): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(`${this.apiUrl}/my/${publisherId}`);
  }

  updateStatus(id: string, status: string): Observable<Opportunity> {
    return this.http.put<Opportunity>(
      `${this.apiUrl}/${id}/status`, {},
      { params: { status } }
    );
  }

  deleteOpportunity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ── Applications ───────────────────────────────

  apply(opportunityId: string, dto: ApplyDTO): Observable<OpportunityApplication> {
    return this.http.post<OpportunityApplication>(
      `${this.apiUrl}/${opportunityId}/apply`, dto
    );
  }

  getMyApplications(candidateId: string): Observable<OpportunityApplication[]> {
    return this.http.get<OpportunityApplication[]>(
      `${this.apiUrl}/applications/candidate/${candidateId}`
    );
  }

  getApplicationsForOpportunity(opportunityId: string): Observable<OpportunityApplication[]> {
    return this.http.get<OpportunityApplication[]>(
      `${this.apiUrl}/${opportunityId}/applications`
    );
  }

  updateApplicationStatus(applicationId: string, status: string): Observable<OpportunityApplication> {
    return this.http.put<OpportunityApplication>(
      `${this.apiUrl}/applications/${applicationId}/status`, {},
      { params: { status } }
    );
  }

  withdrawApplication(applicationId: string): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/applications/${applicationId}/withdraw`, {}
    );
  }
}