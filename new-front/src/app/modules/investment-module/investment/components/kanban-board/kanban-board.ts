import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DealsService } from '../../services/deals.service';
import { DealPipeline, DealStatus, KanbanBoardResponse, MoveDealPayload } from '../../models/deal-kanban.models';
import { STARTUP_CATALOG_BY_ID } from '../../models/startup-catalog';
import { KanbanColumn, KanbanDropEvent } from '../kanban-column/kanban-column';

@Component({
  selector: 'app-kanban-board',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, DragDropModule, KanbanColumn],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.css',
})
export class KanbanBoard implements OnInit {
  investorId = 'dev-investor';
  loading = false;
  error: string | null = null;

  readonly statuses: DealStatus[] = [
    'DISCOVERY',
    'CONTACTED',
    'NEGOTIATION',
    'DUE_DILIGENCE',
    'CLOSED',
    'REJECTED',
  ];

  readonly statusTitles: Record<DealStatus, string> = {
    DISCOVERY: 'Decouverte',
    CONTACTED: 'Contact etabli',
    NEGOTIATION: 'Negociation',
    DUE_DILIGENCE: 'Verification finale',
    CLOSED: 'Cloture',
    REJECTED: 'Rejete',
  };

  private readonly statusOrder: DealStatus[] = this.statuses;

  columns: Record<DealStatus, DealPipeline[]> = this.emptyColumns();

  constructor(private dealService: DealsService) {}

  ngOnInit(): void {
    this.loadBoard();
  }

  loadBoard() {
    this.loading = true;
    this.error = null;

    console.log('Loading Kanban board for investorId:', this.investorId);
    
    this.dealService.getKanban(this.investorId).subscribe({
      next: (res) => {
        console.log('Kanban API response:', res);
        this.columns = this.normalizeBoard(res);
        console.log('Normalized columns:', this.columns);
        this.loading = false;
      },
      error: (err) => {
        console.error('Kanban API error:', err);
        this.error = 'Impossible de charger le tableau kanban.';
        this.columns = this.emptyColumns();
        this.loading = false;
      }
    });
  }

  get connectedDropListIds(): string[] {
    return this.statuses.map((s) => `kanban-${s}`);
  }

  onColumnDropped(evt: KanbanDropEvent) {
    const newStatus = evt.status;

    // Explicit constraint: do not allow moving to ACCEPTED (even if backend ever adds it)
    if ((newStatus as unknown as string) === 'ACCEPTED') {
      return;
    }

    const dropEvent = evt.drop as CdkDragDrop<DealPipeline[]>;
    const movedDeal = dropEvent.item.data as DealPipeline;
    const fromIndex = this.statusOrder.indexOf(movedDeal.status);
    const toIndex = this.statusOrder.indexOf(newStatus);

    if (
      dropEvent.previousContainer !== dropEvent.container &&
      (movedDeal.status === 'CLOSED' || movedDeal.status === 'REJECTED')
    ) {
      this.error = 'Les deals clotures ou rejetes ne peuvent plus changer de statut.';
      this.loadBoard();
      return;
    }

    if (
      dropEvent.previousContainer !== dropEvent.container &&
      movedDeal.status === 'CLOSED' &&
      newStatus === 'REJECTED'
    ) {
      this.error = 'Un deal cloture ne peut pas etre rejete.';
      this.loadBoard();
      return;
    }

    if (dropEvent.previousContainer !== dropEvent.container && toIndex < fromIndex) {
      this.error = 'Impossible de ramener un deal vers un statut precedent.';
      this.loadBoard();
      return;
    }

    if (dropEvent.previousContainer === dropEvent.container) {
      // Reorder within same column
      if (dropEvent.previousIndex === dropEvent.currentIndex) return;
      moveItemInArray(dropEvent.container.data, dropEvent.previousIndex, dropEvent.currentIndex);
    } else {
      // Move between columns
      transferArrayItem(
        dropEvent.previousContainer.data,
        dropEvent.container.data,
        dropEvent.previousIndex,
        dropEvent.currentIndex
      );
    }

    const payload: MoveDealPayload = {
      dealId: movedDeal.id,
      newStatus,
      newColumnOrder: dropEvent.currentIndex,
    };

    this.dealService.moveCard(payload).subscribe({
      next: () => this.loadBoard(),
      error: () => this.loadBoard(),
    });
  }

  private emptyColumns(): Record<DealStatus, DealPipeline[]> {
    return this.statuses.reduce((acc, status) => {
      acc[status] = [];
      return acc;
    }, {} as Record<DealStatus, DealPipeline[]>);
  }

  private normalizeBoard(res: KanbanBoardResponse): Record<DealStatus, DealPipeline[]> {
    const base = this.emptyColumns();

    const fromColumns = res?.columns;
    if (fromColumns && typeof fromColumns === 'object') {
      for (const status of this.statuses) {
        const cards = fromColumns[status] ?? [];
        base[status] = this.sortCards(cards);
      }
      return base;
    }

    // Support `{ DISCOVERY: [...], CONTACTED: [...] }`
    let looksLikeStatusMap = true;
    for (const status of this.statuses) {
      if (!(status in (res as any))) {
        looksLikeStatusMap = false;
        break;
      }
    }
    if (looksLikeStatusMap) {
      for (const status of this.statuses) {
        base[status] = this.sortCards(((res as any)[status] ?? []) as DealPipeline[]);
      }
      return base;
    }

    // Support flat list `{ deals: [...] }`
    const deals = (res?.deals ?? []) as DealPipeline[];
    for (const deal of deals) {
      if (this.statuses.includes(deal.status)) {
        base[deal.status].push(deal);
      }
    }
    for (const status of this.statuses) {
      base[status] = this.sortCards(base[status]);
    }
    return base;
  }

  private sortCards(cards: DealPipeline[]): DealPipeline[] {
    return [...(cards ?? [])].sort((a, b) => {
      const ao = a.columnOrder ?? 0;
      const bo = b.columnOrder ?? 0;
      if (ao !== bo) return ao - bo;
      return String(a.id).localeCompare(String(b.id));
    }).map((card) => this.enrichCard(card));
  }

  private enrichCard(card: DealPipeline): DealPipeline {
    const startup = card.startupId ? STARTUP_CATALOG_BY_ID[card.startupId] : undefined;
    return {
      ...card,
      startupName: startup?.name ?? card.startupName ?? card.startupId,
      startupSector: startup?.sector ?? card.startupSector,
    };
  }
}
