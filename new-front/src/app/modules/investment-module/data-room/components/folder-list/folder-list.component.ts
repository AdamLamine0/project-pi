import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideChartColumn,
  lucideFolderOpen,
  lucideGavel,
  lucideGlobe,
  lucidePackage,
  lucideUsers,
} from '@ng-icons/lucide';
import {
  DATA_ROOM_FOLDER_LABELS,
  DATA_ROOM_FOLDERS,
  DataRoomFolder,
} from '../../models/data-room.models';

@Component({
  selector: 'app-folder-list',
  imports: [CommonModule, MatListModule, NgIconComponent],
  providers: [
    provideIcons({
      lucideChartColumn,
      lucideFolderOpen,
      lucideGavel,
      lucideGlobe,
      lucidePackage,
      lucideUsers,
    }),
  ],
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css'],
})
export class FolderListComponent {
  readonly folders = DATA_ROOM_FOLDERS;
  readonly labels = DATA_ROOM_FOLDER_LABELS;

  @Input({ required: true }) selected!: DataRoomFolder;
  @Input() counts: Record<DataRoomFolder, number> | null = null;

  @Output() selectedChange = new EventEmitter<DataRoomFolder>();

  select(f: DataRoomFolder) {
    this.selectedChange.emit(f);
  }

  countFor(f: DataRoomFolder): number {
    return this.counts?.[f] ?? 0;
  }

  iconFor(f: DataRoomFolder): string {
    switch (f) {
      case 'FINANCIAL':
        return 'lucideChartColumn';
      case 'LEGAL':
        return 'lucideGavel';
      case 'PRODUCT':
        return 'lucidePackage';
      case 'TEAM':
        return 'lucideUsers';
      case 'MARKET':
        return 'lucideGlobe';
      default:
        return 'lucideFolderOpen';
    }
  }

  hintFor(f: DataRoomFolder): string {
    switch (f) {
      case 'FINANCIAL':
        return 'Statements, projections, and KPIs';
      case 'LEGAL':
        return 'Contracts, incorporation, and compliance';
      case 'PRODUCT':
        return 'Roadmap, demos, and specs';
      case 'TEAM':
        return 'Organization and hiring';
      case 'MARKET':
        return 'Research, traction, and competition';
      default:
        return '';
    }
  }
}
