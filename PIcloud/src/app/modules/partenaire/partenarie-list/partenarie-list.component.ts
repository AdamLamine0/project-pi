// partenarie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PartenaireService } from '../../../services/partenaire.service';
import {
  OrganisationPartenaire,
  PartnerType,
  PartnerStatus
} from '../../../models/partenaire';

@Component({
  selector: 'app-partenarie-list',
  templateUrl: './partenarie-list.component.html',
  styleUrl: './partenarie-list.component.css'
})
export class PartenarieListComponent implements OnInit {

  organisations: OrganisationPartenaire[] = [];
  filtered:      OrganisationPartenaire[] = [];
  paginated:     OrganisationPartenaire[] = [];

  searchTerm    = '';
  selectedType  = '';
  selectedStatut = '';

  isLoading = false;
  errorMessage  = '';
  successMessage = '';

  // Only ACTIVE and SUSPENDED (no PENDING) + TERMINATED for admin visibility
  types   = Object.values(PartnerType);
  statuts = Object.values(PartnerStatus);

  currentPage = 1;
  pageSize    = 9;
  totalPages  = 1;
  pageNumbers: number[] = [];

  isAdmin = false;
  // Partners and regular users can request meetings
  canRequestMeeting = false;

  // Track in-progress status changes to prevent double-clicks
  changingStatus = new Set<number>();
  confirmTerminate: number | null = null; // id awaiting terminate confirm

  PartnerStatus = PartnerStatus; // expose enum to template

  constructor(
    private partenaireService: PartenaireService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    const role = this.authService.getRole();
    this.canRequestMeeting = role === 'USER' || role === 'MENTOR';
    this.load();
  }

  async load(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const all = await this.partenaireService.getAll();

      if (this.isAdmin) {
        // Admin sees everything — ACTIVE, SUSPENDED, TERMINATED
        this.organisations = all;
      } else {
        // Non-admins only see ACTIVE organisations
        this.organisations = all.filter(o => o.statut === PartnerStatus.ACTIVE);
      }

      this.applyFilter();
    } catch {
      this.errorMessage = 'Failed to load organisations.';
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(): void {
    let data = [...this.organisations];

    if (this.searchTerm.trim()) {
      const q = this.searchTerm.toLowerCase();
      data = data.filter(o =>
        o.nom.toLowerCase().includes(q) ||
        o.contactEmail.toLowerCase().includes(q) ||
        (o.region || '').toLowerCase().includes(q)
      );
    }

    if (this.selectedType) {
      data = data.filter(o => o.type === this.selectedType);
    }

    if (this.selectedStatut) {
      data = data.filter(o => o.statut === this.selectedStatut);
    }

    this.filtered    = data;
    this.currentPage = 1;
    this.totalPages  = Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePage();
  }

  updatePage(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginated = this.filtered.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  statutClass(statut: PartnerStatus): string {
    switch (statut) {
      case PartnerStatus.ACTIVE:     return 'badge-active';
      case PartnerStatus.SUSPENDED:  return 'badge-suspended';
      case PartnerStatus.TERMINATED: return 'badge-terminated';
      default: return '';
    }
  }

  // ── Admin actions ─────────────────────────────────────────────────────────

  goToCreate(): void {
    this.router.navigate(['/partenariat/form']);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/partenariat/form', id]);
  }

  goToView(id: number): void {
    this.router.navigate(['/partenariat/mon-organisation', id]);
  }

  goToMeetingRequest(id: number): void {
    this.router.navigate(['/partenariat/meetings/request', id]);
  }

  /**
   * Toggle between SUSPENDED ↔ ACTIVE.
   * If currently ACTIVE → set SUSPENDED.
   * If currently SUSPENDED → set ACTIVE.
   */
  async toggleSuspend(org: OrganisationPartenaire): Promise<void> {
    if (this.changingStatus.has(org.id)) return;
    this.changingStatus.add(org.id);
    this.errorMessage = '';
    this.successMessage = '';

    const newStatus = org.statut === PartnerStatus.SUSPENDED
      ? PartnerStatus.ACTIVE
      : PartnerStatus.SUSPENDED;

    try {
      const updated = await this.partenaireService.updateStatut(org.id, newStatus);
      const idx = this.organisations.findIndex(o => o.id === org.id);
      if (idx !== -1) this.organisations[idx] = updated;
      this.applyFilter();
      this.successMessage = newStatus === PartnerStatus.SUSPENDED
        ? `${org.nom} has been suspended.`
        : `${org.nom} is now active again.`;
    } catch {
      this.errorMessage = 'Failed to update status. Please try again.';
    } finally {
      this.changingStatus.delete(org.id);
    }
  }

  /**
   * Set status to TERMINATED.
   * Shows an inline confirmation first.
   */
  requestTerminate(org: OrganisationPartenaire): void {
    this.confirmTerminate = org.id;
  }

  cancelTerminate(): void {
    this.confirmTerminate = null;
  }

  async confirmTerminateAction(org: OrganisationPartenaire): Promise<void> {
    if (this.changingStatus.has(org.id)) return;
    this.changingStatus.add(org.id);
    this.confirmTerminate = null;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const updated = await this.partenaireService.updateStatut(org.id, PartnerStatus.TERMINATED);
      const idx = this.organisations.findIndex(o => o.id === org.id);
      if (idx !== -1) this.organisations[idx] = updated;
      this.applyFilter();
      this.successMessage = `${org.nom} has been terminated.`;
    } catch {
      this.errorMessage = 'Failed to terminate organisation. Please try again.';
    } finally {
      this.changingStatus.delete(org.id);
    }
  }

  /**
   * Delete — only allowed when org is TERMINATED.
   */
  async delete(org: OrganisationPartenaire): Promise<void> {
    if (org.statut !== PartnerStatus.TERMINATED) {
      this.errorMessage = 'Only terminated organisations can be deleted.';
      return;
    }
    if (!confirm(`Permanently delete "${org.nom}"? This cannot be undone.`)) return;

    this.errorMessage = '';
    this.successMessage = '';
    try {
      await this.partenaireService.delete(org.id);
      this.organisations = this.organisations.filter(o => o.id !== org.id);
      this.applyFilter();
      this.successMessage = `"${org.nom}" has been deleted.`;
    } catch {
      this.errorMessage = 'Failed to delete organisation.';
    }
  }

  isChanging(id: number): boolean {
    return this.changingStatus.has(id);
  }
}