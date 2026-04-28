import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LegalProcedureResponse,
  ProcedureType,
  ProcedureStatus,
  PROCEDURE_TYPE_LABELS,
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
  searchTerm = '';
  selectedType = '';
  selectedStatus = '';
  loading = false;
  errorMessage = '';

  readonly statuses: ProcedureStatus[] = [
    'BROUILLON', 'EN_COURS', 'EN_ATTENTE_EXPERT', 'COMPLETE', 'REFUSE'
  ];
  readonly statusLabels = STATUS_LABELS;
  readonly procedureTypeLabels = PROCEDURE_TYPE_LABELS;
  readonly procedureTypes: ProcedureType[] = [
    'SARL', 'SUARL', 'LABEL_STARTUP', 'PI', 'FISCALITE', 'CONFORMITE'
  ];

  private readonly userId: number;

  constructor(
    private readonly service: LegalProcedureService,
    private readonly router: Router,
    public readonly auth: AuthService,
    private readonly cdr: ChangeDetectorRef
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
        this.procedures = this.sortByCreatedAtDesc(data);
        this.loading = false;
        this.applyFilter();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.errorMessage = err?.error?.message || 'An error occurred while loading cases.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilter(): void {
    const query = this.normalize(this.searchTerm);

    this.filteredProcedures = this.procedures.filter(procedure => {
      const matchesSearch = !query || this.normalize(procedure.projectName).includes(query);
      const matchesStatus = !this.selectedStatus || procedure.status === this.selectedStatus;
      const matchesType = !this.selectedType || procedure.procedureType === this.selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }

  openCreate(): void {
    this.router.navigate([this.auth.isAdmin() ? '/app/legal/new' : '/procedures/new']);
  }

  submit(id: string): void {
    this.service.submit(id, this.userId).subscribe({
      next: () => this.loadProcedures(),
      error: (err: any) => {
        this.errorMessage = err?.error?.message || 'An error occurred while submitting the case.';
      }
    });
  }

  deleteDraft(id: string): void {
    if (!confirm('Delete this draft case?')) return;
    this.service.deleteDraft(id, this.userId).subscribe({
      next: () => this.loadProcedures(),
      error: (err: any) => {
        this.errorMessage = err?.error?.message || 'An error occurred while deleting the case.';
      }
    });
  }

  getStatusClass(status: ProcedureStatus): string {
    return `status-${status.toLowerCase().replace(/_/g, '-')}`;
  }

  private sortByCreatedAtDesc(procedures: LegalProcedureResponse[]): LegalProcedureResponse[] {
    return [...procedures].sort((a, b) =>
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  private normalize(value: string | null | undefined): string {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}


