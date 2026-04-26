import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import {
  ChecklistResponse,
  LegalDocumentResponse,
  LegalProcedureResponse,
  PROCEDURE_TYPE_LABELS,
  STATUS_LABELS,
} from '../../../../models/legal-procedure.model';

@Component({
  selector: 'app-expert-procedures',
  templateUrl: './expert-procedures.component.html',
  standalone: false,
  styleUrls: ['./expert-procedures.component.css']
})
export class ExpertProceduresComponent implements OnInit {

  procedures: LegalProcedureResponse[] = [];
  selectedProcedure?: LegalProcedureResponse;
  selectedChecklist?: ChecklistResponse;
  selectedDocument?: LegalDocumentResponse;
  decisionForm!: FormGroup;

  entrepreneurNames: Record<number, string> = {};

  loading = false;
  detailLoading = false;
  submitting = false;
  errorMessage = '';
  successMessage = '';

  readonly statusLabels = STATUS_LABELS;
  readonly procedureTypeLabels = PROCEDURE_TYPE_LABELS;

  private readonly expertId: number;

  constructor(
    private readonly service: LegalProcedureService,
    private readonly users: UserService,
    private readonly fb: FormBuilder,
    private readonly auth: AuthService
  ) {
    this.expertId = this.auth.getUserId();
  }

  ngOnInit(): void {
    this.decisionForm = this.fb.group({
      approved: [null, Validators.required],
      remark: ['']
    });
    this.loadAssigned();
  }

  loadAssigned(): void {
    this.loading = true;
    this.errorMessage = '';

    this.service.getAssignedProcedures(this.expertId).subscribe({
      next: (data) => {
        this.procedures = data;
        this.loading = false;
        this.loadEntrepreneurNames(data);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors du chargement.';
        this.loading = false;
      }
    });
  }

  selectProcedure(p: LegalProcedureResponse): void {
    this.selectedProcedure = p;
    this.selectedChecklist = undefined;
    this.selectedDocument = undefined;
    this.detailLoading = true;
    this.decisionForm.reset();
    this.errorMessage = '';
    this.successMessage = '';

    forkJoin({
      procedure: this.service.getById(p.id).pipe(catchError(() => of(p))),
      checklist: this.service.getChecklist(p.id).pipe(catchError(() => of(undefined)))
    }).subscribe({
      next: ({ procedure, checklist }) => {
        this.selectedProcedure = procedure;
        this.selectedChecklist = checklist;
        this.selectedDocument = procedure.documents?.[0];
        this.detailLoading = false;
        this.loadEntrepreneurNames([procedure]);
      },
      error: () => {
        this.detailLoading = false;
      }
    });
  }

  submitDecision(): void {
    if (!this.selectedProcedure || this.decisionForm.invalid) return;
    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { approved, remark } = this.decisionForm.value;
    const isApproved = approved === 'true' || approved === true;

    this.service.applyExpertDecision(
      this.selectedProcedure.id,
      { approved: isApproved, remark: remark || null },
      this.expertId
    ).subscribe({
      next: () => {
        this.successMessage = isApproved ? 'Dossier valide.' : 'Dossier refuse.';
        this.submitting = false;
        this.selectedProcedure = undefined;
        this.selectedChecklist = undefined;
        this.selectedDocument = undefined;
        this.loadAssigned();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors de la decision.';
        this.submitting = false;
      }
    });
  }

  entrepreneurName(id: number): string {
    return this.entrepreneurNames[id] || `Entrepreneur #${id}`;
  }

  documentLabel(document: LegalDocumentResponse): string {
    const item = this.selectedChecklist?.items.find(i => i.code === document.requirementCode);
    return item?.label || document.documentType || document.requirementCode;
  }

  documentDescription(document: LegalDocumentResponse): string {
    const item = this.selectedChecklist?.items.find(i => i.code === document.requirementCode);
    return item?.description || '';
  }

  selectDocument(document: LegalDocumentResponse): void {
    this.selectedDocument = document;
  }

  isPdf(document?: LegalDocumentResponse): boolean {
    return !!document && this.fileExtension(document.fileUrl) === 'pdf';
  }

  isImage(document?: LegalDocumentResponse): boolean {
    return !!document && ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'].includes(this.fileExtension(document.fileUrl));
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace(/_/g, '-')}`;
  }

  private loadEntrepreneurNames(procedures: LegalProcedureResponse[]): void {
    const ids = Array.from(new Set(
      procedures
        .map(p => p.entrepreneurId)
        .filter(id => !!id && !this.entrepreneurNames[id])
    ));

    ids.forEach(id => {
      this.users.getUserById(id)
        .then((user: User) => {
          this.entrepreneurNames[id] = `${user.name || ''} ${user.prenom || ''}`.trim() || user.email || `Entrepreneur #${id}`;
        })
        .catch(() => {
          this.entrepreneurNames[id] = `Entrepreneur #${id}`;
        });
    });
  }

  private fileExtension(url: string): string {
    const cleanUrl = (url || '').split('?')[0].split('#')[0];
    const index = cleanUrl.lastIndexOf('.');
    return index >= 0 ? cleanUrl.substring(index + 1).toLowerCase() : '';
  }
}


