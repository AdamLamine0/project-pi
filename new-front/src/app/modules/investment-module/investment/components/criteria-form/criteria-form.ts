import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideUpload, lucideX } from '@ng-icons/lucide';
import { Subscription } from 'rxjs';
import { InvestmentCriteria } from '../../models/investment-criteria.model';
import { InvestmentCriteriaService } from '../../services/investment-criteria.service';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-criteria-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatSliderModule, NgIconComponent],
  providers: [provideIcons({ lucideUpload, lucideX })],
  templateUrl: './criteria-form.html',
  styleUrl: './criteria-form.css',
})
export class CriteriaForm implements OnInit, OnDestroy {
  criteria: InvestmentCriteria = {
    investorId: '',
    sectors: [],
    stages: [],
    minBudget: 0,
    maxBudget: 0,
    location: '',
    active: true,
  };

  sectorDraft = '';
  stageDraft = '';
  isEditMode = false;
  criteriaId = '';
  existingCriteriaId = '';
  submitting = false;
  error = '';
  selectedFileName = '';
  selectedFile: File | null = null;
  private readonly sub = new Subscription();

  constructor(
    private service: InvestmentCriteriaService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  readonly sectorSuggestions = [
    'Fintech',
    'Healthtech',
    'Edtech',
    'E-commerce',
    'SaaS',
    'AI / ML',
    'Cybersecurity',
    'Blockchain / Web3',
    'Biotech',
    'CleanTech',
    'Energy',
    'Mobility',
    'Real Estate / PropTech',
    'Logistics',
    'Gaming',
    'Media',
    'Agritech',
    'Manufacturing',
    'Retail',
    'Insurtech'
  ] as const;

  readonly stageSuggestions = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Growth'] as const;

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap.subscribe((params) => {
        this.criteriaId = params.get('id') ?? '';
        this.isEditMode = !!this.criteriaId;
        this.error = '';
        this.existingCriteriaId = '';

        if (this.isEditMode) {
          this.sub.add(
            this.service.getById(this.criteriaId).subscribe({
              next: (criteria) => {
                this.criteria = {
                  ...criteria,
                  sectors: [...criteria.sectors],
                  stages: [...criteria.stages],
                };
              },
              error: () => {
                this.error = 'Impossible de charger ce profil d investissement.';
              }
            })
          );
          return;
        }

        this.criteria = {
          investorId: this.resolveInvestorId() || 'dev-investor',
          sectors: [],
          stages: [],
          minBudget: 0,
          maxBudget: 0,
          location: '',
          active: true,
        };
        this.lookupExistingCriteria();
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get filteredSectorSuggestions(): string[] {
    const q = this.sectorDraft.trim().toLowerCase();
    if (!q) return [];

    const chosen = new Set(this.criteria.sectors.map((s) => s.toLowerCase()));
    return this.sectorSuggestions
      .filter((s) => s.toLowerCase().includes(q))
      .filter((s) => !chosen.has(s.toLowerCase()))
      .slice(0, 8);
  }

  get filteredStageSuggestions(): string[] {
    const q = this.stageDraft.trim().toLowerCase();
    if (!q) return [];

    const chosen = new Set(this.criteria.stages.map((s) => s.toLowerCase()));
    return this.stageSuggestions
      .filter((s) => s.toLowerCase().includes(q))
      .filter((s) => !chosen.has(s.toLowerCase()))
      .slice(0, 8);
  }

  selectSectorSuggestion(value: string): void {
    this.sectorDraft = value;
    this.addSector();
  }

  selectStageSuggestion(value: string): void {
    this.stageDraft = value;
    this.addStage();
  }

  addSector(): void {
    const value = this.sectorDraft.trim();
    if (!value) return;

    if (!this.criteria.sectors.some((sector) => sector.toLowerCase() === value.toLowerCase())) {
      this.criteria.sectors = [...this.criteria.sectors, value];
    }
    this.sectorDraft = '';
  }

  removeSector(sector: string): void {
    this.criteria.sectors = this.criteria.sectors.filter((item) => item !== sector);
  }

  addStage(): void {
    const value = this.stageDraft.trim();
    if (!value) return;

    if (!this.criteria.stages.some((stage) => stage.toLowerCase() === value.toLowerCase())) {
      this.criteria.stages = [...this.criteria.stages, value];
    }
    this.stageDraft = '';
  }

  removeStage(stage: string): void {
    this.criteria.stages = this.criteria.stages.filter((item) => item !== stage);
  }

  submit(): void {
    // Validate minimum budget must be greater than 500 DT
    if (this.criteria.minBudget < 500) {
      alert('Minimum budget must be greater than 500 DT.');
      return;
    }

    // Validate maximum budget must be greater than minimum budget
    if (this.criteria.maxBudget > 0 && this.criteria.minBudget >= this.criteria.maxBudget) {
      alert('Maximum budget must be greater than minimum budget.');
      return;
    }

    if (!this.isEditMode) {
      this.lookupExistingCriteria(true);
      return;
    }

    this.persistInvestorId();
    this.saveCriteria();
  }

  openExistingCriteria(): void {
    if (!this.existingCriteriaId) return;
    this.router.navigate(['/investment/criteria/edit', this.existingCriteriaId]);
  }

  private lookupExistingCriteria(submitAfterCheck = false): void {
    const investorId = (this.resolveInvestorId() || this.criteria.investorId).trim();
    if (!investorId) {
      this.error = 'Impossible de resoudre l investisseur connecte.';
      return;
    }

    this.criteria.investorId = investorId;
    this.submitting = submitAfterCheck;
    this.error = '';

    this.sub.add(this.service.getInvestorCriteria(investorId).subscribe({
      next: (criteriaList) => {
        const existing = criteriaList.find((item) => item.id !== this.criteriaId) ?? null;
        this.existingCriteriaId = existing?.id ?? '';

        if (existing) {
          this.submitting = false;
          this.error = 'Un investisseur ne peut avoir qu un seul critere d investissement. Modifie le profil existant.';
          return;
        }

        if (submitAfterCheck) {
          this.persistInvestorId();
          this.saveCriteria();
        }
      },
      error: () => {
        this.submitting = false;
        this.error = 'Impossible de verifier les criteres existants pour cet investisseur.';
      }
    }));
  }

  private saveCriteria(): void {
    this.submitting = true;
    this.error = '';

    const request$ = this.isEditMode
      ? this.service.update({ ...this.criteria, id: this.criteriaId })
      : this.service.create(this.criteria);

    this.sub.add(request$.subscribe({
      next: () => {
        this.submitting = false;
        alert(this.isEditMode ? 'Critere mis a jour !' : 'Critere enregistre !');
        this.router.navigate(['/investment']);
      },
      error: () => {
        this.submitting = false;
        this.error = this.isEditMode
          ? 'Impossible de mettre a jour ce profil d investissement.'
          : 'Impossible d enregistrer ce profil d investissement.';
      }
    }));
  }

  private persistInvestorId(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('investment.criteria.investorId', this.criteria.investorId);
  }

  private safeStorageGet(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  }

  private resolveInvestorId(): string {
    const userId = this.authService.getUserId();
    return userId > 0 ? String(userId) : '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
      if (file) {
        alert('Please select a PDF file only.');
      }
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
  }
}
