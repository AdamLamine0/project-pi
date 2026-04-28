import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ConventionService } from '../../../services/convention.service';
import { PartenaireService } from '../../../services/partenaire.service';
import { ConventionResponse, StatutConvention } from '../../../models/convention';

@Component({
  selector: 'app-convention-list',
  standalone: false,
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
  myOrgId   = 0;

  currentPage = 1;
  pageSize    = 6;

  constructor(
    private conventionService: ConventionService,
    private partenaireService: PartenaireService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const role    = this.authService.getRole();
    this.myUserId = Number(this.authService.getUserId());
    this.isUser    = role === 'USER';
    this.isPartner = role === 'PARTNER';
    this.isAdmin   = role === 'ADMIN';
    // Defer to a microtask so navigation from another layout doesn't leave the
    // page stuck in the loading state.
    Promise.resolve().then(() => this.load());
  }

  async load(): Promise<void> {
    this.isLoading    = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    try {
      if (this.isAdmin) {
        this.conventions = await this.conventionService.getAll();

      } else if (this.isUser) {
        this.conventions = await this.conventionService.getByUser(this.myUserId);

      } else if (this.isPartner) {
        const allOrgs = await this.partenaireService.getAll();
        const myOrg   = allOrgs.find(o => Number(o.userId) === Number(this.myUserId));

        if (!myOrg) {
          this.errorMessage = 'Aucune organisation trouvée pour votre compte. Contactez un administrateur.';
          this.conventions  = [];
          this.filtered     = [];
          this.applyFilter();
          return;
        }

        this.myOrgId = Number(myOrg.id);

        if (!this.myOrgId || isNaN(this.myOrgId)) {
          this.errorMessage = 'ID organisation invalide.';
          return;
        }

        this.conventions = await this.conventionService.getByOrganisation(this.myOrgId);
      }

      this.applyFilter();

    } catch (err: any) {
      const msg = err?.error?.message || err?.message || '';
      if (msg.toLowerCase().includes('not found')) {
        this.errorMessage = 'Aucune organisation trouvée pour votre compte.';
        this.conventions  = [];
        this.filtered     = [];
      } else {
        this.errorMessage = 'Impossible de charger les conventions. ' + (err?.error?.message || '');
      }
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  applyFilter(): void {
  const t = this.searchTerm.toLowerCase();

  this.filtered = this.conventions
    .filter(c => {
      const matchText =
        (c.numeroConvention ?? '').toLowerCase().includes(t) ||
        (c.organisationPartenaireNom ?? '').toLowerCase().includes(t);
      const matchStatut = !this.selectedStatut || c.statut === this.selectedStatut;
      return matchText && matchStatut;
    })
    .sort((a, b) => b.id - a.id);

  this.currentPage = 1;
}

  get paginated(): ConventionResponse[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(p: number): void { this.currentPage = p; }

  statutClass(s: StatutConvention): string {
  const map: Record<string, string> = {
    DRAFT:     'badge-brouillon',
    SIGNED:    'badge-signee',
    ACTIVE:    'badge-active',
    COMPLETED: 'badge-completed',   // add CSS class
    EXPIRED:   'badge-expiree'
  };
  return map[s] ?? 'badge-brouillon';
}

statutLabel(s: StatutConvention): string {
  const map: Record<string, string> = {
    DRAFT:     'Draft',
    SIGNED:    'Signed',
    ACTIVE:    'Active',
    COMPLETED: 'Completed',
    EXPIRED:   'Expired'
  };
  return map[s] ?? s;
}

  isPendingMyAction(c: ConventionResponse): boolean {
  return c.statut === StatutConvention.DRAFT || c.statut === StatutConvention.SIGNED;
}

canEdit(c: ConventionResponse): boolean {
  return c.statut === StatutConvention.DRAFT || c.statut === StatutConvention.SIGNED;
}

  goToCreate(): void { this.router.navigate(['/partenariat/conventions/form']); }
  goToEdit(id: number): void { this.router.navigate(['/partenariat/conventions/form', id]); }
  goToView(id: number): void { this.router.navigate(['/partenariat/conventions/form', id]); }

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
    setTimeout(() => (this.successMessage = ''), 4000);
  }

  objectifsEnCours(c: ConventionResponse): number {
    return (c.objectifs ?? []).filter(o => o.statut === 'IN_PROGRESS').length;
  }

  downloadPdf(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.conventionService.downloadConventionPdf(id);
  }
}