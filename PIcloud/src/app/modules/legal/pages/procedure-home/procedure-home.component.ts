import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import { ProcedureTypeOverview } from '../../../../models/procedure-type.model';

@Component({
  selector: 'app-procedure-home',              // ✅ corrigé
  templateUrl: './procedure-home.component.html', // ✅ corrigé
  styleUrls: ['./procedure-home.component.css']
})
export class ProcedureHomeComponent implements OnInit {
  procedureTypes: ProcedureTypeOverview[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private readonly service: LegalProcedureService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  loadOverview(): void {
    this.loading = true;
    this.errorMessage = '';
    this.service.getProcedureTypesOverview().subscribe({
      next: (data) => {
        this.procedureTypes = data;
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage = error?.error?.message || 'Erreur lors du chargement.';
        this.loading = false;
      }
    });
  }

  createProcedure(type: string): void {
    this.router.navigate(['/legal-procedures/new'], { queryParams: { type } });
  }

  getProcedureIconClass(type: string): string {
    const map: Record<string, string> = {
      SARL: 'icon-sarl', SUARL: 'icon-suarl', LABEL_STARTUP: 'icon-startup',
      PI: 'icon-pi', FISCALITE: 'icon-fiscalite', CONFORMITE: 'icon-conformite'
    };
    return map[type] || 'icon-autre';
  }

  getProcedureShortLabel(type: string): string {
    const map: Record<string, string> = {
      SARL: 'SA', SUARL: 'SU', LABEL_STARTUP: 'ST',
      PI: 'PI', FISCALITE: 'FI', CONFORMITE: 'CO'
    };
    return map[type] || 'AU';
  }

  get totalProcedures(): number {
    return this.procedureTypes.reduce((sum, item) => sum + item.procedureCount, 0);
  }

  getDescription(type: string): string {
    const map: Record<string, string> = {
      SARL: 'Constitution d\'une société à responsabilité limitée.',
      SUARL: 'Création d\'une société unipersonnelle.',
      LABEL_STARTUP: 'Obtention du label startup.',
      PI: 'Protection des actifs immatériels.',
      FISCALITE: 'Gestion des obligations fiscales.',
      CONFORMITE: 'Mise en conformité réglementaire.'
    };
    return map[type] || 'Procédure juridique spécifique.';
  }
}