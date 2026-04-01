import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { MemberConnection } from '../../../shared/models/connection.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connection-list',
  template: `
    <div class="network-container animate-fade-in-up">

      <!-- Header -->
      <div class="header-section glass-panel">
        <div>
          <h1 class="page-title">Mon Réseau</h1>
          <p class="page-subtitle">Gérez vos connexions et développez votre réseau professionnel.</p>
        </div>
        <div class="header-actions">
          <button mat-button class="pending-btn hover-lift" routerLink="/community/network/pending">
            <mat-icon>notifications_active</mat-icon>
            Demandes
            <span class="badge-count" *ngIf="pendingCount > 0">{{ pendingCount }}</span>
          </button>
        </div>
      </div>

      <!-- Search -->
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Rechercher une connexion...</mat-label>
        <input matInput [(ngModel)]="searchTerm" (input)="filterConnections()" />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <!-- Stats Bar -->
      <div class="stats-bar" *ngIf="connections.length > 0">
        <div class="stat-item">
          <mat-icon>people</mat-icon>
          <span>{{ connections.length }} connexion{{ connections.length > 1 ? 's' : '' }}</span>
        </div>
      </div>

      <!-- Connections Grid -->
      <div class="connections-grid">
        <app-member-card
          *ngFor="let conn of filteredConnections; let i = index"
          class="animate-fade-in-up"
          [style.animation-delay.ms]="i * 60"
          [connection]="conn"
          [currentUserId]="currentUserId"
          (blockClicked)="blockMember($event)"
          (messageClicked)="messageMember($event)">
        </app-member-card>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredConnections.length === 0 && !loading" class="empty-state glass-panel animate-scale-in">
        <div class="empty-icon-wrapper">
          <mat-icon class="empty-icon">group_add</mat-icon>
        </div>
        <h3>Aucune connexion trouvée</h3>
        <p>{{ searchTerm ? 'Aucun résultat pour votre recherche.' : 'Explorez la communauté pour créer des liens !' }}</p>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="spinner-container">
        <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
      </div>
    </div>
  `,
  styles: [`
    .network-container { max-width: 1100px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }

    .header-section {
      display: flex; justify-content: space-between; align-items: center;
      padding: 28px 32px; border-radius: 20px; margin-bottom: 28px;
      background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%);
      border: none;
    }
    .page-title { margin: 0; font-size: 28px; font-weight: 800; color: var(--co-secondary); letter-spacing: -0.5px; }
    .page-subtitle { margin: 6px 0 0; color: var(--co-text-muted); font-size: 14px; }

    .header-actions { display: flex; gap: 12px; }
    .pending-btn {
      border-radius: 24px; font-weight: 600; padding: 0 20px;
      background: white; box-shadow: var(--shadow-sm);
      color: var(--co-text-main); position: relative; height: 40px;
    }
    .badge-count {
      background: var(--co-danger); color: white; border-radius: 12px;
      padding: 2px 8px; font-size: 11px; font-weight: 700;
      margin-left: 8px; box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
    }

    .search-field { width: 100%; margin-bottom: 8px; }
    ::ng-deep .search-field .mdc-text-field--outlined { border-radius: 14px; background: white; }

    .stats-bar {
      display: flex; gap: 20px; margin-bottom: 24px; padding: 0 4px;
    }
    .stat-item {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; font-weight: 600; color: var(--co-text-muted);
    }
    .stat-item mat-icon { font-size: 18px; width: 18px; height: 18px; color: var(--co-primary); }

    .connections-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;
    }

    .empty-state {
      text-align: center; padding: 60px 40px; border-radius: 20px;
      background: white; margin-top: 24px;
    }
    .empty-icon-wrapper {
      width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px;
      background: linear-gradient(135deg, var(--co-primary-light), #C7D2FE);
      display: flex; justify-content: center; align-items: center;
    }
    .empty-icon { font-size: 40px; width: 40px; height: 40px; color: var(--co-primary); }
    .empty-state h3 { font-size: 20px; font-weight: 700; color: var(--co-secondary); margin: 0 0 8px; }
    .empty-state p { color: var(--co-text-muted); font-size: 14px; margin: 0; }

    .spinner-container { display: flex; justify-content: center; padding: 60px; }

    @media (max-width: 768px) {
      .header-section { flex-direction: column; align-items: flex-start; gap: 16px; }
      .connections-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ConnectionListComponent implements OnInit {

  connections: MemberConnection[] = [];
  filteredConnections: MemberConnection[] = [];
  pendingCount = 0;
  currentUserId = '';
  searchTerm = '';
  loading = false;

  constructor(
    private connectionService: ConnectionService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getUserId()?.toString() || '';
    this.loading = true;
    this.loadConnections();
    this.loadPendingCount();
  }

  loadConnections() {
    this.connectionService.getMyConnections(this.currentUserId).subscribe({
      next: conns => {
        this.connections = conns;
        this.filteredConnections = conns;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement des connexions', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  loadPendingCount() {
    this.connectionService.getPendingRequests(this.currentUserId).subscribe(
      pending => this.pendingCount = pending.length
    );
  }

  filterConnections() {
    if (!this.searchTerm.trim()) {
      this.filteredConnections = this.connections;
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredConnections = this.connections.filter(c => {
      const otherId = c.requesterId === this.currentUserId ? c.targetId : c.requesterId;
      return otherId.toLowerCase().includes(term);
    });
  }

  blockMember(connectionId: string) {
    this.connectionService.blockMember(connectionId).subscribe({
      next: () => {
        this.connections = this.connections.filter(c => c.id !== connectionId);
        this.filterConnections();
        this.snackBar.open('Membre bloqué avec succès', 'OK', {
          duration: 3000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors du blocage', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  messageMember(userId: string) {
    // Navigate to private messaging
  }
}