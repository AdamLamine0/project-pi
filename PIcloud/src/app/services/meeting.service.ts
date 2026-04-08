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
  private baseUrl = 'http://localhost:8090/api/meeting-invitations';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private headers(): HttpHeaders {
  const role = this.auth.getRole(); // returns e.g. "ROLE_USER" or "USER"
  
  // Avoid double-prefixing: only add ROLE_ if not already there
  const roleHeader = role?.startsWith('ROLE_') ? role : `ROLE_${role}`;
  
  return new HttpHeaders({
    'X-User-Role': roleHeader,
    'X-User-Id': String(this.auth.getUserId() ?? '')
  });
}

  /**
   * Request a Zoom meeting with a partner
   * @param partenaireId ID of the partner organization
   * @param request Meeting request details
   */
  requestMeeting(partenaireId: number, request: MeetingRequest): Promise<MeetingResponse> {
  return firstValueFrom(
    this.http.post<MeetingResponse>(
      `${this.baseUrl}/partenaire/${partenaireId}`,
      request
      // No custom headers — gateway adds X-User-Role and X-User-Id from JWT
    )
  );
}
}
