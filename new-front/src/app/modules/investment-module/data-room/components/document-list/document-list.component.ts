import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideDownload,
  lucideEye,
  lucideFileImage,
  lucideFileText,
  lucideFolderOpen,
  lucidePresentation,
  lucideTable,
} from '@ng-icons/lucide';
import { DataRoomDocument } from '../../models/data-room.models';

@Component({
  selector: 'app-document-list',
  imports: [CommonModule, MatListModule, MatButtonModule, MatProgressSpinnerModule, MatTableModule, NgIconComponent],
  providers: [
    provideIcons({
      lucideDownload,
      lucideEye,
      lucideFileImage,
      lucideFileText,
      lucideFolderOpen,
      lucidePresentation,
      lucideTable,
    }),
  ],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  @Input() documents: DataRoomDocument[] = [];
  @Input() loading = false;

  @Output() view = new EventEmitter<DataRoomDocument>();
  @Output() download = new EventEmitter<DataRoomDocument>();

  formatDate(iso: string): string {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  iconFor(type: string): string {
    const normalized = (type || '').toLowerCase();
    if (normalized.includes('sheet') || normalized.includes('excel') || normalized.includes('csv')) return 'lucideTable';
    if (normalized.includes('image') || normalized.includes('png') || normalized.includes('jpg')) return 'lucideFileImage';
    if (normalized.includes('presentation') || normalized.includes('powerpoint')) return 'lucidePresentation';
    return 'lucideFileText';
  }

  toneFor(type: string): string {
    const normalized = (type || '').toLowerCase();
    if (normalized.includes('pdf')) return 'pdf';
    if (normalized.includes('sheet') || normalized.includes('excel') || normalized.includes('csv')) return 'sheet';
    if (normalized.includes('image') || normalized.includes('png') || normalized.includes('jpg')) return 'image';
    return 'default';
  }
}
