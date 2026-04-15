import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

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

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    const role = this.auth.getRole();

    // expert → redirect to assigned procedures
    if (role === 'EXPERT') {
      this.router.navigate(['/legal-procedures/expert']);
    }
  }

  createProcedure(type: ProcedureType): void {
    const role = this.auth.getRole();

    // only entrepreneur can create
    if (role !== 'ENTREPRENEUR') {
      this.router.navigate(['/legal-procedures/expert']);
      return;
    }

    this.router.navigate(
      ['/legal-procedures/new'],
      { queryParams: { type } }
    );
  }

  getProcedureIcon(type: ProcedureType): string {
    const icons: Record<ProcedureType, string> = {
      SARL: '🏢',
      SUARL: '🏢',
      LABEL_STARTUP: '🚀',
      PI: '📋',
      FISCALITE: '📝',
      CONFORMITE: '✅',
      AUTRE: '📁',
    };
    return icons[type] || '📁';
  }
}