import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LegalProcedureResponse, ProcedureStatus, STATUS_LABELS } from '../../../../models/legal-procedure.model';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';

// ⚠️ Remplacez par la vraie récupération depuis votre AuthService
const CURRENT_USER_ID = 'entrepreneur-uuid-placeholder';

@Component({
  selector: 'app-legal-procedure-list',
  templateUrl: './legal-procedure-list.component.html',
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

  constructor(
    private readonly service: LegalProcedureService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadProcedures();
  }

  loadProcedures(): void {
    this.loading = true;
    this.errorMessage = '';

    // Charge uniquement les dossiers de l'entrepreneur connecté
    this.service.getMyProcedures(CURRENT_USER_ID).subscribe({
      next: (data) => {
        this.procedures = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
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
    this.router.navigate(['/legal-procedures/new']);
  }

  submit(id: string): void {
    this.service.submit(id, CURRENT_USER_ID).subscribe({
      next: () => this.loadProcedures(),
      error: (err) => this.errorMessage = err?.error?.message || 'Erreur lors de la soumission.'
    });
  }

  deleteDraft(id: string): void {
    if (!confirm('Supprimer ce dossier en brouillon ?')) return;
    this.service.deleteDraft(id, CURRENT_USER_ID).subscribe({
      next: () => this.loadProcedures(),
      error: (err) => this.errorMessage = err?.error?.message || 'Erreur lors de la suppression.'
    });
  }

  getStatusClass(status: ProcedureStatus): string {
    return `status-${status.toLowerCase().replace(/_/g, '-')}`;
  }
}
