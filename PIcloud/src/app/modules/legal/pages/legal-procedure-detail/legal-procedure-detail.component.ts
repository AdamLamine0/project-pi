import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import { AuthService } from '../../../../core/services/auth.service';
import {
  LegalProcedureResponse,
  ChecklistResponse,
  ChecklistItem,
  STATUS_LABELS,
  PROCEDURE_TYPE_LABELS,
} from '../../../../models/legal-procedure.model';

@Component({
  selector: 'app-legal-procedure-detail',
  templateUrl: './legal-procedure-detail.component.html',
  styleUrls: ['./legal-procedure-detail.component.css']
})
export class LegalProcedureDetailComponent implements OnInit {

  procedure?: LegalProcedureResponse;
  checklist?: ChecklistResponse;
  uploadForms: Record<string, FormGroup> = {};
  selectedFiles: Record<string, File> = {};

  loading = false;
  uploadingCode: string | null = null;
  errorMessage = '';
  successMessage = '';

  readonly statusLabels = STATUS_LABELS;
  readonly procedureTypeLabels = PROCEDURE_TYPE_LABELS;

  private readonly userId: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: LegalProcedureService,
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly auth: AuthService
  ) {
    this.userId = this.auth.getUserId();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadAll(id);
  }

  goBack(): void { this.location.back(); }

  loadAll(id: string): void {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (data) => {
        this.procedure = data;
        this.loadChecklist(id);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors du chargement du dossier.';
        this.loading = false;
      }
    });
  }

  loadChecklist(id: string): void {
    this.service.getChecklist(id).subscribe({
      next: (data) => {
        this.checklist = data;
        data.items.forEach(item => {
          if (!item.uploaded) {
            this.uploadForms[item.code] = this.fb.group({ expiresAt: [''] });
          }
        });
      },
      error: (err) => console.error('Erreur checklist', err)
    });
  }

  onFileSelected(event: Event, code: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.selectedFiles[code] = input.files[0];
  }

  uploadDocument(item: ChecklistItem): void {
    if (!this.procedure || !this.selectedFiles[item.code]) return;
    this.errorMessage = '';
    this.successMessage = '';
    this.uploadingCode = item.code;

    const expiresAt = this.uploadForms[item.code]?.value?.expiresAt || undefined;

    this.service.uploadDocument(
      this.procedure.id, item.code, this.selectedFiles[item.code], expiresAt
    ).subscribe({
      next: () => {
        this.successMessage = `"${item.label}" déposé avec succès.`;
        this.uploadingCode = null;
        delete this.selectedFiles[item.code];
        this.loadAll(this.procedure!.id);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors du téléversement.';
        this.uploadingCode = null;
      }
    });
  }

  deleteDocument(documentId: string): void {
    if (!this.procedure || !confirm('Supprimer ce document ?')) return;
    this.service.deleteDocument(this.procedure.id, documentId).subscribe({
      next: () => {
        this.successMessage = 'Document supprimé.';
        this.loadAll(this.procedure!.id);
      },
      error: (err) => this.errorMessage = err?.error?.message || 'Erreur de suppression.'
    });
  }

  submitProcedure(): void {
    if (!this.procedure) return;
    this.service.submit(this.procedure.id, this.userId).subscribe({
      next: (updated) => {
        this.procedure = updated;
        this.successMessage = 'Dossier soumis avec succès. Statut : EN COURS.';
      },
      error: (err) => this.errorMessage = err?.error?.message || 'Erreur lors de la soumission.'
    });
  }

  get allRequiredUploaded(): boolean {
    return !!this.checklist &&
      this.checklist.requiredCount > 0 &&
      this.checklist.uploadedCount >= this.checklist.requiredCount;
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace(/_/g, '-')}`;
  }
}