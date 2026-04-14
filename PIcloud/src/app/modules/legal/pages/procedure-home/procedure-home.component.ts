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
  switch (type) {
    case 'SARL':
      return "Constitution d'une société à responsabilité limitée avec gestion des statuts, capital et immatriculation.";
    case 'SUARL':
      return "Création d'une société unipersonnelle permettant à un entrepreneur d'exercer avec responsabilité limitée.";
    case 'LABEL_STARTUP':
      return "Procédure d'obtention du label startup incluant dossier technique, juridique et financier.";
    case 'PI':
      return "Protection des actifs immatériels tels que marque, brevet ou dessin industriel.";
    case 'FISCALITE':
      return "Gestion des obligations fiscales et constitution des dossiers déclaratifs et justificatifs.";
    case 'CONFORMITE':
      return "Vérification et mise en conformité avec les exigences légales et réglementaires.";
    default:
      return "Procédure juridique spécifique nécessitant un traitement personnalisé.";
  }
}
}