import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LegalProcedureResponse, STATUS_LABELS, PROCEDURE_TYPE_LABELS } from '../../../../models/legal-procedure.model';

@Component({
  selector: 'app-expert-procedures',
  templateUrl: './expert-procedures.component.html',
  styleUrls: ['./expert-procedures.component.css']
})
export class ExpertProceduresComponent implements OnInit {

  procedures: LegalProcedureResponse[] = [];
  selectedProcedure?: LegalProcedureResponse;
  decisionForm!: FormGroup;

  loading = false;
  submitting = false;
  errorMessage = '';
  successMessage = '';

  readonly statusLabels = STATUS_LABELS;
  readonly procedureTypeLabels = PROCEDURE_TYPE_LABELS;

  private readonly expertId: number;

  constructor(
    private readonly service: LegalProcedureService,
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
    this.service.getAssignedProcedures(this.expertId).subscribe({
      next: (data) => {
        this.procedures = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors du chargement.';
        this.loading = false;
      }
    });
  }

  selectProcedure(p: LegalProcedureResponse): void {
    this.selectedProcedure = p;
    this.decisionForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }

  submitDecision(): void {
    if (!this.selectedProcedure || this.decisionForm.invalid) return;
    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { approved, remark } = this.decisionForm.value;

    this.service.applyExpertDecision(
      this.selectedProcedure.id,
      { approved: approved === 'true' || approved === true, remark: remark || null },
      this.expertId
    ).subscribe({
      next: () => {
        this.successMessage = approved ? 'Dossier validé.' : 'Dossier refusé.';
        this.submitting = false;
        this.selectedProcedure = undefined;
        this.loadAssigned();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors de la décision.';
        this.submitting = false;
      }
    });
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace(/_/g, '-')}`;
  }
}