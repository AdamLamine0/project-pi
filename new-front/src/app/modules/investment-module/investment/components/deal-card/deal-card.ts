import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataRoomApiService } from '../../../data-room/services/data-room-api.service';
import { DealPipeline } from '../../models/deal-kanban.models';
import { NextBestAction } from '../../models/next-best-action.model';
import { NextBestActionService } from '../../services/next-best-action.service';
import { NextBestActionCard } from '../next-best-action-card/next-best-action-card';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-deal-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatProgressSpinnerModule, NextBestActionCard],
  templateUrl: './deal-card.html',
  styleUrl: './deal-card.css',
})
export class DealCard {
   @Input({ required: true }) card!: DealPipeline;
  expanded = false;
  actions: NextBestAction[] = [];
  actionsLoading = false;
  generating = false;
  actionUpdateLoading = false;
  actionsError: string | null = null;

  constructor(
    private router: Router,
    private dataRoomApi: DataRoomApiService,
    private nextBestActionService: NextBestActionService,
    private authService: AuthService
  ) {}

  get alertClass(): string {
    switch (this.card.alertLevel) {
      case 'RED':
        return 'alert-red';
      case 'YELLOW':
        return 'alert-yellow';
      default:
        return 'alert-none';
    }
  }

  get canOpenHolding(): boolean {
    return !!this.card.requestId && this.card.status === 'DUE_DILIGENCE';
  }

  get canOpenDataRoom(): boolean {
    return !!this.card.id && this.card.status === 'NEGOTIATION';
  }

  get isInvestor(): boolean {
    return this.authService.hasRole('INVESTOR');
  }

  get currentInvestorName(): string {
    if (this.isInvestor) {
      return 'Current Investor'; // Investors don't need to see their own name
    }
    
    // For entrepreneurs, show the investor name from the card or fallback to email
    return this.card.investorName || this.authService.getEmail() || 'Unknown Investor';
  }

  get statusLabel(): string {
    switch (this.card.status) {
      case 'DISCOVERY':
        return 'Discovery';
      case 'CONTACTED':
        return 'Contacted';
      case 'NEGOTIATION':
        return 'Negotiation';
      case 'DUE_DILIGENCE':
        return 'Due diligence';
      case 'CLOSED':
        return 'Closed';
      case 'REJECTED':
        return 'Rejected';
      default:
        return this.card.status;
    }
  }

  toggleDetails(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.loadActions();
    }
  }

  openHolding(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.card.requestId) return;
    this.router.navigate(['/investment/holding/request', this.card.requestId]);
  }

  openDataRoom(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.card.id) return;

    this.dataRoomApi.ensureRoomForDeal(String(this.card.id)).subscribe({
      next: (room) => {
        if (!room.id) {
          alert('Unable to open the data room for this deal.');
          return;
        }
        this.router.navigate(['/investment/data-room', room.id]);
      },
      error: () => {
        alert('Unable to open the data room for this deal.');
      }
    });
  }

  generateRecommendation(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.card.requestId || this.generating) return;

    this.generating = true;
    this.actionsError = null;

    this.nextBestActionService.generateAIAction(String(this.card.requestId)).subscribe({
      next: (action) => {
        this.actions = [action, ...this.actions.filter((item) => item.id !== action.id)];
        this.generating = false;
      },
      error: () => {
        this.actionsError = 'Unable to generate the AI recommendation.';
        this.generating = false;
      }
    });
  }

  markDone(actionId: string): void {
    if (this.actionUpdateLoading) return;
    this.actionUpdateLoading = true;
    this.actionsError = null;

    this.nextBestActionService.markDone(actionId).subscribe({
      next: (updated) => {
        this.replaceAction(updated);
        this.actionUpdateLoading = false;
      },
      error: () => {
        this.actionsError = 'Unable to update this action.';
        this.actionUpdateLoading = false;
      }
    });
  }

  ignoreAction(actionId: string): void {
    if (this.actionUpdateLoading) return;
    this.actionUpdateLoading = true;
    this.actionsError = null;

    this.nextBestActionService.ignore(actionId).subscribe({
      next: (updated) => {
        this.replaceAction(updated);
        this.actionUpdateLoading = false;
      },
      error: () => {
        this.actionsError = 'Unable to update this action.';
        this.actionUpdateLoading = false;
      }
    });
  }

  private loadActions(): void {
    if (!this.card.requestId) {
      this.actions = [];
      return;
    }

    this.actionsLoading = true;
    this.actionsError = null;

    this.nextBestActionService.getActions(String(this.card.requestId)).subscribe({
      next: (actions) => {
        this.actions = actions ?? [];
        this.actionsLoading = false;
      },
      error: () => {
        this.actions = [];
        this.actionsError = 'Unable to load recommendations for this deal.';
        this.actionsLoading = false;
      }
    });
  }

  private replaceAction(updated: NextBestAction): void {
    this.actions = this.actions.map((item) => item.id === updated.id ? updated : item);
  }
}
