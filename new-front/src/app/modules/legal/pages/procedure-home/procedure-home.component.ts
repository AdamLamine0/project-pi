import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import {
  LegalChatResponse,
  ProcedureType,
  PROCEDURE_TYPE_DESCRIPTIONS,
  PROCEDURE_TYPE_LABELS,
} from '../../../../models/legal-procedure.model';

@Component({
  selector: 'app-procedure-home',
  templateUrl: './procedure-home.component.html',
  standalone: false,
  styleUrls: ['./procedure-home.component.css'],
})
export class ProcedureHomeComponent implements OnInit {
  readonly procedureTypes: ProcedureType[] = [
    'SARL',
    'SUARL',
    'LABEL_STARTUP',
    'PI',
    'FISCALITE',
    'CONFORMITE',
  ];

  readonly labels = PROCEDURE_TYPE_LABELS;
  readonly descriptions = PROCEDURE_TYPE_DESCRIPTIONS;
  readonly advisorSuggestions = [
    'I want to create a company as a solo founder.',
    'I want to protect a brand or an idea.',
    'I want to apply for the Startup Label.',
    'I need to check whether my documents are compliant.',
  ];

  advisorQuestion = '';
  advisorSending = false;
  advisorAnswer = '';
  advisorError = '';

  constructor(
    private readonly router: Router,
    public readonly auth: AuthService,
    private readonly legalService: LegalProcedureService
  ) {}

  ngOnInit(): void {
    if (this.auth.isExpert()) {
      this.router.navigate(['/app/legal/expert/assigned']);
    }
  }

  createProcedure(type: ProcedureType): void {
    if (!this.auth.isEntrepreneur() && !this.auth.isAdmin()) {
      this.router.navigate(['/app/legal/expert/assigned']);
      return;
    }

    this.router.navigate(['/app/legal/new'], { queryParams: { type } });
  }

  askAdvisor(question?: string): void {
    const value = (question || this.advisorQuestion).trim();
    if (!value || this.advisorSending) {
      return;
    }

    this.advisorQuestion = question ? question : this.advisorQuestion;
    this.advisorSending = true;
    this.advisorError = '';

    this.legalService.askLegalChat({
      question: value,
      projectName: 'Legal procedure guidance',
      requiredDocuments: [],
      uploadedDocuments: [],
      missingDocuments: [],
      history: [],
    }).subscribe({
      next: (response: LegalChatResponse) => {
        this.advisorAnswer = response.answer;
        this.advisorSending = false;
      },
      error: (err) => {
        this.advisorError = err?.error?.message || 'The assistant is temporarily unavailable.';
        this.advisorSending = false;
      },
    });
  }

  getProcedureIcon(type: ProcedureType): string {
    const icons: Record<ProcedureType, string> = {
      SARL: 'SARL',
      SUARL: 'SU',
      LABEL_STARTUP: 'LS',
      PI: 'PI',
      FISCALITE: 'FI',
      CONFORMITE: 'CO',
    };
    return icons[type];
  }
}
