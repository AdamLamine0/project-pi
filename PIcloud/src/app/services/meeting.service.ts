import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

export interface MeetingRequest {
  requesterName: string;
  subject: string;
  suggestedDateTime: string;
  durationMinutes: number;
  note?: string;
}

export interface MeetingResponse {
  partenaireId: number;
  partenaireEmail: string;
  partenaireContactName: string;
  suggestedDateTime: string;
  zoomMeetingId: string;
  zoomJoinUrl: string;
  zoomStartUrl: string;
  zoomPassword: string;
  status: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class MeetingService {
  private baseUrl = 'http://localhost:8091/api/meeting-invitations';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private headers(): HttpHeaders {
    let headers = new HttpHeaders();

    const role = (this.auth.getRole() || '').trim();
    if (role) {
      const roleHeader = role.startsWith('ROLE_') ? role : `ROLE_${role}`;
      headers = headers.set('X-User-Role', roleHeader);
    }

    const userId = this.auth.getUserId();
    if (Number.isFinite(userId) && userId > 0) {
      headers = headers.set('X-User-Id', String(userId));
    }

    return headers;
  }

 
  requestMeeting(partenaireId: number, request: MeetingRequest): Promise<MeetingResponse> {
    return firstValueFrom(
      this.http.post<MeetingResponse>(
        `${this.baseUrl}/partenaire/${partenaireId}`,
        request,
        { headers: this.headers() }
      )
    );
  }
}
