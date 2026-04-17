import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8090/api/auth';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // ===============================
  // AUTH
  // ===============================

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/register`, request)
    );
     console.log('Register response:', response);
    this.saveSession(response);
    console.log('Stored role:', localStorage.getItem('role')); // ← vérifie le stockage
    return response;
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
    );
    this.saveSession(response);
    return response;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
    this.router.navigate(['/auth/login']);
  }

  // ===============================
  // SESSION STORAGE
  // ===============================
private saveSession(response: AuthResponse): void {
  if (!this.isBrowser) return;

  localStorage.setItem('token', response.token);

  // ✅ Utilise != null au lieu de if (response.id) car 0 est falsy
  if (response.id != null) localStorage.setItem('userId', String(response.id));
  if (response.email)      localStorage.setItem('email', response.email);

  // ✅ Normalise le rôle (sécurité si backend envoie ROLE_ENTREPRENEUR)
  if (response.role) {
    const raw = String(response.role);
    const normalized = raw.startsWith('ROLE_') ? raw.substring(5) : raw;
    localStorage.setItem('role', normalized);
  }

  // Fallback JWT uniquement si vraiment rien reçu
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
  // ROLE HELPERS — alignés sur Role enum backend
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

  isPartner(): boolean {
    return this.getRole() === 'PARTNER';
  }

  // Rôles du module legal
  isEntrepreneur(): boolean {
    return this.getRole() === 'ENTREPRENEUR';
  }

  isExpert(): boolean {
    return this.getRole() === 'EXPERT';
  }

  // Peut accéder au module legal (entrepreneur ou expert)
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