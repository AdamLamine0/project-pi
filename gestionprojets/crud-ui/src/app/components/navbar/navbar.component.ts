import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, UserRole } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="top-nav">
      <div class="container nav-container">
        <a routerLink="/dashboard" class="brand">
          <div class="logo">PI</div>
          <h1>Platform</h1>
        </a>

        <div class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active">Home</a>
          <a routerLink="/projects" routerLinkActive="active">Projects</a>
          <a routerLink="/services" routerLinkActive="active" *ngIf="isAdmin || isManager">Services</a>
        </div>

        <div class="user-controls">
          <div class="role-switcher">
            <label>View As:</label>
            <select [ngModel]="currentRole" (ngModelChange)="onRoleChange($event)" class="form-control role-select">
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="MEMBER">Team Member</option>
              <option value="INVESTOR">Investor</option>
            </select>
          </div>
          <div class="avatar">{{ currentRole.charAt(0) }}</div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .top-nav {
      background: white;
      border-bottom: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    .logo {
      width: 32px; height: 32px;
      background: var(--primary-color);
      color: white;
      border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .brand h1 {
      margin: 0;
      font-size: 1.25rem;
      color: var(--text-primary);
      font-weight: 700;
    }
    .nav-links {
      display: flex;
      gap: 24px;
      margin-left: 32px;
      flex: 1;
    }
    .nav-links a {
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.95rem;
      padding: 20px 0;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    .nav-links a:hover {
      color: var(--primary-color);
    }
    .nav-links a.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
    }
    .user-controls {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .role-switcher {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .role-switcher label {
      font-size: 0.8125rem;
      color: var(--text-secondary);
      font-weight: 600;
    }
    .role-select {
      width: 130px;
      padding: 6px 12px;
      font-size: 0.875rem;
    }
    .avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      display: flex; align-items: center; justify-content: center;
      font-weight: 700;
      color: var(--secondary-color);
    }
  `]
})
export class NavbarComponent {
  currentRole: UserRole = 'MANAGER';

  constructor(public authService: AuthService) {
    this.authService.currentRole$.subscribe(role => this.currentRole = role);
  }

  get isAdmin() { return this.currentRole === 'ADMIN'; }
  get isManager() { return this.currentRole === 'MANAGER'; }

  onRoleChange(role: string) {
    this.authService.setRole(role as UserRole);
  }
}
