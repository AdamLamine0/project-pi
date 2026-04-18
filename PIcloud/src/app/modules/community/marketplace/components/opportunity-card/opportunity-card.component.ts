import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Opportunity } from '../../../shared/models/opportunity.model';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-opportunity-card',
  template: `
    <div class="opp-card hover-lift">
      <!-- Gradient Accent Header -->
      <div class="card-accent" [class]="opportunity.type.toLowerCase()"></div>

      <div class="card-header">
        <div class="type-indicator" [class]="opportunity.type.toLowerCase()">
          <mat-icon>{{ getTypeIcon() }}</mat-icon>
          {{ opportunity.type }}
        </div>
        <div class="status-indicator" [class]="opportunity.status.toLowerCase()">
          <span class="status-dot"></span>
          {{ opportunity.status === 'OPEN' ? 'Active' : 'Fermée' }}
        </div>
      </div>

      <div class="card-content">
        <h3 class="opp-title">{{ opportunity.title }}</h3>

        <div class="meta-row">
          <div class="meta-item"><mat-icon>business_center</mat-icon> <span>{{ opportunity.sector }}</span></div>
          <div class="meta-item"><mat-icon>location_on</mat-icon> <span>{{ opportunity.location }}</span></div>
        </div>

        <p class="opp-desc">{{ opportunity.description | slice:0:130 }}{{ opportunity.description.length > 130 ? '...' : '' }}</p>

        <div class="skills" *ngIf="opportunity.skillsRequired && opportunity.skillsRequired.length > 0">
          <span *ngFor="let skill of opportunity.skillsRequired | slice:0:3" class="skill-chip">
            {{ skill }}
          </span>
          <span *ngIf="opportunity.skillsRequired.length > 3" class="skill-more">
            +{{ opportunity.skillsRequired.length - 3 }}
          </span>
        </div>
      </div>

      <div class="card-footer">
        <div class="stats">
          <span class="stat" title="Vues">
            <mat-icon>visibility</mat-icon> {{ opportunity.viewsCount }}
          </span>
          <span class="stat" title="Candidatures">
            <mat-icon>people</mat-icon> {{ opportunity.applicationsCount }}
          </span>
        </div>

        <button mat-raised-button class="apply-btn"
          [class]="opportunity.status === 'OPEN' ? 'open-btn' : 'closed-btn'"
          [disabled]="opportunity.status !== 'OPEN'"
          *ngIf="!isAdmin() && !isOwnedByCurrentUser() && !hasApplied && !canPublishOpportunities()"
          (click)="onApply($event)">
          <mat-icon>{{ opportunity.status === 'OPEN' ? 'send' : 'lock' }}</mat-icon>
          {{ opportunity.status === 'OPEN' ? 'Postuler' : 'Fermée' }}
        </button>

        <div class="application-state" *ngIf="hasApplied">
          Déjà postulé
        </div>
      </div>
    </div>
  `,
  styles: [`
    .opp-card {
      height: 100%; display: flex; flex-direction: column;
      background: white; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05);
      box-shadow: var(--shadow-sm); overflow: hidden;
      transition: border-color var(--transition-medium);
    }
    .opp-card:hover { border-color: rgba(79, 70, 229, 0.12); }

    .card-accent {
      height: 4px; width: 100%;
      opacity: 0.9;
    }
    .card-accent.emploi { background: linear-gradient(90deg, #10B981, #059669); }
    .card-accent.stage { background: linear-gradient(90deg, #3B82F6, #2563EB); }
    .card-accent.partenariat { background: linear-gradient(90deg, #F59E0B, #D97706); }
    .card-accent.freelance { background: linear-gradient(90deg, #8B5CF6, #7C3AED); }

    .card-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 18px 20px 0;
    }
    .type-indicator {
      display: flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 700; padding: 5px 14px;
      border-radius: 10px; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .type-indicator mat-icon { font-size: 16px; width: 16px; height: 16px; }
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

    .card-content { padding: 16px 20px; flex: 1; }
    .opp-title {
      margin: 0 0 12px 0; font-size: 17px; font-weight: 700;
      color: var(--co-text-main); line-height: 1.3;
    }

    .meta-row { display: flex; gap: 16px; margin-bottom: 14px; }
    .meta-item {
      display: flex; align-items: center; gap: 4px;
      font-size: 13px; color: var(--co-text-muted); font-weight: 500;
    }
    .meta-item mat-icon { font-size: 15px; width: 15px; height: 15px; color: #94A3B8; }

    .opp-desc { font-size: 14px; color: #475569; line-height: 1.55; margin: 0 0 14px; }

    .skills { display: flex; gap: 6px; flex-wrap: wrap; }
    .skill-chip {
      font-size: 11px; font-weight: 600;
      color: var(--co-primary-dark); background: var(--co-primary-light);
      padding: 4px 12px; border-radius: 8px;
    }
    .skill-more { font-size: 11px; font-weight: 700; color: var(--co-text-muted); padding: 4px 6px; }

    .card-footer {
      padding: 16px 20px; border-top: 1px solid var(--co-background);
      display: flex; justify-content: space-between; align-items: center;
    }
    .stats { display: flex; gap: 16px; }
    .stat {
      display: flex; align-items: center; gap: 4px;
      color: #94A3B8; font-size: 13px; font-weight: 600;
    }
    .stat mat-icon { font-size: 16px; width: 16px; height: 16px; }

    .apply-btn {
      border-radius: 12px; font-weight: 600; padding: 0 20px; height: 38px;
      display: flex; align-items: center; gap: 6px;
    }
    .apply-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .open-btn { background: var(--co-primary) !important; color: white; }
    .closed-btn { background: #F1F5F9 !important; color: #94A3B8; }
  `]
})
export class OpportunityCardComponent {
  @Input() opportunity!: Opportunity;
  @Input() currentUserId = '';
  @Input() hasApplied = false;
  @Output() applyClicked = new EventEmitter<string>();

  constructor(private authService: AuthService) {}

  onApply(event: Event) {
    event.stopPropagation();
    this.applyClicked.emit(this.opportunity.id);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isOwnedByCurrentUser(): boolean {
    return this.opportunity.publisherId === this.currentUserId;
  }

  canPublishOpportunities(): boolean {
    return this.authService.isAdmin() ||
           this.authService.isEntrepreneur() ||
           this.authService.isPartenaire() ||
           this.authService.isInvestisseur();
  }

  getTypeIcon(): string {
    const icons: Record<string, string> = {
      'EMPLOI': 'work',
      'STAGE': 'school',
      'PARTENARIAT': 'handshake',
      'FREELANCE': 'laptop'
    };
    return icons[this.opportunity.type] || 'work';
  }
}