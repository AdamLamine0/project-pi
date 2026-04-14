import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserRole = 'ADMIN' | 'MANAGER' | 'MEMBER' | 'INVESTOR';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ROLE_KEY = 'PI_CURRENT_ROLE';
  
  private roleSubject = new BehaviorSubject<UserRole>(this.getStoredRole());
  currentRole$ = this.roleSubject.asObservable();

  get currentRole(): UserRole {
    return this.roleSubject.value;
  }

  setRole(role: UserRole): void {
    localStorage.setItem(this.ROLE_KEY, role);
    this.roleSubject.next(role);
  }

  // Permissions helpers
  canCreateProject(): boolean {
    return ['ADMIN', 'MANAGER'].includes(this.currentRole);
  }

  canDeleteProject(): boolean {
    return ['ADMIN'].includes(this.currentRole);
  }

  canViewAiScore(): boolean {
    return ['ADMIN', 'MANAGER', 'INVESTOR'].includes(this.currentRole);
  }

  getUserId(): string {
    // Return a mock user ID based on role
    return `${this.currentRole.toLowerCase()}-user`;
  }

  private getStoredRole(): UserRole {
    return (localStorage.getItem(this.ROLE_KEY) as UserRole) || 'MANAGER';
  }
}
