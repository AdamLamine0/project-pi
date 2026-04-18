import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event, EventRequest, UpdateEventRequest, EventStatus, EventType } from '../models/event';

@Injectable({ providedIn: 'root' })
export class EventService {

  private api = 'http://localhost:8090/api/events';

  constructor(private http: HttpClient) {}

  getAll(filters?: { status?: EventStatus; type?: EventType; organizerId?: number }): Observable<Event[]> {
    let params = new HttpParams();
    if (filters?.status)      params = params.set('status', filters.status);
    if (filters?.type)        params = params.set('type', filters.type);
    if (filters?.organizerId) params = params.set('organizerId', String(filters.organizerId));
    return this.http.get<Event[]>(this.api, { params });
  }

  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.api}/${id}`);
  }

  create(event: EventRequest): Observable<Event> {
    return this.http.post<Event>(this.api, event);
  }

  update(id: number, event: UpdateEventRequest): Observable<Event> {
    return this.http.put<Event>(`${this.api}/${id}`, event);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.api}/upload-image`, formData);
  }
}