import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Speaker, SpeakerRequest } from '../models/speaker';

@Injectable({ providedIn: 'root' })
export class SpeakerService {

  private api = 'http://localhost:8090/api';

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
}