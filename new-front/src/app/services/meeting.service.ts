import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

export interface MeetingRequest {
  requesterName: string;
  subject: string;
  suggestedDateTime: string;
  durationMinutes?: number;
  note?: string;
}

export interface MeetingResponse {
  id: number;
  partenaireId: number;
  senderUserId: number | null;
  targetUserId: number | null;
  senderRole: string;
  priority: string;
  /** PENDING | ACCEPTED | REJECTED | TIME_SUGGESTED */
  meetingStatus: string;
  subject: string;
  partenaireEmail: string;
  partenaireContactName: string;
  suggestedDateTime: string;
  /** Set when meetingStatus === 'TIME_SUGGESTED' */
  suggestedDateTimeByPartner: string | null;
  /** Rejection reason or partner note on suggested time */
  partnerComment: string | null;
  createdAt: string;
  respondedAt: string | null;
  // Zoom — only present after ACCEPTED
  zoomMeetingId: string;
  zoomJoinUrl: string;
  zoomStartUrl: string;
  zoomPassword: string;
  message: string;
}

export interface PartnerResponseRequest {
  /** ACCEPT | REJECT | SUGGEST_TIME */
  action: string;
  comment?: string;
  /** ISO datetime string — required for SUGGEST_TIME */
  suggestedDateTime?: string;
}

export interface UpdateMeetingTimeRequest {
  newSuggestedDateTime: string;
  note?: string;
}

@Injectable({ providedIn: 'root' })
export class MeetingService {
  private baseUrl = 'http://localhost:8082/api/meeting-invitations';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private headers(roleOverride?: string): HttpHeaders {
    const role = this.normalizeRole(roleOverride ?? this.auth.getRole());
    const userId = this.auth.getUserId();

    let headers = new HttpHeaders();
    if (role) {
      headers = headers.set('X-User-Role', role.startsWith('ROLE_') ? role : `ROLE_${role}`);
    }
    if (Number.isFinite(userId) && userId > 0) {
      headers = headers.set('X-User-Id', String(userId));
    }
    return headers;
  }

  private normalizeRole(role: string): string {
    const raw = (role || '').replace(/^ROLE_/, '').trim().toUpperCase();
    return raw === 'PARTENAIRE' ? 'PARTNER' : raw;
  }

  async getMyMeetings(): Promise<MeetingResponse[]> {
    const endpoint = `${this.baseUrl}/my-meetings`;
    const role = this.normalizeRole(this.auth.getRole());

    try {
      return await firstValueFrom(
        this.http.get<MeetingResponse[]>(endpoint, { headers: this.headers(role) })
      );
    } catch (error) {
      const e = error as HttpErrorResponse;
      const retryable = e.status >= 500 || e.status === 400 || e.status === 403;
      if (retryable && role === 'PARTNER') {
        return await firstValueFrom(
          this.http.get<MeetingResponse[]>(endpoint, { headers: this.headers('PARTENAIRE') })
        );
      }
      throw error;
    }
  }

  /** Fetch meetings waiting for the partner's response */
  getPendingMeetings(): Promise<MeetingResponse[]> {
    return firstValueFrom(
      this.http.get<MeetingResponse[]>(`${this.baseUrl}/pending`, { headers: this.headers() })
    );
  }

  /**
   * Send a new meeting request (status = PENDING, no Zoom yet).
   */
  requestMeeting(partenaireId: number, request: MeetingRequest): Promise<MeetingResponse> {
    return firstValueFrom(
      this.http.post<MeetingResponse>(
        `${this.baseUrl}/partenaire/${partenaireId}`,
        request,
        { headers: this.headers() }
      )
    );
  }

  /**
   * Partner responds: ACCEPT → creates Zoom; REJECT → gives reason; SUGGEST_TIME → proposes new time.
   */
  respondToMeeting(meetingId: number, response: PartnerResponseRequest): Promise<MeetingResponse> {
    return firstValueFrom(
      this.http.post<MeetingResponse>(
        `${this.baseUrl}/${meetingId}/respond`,
        response,
        { headers: this.headers() }
      )
    );
  }

  /**
   * Requester updates the date/time after TIME_SUGGESTED — puts meeting back to PENDING.
   */
  updateMeetingTime(meetingId: number, request: UpdateMeetingTimeRequest): Promise<MeetingResponse> {
    return firstValueFrom(
      this.http.post<MeetingResponse>(
        `${this.baseUrl}/${meetingId}/update-time`,
        request,
        { headers: this.headers() }
      )
    );
  }
}