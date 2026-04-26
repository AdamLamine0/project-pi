import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LegalProcedureResponse,
  ProcedureStatus,
  STATUS_LABELS
} from '../../../../models/legal-procedure.model';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-legal-procedure-list',
  templateUrl: './legal-procedure-list.component.html',
  standalone: false,
  styleUrls: ['./legal-procedure-list.component.css']
})
export class LegalProcedureListComponent implements OnInit {

  procedures: LegalProcedureResponse[] = [];
  filteredProcedures: LegalProcedureResponse[] = [];
  selectedStatus = '';
  loading = false;
  errorMessage = '';

  readonly statuses: ProcedureStatus[] = [
    'BROUILLON', 'EN_COURS', 'EN_ATTENTE_EXPERT', 'COMPLETE', 'REFUSE'
  ];
  readonly statusLabels = STATUS_LABELS;

  private readonly userId: number;

  constructor(
    private readonly service: LegalProcedureService,
    private readonly router: Router,
    private readonly auth: AuthService
  ) {
    this.userId = this.auth.getUserId();
  }

  ngOnInit(): void {
    this.loadProcedures();
  }

  loadProcedures(): void {
    this.loading = true;
    this.errorMessage = '';

    this.service.getMyProcedures(this.userId).subscribe({
      next: (data) => {
        this.procedures = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = err?.error?.message || 'Erreur lors du chargement.';
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    this.filteredProcedures = this.selectedStatus
      ? this.procedures.filter(p => p.status === this.selectedStatus)
      : [...this.procedures];
  }

  openCreate(): void {
    this.router.navigate(['/app/legal/new']);
  }

  submit(id: string): void {
    this.service.submit(id, this.userId).subscribe({
      next: () => this.loadProcedures(),
      error: (err: any) => {
        this.errorMessage = err?.error?.message || 'Erreur lors de la soumission.';
      }
    });
  }

  deleteDraft(id: string): void {
    if (!confirm('Supprimer ce dossier en brouillon ?')) return;
    this.service.deleteDraft(id, this.userId).subscribe({
      next: () => this.loadProcedures(),
      error: (err: any) => {
        this.errorMessage = err?.error?.message || 'Erreur lors de la suppression.';
      }
    });
  }

  getStatusClass(status: ProcedureStatus): string {
    return `status-${status.toLowerCase().replace(/_/g, '-')}`;
  }
}


