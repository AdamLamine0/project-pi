import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PartenaireService } from '../../../services/partenaire.service';
import { TypePartenaire, OrganisationPartenaire,StatutPartenaire } from '../../../models/partenaire';

@Component({
  selector: 'app-partenarie-list',
  templateUrl: './partenarie-list.component.html',
  styleUrl: './partenarie-list.component.css'
})
export class PartenarieListComponent implements OnInit {

  organisations: OrganisationPartenaire[] = [];
  filtered: OrganisationPartenaire[] = [];

  searchTerm    = '';
  selectedType  = '';
  selectedStatut = '';

  isLoading    = false;
  errorMessage = '';
  successMessage = '';

  isAdmin = false;

  types   = Object.values(TypePartenaire);
  statuts = Object.values(StatutPartenaire);

  // pagination
  currentPage = 1;
  pageSize    = 9;

  constructor(
    private partenaireService: PartenaireService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.load();
  }

  async load(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      this.organisations = await this.partenaireService.getAll();
      this.applyFilter();
    } catch {
      this.errorMessage = 'Impossible de charger les organisations.';
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(): void {
    const t = this.searchTerm.toLowerCase();
    this.filtered = this.organisations.filter(o => {
      const matchText =
        o.nom.toLowerCase().includes(t) ||
        o.contactEmail.toLowerCase().includes(t) ||
        (o.region ?? '').toLowerCase().includes(t);
      const matchType   = !this.selectedType   || o.type   === this.selectedType;
      const matchStatut = !this.selectedStatut || o.statut === this.selectedStatut;
      return matchText && matchType && matchStatut;
    });
    this.currentPage = 1;
  }

  get paginated(): OrganisationPartenaire[] {
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

  goToCreate(): void {
    this.router.navigate(['/partenariat/form']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/partenariat/form', id]);
  }

  async delete(id: number): Promise<void> {
    if (!confirm('Supprimer cette organisation ?')) return;
    try {
      await this.partenaireService.delete(id);
      this.organisations = this.organisations.filter(o => o.id !== id);
      this.applyFilter();
      this.flash('Organisation supprimée avec succès.');
    } catch {
      this.errorMessage = 'Échec de la suppression.';
    }
  }

  flash(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => (this.successMessage = ''), 4000);
  }

  statutClass(statut: StatutPartenaire): string {
    const map: Record<string, string> = {
      ACTIF:      'badge-actif',
      EN_ATTENTE: 'badge-attente',
      SUSPENDU:   'badge-suspendu',
      RESILIER:   'badge-resilier'
    };
    return map[statut] ?? 'badge-attente';
  }

  typeIcon(type: TypePartenaire): string {
    const map: Record<string, string> = {
      ACADEMIQUE: '🎓',
      INCUBATEUR: '🚀',
      PUBLIC:     '🏛️',
      ENTREPRISE: '🏢',
      ASSOCIATIF: '🤝'
    };
    return map[type] ?? '🏢';
  }
}