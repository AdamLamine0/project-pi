import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ConventionService } from '../../../services/convention.service';
import { PartenaireService } from '../../../services/partenaire.service';
import { ConventionResponse, StatutConvention } from '../../../models/convention';

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
  myOrgId   = 0;

  currentPage = 1;
  pageSize    = 6;

  constructor(
    private conventionService: ConventionService,
    private partenaireService: PartenaireService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role    = this.authService.getRole(); // 'USER' | 'PARTNER' | 'ADMIN'
    this.myUserId = Number(this.authService.getUserId()); // force Number
    this.isUser    = role === 'USER';
    this.isPartner = role === 'PARTNER';
    this.isAdmin   = role === 'ADMIN';

    console.log('Role:', role, 'UserId:', this.myUserId);
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
        // Step 1: get all orgs and find mine by userId
        const allOrgs = await this.partenaireService.getAll();
        console.log('All orgs:', allOrgs);
        console.log('Looking for userId:', this.myUserId);

        // Force Number on both sides — API might return string or number
        const myOrg = allOrgs.find(o => Number(o.userId) === Number(this.myUserId));
        console.log('Found org:', myOrg);

        if (!myOrg) {
          this.errorMessage = 'Aucune organisation trouvée pour votre compte. Contactez un administrateur.';
          this.conventions = [];
          this.filtered = [];
          this.applyFilter();
          return;
        }

        this.myOrgId = Number(myOrg.id);
        console.log('myOrgId:', this.myOrgId);

        if (!this.myOrgId || isNaN(this.myOrgId)) {
          this.errorMessage = 'ID organisation invalide.';
          return;
        }

        // Step 2: get conventions of that org
        this.conventions = await this.conventionService.getByOrganisation(this.myOrgId);
      }

      this.applyFilter();

    } catch (err: any) {
      console.error('Load error:', err);
      const msg = err?.error?.message || err?.message || '';
      if (msg.toLowerCase().includes('not found')) {
        this.errorMessage = 'Aucune organisation trouvée pour votre compte.';
        this.conventions = [];
        this.filtered = [];
      } else {
        this.errorMessage = 'Impossible de charger les conventions. ' + (err?.error?.message || '');
      }
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(): void {
    const t = this.searchTerm.toLowerCase();
    this.filtered = this.conventions.filter(c => {
      const matchText =
        (c.numeroConvention ?? '').toLowerCase().includes(t) ||
        (c.organisationPartenaireNom ?? '').toLowerCase().includes(t);
      const matchStatut = !this.selectedStatut || c.statut === this.selectedStatut;
      return matchText && matchStatut;
    });
    this.currentPage = 1;
  }

  get paginated(): ConventionResponse[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }
  get totalPages(): number { return Math.ceil(this.filtered.length / this.pageSize); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  goToPage(p: number): void { this.currentPage = p; }

  statutClass(s: StatutConvention): string {
    const map: Record<string, string> = {
      BROUILLON: 'badge-brouillon',
      SIGNEE:    'badge-signee',
      ACTIVE:    'badge-active',
      EXPIREE:   'badge-expiree'
    };
    return map[s] ?? 'badge-brouillon';
  }

  statutLabel(s: StatutConvention): string {
    const map: Record<string, string> = {
      BROUILLON: 'Brouillon',
      SIGNEE:    'Signée',
      ACTIVE:    'Active',
      EXPIREE:   'Expirée'
    };
    return map[s] ?? s;
  }

  isPendingMyAction(c: ConventionResponse): boolean {
  return c.statut === StatutConvention.BROUILLON || c.statut === StatutConvention.SIGNEE;
}

  canEdit(c: ConventionResponse): boolean {
  return c.statut === StatutConvention.BROUILLON || c.statut === StatutConvention.SIGNEE;
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
    return (c.objectifs ?? []).filter(o => o.statut === 'EN_COURS').length;
  }

  downloadPdf(id: number, event: MouseEvent): void {
  event.stopPropagation(); // empêche la navigation vers la convention
  this.conventionService.downloadConventionPdf(id);
}
}