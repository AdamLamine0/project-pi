import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DealPipeline, DealStatus } from '../../models/deal-kanban.models';
import { DealCard } from '../deal-card/deal-card';

export interface KanbanDropEvent {
  status: DealStatus;
  drop: CdkDragDrop<DealPipeline[]>;
}

@Component({
  selector: 'app-kanban-column',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, DragDropModule, DealCard],
  templateUrl: './kanban-column.html',
  styleUrl: './kanban-column.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanColumn {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) status!: DealStatus;
  @Input({ required: true }) connectedToIds!: string[];
  @Input({ required: true }) cards!: DealPipeline[];

  @Output() dropped = new EventEmitter<KanbanDropEvent>();

  get dropListId(): string {
    return `kanban-${this.status}`;
  }

  onDropped(drop: CdkDragDrop<DealPipeline[]>) {
    this.dropped.emit({ status: this.status, drop });
  }

  trackById(_: number, item: DealPipeline) {
    return item.id;
  }
}
