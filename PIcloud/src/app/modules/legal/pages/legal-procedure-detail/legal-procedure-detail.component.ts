import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import { DocumentStatus, LegalProcedure, ProcedureStatus } from '../../../../models/legal-procedure.model';

@Component({
  selector: 'app-legal-procedure-detail',
  templateUrl: './legal-procedure-detail.component.html',
  styleUrls: ['./legal-procedure-detail.component.css']
})
export class LegalProcedureDetailComponent implements OnInit {
  procedure?: LegalProcedure;
  statusForm!: FormGroup;
  documentForm!: FormGroup;
  selectedFile: File | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  readonly statuses: ProcedureStatus[] = [
    'BROUILLON',
    'EN_COURS',
    'EN_ATTENTE_INSTITUTION',
    'VALIDE_PARTIELLEMENT',
    'COMPLETE',
    'ABANDONNE',
    'REFUSE',
    'ARCHIVE'
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: LegalProcedureService,
    private readonly fb: FormBuilder,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      status: ['', Validators.required]
    });

    this.documentForm = this.fb.group({
      documentType: ['', Validators.required],
      expiresAt: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProcedure(id);
    }
  }

  goBack(): void {
    this.location.back();
  }

  loadProcedure(id: string): void {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (data) => {
        this.procedure = data;
        this.statusForm.patchValue({ status: data.status });
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Erreur lors du chargement du dossier.';
        this.loading = false;
      }
    });
  }

  updateStatus(): void {
    if (!this.procedure || this.statusForm.invalid) return;

    this.errorMessage = '';
    this.successMessage = '';

    this.service.changeStatus(this.procedure.id, this.statusForm.value).subscribe({
      next: (data) => {
        this.procedure = data;
        this.successMessage = 'Statut mis à jour avec succès.';
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Erreur lors du changement de statut.';
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadDocument(): void {
    if (!this.procedure || this.documentForm.invalid || !this.selectedFile) {
      this.errorMessage = 'Veuillez sélectionner un fichier et renseigner le type de document.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    const { documentType, expiresAt } = this.documentForm.value;

    this.service.uploadDocument(
      this.procedure.id,
      documentType,
      this.selectedFile,
      expiresAt || undefined
    ).subscribe({
      next: () => {
        this.successMessage = 'Document téléversé avec succès.';
        this.documentForm.reset();
        this.selectedFile = null;
        this.loadProcedure(this.procedure!.id);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Erreur lors du téléversement du document.';
      }
    });
  }

  updateDocumentStatus(documentId: string, status: DocumentStatus): void {
    if (!this.procedure) return;

    this.service.updateDocumentStatus(this.procedure.id, documentId, { status }).subscribe({
      next: () => {
        this.successMessage = 'Statut du document mis à jour.';
        this.loadProcedure(this.procedure!.id);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Erreur de mise à jour du document.';
      }
    });
  }

  deleteDocument(documentId: string): void {
    if (!this.procedure) return;

    this.service.deleteDocument(this.procedure.id, documentId).subscribe({
      next: () => {
        this.successMessage = 'Document supprimé.';
        this.loadProcedure(this.procedure!.id);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Erreur de suppression du document.';
      }
    });
  }
}