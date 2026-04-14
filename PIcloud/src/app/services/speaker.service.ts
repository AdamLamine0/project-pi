import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Speaker, SpeakerCandidate, SpeakerRequest } from '../models/speaker';

@Injectable({ providedIn: 'root' })
export class SpeakerService {

  private api = 'http://localhost:8091/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Speaker[]> {
    return this.http.get<Speaker[]>(`${this.api}/speakers`);
  }

  getById(id: number): Observable<Speaker> {
    return this.http.get<Speaker>(`${this.api}/speakers/${id}`);
  }

  getByEvent(eventId: number): Observable<Speaker[]> {
    return this.http.get<Speaker[]>(`${this.api}/events/${eventId}/speakers`);
  }

  create(request: SpeakerRequest): Observable<Speaker> {
    return this.http.post<Speaker>(`${this.api}/speakers`, request);
  }

  update(id: number, request: SpeakerRequest): Observable<Speaker> {
    return this.http.put<Speaker>(`${this.api}/speakers/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/speakers/${id}`);
  }

  linkToEvent(eventId: number, speakerId: number): Observable<Speaker> {
    return this.http.post<Speaker>(
      `${this.api}/events/${eventId}/speakers/${speakerId}`, {}
    );
  }

  unlinkFromEvent(eventId: number, speakerId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.api}/events/${eventId}/speakers/${speakerId}`
    );
  }

  uploadPhoto(speakerId: number, file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(
      `${this.api}/speakers/${speakerId}/upload-photo`, formData
    );
  }

  // ── LinkedIn import (API key stays on the backend) ──────────────────────

  /**
   * Asks the backend to search LinkedIn for profiles matching the keywords.
   * The RapidAPI key is never sent from the browser — all auth happens
   * server-side in LinkedInImportService.
   */
  searchLinkedIn(keywords: string): Observable<SpeakerCandidate[]> {
    return this.http.get<SpeakerCandidate[]>(`${this.api}/speakers/search`, {
      params: { keywords }
    });
  }

  /**
   * Saves a LinkedIn candidate as a Speaker, or returns the existing Speaker
   * if the same LinkedIn URL is already in the database (deduplication).
   */
  importOne(candidate: SpeakerCandidate): Observable<Speaker> {
    return this.http.post<Speaker>(`${this.api}/speakers/import-one`, candidate);
  }
}
