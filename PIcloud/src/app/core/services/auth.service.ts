import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthResponse, LoginRequest, RegisterRequest, Role } from '../models/user.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly isBrowser: boolean;
  private readonly apiUrl = 'http://localhost:8090/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // ===============================
  // AUTH ENDPOINTS
  // ===============================

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.saveUserData(response))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => this.saveUserData(response))
    );
  }

  logout(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.router.navigate(['/auth/login']);
  }

  // ===============================
  // SAVE SESSION
  // ===============================

  public saveUserData(response: AuthResponse): void {
    if (!this.isBrowser) return;

    localStorage.setItem('token', response.token);

    // Save userId
    if (response.id != null) {
      localStorage.setItem('userId', String(response.id));
    }

    // Save email
    if (response.email) {
      localStorage.setItem('email', response.email);
    }

    // Normalise role (handles ROLE_ENTREPRENEUR -> ENTREPRENEUR)
    if (response.role) {
      const raw = String(response.role);
      const normalized = raw.startsWith('ROLE_') ? raw.substring(5) : raw;
      localStorage.setItem('role', normalized);
    }

    // Fallback: parse from JWT if fields were missing
    if (response.id == null || !response.role) {
      const payload = this.decodeToken(response.token);
      if (payload) {
        if (response.id == null) {
          localStorage.setItem('userId', String(payload.userId || 0));
        }
        if (!response.role) {
          const rawRole: string = payload.role || '';
          const normalized = rawRole.startsWith('ROLE_') ? rawRole.substring(5) : rawRole;
          localStorage.setItem('role', normalized);
        }
        if (!response.email) {
          localStorage.setItem('email', payload.sub || '');
        }
      }
    }
  }

  // Garde pour compatibilité avec le code existant
  public saveToken(token: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem('token', token);

    const payload = this.decodeToken(token);
    if (!payload) return;

    localStorage.setItem('userId', String(payload.userId || 0));

    const rawRole: string = payload.role || '';
    const normalized = rawRole.startsWith('ROLE_') ? rawRole.substring(5) : rawRole;
    localStorage.setItem('role', normalized);
    localStorage.setItem('email', payload.sub || '');
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = this.decodeToken(token);
    if (!payload) return false;
    return Date.now() < payload.exp * 1000;
  }

  // ===============================
  // USER INFO
  // ===============================

  getUserId(): number {
    if (!this.isBrowser) return 0;
    return Number(localStorage.getItem('userId'));
  }

  getRole(): string {
    if (!this.isBrowser) return '';
    return localStorage.getItem('role') || '';
  }

  getEmail(): string {
    if (!this.isBrowser) return '';
    return localStorage.getItem('email') || '';
  }

  // ===============================
  // ROLE HELPERS – aligned with Role enum
  // ===============================

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'USER';
  }

  isMentor(): boolean {
    return this.getRole() === 'MENTOR';
  }

  isInvestor(): boolean {
    return this.getRole() === 'INVESTOR';
  }

  // alias for legacy code
  isInvestisseur(): boolean {
    return this.isInvestor();
  }

  isPartner(): boolean {
    return this.getRole() === 'PARTNER';
  }

  // alias for legacy code that uses PARTENAIRE
  isPartenaire(): boolean {
    return this.isPartner();
  }

  isEntrepreneur(): boolean {
    return this.getRole() === 'ENTREPRENEUR';
  }

  isExpert(): boolean {
    return this.getRole() === 'EXPERT';
  }

  // alias for legacy code
  isEtudiant(): boolean {
    return this.getRole() === 'USER';
  }

  // Can access the legal module (entrepreneur or expert)
  hasLegalAccess(): boolean {
    return this.isEntrepreneur() || this.isExpert() || this.isAdmin();
  }

  // ===============================
  // JWT decode
  // ===============================

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}