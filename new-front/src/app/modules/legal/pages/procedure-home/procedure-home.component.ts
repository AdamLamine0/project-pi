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
  standalone: false,
  styleUrls: ['./procedure-home.component.css']
})
export class ProcedureHomeComponent implements OnInit {

  readonly procedureTypes: ProcedureType[] = [
    'SARL', 'SUARL', 'LABEL_STARTUP', 'PI', 'FISCALITE', 'CONFORMITE', 'AUTRE'
  ];

  readonly labels       = PROCEDURE_TYPE_LABELS;
  readonly descriptions = PROCEDURE_TYPE_DESCRIPTIONS;

  constructor(
    private readonly router: Router,
    public readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    // Redirection automatique selon le rôle dès l'entrée dans le module
    if (this.auth.isExpert()) {
      this.router.navigate(['/app/legal/expert/assigned']); // ✅ corrigé
    } 
    
    // USER, MENTOR, INVESTOR etc. → reste sur la home (page vitrine)
  }

  createProcedure(type: ProcedureType): void {
    if (!this.auth.isEntrepreneur() && !this.auth.isAdmin()) {
      // Non entrepreneur → redirige sans créer
      this.router.navigate(['/app/legal/expert/assigned']); // ✅ corrigé
      return;
    }

    this.router.navigate(
      ['/app/legal/new'],
      { queryParams: { type } }
    );
  }

  getProcedureIcon(type: ProcedureType): string {
    const icons: Record<ProcedureType, string> = {
      SARL:          '🏢',
      SUARL:         '🏢',
      LABEL_STARTUP: '🚀',
      PI:            '📋',
      FISCALITE:     '📝',
      CONFORMITE:    '✅',
      AUTRE:         '📁',
    };
    return icons[type] ?? '📁';
  }
}


