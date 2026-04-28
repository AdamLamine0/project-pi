import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideBriefcase,
  lucideCheck,
  lucideClock,
  lucideEye,
  lucideFileText,
  lucideFilter,
  lucideMessageSquare,
  lucidePlus,
  lucideScale,
  lucideSearch,
  lucideShieldCheck,
  lucideTrendingUp,
  lucideX,
} from '@ng-icons/lucide';
import { AuthService } from '../../../../core/services/auth.service';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import {
  LegalChatResponse,
  LegalProcedureResponse,
  ProcedureType,
  PROCEDURE_TYPE_DESCRIPTIONS,
  PROCEDURE_TYPE_LABELS,
  STATUS_LABELS,
} from '../../../../models/legal-procedure.model';

interface ProcedureDashboardStat {
  label: string;
  value: string;
}

interface ProcedureTypeCard {
  type: ProcedureType;
  label: string;
  description: string;
  count: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-procedure-home',
  templateUrl: './procedure-home.component.html',
  standalone: false,
  styleUrls: ['./procedure-home.component.css'],
  providers: [provideIcons({
    lucideBriefcase,
    lucideCheck,
    lucideClock,
    lucideEye,
    lucideFileText,
    lucideFilter,
    lucideMessageSquare,
    lucidePlus,
    lucideScale,
    lucideSearch,
    lucideShieldCheck,
    lucideTrendingUp,
    lucideX,
  })],
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
  readonly statusLabels = STATUS_LABELS;
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
  statsLoading = false;
  statsError = '';
  searchTerm = '';
  statusFilter = 'All';
  procedures: LegalProcedureResponse[] = [];
  dashboardStats: ProcedureDashboardStat[] = [
    { label: 'Total Procedures', value: '0' },
    { label: 'In Progress', value: '0' },
    { label: 'Pending Review', value: '0' },
    { label: 'Completed', value: '0' },
  ];
  procedureCards: ProcedureTypeCard[] = this.cardsFromProcedures([]);
  selectedProcedure = signal<LegalProcedureResponse | null>(null);
  showProcedureModal = signal(false);
  protected readonly statusFilters = ['All', 'Draft', 'In progress', 'Review', 'Completed', 'Rejected'];

  constructor(
    private readonly router: Router,
    public readonly auth: AuthService,
    private readonly legalService: LegalProcedureService
  ) {}

  ngOnInit(): void {
    if (this.auth.isExpert()) {
      this.router.navigate([this.legalBasePath(), 'expert', 'assigned']);
      return;
    }

    if (this.auth.isAdmin()) {
      this.loadDashboardStats();
    }
  }

  loadDashboardStats(): void {
    this.statsLoading = true;
    this.statsError = '';

    if (this.auth.isAdmin()) {
      this.legalService.getAllProcedures().subscribe({
        next: (procedures) => {
          this.procedures = this.sortByCreatedAtDesc(procedures);
          this.dashboardStats = this.statsFromProcedures(procedures);
          this.procedureCards = this.cardsFromProcedures(procedures);
          this.statsLoading = false;
        },
        error: (err) => {
          this.statsError = err?.error?.message || 'Unable to load procedure dashboard.';
          this.statsLoading = false;
        },
      });
      return;
    }

    this.procedureCards = this.cardsFromProcedures([]);
    this.statsLoading = false;
  }

  createProcedure(type: ProcedureType): void {
    if (this.auth.isEntrepreneur() || this.auth.isAdmin()) {
      this.router.navigate([this.legalBasePath(), 'new'], { queryParams: { type } });
      return;
    }

    if (this.auth.isExpert()) {
      this.router.navigate([this.legalBasePath(), 'expert', 'assigned']);
      return;
    }

    this.router.navigate(['/auth/login']);
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

  openCreate(): void {
    this.router.navigate([this.legalBasePath(), 'new']);
  }

  openProcedure(procedure: LegalProcedureResponse): void {
    this.selectedProcedure.set(procedure);
    this.showProcedureModal.set(true);
  }

  filteredProcedures(): LegalProcedureResponse[] {
    const query = this.normalize(this.searchTerm);
    return this.procedures.filter(procedure => {
      const matchesSearch = !query
        || this.normalize(procedure.projectName).includes(query)
        || this.normalize(this.labels[procedure.procedureType]).includes(query);
      const matchesStatus = this.statusFilter === 'All'
        || this.statusFilter === this.statusFilterLabel(procedure.status);

      return matchesSearch && matchesStatus;
    });
  }

  private statsFromProcedures(procedures: LegalProcedureResponse[]): ProcedureDashboardStat[] {
    const count = (status: LegalProcedureResponse['status']) =>
      procedures.filter(procedure => procedure.status === status).length;

    return [
      { label: this.auth.isAdmin() ? 'Total Procedures' : 'My Procedures', value: String(procedures.length) },
      { label: 'In Progress', value: String(count('EN_COURS')) },
      { label: 'Pending Review', value: String(count('EN_ATTENTE_EXPERT')) },
      { label: 'Completed', value: String(count('COMPLETE')) },
    ];
  }

  private cardsFromProcedures(procedures: LegalProcedureResponse[]): ProcedureTypeCard[] {
    const colors: Record<ProcedureType, string> = {
      SARL: '#1C4FC3',
      SUARL: '#1D1384',
      LABEL_STARTUP: '#059669',
      PI: '#D97706',
      FISCALITE: '#7C3AED',
      CONFORMITE: '#0891B2',
    };

    return this.procedureTypes.map(type => ({
      type,
      label: this.labels[type],
      description: this.descriptions[type],
      count: procedures.filter(procedure => procedure.procedureType === type).length,
      icon: this.getProcedureIcon(type),
      color: colors[type],
    }));
  }

  statusFilterLabel(status: LegalProcedureResponse['status']): string {
    const labels: Record<LegalProcedureResponse['status'], string> = {
      BROUILLON: 'Draft',
      EN_COURS: 'In progress',
      EN_ATTENTE_EXPERT: 'Review',
      COMPLETE: 'Completed',
      REFUSE: 'Rejected',
    };
    return labels[status];
  }

  statusIcon(status: LegalProcedureResponse['status']): string {
    if (status === 'COMPLETE') return 'lucideCheck';
    if (status === 'REFUSE') return 'lucideX';
    if (status === 'EN_ATTENTE_EXPERT') return 'lucideShieldCheck';
    return 'lucideClock';
  }

  statusColor(status: LegalProcedureResponse['status']): string {
    if (status === 'COMPLETE') return 'var(--badge-green-bg)';
    if (status === 'REFUSE') return 'var(--badge-red-bg)';
    if (status === 'EN_ATTENTE_EXPERT') return 'var(--badge-purple-bg)';
    if (status === 'EN_COURS') return 'var(--badge-amber-bg)';
    return 'var(--badge-blue-bg)';
  }

  statusTextColor(status: LegalProcedureResponse['status']): string {
    if (status === 'COMPLETE') return 'var(--badge-green-text)';
    if (status === 'REFUSE') return 'var(--badge-red-text)';
    if (status === 'EN_ATTENTE_EXPERT') return 'var(--badge-purple-text)';
    if (status === 'EN_COURS') return 'var(--badge-amber-text)';
    return 'var(--badge-blue-text)';
  }

  formatDate(value?: string): string {
    if (!value) return 'Not submitted';
    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  private sortByCreatedAtDesc(procedures: LegalProcedureResponse[]): LegalProcedureResponse[] {
    return [...procedures].sort((a, b) =>
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  private normalize(value: string | null | undefined): string {
    return (value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  legalBasePath(): string {
    return this.auth.isAdmin() ? '/app/legal' : '/procedures';
  }
}
