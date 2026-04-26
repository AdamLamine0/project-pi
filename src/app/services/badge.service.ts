import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Badge } from '../models/badge';
import { EVENT_API_BASE } from '../core/config/api.config';

@Injectable({ providedIn: 'root' })
export class BadgeService {
  private readonly api = `${EVENT_API_BASE}/badges`;

  constructor(private readonly http: HttpClient) {}

  getMyBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.api}/me`);
  }

  getBadgeImageUrl(badgeId: number): string {
    return `${this.api}/${badgeId}/image`;
  }
}
