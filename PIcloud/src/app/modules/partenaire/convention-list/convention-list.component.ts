import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ConventionService } from '../../../services/convention.service';
import { PartenaireService } from '../../../services/partenaire.service';
import {
  ConventionResponse,
  StatutConvention
} from '../../../models/convention';

@Component({
  selector: 'app-convention-list',
  templateUrl: './convention-list.component.html',
  styleUrl: './convention-list.component.css'
})
export class ConventionListComponent implements OnInit {

  conventions: ConventionResponse[] = [];
  filtered:    ConventionResponse[] = [];

  searchTerm     = '';
  selectedStatut = '';
  statuts        = Object.values(StatutConvention);

  isLoading      = false;
  errorMessage   = '';
  successMessage = '';

  isUser    = false;
  isPartner = false;
  isAdmin   = false;
  myUserId  = 0;
  myOrgId   = 0;   // PARTNER's organisation id

  // Pagination
  currentPage = 1;
  pageSize    = 6;

  constructor(
    private conventionService: ConventionService,
    private partenaireService: PartenaireService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role    = this.authService.getRole();
    this.myUserId = this.authService.getUserId();
    this.isUser   = role === 'USER';
    this.isPartner = role === 'PARTNER';
    this.isAdmin  = role === 'ADMIN';

    this.load();
  }

  async load(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      if (this.isAdmin) {
        this.conventions = await this.conventionService.getAll();
      } else if (this.isUser) {
        this.conventions = await this.conventionService.getByUser(this.myUserId);
      } else if (this.isPartner) {
        // Load partner's org first
        const org = await this.partenaireService.getMyDashboard();
        this.myOrgId = org.id;
        this.conventions = await this.conventionService.getByOrganisation(org.id);
      }
      this.applyFilter();
    } catch {
      this.errorMessage = 'Impossible de charger les conventions.';
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(): void {
    const t = this.searchTerm.toLowerCase();
    this.filtered = this.conventions.filter(c => {
      const matchText =
        c.numeroConvention?.toLowerCase().includes(t) ||
        c.organisationPartenaireNom?.toLowerCase().includes(t);
      const matchStatut = !this.selectedStatut || c.statut === this.selectedStatut;
      return matchText && matchStatut;
    });
    this.currentPage = 1;
  }

  // ── Pagination ─────────────────────────────────────────────────────────

  get paginated(): ConventionResponse[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }
  get totalPages(): number { return Math.ceil(this.filtered.length / this.pageSize); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  goToPage(p: number): void { this.currentPage = p; }

  // ── Helpers ────────────────────────────────────────────────────────────

  statutClass(s: StatutConvention): string {
    const map: Record<string, string> = {
      BROUILLON: 'badge-brouillon',
      SIGNEE:    'badge-signee',
      ACTIVE:    'badge-active',
      EXPIREE:   'badge-expiree'
    };
    return map[s] ?? 'badge-brouillon';
  }

  /**
   * A convention is "pending my action" when:
   * - BROUILLON → created by user, partner hasn't confirmed yet (partner action needed)
   *   OR created by partner, user hasn't confirmed yet (user action needed)
   * - SIGNEE → one party confirmed, other hasn't yet
   */
  isPendingMyAction(c: ConventionResponse): boolean {
    if (c.statut === StatutConvention.ACTIVE || c.statut === StatutConvention.EXPIREE) return false;
    // Simple heuristic: if BROUILLON or SIGNEE, show as "pending" for the other party
    return c.statut === StatutConvention.BROUILLON || c.statut === StatutConvention.SIGNEE;
  }

  canEdit(c: ConventionResponse): boolean {
    // Only editable when still BROUILLON
    return c.statut === StatutConvention.BROUILLON;
  }

  // ── Navigation ─────────────────────────────────────────────────────────

  goToCreate(): void {
    this.router.navigate(['/partenariat/conventions/form']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/partenariat/conventions/form', id]);
  }

  goToView(id: number): void {
    this.router.navigate(['/partenariat/conventions/form', id]);
  }

  async delete(id: number): Promise<void> {
    if (!confirm('Supprimer cette convention ?')) return;
    try {
      await this.conventionService.delete(id);
      this.conventions = this.conventions.filter(c => c.id !== id);
      this.applyFilter();
      this.flash('Convention supprimée.');
    } catch {
      this.errorMessage = 'Échec de la suppression.';
    }
  }

  flash(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 4000);
  }
}