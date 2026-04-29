import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideBan, lucideCloudUpload, lucideLock } from '@ng-icons/lucide';
import { Subscription } from 'rxjs';
import { apiOrigin } from '../../../core/api-origin';
import {
  DATA_ROOM_FOLDER_LABELS,
  DATA_ROOM_FOLDERS,
  DataRoomDocument,
  DataRoomFolder,
  NdaAgreement,
  SignNdaPayload,
} from '../../models/data-room.models';
import { DataRoomApiService } from '../../services/data-room-api.service';
import { NdaService } from '../../services/nda.service';
import { NdaSignatureComponent } from '../nda-signature/nda-signature.component';
import { FolderListComponent } from '../folder-list/folder-list.component';
import { DocumentListComponent } from '../document-list/document-list.component';

@Component({
  selector: 'app-data-room',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatListModule, MatTableModule, MatProgressSpinnerModule, MatProgressBarModule, MatSnackBarModule, MatTooltipModule, NgIconComponent, NdaSignatureComponent, FolderListComponent, DocumentListComponent],
  providers: [provideIcons({ lucideBadgeCheck, lucideBan, lucideCloudUpload, lucideLock })],
  templateUrl: './data-room.component.html',
  styleUrls: ['./data-room.component.css'],
})
export class DataRoomComponent implements OnInit, OnDestroy {
  roomId = '';
  loading = true;
  ndaLoading = true;
  ndaBusy = false;
  uploadBusy = false;
  ndaError = '';
  canAccessDataRoom = false;

  ndaSigned = false;
  ndaAgreement: NdaAgreement | null = null;
  allDocuments: DataRoomDocument[] = [];
  selectedFolder: DataRoomFolder = 'FINANCIAL';

  readonly folderLabels = DATA_ROOM_FOLDER_LABELS;
  readonly folders = DATA_ROOM_FOLDERS;

  /** Bonus analytics (session) */
  viewedDocumentIds = new Set<string>();
  lastViewed: { fileName: string; at: Date } | null = null;

  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private api: DataRoomApiService,
    private ndaService: NdaService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap.subscribe((pm) => {
        const id = pm.get('roomId');
        if (id) {
          this.roomId = id;
          if (!this.isAllowedActor) {
            this.loading = false;
            this.ndaLoading = false;
            this.ndaError = 'Only investors and entrepreneurs can open this Data Room.';
            return;
          }
          this.loadNda();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get folderCounts(): Record<DataRoomFolder, number> {
    const acc = {} as Record<DataRoomFolder, number>;
    for (const f of this.folders) acc[f] = 0;
    for (const d of this.allDocuments) {
      acc[d.folder] = (acc[d.folder] ?? 0) + 1;
    }
    return acc;
  }

  get filteredDocuments(): DataRoomDocument[] {
    return this.allDocuments.filter((d) => d.folder === this.selectedFolder);
  }

  get totalDocuments(): number {
    return this.allDocuments.length;
  }

  get viewedCount(): number {
    return this.viewedDocumentIds.size;
  }

  get selectedFolderLabel(): string {
    return this.folderLabels[this.selectedFolder];
  }

  get isInvestorActor(): boolean {
    return this.currentRole() === 'INVESTOR';
  }

  get isEntrepreneurActor(): boolean {
    const role = this.currentRole();
    return role === 'ENTREPRENEUR' || role === 'STARTUP';
  }

  get isAllowedActor(): boolean {
    return this.isInvestorActor || this.isEntrepreneurActor;
  }

  get documentsUnlocked(): boolean {
    return this.canAccessDataRoom || this.isEntrepreneurActor;
  }

  get canUploadDocuments(): boolean {
    return this.isEntrepreneurActor && this.documentsUnlocked;
  }

  get accessStatusLabel(): string {
    if (!this.isAllowedActor) return 'Not allowed';
    if (this.isEntrepreneurActor) return 'Entrepreneur access';
    return this.documentsUnlocked ? 'Unlocked' : 'Locked';
  }

  get accessStatusHint(): string {
    if (!this.isAllowedActor) return 'Only investors and entrepreneurs can open this Data Room.';
    if (this.isEntrepreneurActor) return 'You can manage documents without signing the NDA.';
    return this.documentsUnlocked ? 'Documents are available.' : 'NDA signature required.';
  }

  loadRoom(silent = false): void {
    if (!this.roomId) return;
    if (!silent) {
      this.loading = true;
    }
    this.sub.add(
      this.api.getDataRoom(this.roomId).subscribe({
        next: (state) => {
          this.ndaSigned = state.ndaSigned;
          this.canAccessDataRoom = state.canAccessDataRoom;
          this.allDocuments = state.documents;
          this.loading = false;
          this.ndaLoading = false;
        },
        error: () => {
          this.loading = false;
          this.snack.open('Unable to load the Data Room', 'Close', { duration: 4000 });
        },
      })
    );
  }

  onNdaSign(): void {
    this.loadRoom();
  }

  onFolderChange(f: DataRoomFolder): void {
    this.selectedFolder = f;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || !this.canUploadDocuments) return;

    this.uploadBusy = true;
    this.sub.add(
      this.api.upload(this.roomId, this.selectedFolder, file).subscribe({
        next: () => {
          this.uploadBusy = false;
          input.value = '';
          this.snack.open('File uploaded', 'OK', { duration: 2500 });
          this.loadRoom(true);
        },
        error: () => {
          this.uploadBusy = false;
          input.value = '';
          this.snack.open('Upload failed', 'Close', { duration: 4000 });
        },
      })
    );
  }

  onView(doc: DataRoomDocument): void {
    const url = this.viewUrl(doc);
    this.sub.add(
      this.api.logDocumentView(this.roomId, doc.id).subscribe({
        next: () => {
          this.viewedDocumentIds.add(doc.id);
          this.lastViewed = { fileName: doc.fileName, at: new Date() };
          window.open(url, '_blank', 'noopener,noreferrer');
        },
        error: () => {
          this.snack.open('The view could not be logged due to a network error', 'Close', { duration: 3000 });
          window.open(url, '_blank', 'noopener,noreferrer');
        },
      })
    );
  }

  onDownload(doc: DataRoomDocument): void {
    const url = this.downloadUrl(doc);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.fileName;
    a.rel = 'noopener';
    a.target = '_blank';
    a.click();
  }

  private viewUrl(doc: DataRoomDocument): string {
    if (doc.viewUrl) return doc.viewUrl;
    return `${apiOrigin()}/api/data-room/${encodeURIComponent(this.roomId)}/documents/${encodeURIComponent(doc.id)}/view`;
  }

  private downloadUrl(doc: DataRoomDocument): string {
    if (doc.downloadUrl) return doc.downloadUrl;
    return `${apiOrigin()}/api/data-room/${encodeURIComponent(this.roomId)}/documents/${encodeURIComponent(doc.id)}/download`;
  }

  onSubmitNda(payload: SignNdaPayload): void {
    this.ndaBusy = true;
    this.ndaError = '';
    this.sub.add(
      this.ndaService.signNda(this.roomId, payload).subscribe({
        next: () => {
          this.ndaBusy = false;
          this.snack.open('NDA signed successfully', 'OK', { duration: 3000 });
          this.loadNda(true);
        },
        error: (err) => {
          this.ndaBusy = false;
          this.ndaError = err?.error?.error ?? 'NDA signature failed.';
        },
      })
    );
  }

  openCertificate(): void {
    this.sub.add(
      this.ndaService.getCertificate(this.roomId).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `nda-certificate-${this.roomId}.txt`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: () => {
          this.snack.open('Unable to retrieve the NDA certificate', 'Close', { duration: 4000 });
        },
      })
    );
  }

  private loadNda(silent = false): void {
    if (!this.roomId) return;
    if (!silent) {
      this.loading = true;
      this.ndaLoading = true;
    }

    this.sub.add(
      this.ndaService.getNda(this.roomId).subscribe({
        next: (agreement) => {
          this.ndaAgreement = agreement;
          this.ndaSigned = agreement.status === 'SIGNED';
          this.canAccessDataRoom = this.ndaSigned || this.isEntrepreneurActor;
          this.ndaError = '';
          this.ndaLoading = false;

          if (this.documentsUnlocked) {
            this.loadRoom(true);
            return;
          }

          this.loading = false;
          this.allDocuments = [];
        },
        error: (err) => {
          this.ndaLoading = false;
          this.loading = false;
          this.ndaError = err?.error?.error ?? 'Unable to load the NDA.';
        },
      })
    );
  }

  private currentRole(): string {
    const raw =
      this.safeStorageGet('app.currentUserRole') ||
      this.safeStorageGet('role') ||
      '';

    let fallback = '';
    for (const candidate of raw.split(',')) {
      const normalized = candidate.trim().replace(/^ROLE_/, '').toUpperCase();
      if (normalized === 'INVESTOR' || normalized === 'ENTREPRENEUR' || normalized === 'STARTUP') {
        return normalized;
      }
      if (normalized && !fallback) fallback = normalized;
    }

    return fallback;
  }

  private safeStorageGet(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  }
}
