import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProcedureType,
  PROCEDURE_TYPE_LABELS,
  PROCEDURE_TYPE_DESCRIPTIONS,
} from '../../../../models/legal-procedure.model';

@Component({
  selector: 'app-procedure-home',
  templateUrl: './procedure-home.component.html',
  styleUrls: ['./procedure-home.component.css']
})
export class ProcedureHomeComponent implements OnInit {

  // Données 100% statiques — plus d'appel à /procedure-types/overview
  readonly procedureTypes: ProcedureType[] = [
    'SARL',
    'SUARL',
    'LABEL_STARTUP',
    'PI',
    'FISCALITE',
    'CONFORMITE',
    'AUTRE',
  ];

  readonly labels = PROCEDURE_TYPE_LABELS;
  readonly descriptions = PROCEDURE_TYPE_DESCRIPTIONS;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  createProcedure(type: ProcedureType): void {
    this.router.navigate(['/legal-procedures/new'], { queryParams: { type } });
  }

  getProcedureIcon(type: ProcedureType): string {
    const icons: Record<ProcedureType, string> = {
      SARL:                  '🏢',
      SUARL:                 '🏢',
      LABEL_STARTUP:         '🚀',
      PI: '📋',
      FISCALITE:    '📝',
      CONFORMITE:           '✅',
      AUTRE:           '📁',
    };
    return icons[type] || '📁';
  }
}
