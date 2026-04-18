import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MarketplaceService } from '../../services/marketplace.service';
import { OpportunityApplication } from '../../../shared/models/opportunity.model';
import { UserProfileService } from '../../../../../core/services/user-profile.service';
import { absoluteGatewayUrl } from '../../../../../core/utils/absolute-url';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-applications-viewer',
  template: `
    <div class="viewer-container animate-fade-in-up">

      <!-- Header -->
      <div class="header-section glass-panel">
        <button mat-icon-button routerLink="/community/marketplace/my-offers" class="back-btn">
          <mat-icon>arrow_back_ios</mat-icon>
        </button>
        <div>
          <h1 class="page-title">Candidatures reçues</h1>
          <p class="page-subtitle">{{ applications.length }} candidature{{ applications.length > 1 ? 's' : '' }} pour cette offre</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="filter-bar" *ngIf="applications.length > 0">
        <mat-chip-set class="custom-chips">
          <mat-chip *ngFor="let f of filters"
            (click)="selectedFilter = f.value; applyFilter()"
            [class.selected]="selectedFilter === f.value">
            {{ f.label }} ({{ getCountByStatus(f.value) }})
          </mat-chip>
        </mat-chip-set>
      </div>

      <!-- Applications List -->
      <div class="apps-list">
        <div *ngFor="let app of filteredApplications; let i = index"
          class="app-card hover-lift animate-fade-in-up"
          [style.animation-delay.ms]="i * 70">

          <div class="app-header">
            <div class="candidate-info">
              <div class="avatar-circle">
                <mat-icon>person</mat-icon>
              </div>
              <div>
                <div class="candidate-name">{{ getCandidateName(app.candidateId) }}</div>
                <div class="applied-date">
                  <mat-icon>schedule</mat-icon>
                  Postulé le {{ app.appliedAt | date:'dd MMM yyyy à HH:mm' }}
                </div>
              </div>
            </div>
            <div class="status-badge" [class]="app.status.toLowerCase()">
              <mat-icon>{{ getStatusIcon(app.status) }}</mat-icon>
              {{ getStatusLabel(app.status) }}
            </div>
          </div>

          <!-- CV Link -->
          <div class="cv-section" *ngIf="app.cvUrl">
            <mat-icon>attach_file</mat-icon>
            <button mat-button class="cv-link" (click)="downloadCv(app.cvUrl)">Voir le CV</button>
          </div>

          <!-- Cover Letter -->
          <div class="cover-letter" *ngIf="app.coverLetter">
            <div class="cover-label">
              <mat-icon>format_quote</mat-icon> Lettre de motivation
            </div>
            <p>{{ showFullCover[app.id] ? app.coverLetter : (app.coverLetter | slice:0:200) }}{{ !showFullCover[app.id] && app.coverLetter.length > 200 ? '...' : '' }}</p>
            <button mat-button class="show-more-btn" *ngIf="app.coverLetter.length > 200"
              (click)="showFullCover[app.id] = !showFullCover[app.id]">
              {{ showFullCover[app.id] ? 'Voir moins' : 'Voir plus' }}
            </button>
          </div>

          <!-- Actions -->
          <div class="app-actions" *ngIf="app.status === 'SENT' || app.status === 'VIEWED'">
            <button mat-raised-button class="action-btn interview-btn"
              (click)="updateStatus(app.id, 'INTERVIEW')">
              <mat-icon>event</mat-icon> Planifier entretien
            </button>
            <button mat-raised-button class="action-btn accept-btn"
              (click)="updateStatus(app.id, 'ACCEPTED')">
              <mat-icon>check_circle</mat-icon> Accepter
            </button>
            <button mat-button class="action-btn reject-btn"
              (click)="updateStatus(app.id, 'REJECTED')">
              <mat-icon>cancel</mat-icon> Refuser
            </button>
          </div>

          <div class="app-actions" *ngIf="app.status === 'INTERVIEW'">
            <button mat-raised-button class="action-btn accept-btn"
              (click)="updateStatus(app.id, 'ACCEPTED')">
              <mat-icon>check_circle</mat-icon> Accepter
            </button>
            <button mat-button class="action-btn reject-btn"
              (click)="updateStatus(app.id, 'REJECTED')">
              <mat-icon>cancel</mat-icon> Refuser
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="applications.length === 0 && !loading" class="empty-state glass-panel animate-scale-in">
        <div class="empty-icon-wrapper">
          <mat-icon>inbox</mat-icon>
        </div>
        <h3>Aucune candidature</h3>
        <p>Personne n'a encore postulé à cette offre.</p>
        <button mat-button class="back-link" routerLink="/community/marketplace/my-offers">
          <mat-icon>arrow_back</mat-icon> Retour à mes offres
        </button>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="spinner-container">
        <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
      </div>
    </div>
  `,
  styles: [`
    .viewer-container { max-width: 900px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }

    .header-section {
      display: flex; align-items: center; gap: 16px;
      padding: 24px 28px; border-radius: 20px; margin-bottom: 24px;
      background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%);
      border: none;
    }
    .back-btn { color: var(--co-text-muted); }
    .page-title { margin: 0; font-size: 24px; font-weight: 800; color: var(--co-secondary); }
    .page-subtitle { margin: 4px 0 0; color: var(--co-text-muted); font-size: 14px; }

    .filter-bar { margin-bottom: 24px; }
    .custom-chips mat-chip { cursor: pointer; border-radius: 8px; transition: var(--transition-fast); }
    .custom-chips mat-chip:not(.selected):hover { background-color: var(--co-primary-light); }
    .selected { background-color: var(--co-primary) !important; color: white !important; font-weight: 600; }

    .apps-list { display: flex; flex-direction: column; gap: 16px; }

    .app-card {
      background: white; border-radius: 16px; padding: 24px;
      border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm);
    }

    .app-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
    .candidate-info { display: flex; align-items: center; gap: 14px; }
    .avatar-circle {
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg, #C7D2FE, #A5B4FC);
      color: var(--co-primary-dark); display: flex;
      justify-content: center; align-items: center; flex-shrink: 0;
    }
    .avatar-circle mat-icon { font-size: 24px; width: 24px; height: 24px; }
    .candidate-name { font-size: 16px; font-weight: 700; color: var(--co-secondary); margin-bottom: 4px; }
    .applied-date {
      display: flex; align-items: center; gap: 4px;
      font-size: 12px; color: var(--co-text-muted); font-weight: 500;
    }
    .applied-date mat-icon { font-size: 14px; width: 14px; height: 14px; }

    .status-badge {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; font-weight: 700; padding: 6px 14px;
      border-radius: 20px; text-transform: uppercase; letter-spacing: 0.3px;
    }
    .status-badge mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .sent { background: #FFF7ED; color: #EA580C; }
    .viewed { background: #EFF6FF; color: #2563EB; }
    .interview { background: #FAF5FF; color: #7C3AED; }
    .accepted { background: #ECFDF5; color: #059669; }
    .rejected { background: #FEF2F2; color: #DC2626; }
    .withdrawn { background: #F8FAFC; color: #64748B; }

    .cv-section {
      display: flex; align-items: center; gap: 8px;
      padding: 12px 16px; background: #F8FAFC; border-radius: 12px;
      margin-bottom: 16px;
    }
    .cv-section mat-icon { font-size: 18px; width: 18px; height: 18px; color: var(--co-primary); }
    .cv-link {
      color: var(--co-primary); font-weight: 600; font-size: 14px;
      background: none; border: none; cursor: pointer; padding: 0;
      text-decoration: underline;
    }
    .cv-link:hover { opacity: 0.8; }

    .cover-letter {
      padding: 16px; background: #FAFAFA; border-radius: 12px;
      margin-bottom: 16px; border-left: 3px solid var(--co-primary-light);
    }
    .cover-label {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; font-weight: 700; color: var(--co-text-muted);
      text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 8px;
    }
    .cover-label mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .cover-letter p { margin: 0; font-size: 14px; color: #475569; line-height: 1.6; }
    .show-more-btn { font-size: 12px; font-weight: 600; color: var(--co-primary); padding: 0; margin-top: 8px; }

    .app-actions {
      display: flex; gap: 10px; justify-content: flex-end;
      padding-top: 16px; border-top: 1px solid #F1F5F9;
    }
    .action-btn { border-radius: 12px; font-weight: 600; font-size: 13px; height: 38px; padding: 0 18px; }
    .interview-btn { background: #8B5CF6 !important; color: white; }
    .accept-btn { background: #10B981 !important; color: white; }
    .reject-btn { color: var(--co-text-muted); }
    .reject-btn:hover { background: #FEF2F2; color: var(--co-danger); }

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
    .back-link { border-radius: 20px; font-weight: 600; color: var(--co-primary); }

    .spinner-container { display: flex; justify-content: center; padding: 60px; }

    @media (max-width: 640px) {
      .app-header { flex-direction: column; gap: 12px; }
      .app-actions { flex-wrap: wrap; }
      .action-btn { flex: 1; min-width: 120px; }
    }
  `]
})
export class ApplicationsViewerComponent implements OnInit {

  applications: OpportunityApplication[] = [];
  filteredApplications: OpportunityApplication[] = [];
  topCandidates: OpportunityApplication[] = [];
  loading = false;
  loadingRecommendations = false;
  opportunityId = '';
  selectedFilter = '';
  showFullCover: { [id: string]: boolean } = {};
  showRecommendations = false;
  private candidateNameMap = new Map<string, string>();

  filters = [
    { label: 'Toutes', value: '' },
    { label: 'Envoyées', value: 'SENT' },
    { label: 'Entretien', value: 'INTERVIEW' },
    { label: 'Acceptées', value: 'ACCEPTED' },
    { label: 'Refusées', value: 'REJECTED' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marketplaceService: MarketplaceService,
    private userProfileService: UserProfileService,
    private snackBar: MatSnackBar
  ) {}

  cvHref(url: string | undefined): string {
    return absoluteGatewayUrl(url);
  }

  downloadCv(cvUrl: string | undefined) {
    if (!cvUrl) return;
    
    const fileName = cvUrl.split('/').pop() || 'cv.pdf';
    this.marketplaceService.downloadCv(fileName).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => window.URL.revokeObjectURL(url), 10000);
      },
      error: (err) => {
        console.error('Error downloading CV:', err);
        this.snackBar.open('Erreur lors du téléchargement du CV', 'Fermer', { duration: 3000 });
      }
    });
  }

  getCandidateName(candidateId: string): string {
    return this.candidateNameMap.get(candidateId) || `Candidat ${candidateId}`;
  }

  ngOnInit() {
    this.opportunityId = this.route.snapshot.paramMap.get('id') || '';
    if (this.opportunityId) {
      this.loadApplications();
    }
  }

  loadApplications() {
    this.loading = true;
    this.marketplaceService.getApplicationsForOpportunity(this.opportunityId).subscribe({
      next: apps => {
        this.applications = apps;
        this.filteredApplications = apps;
        this.hydrateCandidateNames(apps);
        this.loading = false;
        // Auto-load recommendations if there are applications
        if (apps.length > 0) {
          this.loadRecommendations();
        }
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors du chargement', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  loadRecommendations() {
    this.loadingRecommendations = true;
    this.marketplaceService.getTopCandidates(this.opportunityId).subscribe({
      next: candidates => {
        this.topCandidates = candidates;
        this.loadingRecommendations = false;
        this.snackBar.open('Recommandations chargées ! 🤖', 'OK', {
          duration: 3000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.loadingRecommendations = false;
        this.snackBar.open('Erreur lors du chargement des recommandations', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  toggleRecommendations() {
    this.showRecommendations = !this.showRecommendations;
  }

  applyFilter() {
    if (!this.selectedFilter) {
      this.filteredApplications = this.applications;
    } else {
      this.filteredApplications = this.applications.filter(a => a.status === this.selectedFilter);
    }
  }

  getCountByStatus(status: string): number {
    if (!status) return this.applications.length;
    return this.applications.filter(a => a.status === status).length;
  }

  updateStatus(applicationId: string, status: string) {
    this.marketplaceService.updateApplicationStatus(applicationId, status).subscribe({
      next: updated => {
        const index = this.applications.findIndex(a => a.id === applicationId);
        if (index !== -1) this.applications[index] = updated;
        this.applyFilter();
        const label = this.getStatusLabel(status);
        this.snackBar.open(`Candidature ${label.toLowerCase()} ✓`, 'OK', {
          duration: 3000, panelClass: ['snack-success']
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'SENT': 'Envoyée', 'VIEWED': 'Consultée', 'INTERVIEW': 'Entretien',
      'ACCEPTED': 'Acceptée', 'REJECTED': 'Refusée', 'WITHDRAWN': 'Retirée'
    };
    return labels[status] || status;
  }

  getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      'SENT': 'send', 'VIEWED': 'visibility', 'INTERVIEW': 'event',
      'ACCEPTED': 'check_circle', 'REJECTED': 'cancel', 'WITHDRAWN': 'undo'
    };
    return icons[status] || 'info';
  }

  private hydrateCandidateNames(apps: OpportunityApplication[]) {
    const ids = [...new Set(apps.map(a => a.candidateId).filter(Boolean))];
    if (ids.length === 0) {
      return;
    }
    forkJoin(ids.map(id => this.userProfileService.getDisplayName(id))).subscribe({
      next: names => ids.forEach((id, i) => this.candidateNameMap.set(id, names[i]))
    });
  }
}
