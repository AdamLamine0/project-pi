import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../services/marketplace.service';
import { Opportunity } from '../../../shared/models/opportunity.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publisher-dashboard',
  template: `
    <div class="dashboard-container animate-fade-in-up">

      <!-- Header -->
      <div class="header-section glass-panel">
        <button mat-icon-button routerLink="/community/marketplace" class="back-btn">
          <mat-icon>arrow_back_ios</mat-icon>
        </button>
        <div class="header-text">
          <h1 class="page-title">Mes Offres Publiées</h1>
          <p class="page-subtitle">Gérez et suivez vos offres d'opportunités.</p>
        </div>
        <button mat-raised-button color="primary" class="create-btn hover-lift" routerLink="/community/marketplace/create">
          <mat-icon>add</mat-icon> Nouvelle offre
        </button>
      </div>

      <!-- Stats -->
      <div class="stats-grid" *ngIf="opportunities.length > 0">
        <div class="stat-card glass-panel">
          <div class="stat-icon bg-emerald"><mat-icon>check_circle</mat-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ getOpenCount() }}</div>
            <div class="stat-label">Ouvertes</div>
          </div>
        </div>
        <div class="stat-card glass-panel">
          <div class="stat-icon bg-blue"><mat-icon>visibility</mat-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ getTotalViews() }}</div>
            <div class="stat-label">Vues totales</div>
          </div>
        </div>
        <div class="stat-card glass-panel">
          <div class="stat-icon bg-purple"><mat-icon>people</mat-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ getTotalApplications() }}</div>
            <div class="stat-label">Candidatures</div>
          </div>
        </div>
      </div>

      <!-- Offers Grid -->
      <div class="offers-list">
        <div *ngFor="let opp of opportunities; let i = index"
          class="offer-card hover-lift animate-fade-in-up"
          [style.animation-delay.ms]="i * 70">

          <div class="offer-top">
            <div class="offer-header">
              <div class="type-badge" [class]="opp.type.toLowerCase()">{{ opp.type }}</div>
              <div class="status-indicator" [class]="opp.status.toLowerCase()">
                <span class="status-dot"></span>
                {{ opp.status === 'OPEN' ? 'Active' : opp.status === 'CLOSED' ? 'Clôturée' : 'Expirée' }}
              </div>
            </div>
            <h3 class="offer-title">{{ opp.title }}</h3>
            <div class="offer-meta">
              <span class="meta-item"><mat-icon>business_center</mat-icon> {{ opp.sector }}</span>
              <span class="meta-item"><mat-icon>location_on</mat-icon> {{ opp.location }}</span>
            </div>
          </div>

          <div class="offer-stats">
            <div class="mini-stat">
              <mat-icon>visibility</mat-icon>
              <span>{{ opp.viewsCount }} vues</span>
            </div>
            <div class="mini-stat clickable" (click)="viewApplications(opp.id)">
              <mat-icon>people</mat-icon>
              <span>{{ opp.applicationsCount }} candidature{{ opp.applicationsCount > 1 ? 's' : '' }}</span>
              <mat-icon class="go-icon">arrow_forward</mat-icon>
            </div>
          </div>

          <div class="offer-actions">
            <button mat-button class="action-btn close-btn" (click)="closeOffer(opp.id)"
              *ngIf="opp.status === 'OPEN'">
              <mat-icon>pause_circle</mat-icon> Clôturer
            </button>
            <button mat-button class="action-btn delete-btn" (click)="deleteOffer(opp.id)">
              <mat-icon>delete_outline</mat-icon> Supprimer
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="opportunities.length === 0" class="empty-state glass-panel animate-scale-in">
        <div class="empty-icon-wrapper">
          <mat-icon>work_outline</mat-icon>
        </div>
        <h3>Aucune offre publiée</h3>
        <p>Commencez à publier des offres pour attirer les meilleurs talents.</p>
        <button mat-raised-button color="primary" class="create-btn-empty" routerLink="/community/marketplace/create">
          <mat-icon>add</mat-icon> Publier une offre
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { max-width: 1000px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }

    .header-section {
      display: flex; align-items: center; gap: 16px;
      padding: 24px 28px; border-radius: 20px; margin-bottom: 28px;
      background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%);
      border: none;
    }
    .back-btn { color: var(--co-text-muted); }
    .header-text { flex: 1; }
    .page-title { margin: 0; font-size: 24px; font-weight: 800; color: var(--co-secondary); }
    .page-subtitle { margin: 4px 0 0; color: var(--co-text-muted); font-size: 14px; }
    .create-btn { border-radius: 20px; padding: 0 24px; font-weight: 600; }

    .stats-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px; margin-bottom: 32px;
    }
    .stat-card {
      background: white; padding: 20px; border-radius: 16px;
      display: flex; align-items: center; gap: 16px;
      border: 1px solid rgba(0,0,0,0.05);
    }
    .stat-icon {
      width: 44px; height: 44px; border-radius: 12px;
      display: flex; justify-content: center; align-items: center; color: white;
    }
    .stat-icon mat-icon { font-size: 22px; width: 22px; height: 22px; }
    .bg-emerald { background: #10B981; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3); }
    .bg-blue { background: #3B82F6; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3); }
    .bg-purple { background: #8B5CF6; box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3); }
    .stat-value { font-size: 22px; font-weight: 800; color: var(--co-secondary); }
    .stat-label { color: var(--co-text-muted); font-size: 12px; font-weight: 500; margin-top: 2px; }

    .offers-list { display: flex; flex-direction: column; gap: 16px; }

    .offer-card {
      background: white; border-radius: 16px; padding: 24px;
      border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm);
    }

    .offer-top { margin-bottom: 16px; }
    .offer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .type-badge {
      font-size: 11px; font-weight: 700; padding: 5px 14px; border-radius: 20px;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .emploi { background: #ECFDF5; color: #059669; }
    .stage { background: #EFF6FF; color: #2563EB; }
    .partenariat { background: #FFF7ED; color: #EA580C; }
    .freelance { background: #FAF5FF; color: #7C3AED; }

    .status-indicator {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; font-weight: 600;
    }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; }
    .status-indicator.open { color: var(--co-success); }
    .status-indicator.open .status-dot { background: var(--co-success); box-shadow: 0 0 8px rgba(16, 185, 129, 0.5); }
    .status-indicator.closed { color: var(--co-danger); }
    .status-indicator.closed .status-dot { background: var(--co-danger); }
    .status-indicator.expired { color: var(--co-text-muted); }
    .status-indicator.expired .status-dot { background: var(--co-text-muted); }

    .offer-title { margin: 0 0 8px; font-size: 18px; font-weight: 700; color: var(--co-secondary); }
    .offer-meta { display: flex; gap: 20px; }
    .meta-item {
      display: flex; align-items: center; gap: 4px;
      font-size: 13px; color: var(--co-text-muted); font-weight: 500;
    }
    .meta-item mat-icon { font-size: 16px; width: 16px; height: 16px; color: #94A3B8; }

    .offer-stats {
      display: flex; gap: 24px; padding: 16px 0;
      margin-bottom: 16px; border-top: 1px solid var(--co-background);
      border-bottom: 1px solid var(--co-background);
    }
    .mini-stat {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; color: var(--co-text-muted); font-weight: 600;
    }
    .mini-stat mat-icon { font-size: 18px; width: 18px; height: 18px; color: var(--co-primary); }
    .clickable {
      cursor: pointer; padding: 8px 14px; border-radius: 10px;
      transition: all var(--transition-fast);
    }
    .clickable:hover { background: var(--co-primary-light); }
    .go-icon { font-size: 14px !important; width: 14px !important; height: 14px !important; color: var(--co-primary) !important; margin-left: 4px; }

    .offer-actions { display: flex; justify-content: flex-end; gap: 8px; }
    .action-btn { border-radius: 12px; font-weight: 600; font-size: 13px; }
    .close-btn { color: var(--co-text-muted); }
    .close-btn:hover { background: #FFF7ED; color: #EA580C; }
    .delete-btn { color: var(--co-text-muted); }
    .delete-btn:hover { background: #FEF2F2; color: var(--co-danger); }

    .empty-state {
      text-align: center; padding: 60px 40px; border-radius: 20px; background: white;
    }
    .empty-icon-wrapper {
      width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px;
      background: linear-gradient(135deg, #ECFDF5, #A7F3D0);
      display: flex; justify-content: center; align-items: center;
    }
    .empty-icon-wrapper mat-icon { font-size: 40px; width: 40px; height: 40px; color: #059669; }
    .empty-state h3 { font-size: 20px; font-weight: 700; color: var(--co-secondary); margin: 0 0 8px; }
    .empty-state p { color: var(--co-text-muted); font-size: 14px; margin: 0 0 20px; }
    .create-btn-empty { border-radius: 20px; font-weight: 600; padding: 0 24px; }
  `]
})
export class PublisherDashboardComponent implements OnInit {

  opportunities: Opportunity[] = [];

  constructor(
    private marketplaceService: MarketplaceService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const publisherId = this.authService.getUserId()?.toString() || '';
    this.marketplaceService.getMyOpportunities(publisherId).subscribe(
      opps => this.opportunities = opps
    );
  }

  getOpenCount(): number {
    return this.opportunities.filter(o => o.status === 'OPEN').length;
  }

  getTotalViews(): number {
    return this.opportunities.reduce((sum, o) => sum + (o.viewsCount || 0), 0);
  }

  getTotalApplications(): number {
    return this.opportunities.reduce((sum, o) => sum + (o.applicationsCount || 0), 0);
  }

  closeOffer(id: string) {
    this.marketplaceService.updateStatus(id, 'CLOSED').subscribe({
      next: updated => {
        const index = this.opportunities.findIndex(o => o.id === id);
        if (index !== -1) this.opportunities[index] = updated;
        this.snackBar.open('Offre clôturée avec succès', 'OK', {
          duration: 3000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors de la clôture', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  deleteOffer(id: string) {
    this.marketplaceService.deleteOpportunity(id).subscribe({
      next: () => {
        this.opportunities = this.opportunities.filter(o => o.id !== id);
        this.snackBar.open('Offre supprimée', 'OK', {
          duration: 3000, panelClass: ['snack-info']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors de la suppression', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  viewApplications(opportunityId: string) {
    this.router.navigate(['/community/marketplace/my-offers', opportunityId, 'applications']);
  }
}