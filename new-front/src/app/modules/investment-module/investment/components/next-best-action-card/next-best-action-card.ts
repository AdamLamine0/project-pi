import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NextBestAction } from '../../models/next-best-action.model';

@Component({
  selector: 'app-next-best-action-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './next-best-action-card.html',
  styleUrl: './next-best-action-card.css',
})
export class NextBestActionCard {
  @Input({ required: true }) action!: NextBestAction;
  @Input() busy = false;
  @Output() done = new EventEmitter<string>();
  @Output() ignore = new EventEmitter<string>();
}
