import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Badge } from '../models/badge';

@Injectable({ providedIn: 'root' })
export class BadgeService {

  private api = 'http://localhost:8090/api/badges';

  constructor(private http: HttpClient) {}

  getMyBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.api}/me`);
  }

  getUserBadges(userId: number): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.api}/user/${userId}`);
  }

  getBadgeImageUrl(badgeId: number): string {
    return `http://localhost:8090/api/badges/${badgeId}/image`;
  }
}