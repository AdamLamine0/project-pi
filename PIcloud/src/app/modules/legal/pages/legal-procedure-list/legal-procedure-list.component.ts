import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LegalProcedure, ProcedureStatus } from '../../../../models/legal-procedure.model';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';

@Component({
  selector: 'app-legal-procedure-list',
  templateUrl: './legal-procedure-list.component.html',
  styleUrls: ['./legal-procedure-list.component.css']
})
export class LegalProcedureListComponent implements OnInit {
  procedures: LegalProcedure[] = [];
  filteredProcedures: LegalProcedure[] = [];
  selectedStatus = '';
  loading = false;
  errorMessage = '';

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
    private readonly procedureService: LegalProcedureService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadProcedures();
  }
  getStatusClass(status: string): string {
  return `status-${status}`;
}
  loadProcedures(): void {
    this.loading = true;
    this.errorMessage = '';

    this.procedureService.getAll().subscribe({
      next: (data) => {
        this.procedures = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Erreur lors du chargement.';
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

  archive(id: string): void {
    this.procedureService.archive(id).subscribe({
      next: () => this.loadProcedures(),
      error: (error) => this.errorMessage = error?.error?.message || 'Erreur lors de l’archivage.'
    });
  }

  deleteDraft(id: string): void {
    this.procedureService.deleteDraft(id).subscribe({
      next: () => this.loadProcedures(),
      error: (error) => this.errorMessage = error?.error?.message || 'Erreur lors de la suppression.'
    });
  }
}