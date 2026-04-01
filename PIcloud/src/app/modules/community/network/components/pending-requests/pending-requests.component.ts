import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { MemberConnection } from '../../../shared/models/connection.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pending-requests',
  template: `
    <div class="pending-container animate-fade-in-up">

      <!-- Header -->
      <div class="header-section glass-panel">
        <button mat-icon-button routerLink="/community/network" class="back-btn">
          <mat-icon>arrow_back_ios</mat-icon>
        </button>
        <div>
          <h1 class="page-title">Demandes en attente</h1>
          <p class="page-subtitle">{{ requests.length }} demande{{ requests.length > 1 ? 's' : '' }} en attente de réponse</p>
        </div>
      </div>

      <!-- Requests List -->
      <div class="requests-list">
        <div *ngFor="let req of requests; let i = index"
          class="request-card glass-panel hover-lift animate-fade-in-up"
          [style.animation-delay.ms]="i * 80">

          <div class="request-content">
            <div class="avatar-circle">
              <mat-icon>person</mat-icon>
            </div>
            <div class="request-info">
              <div class="requester-name">{{ req.requesterId }}</div>
              <div class="request-message" *ngIf="req.message">
                <mat-icon>format_quote</mat-icon>
                {{ req.message }}
              </div>
              <div class="request-date">
                <mat-icon>schedule</mat-icon>
                {{ req.createdAt | date:'dd MMM yyyy' }}
              </div>
            </div>
          </div>

          <div class="request-actions">
            <button mat-raised-button class="accept-btn" (click)="accept(req.id)">
              <mat-icon>check_circle</mat-icon> Accepter
            </button>
            <button mat-button class="decline-btn" (click)="decline(req.id)">
              <mat-icon>cancel</mat-icon> Refuser
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="requests.length === 0" class="empty-state glass-panel animate-scale-in">
        <div class="empty-icon-wrapper">
          <mat-icon>mark_email_read</mat-icon>
        </div>
        <h3>Tout est à jour !</h3>
        <p>Aucune demande en attente pour le moment.</p>
        <button mat-button class="back-link" routerLink="/community/network">
          <mat-icon>arrow_back</mat-icon> Retour au réseau
        </button>
      </div>
    </div>
  `,
  styles: [`
    .pending-container { max-width: 800px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }

    .header-section {
      display: flex; align-items: center; gap: 16px;
      padding: 24px 28px; border-radius: 20px; margin-bottom: 28px;
      background: linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%);
      border: none;
    }
    .back-btn { color: var(--co-text-muted); }
    .page-title { margin: 0; font-size: 24px; font-weight: 800; color: var(--co-secondary); }
    .page-subtitle { margin: 4px 0 0; color: var(--co-text-muted); font-size: 14px; }

    .requests-list { display: flex; flex-direction: column; gap: 16px; }

    .request-card {
      display: flex; justify-content: space-between; align-items: center;
      padding: 24px; border-radius: 16px; background: white;
      border: 1px solid rgba(0,0,0,0.05);
    }

    .request-content { display: flex; align-items: center; gap: 16px; flex: 1; }

    .avatar-circle {
      width: 52px; height: 52px; border-radius: 50%;
      background: linear-gradient(135deg, #FED7AA, #FDBA74);
      color: #C2410C; display: flex;
      justify-content: center; align-items: center; flex-shrink: 0;
    }
    .avatar-circle mat-icon { font-size: 26px; width: 26px; height: 26px; }

    .request-info { flex: 1; min-width: 0; }
    .requester-name { font-size: 16px; font-weight: 700; color: var(--co-secondary); margin-bottom: 6px; }

    .request-message {
      display: flex; align-items: flex-start; gap: 4px;
      font-size: 14px; color: #475569; font-style: italic;
      margin-bottom: 8px; line-height: 1.4;
    }
    .request-message mat-icon { font-size: 16px; width: 16px; height: 16px; color: #94A3B8; flex-shrink: 0; margin-top: 2px; }

    .request-date {
      display: flex; align-items: center; gap: 4px;
      font-size: 12px; color: var(--co-text-muted); font-weight: 500;
    }
    .request-date mat-icon { font-size: 14px; width: 14px; height: 14px; }

    .request-actions { display: flex; gap: 8px; margin-left: 16px; }
    .accept-btn {
      border-radius: 12px; font-weight: 600; padding: 0 20px;
      background: var(--co-success) !important; color: white;
    }
    .decline-btn {
      border-radius: 12px; font-weight: 600;
      color: var(--co-text-muted);
    }
    .decline-btn:hover { background: #FEF2F2; color: var(--co-danger); }

    .empty-state {
      text-align: center; padding: 60px 40px; border-radius: 20px;
      background: white; margin-top: 24px;
    }
    .empty-icon-wrapper {
      width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px;
      background: linear-gradient(135deg, #ECFDF5, #A7F3D0);
      display: flex; justify-content: center; align-items: center;
    }
    .empty-icon-wrapper mat-icon { font-size: 40px; width: 40px; height: 40px; color: #059669; }
    .empty-state h3 { font-size: 20px; font-weight: 700; color: var(--co-secondary); margin: 0 0 8px; }
    .empty-state p { color: var(--co-text-muted); font-size: 14px; margin: 0 0 20px; }
    .back-link { border-radius: 20px; font-weight: 600; color: var(--co-primary); }

    @media (max-width: 640px) {
      .request-card { flex-direction: column; align-items: flex-start; gap: 16px; }
      .request-actions { margin-left: 0; width: 100%; }
      .accept-btn, .decline-btn { flex: 1; }
    }
  `]
})
export class PendingRequestsComponent implements OnInit {

  requests: MemberConnection[] = [];
  currentUserId = '';

  constructor(
    private connectionService: ConnectionService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getUserId()?.toString() || '';
    this.loadRequests();
  }

  loadRequests() {
    this.connectionService.getPendingRequests(this.currentUserId).subscribe(
      reqs => this.requests = reqs
    );
  }

  accept(connectionId: string) {
    this.connectionService.acceptRequest(connectionId).subscribe({
      next: () => {
        this.requests = this.requests.filter(r => r.id !== connectionId);
        this.snackBar.open('Demande acceptée ! 🎉', 'OK', {
          duration: 3000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors de l\'acceptation', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  decline(connectionId: string) {
    this.connectionService.declineRequest(connectionId).subscribe({
      next: () => {
        this.requests = this.requests.filter(r => r.id !== connectionId);
        this.snackBar.open('Demande refusée', 'OK', {
          duration: 3000, panelClass: ['snack-info']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors du refus', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }
}