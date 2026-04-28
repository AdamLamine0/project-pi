import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideBadgeCheck,
  lucideBriefcase,
  lucideBuilding2,
  lucideFileText,
  lucideMapPin,
  lucideSearch,
  lucideSlidersHorizontal,
  lucideWallet,
  lucideX,
} from '@ng-icons/lucide';
import { Subscription } from 'rxjs';
import { InvestmentCriteria } from '../../models/investment-criteria.model';
import { InvestmentCriteriaService } from '../../services/investment-criteria.service';

type BudgetFilter = 'ALL' | 'UNDER_50K' | '50K_250K' | '250K_1M' | 'OVER_1M';

@Component({
  selector: 'app-investor-marketplace',
  imports: [CommonModule, FormsModule, NgIconComponent],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideBadgeCheck,
      lucideBriefcase,
      lucideBuilding2,
      lucideFileText,
      lucideMapPin,
      lucideSearch,
      lucideSlidersHorizontal,
      lucideWallet,
      lucideX,
    }),
  ],
  templateUrl: './investor-marketplace.html',
  styleUrl: './investor-marketplace.css',
})
export class InvestorMarketplace implements OnInit, OnDestroy {
  loading = true;
  error = '';

  allProfiles: InvestmentCriteria[] = [];
  visibleProfiles: InvestmentCriteria[] = [];
  selectedProfile: InvestmentCriteria | null = null;

  searchTerm = '';
  selectedSector = 'ALL';
  selectedBudget: BudgetFilter = 'ALL';

  private readonly sub = new Subscription();

  constructor(private readonly criteriaService: InvestmentCriteriaService) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get sectors(): string[] {
    return [...new Set(this.allProfiles.flatMap((profile) => profile.sectors).filter(Boolean))]
      .sort((left, right) => left.localeCompare(right));
  }

  get activeCount(): number {
    return this.allProfiles.length;
  }


  applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.visibleProfiles = this.allProfiles.filter((profile) => {
      const haystack = [
        profile.name,
        profile.investorId,
        profile.location,
        ...profile.sectors,
        ...profile.stages,
      ].join(' ').toLowerCase();

      return (!search || haystack.includes(search))
        && (this.selectedSector === 'ALL' || profile.sectors.includes(this.selectedSector))
        && this.matchesBudget(profile);
    });

    if (this.selectedProfile && !this.visibleProfiles.some((profile) => profile.id === this.selectedProfile?.id)) {
      this.selectedProfile = null;
    }
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedSector = 'ALL';
    this.selectedBudget = 'ALL';
    this.applyFilters();
  }

  viewProfile(profile: InvestmentCriteria): void {
    this.selectedProfile = profile;
  }

  closeProfile(): void {
    this.selectedProfile = null;
  }

  trackProfile(_: number, profile: InvestmentCriteria): string {
    return profile.id ?? profile.investorId;
  }

  budgetLabel(profile: InvestmentCriteria): string {
    const min = Number(profile.minBudget || 0);
    const max = Number(profile.maxBudget || 0);

    if (min > 0 && max > 0) return `${this.formatBudget(min)} - ${this.formatBudget(max)}`;
    if (max > 0) return `Up to ${this.formatBudget(max)}`;
    if (min > 0) return `From ${this.formatBudget(min)}`;
    return 'Budget flexible';
  }

  compatibilityLabel(profile: InvestmentCriteria): string {
    let score = 0;
    if (profile.sectors.length > 0) score += 40;
    if (profile.stages.length > 0) score += 30;
    if (profile.maxBudget > 0) score += 20;
    if (profile.location) score += 10;

    if (score >= 80) return 'High signal';
    if (score >= 50) return 'Good fit';
    return 'Open profile';
  }

  private loadProfiles(): void {
    this.loading = true;
    this.error = '';

    this.sub.add(
      this.criteriaService.getAllCriteriaAdmin().subscribe({
        next: (profiles) => {
          this.allProfiles = profiles
            .filter((profile) => this.criteriaService.isActive(profile))
            .sort((left, right) => (left.name || '').localeCompare(right.name || ''));
          this.loading = false;
          this.applyFilters();
        },
        error: () => {
          this.loading = false;
          this.error = 'Unable to load investor profiles.';
          this.allProfiles = [];
          this.visibleProfiles = [];
        },
      })
    );
  }

  private matchesBudget(profile: InvestmentCriteria): boolean {
    const min = Number(profile.minBudget || 0);
    const max = Number(profile.maxBudget || 0);
    const upper = max > 0 ? max : min;

    switch (this.selectedBudget) {
      case 'UNDER_50K':
        return upper > 0 && upper <= 50000;
      case '50K_250K':
        return upper >= 50000 && min <= 250000;
      case '250K_1M':
        return upper >= 250000 && min <= 1000000;
      case 'OVER_1M':
        return upper >= 1000000;
      default:
        return true;
    }
  }

  formatBudget(value: number): string {
  return `${value.toLocaleString('fr-TN')} TND`;
}
}
