import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { Opportunity } from '../../../shared/models/opportunity.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplyDialogComponent } from '../apply-dialog/apply-dialog.component';

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
          <button mat-button class="my-apps-btn" routerLink="/community/marketplace/my-applications" *ngIf="!canPublish">
            <mat-icon>assignment</mat-icon> Mes candidatures
          </button>
          <button mat-button class="manage-btn" routerLink="/community/marketplace/manage" *ngIf="canPublish">
            <mat-icon>work</mat-icon> Gérer mes offres
          </button>
          <button mat-raised-button color="primary" class="create-btn hover-lift" routerLink="/community/marketplace/create" *ngIf="canPublish">
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
          [currentUserId]="currentUserId"
          [hasApplied]="hasApplied(opp.id)"
          (applyClicked)="openApplyDialog($event)">
        </app-opportunity-card>

        <div *ngIf="!loading && opportunities.length === 0" class="empty-state glass-panel animate-scale-in">
          <div class="empty-icon-wrapper">
            <mat-icon class="empty-icon">work_off</mat-icon>
          </div>
          <h3>Aucune opportunité trouvée</h3>
          <p>{{ selectedType ? 'Aucune offre pour ce type.' : 'Soyez le premier à publier une offre!' }}</p>
        </div>
      </div>

      <!-- Pagination -->
      <mat-paginator *ngIf="!loading && totalElements > 0"
        [length]="totalElements"
        [pageSize]="pageSize"
        [pageSizeOptions]="[6, 12, 24]"
        (page)="onPageChange($event)">
      </mat-paginator>

    </div>
  `,
  styles: [`
    .marketplace-container { max-width: 1200px; margin: 40px auto; padding: 0 16px; }

    .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
    .page-title { font-size: 28px; font-weight: 800; color: var(--co-secondary); margin: 0 0 6px; }
    .page-subtitle { color: var(--co-text-muted); font-size: 14px; margin: 0; }

    .header-actions { display: flex; gap: 12px; align-items: center; }
    .my-apps-btn { border-radius: 12px; font-weight: 600; color: var(--co-primary); }
    .manage-btn { border-radius: 12px; font-weight: 600; color: var(--co-primary); }
    .create-btn { border-radius: 14px; font-weight: 600; padding: 0 24px; height: 44px; }

    .filters { margin-bottom: 24px; }
    .custom-chips { display: flex; flex-wrap: wrap; gap: 10px; }
    mat-chip { cursor: pointer; border-radius: 20px; font-weight: 500; padding: 8px 16px; transition: all 0.2s ease; }
    mat-chip:hover { background: rgba(79, 70, 229, 0.08); }
    mat-chip.selected { background: var(--co-primary) !important; color: white; }

    .opportunities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
    .spinner-container { display: flex; justify-content: center; padding: 60px; }

    .empty-state { text-align: center; padding: 60px; }
    .empty-icon-wrapper { width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; background: linear-gradient(135deg, var(--co-primary-light), #C7D2FE); display: flex; justify-content: center; align-items: center; }
    .empty-icon { font-size: 40px; width: 40px; height: 40px; color: var(--co-primary); }
    .empty-state h3 { font-size: 20px; font-weight: 700; color: var(--co-secondary); margin: 0 0 8px; }
    .empty-state p { color: var(--co-text-muted); font-size: 14px; margin: 0; }

    mat-paginator { margin-top: 32px; border-radius: 16px; background: white; }

    @media (max-width: 768px) {
      .header-section { flex-direction: column; align-items: flex-start; gap: 16px; }
      .opportunities-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class OpportunityListComponent implements OnInit {
  opportunities: Opportunity[] = [];
  loading = false;
  selectedType = '';
  canPublish = false;
  currentUserId = '';
  appliedOpportunityIds = new Set<string>();

  types = [
    { value: '', label: 'Tous' },
    { value: 'EMPLOI', label: 'Emplois' },
    { value: 'STAGE', label: 'Stages' },
    { value: 'PARTENARIAT', label: 'Partenariats' },
    { value: 'FREELANCE', label: 'Freelance' }
  ];

  // Pagination
  currentPage = 0;
  pageSize = 6;
  totalElements = 0;

  constructor(
    private marketplaceService: MarketplaceService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.canPublish = this.authService.isEntrepreneur() || this.authService.isPartenaire() || this.authService.isAdmin();
    this.currentUserId = this.authService.getUserId()?.toString() || '';
    if (this.currentUserId) {
      this.loadAppliedOpportunityIds();
    }
    this.loadOpportunities();
  }

  loadAppliedOpportunityIds() {
    if (!this.currentUserId) {
      this.appliedOpportunityIds.clear();
      return;
    }

    this.marketplaceService.getMyApplications(this.currentUserId).subscribe({
      next: (applications) => {
        this.appliedOpportunityIds = new Set(applications.map(app => app.opportunityId));
      },
      error: () => {
        this.appliedOpportunityIds.clear();
      }
    });
  }

  hasApplied(opportunityId: string): boolean {
    return this.appliedOpportunityIds.has(opportunityId);
  }

  loadOpportunities() {
    this.loading = true;
    
    if (this.selectedType) {
      // Filter by type
      this.marketplaceService.getByType(this.selectedType).subscribe({
        next: (opportunities) => {
          this.opportunities = opportunities;
          this.totalElements = opportunities.length;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      // Load all opportunities
      this.marketplaceService.getAllOpportunities(this.currentPage, this.pageSize).subscribe({
        next: (page) => {
          this.opportunities = page.content;
          this.totalElements = page.totalElements;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  filterByType(type: string) {
    this.selectedType = type;
    this.currentPage = 0;
    this.loadOpportunities();
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOpportunities();
  }

  openApplyDialog(opportunityId: string) {
    const dialogRef = this.dialog.open(ApplyDialogComponent, {
      width: '600px',
      data: { opportunityId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAppliedOpportunityIds();
        this.loadOpportunities();
      }
    });
  }
}
