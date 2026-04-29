import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

export interface ZoomSignatureRequest {
  meetingNumber: string;
  role: number; // 0 = participant, 1 = host
}

export interface ZoomSignatureResponse {
  signature: string;
  sdkKey: string;
}

@Injectable({ providedIn: 'root' })
export class ZoomService {
  private baseUrl = 'http://localhost:8090/api/zoom';

  // Fallback SDK key if not provided by backend
  private readonly SDK_KEY = 'YOUR_ZOOM_SDK_KEY_HERE';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private headers(): HttpHeaders {
    const role = this.auth.getRole();
    const roleHeader = role?.startsWith('ROLE_') ? role : `ROLE_${role}`;

    return new HttpHeaders({
      'X-User-Role': roleHeader,
      'X-User-Id': String(this.auth.getUserId() ?? '')
    });
  }

  /**
   * Get a JWT signature to join a Zoom meeting
   * @param meetingNumber The Zoom meeting number
   * @param role 0 for participant, 1 for host
   */
  getSignature(meetingNumber: string, role: number = 0): Promise<ZoomSignatureResponse> {
    const request: ZoomSignatureRequest = {
      meetingNumber,
      role
    };

    return firstValueFrom(
      this.http.post<ZoomSignatureResponse>(
        `${this.baseUrl}/signature`,
        request,
        { headers: this.headers() }
      )
    );
  }

  /**
   * Get the Zoom SDK key
   * @returns SDK key for Zoom initialization
   */
  getSdkKey(): string {
    return this.SDK_KEY;
  }
}

