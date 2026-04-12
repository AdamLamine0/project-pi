import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventProgram, EventProgramRequest } from '../models/program';

@Injectable({ providedIn: 'root' })
export class ProgramService {

  private api = 'http://localhost:8091/api/events';

  constructor(private http: HttpClient) {}

  getByEvent(eventId: number): Observable<EventProgram[]> {
    return this.http.get<EventProgram[]>(`${this.api}/${eventId}/program`);
  }

  create(eventId: number, request: EventProgramRequest): Observable<EventProgram> {
    return this.http.post<EventProgram>(`${this.api}/${eventId}/program`, request);
  }

  update(eventId: number, slotId: number, request: EventProgramRequest): Observable<EventProgram> {
    return this.http.put<EventProgram>(`${this.api}/${eventId}/program/${slotId}`, request);
  }

  delete(eventId: number, slotId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${eventId}/program/${slotId}`);
  }
}