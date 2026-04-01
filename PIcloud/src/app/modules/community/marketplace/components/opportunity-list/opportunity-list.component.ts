import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { Opportunity } from '../../../shared/models/opportunity.model';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-opportunity-list',
  template: `
    <div class="marketplace-container animate-fade-in-up">

      <!-- Header -->
      <div class="header-section glass-panel">
        <div>
          <h1 class="page-title">Marketplace</h1>
          <p class="page-subtitle">Découvrez des opportunités et collaborez avec les meilleurs talents.</p>
        </div>
        <div class="header-actions">
          <button mat-button class="my-apps-btn" routerLink="/community/marketplace/my-applications">
            <mat-icon>assignment</mat-icon> Mes candidatures
          </button>
          <button mat-raised-button color="primary" class="create-btn hover-lift" routerLink="/community/marketplace/create"
            *ngIf="canPublish">
            <mat-icon>add</mat-icon> Publier une offre
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters">
        <mat-chip-set class="custom-chips">
          <mat-chip *ngFor="let type of types"
            (click)="filterByType(type.value)"
            [class.selected]="selectedType === type.value">
            {{ type.label }}
          </mat-chip>
        </mat-chip-set>
      </div>

      <!-- Opportunities -->
      <div class="opportunities-grid">
        <div *ngIf="loading" class="spinner-container">
          <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
        </div>

        <app-opportunity-card class="animate-fade-in-up"
          *ngFor="let opp of opportunities"
          [opportunity]="opp"
          (applyClicked)="openApplyDialog($event)">
        </app-opportunity-card>

        <div *ngIf="!loading && opportunities.length === 0" class="empty-state glass-panel">
          <mat-icon class="empty-icon">work_outline</mat-icon>
          <p>Aucune offre disponible pour le moment.</p>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .marketplace-container { max-width: 1000px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }
    
    .header-section { 
      display: flex; justify-content: space-between; align-items: center; 
      padding: 24px; border-radius: 16px; margin-bottom: 24px;
      background: linear-gradient(135deg, var(--co-surface) 0%, var(--co-background) 100%);
    }
    .page-title { margin: 0; font-size: 28px; font-weight: 800; color: var(--co-secondary); }
    .page-subtitle { margin: 4px 0 0; color: var(--co-text-muted); font-size: 14px; }
    
    .header-actions { display: flex; gap: 12px; }
    .my-apps-btn { border-radius: 20px; font-weight: 600; background: rgba(255,255,255,0.8); }
    .create-btn { border-radius: 20px; padding: 0 24px; background-color: var(--co-primary); color: white; font-weight: 600; }
    
    .filters { margin-bottom: 32px; }
    .custom-chips mat-chip { transition: var(--transition-fast); border-radius: 8px; cursor: pointer; }
    .custom-chips mat-chip:not(.selected):hover { background-color: var(--co-primary-light); color: var(--co-primary-dark); }
    .selected { background-color: var(--co-primary) !important; color: white !important; font-weight: 600; box-shadow: var(--shadow-sm); }
    
    .opportunities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
    .spinner-container { grid-column: 1 / -1; display: flex; justify-content: center; padding: 40px; }
    
    .empty-state { grid-column: 1 / -1; text-align: center; color: var(--co-text-muted); padding: 60px 40px; border-radius: 16px; }
    .empty-icon { font-size: 48px; width: 48px; height: 48px; margin-bottom: 16px; color: #CBD5E1; }
  `]
})
export class OpportunityListComponent implements OnInit {

  opportunities: Opportunity[] = [];
  loading = false;
  selectedType = '';
  canPublish = false;

  types = [
    { label: 'Tous', value: '' },
    { label: 'Emploi', value: 'EMPLOI' },
    { label: 'Stage', value: 'STAGE' },
    { label: 'Partenariat', value: 'PARTENARIAT' },
    { label: 'Freelance', value: 'FREELANCE' }
  ];

  constructor(
    private marketplaceService: MarketplaceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.canPublish = this.authService.isEntrepreneur() || this.authService.isPartenaire() || this.authService.isAdmin();
    this.loadOpportunities();
  }

  loadOpportunities() {
    this.loading = true;
    this.marketplaceService.getAllOpportunities().subscribe({
      next: page => { this.opportunities = page.content; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  filterByType(type: string) {
    this.selectedType = type;
    if (!type) { this.loadOpportunities(); return; }
    this.loading = true;
    this.marketplaceService.getByType(type).subscribe({
      next: opps => { this.opportunities = opps; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openApplyDialog(opportunityId: string) {
    // on implémentera le dialog plus tard
    console.log('Apply to:', opportunityId);
  }
}