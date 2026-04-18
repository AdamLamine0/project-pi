import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ConnectionService } from '../../services/connection.service';
import { MemberConnection } from '../../../shared/models/connection.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { UserProfileService, UserPublic } from '../../../../../core/services/user-profile.service';
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
          <button mat-button class="discover-btn hover-lift" routerLink="/community/network/discover">
            <mat-icon>people</mat-icon>
            Découvrir
          </button>
        </div>
      </div>

      <!-- Search -->
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Rechercher par nom, e-mail ou ID...</mat-label>
        <input matInput [(ngModel)]="searchTerm" (input)="applyFilters()" />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <!-- Send Request Section -->
      <div class="send-request-section glass-panel">
        <div class="send-header">
          <mat-icon class="send-icon">person_add</mat-icon>
          <div>
            <h3>Envoyer une demande de connexion</h3>
            <p>Choisissez un membre (données issues de la base utilisateurs)</p>
          </div>
        </div>
        <div class="send-form">
          <mat-form-field appearance="outline" class="target-field">
            <mat-label>Membre</mat-label>
            <mat-select [(ngModel)]="targetUserId" placeholder="Sélectionner...">
              <mat-option *ngFor="let u of communityMembers" [value]="'' + u.id">
                {{ formatUser(u) }}
              </mat-option>
            </mat-select>
            <mat-icon matPrefix>person_search</mat-icon>
          </mat-form-field>
          <mat-form-field appearance="outline" class="message-field">
            <mat-label>Message (optionnel)</mat-label>
            <input matInput [(ngModel)]="requestMessage" placeholder="Bonjour, j'aimerais me connecter..." />
            <mat-icon matPrefix>chat</mat-icon>
          </mat-form-field>
          <button mat-raised-button class="send-btn hover-lift"
            [disabled]="!targetUserId || sendingRequest"
            (click)="sendConnectionRequest()">
            <mat-icon *ngIf="!sendingRequest">send</mat-icon>
            <mat-progress-spinner *ngIf="sendingRequest" mode="indeterminate" diameter="20"></mat-progress-spinner>
            {{ sendingRequest ? 'Envoi...' : 'Envoyer' }}
          </button>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="stats-bar" *ngIf="connections.length > 0">
        <div class="stat-item">
          <mat-icon>people</mat-icon>
          <span>{{ filteredConnections.length }} connexion{{ filteredConnections.length > 1 ? 's' : '' }}</span>
        </div>
      </div>

      <h2 class="section-heading outside" *ngIf="connections.length > 0">Mes connexions</h2>

      <!-- Connections Grid -->
      <div class="connections-grid">
        <app-member-card
          *ngFor="let conn of filteredConnections; let i = index"
          class="animate-fade-in-up"
          [style.animation-delay.ms]="i * 60"
          [connection]="conn"
          [currentUserId]="currentUserId"
          [displayName]="displayNameForConnection(conn)"
          (blockClicked)="blockMember($event)"
          (messageClicked)="messageMember($event)">
        </app-member-card>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredConnections.length === 0 && !loading" class="empty-state glass-panel animate-scale-in">
        <div class="empty-icon-wrapper">
          <mat-icon class="empty-icon">group_add</mat-icon>
        </div>
        <h3>Aucune connexion</h3>
        <p>{{ searchTerm ? 'Aucun résultat pour votre recherche.' : 'Utilisez la barre de recherche en haut pour trouver des membres ou explorez Découvrir !' }}</p>
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
      .send-form { flex-direction: column; }
      .target-field, .message-field { width: 100%; }
    }

    /* Send Request Section */
    .send-request-section {
      padding: 24px; border-radius: 16px; margin-bottom: 28px;
      background: white; border: 1px dashed rgba(79, 70, 229, 0.2);
    }
    .send-header {
      display: flex; align-items: center; gap: 14px; margin-bottom: 20px;
    }
    .send-icon {
      font-size: 28px; width: 28px; height: 28px;
      color: var(--co-primary);
    }
    .send-header h3 { margin: 0; font-size: 16px; font-weight: 700; color: var(--co-secondary); }
    .send-header p { margin: 2px 0 0; font-size: 13px; color: var(--co-text-muted); }
    .send-form { display: flex; gap: 12px; align-items: flex-start; }
    .target-field { width: 180px; }
    .message-field { flex: 1; }
    ::ng-deep .target-field .mdc-text-field--outlined,
    ::ng-deep .message-field .mdc-text-field--outlined { border-radius: 12px; background: #F8FAFC; }
    .send-btn {
      border-radius: 14px; font-weight: 600; height: 56px; padding: 0 24px;
      background: var(--co-primary) !important; color: white;
      display: flex; align-items: center; gap: 8px;
    }
    .send-btn:disabled { opacity: 0.5; }

    .section-heading {
      font-size: 18px; font-weight: 800; color: var(--co-secondary);
      margin: 0 0 8px 0;
    }
    .section-heading.outside { margin-top: 28px; margin-bottom: 12px; padding: 0 4px; }
    .section-hint { font-size: 13px; color: var(--co-text-muted); margin: 0 0 16px; }

    .community-section {
      padding: 24px; border-radius: 16px; margin-bottom: 24px;
      background: white; border: 1px solid rgba(0,0,0,0.05);
    }
    .community-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;
    }
    .community-card {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px; border-radius: 14px;
      background: #F8FAFC; border: 1px solid rgba(0,0,0,0.04);
    }
    .community-avatar {
      width: 44px; height: 44px; border-radius: 12px;
      background: var(--co-primary-light); color: var(--co-primary);
      display: flex; align-items: center; justify-content: center;
    }
    .community-name { font-weight: 700; font-size: 14px; color: var(--co-secondary); }
    .community-meta { font-size: 12px; color: var(--co-text-muted); margin-top: 2px; }
  `]
})
export class ConnectionListComponent implements OnInit {

  connections: MemberConnection[] = [];
  filteredConnections: MemberConnection[] = [];
  communityMembers: UserPublic[] = [];
  private nameByUserId = new Map<string, string>();
  pendingCount = 0;
  currentUserId = '';
  searchTerm = '';
  loading = false;
  targetUserId = '';
  requestMessage = '';
  sendingRequest = false;

  constructor(
    private connectionService: ConnectionService,
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUserId = this.authService.getUserId()?.toString() || '';
    this.loading = true;
    this.loadConnectionsAndDirectory();
    this.loadPendingCount();
  }

  formatUser(u: UserPublic): string {
    return this.userProfileService.displayNameFromUser(u);
  }

  displayNameForConnection(conn: MemberConnection): string {
    const otherId = conn.requesterId === this.currentUserId ? conn.targetId : conn.requesterId;
    return this.nameByUserId.get(otherId) || `Utilisateur ${otherId}`;
  }

  loadConnectionsAndDirectory() {
    forkJoin({
      directory: this.userProfileService.loadDirectory(),
      connections: this.connectionService.getMyConnections(this.currentUserId)
    }).subscribe({
      next: ({ directory, connections }) => {
        directory.forEach(u => {
          this.nameByUserId.set(String(u.id), this.userProfileService.displayNameFromUser(u));
        });

        // Remove current user from directory to populate dropdown
        this.communityMembers = directory.filter(u => String(u.id) !== this.currentUserId);

        this.connections = connections;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement du réseau', 'Fermer', {
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

  applyFilters() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredConnections = this.connections;
      return;
    }
    this.filteredConnections = this.connections.filter(c => {
      const otherId = c.requesterId === this.currentUserId ? c.targetId : c.requesterId;
      const name = (this.nameByUserId.get(otherId) || '').toLowerCase();
      return otherId.toLowerCase().includes(term) || name.includes(term);
    });
  }

  blockMember(connectionId: string) {
    this.connectionService.blockMember(connectionId).subscribe({
      next: () => {
        this.connections = this.connections.filter(c => c.id !== connectionId);
        this.applyFilters();
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
    this.router.navigate(['/community/messaging/private', userId]);
  }

  sendConnectionRequest() {
    if (!this.targetUserId) return;
    this.sendingRequest = true;
    this.connectionService.sendRequest(
      this.currentUserId,
      String(this.targetUserId).trim(),
      this.requestMessage.trim() || undefined
    ).subscribe({
      next: () => {
        this.sendingRequest = false;
        this.targetUserId = '';
        this.requestMessage = '';
        this.snackBar.open('Demande de connexion envoyée ! 🚀', 'OK', {
          duration: 3000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.sendingRequest = false;
        this.snackBar.open('Erreur lors de l\'envoi de la demande', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }
}