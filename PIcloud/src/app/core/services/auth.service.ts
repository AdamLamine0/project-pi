import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, Role } from '../models/user.model';

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

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/register`, request)
    );
    this.saveToken(response.token);
    return response;
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
    );
    this.saveToken(response.token);
    return response;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
    }
    this.router.navigate(['/auth/login']);
  }

  saveToken(token: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem('token', token);
    const payload = this.decodeToken(token);
    if (payload) {
      localStorage.setItem('userId', String(payload.userId));
      // Strip ROLE_ prefix so getRole() returns 'ADMIN' not 'ROLE_ADMIN'
      const rawRole: string = payload.role || '';
      const role = rawRole.startsWith('ROLE_') ? rawRole.slice(5) : rawRole;
      localStorage.setItem('role', role);
      localStorage.setItem('email', payload.sub);
    }
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

  getRole(): string {
    if (!this.isBrowser) return '';
    return localStorage.getItem('role') || '';
  }

  getUserId(): number {
    if (!this.isBrowser) return 0;
    return Number(localStorage.getItem('userId'));
  }

  isAdmin(): boolean {
    return this.getRole() === Role.ADMIN;
  }

  isUser(): boolean {
    return this.getRole() === Role.USER;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}