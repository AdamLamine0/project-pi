import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({ providedIn: 'root' })
export class TicketService {

  private api = 'http://localhost:8091/api';

  constructor(private http: HttpClient) {}

  /** Get ticket info for the authenticated user for a given event */
  getMyTicket(eventId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.api}/events/${eventId}/my-ticket`);
  }

  /** Download the PDF ticket for the authenticated user */
  downloadTicketPdf(eventId: number): Observable<Blob> {
    return this.http.get(`${this.api}/events/${eventId}/my-ticket/download`, {
      responseType: 'blob'
    });
  }

  /** Trigger mock payment for a ticket (sets paymentStatus → PAID) */
  payForTicket(eventId: number): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.api}/events/${eventId}/pay`, {});
  }

  /** Verify a ticket by its unique number (public — for QR scan) */
  verifyTicket(ticketNumber: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.api}/tickets/${ticketNumber}/verify`);
  }

  /** Check in a participant by ticket number (organizer action) */
  checkInByTicket(ticketNumber: string): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.api}/tickets/${ticketNumber}/checkin`, {});
  }
}
