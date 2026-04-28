// partenarie-list.component.ts
import { ChangeDetectionStrategy, Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PartenaireService } from '../../../services/partenaire.service';
import {
  OrganisationPartenaire,
  PartnerType,
  PartnerStatus
} from '../../../models/partenaire';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideHandshake, lucidePlus, lucideBuilding, lucideUsers,
  lucideCalendar, lucideCheck, lucideEdit, lucideTrash,
  lucideArrowUp, lucideExternalLink, lucideRefreshCw, lucideX,
  lucideSearch, lucideMapPin, lucideMail, lucideGlobe, lucideVideo,
  lucideAlertTriangle, lucidePause, lucidePlay,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-partenarie-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({
    lucideHandshake, lucidePlus, lucideBuilding, lucideUsers,
    lucideCalendar, lucideCheck, lucideEdit, lucideTrash,
    lucideArrowUp, lucideExternalLink, lucideRefreshCw, lucideX,
    lucideSearch, lucideMapPin, lucideMail, lucideGlobe, lucideVideo,
    lucideAlertTriangle, lucidePause, lucidePlay,
  })],
  templateUrl: './partenarie-list.component.html',
  styleUrl: './partenarie-list.component.css'
})
export class PartenarieListComponent implements OnInit {

  // Signals for reactive state
  protected readonly organisations = signal<OrganisationPartenaire[]>([]);
  protected readonly searchTerm = signal('');
  protected readonly selectedType = signal('');
  protected readonly selectedStatut = signal('');
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');
  protected readonly currentPage = signal(1);
  protected readonly confirmTerminate = signal<number | null>(null);
  protected readonly changingStatus = new Set<number>();
  protected readonly showAddPartner = signal(false);
  protected readonly showPartnerDetail = signal(false);
  protected readonly selectedPartner = signal<OrganisationPartenaire | null>(null);

  // Only ACTIVE and SUSPENDED (no PENDING) + TERMINATED for admin visibility
  protected readonly types = Object.values(PartnerType);
  protected readonly statuts = Object.values(PartnerStatus);

  protected readonly pageSize = 9;
  protected readonly isAdmin = signal(false);
  protected readonly canRequestMeeting = signal(false);

  protected readonly PartnerStatus = PartnerStatus; // expose enum to template

  // Computed values
  protected readonly filtered = computed(() => {
    let data = [...this.organisations()];
    const search = this.searchTerm().trim().toLowerCase();
    const type = this.selectedType();
    const statut = this.selectedStatut();

    if (search) {
      data = data.filter(o =>
        o.nom.toLowerCase().includes(search) ||
        o.contactEmail.toLowerCase().includes(search) ||
        (o.region || '').toLowerCase().includes(search)
      );
    }

    if (type) {
      data = data.filter(o => o.type === type);
    }

    if (statut) {
      data = data.filter(o => o.statut === statut);
    }

    return data;
  });

  protected readonly totalPages = computed(() => 
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize))
  );

  protected readonly pageNumbers = computed(() => 
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  protected readonly paginated = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  protected readonly partnerStats = computed(() => {
    const orgs = this.organisations();
    const active = orgs.filter(o => o.statut === PartnerStatus.ACTIVE).length;
    const suspended = orgs.filter(o => o.statut === PartnerStatus.SUSPENDED).length;
    const terminated = orgs.filter(o => o.statut === PartnerStatus.TERMINATED).length;
    
    return [
      { label: 'Total Partners', value: orgs.length.toString(), delta: '+0' },
      { label: 'Active', value: active.toString(), delta: '+0' },
      { label: 'Suspended', value: suspended.toString(), delta: '+0' },
      { label: 'Terminated', value: terminated.toString(), delta: '+0' },
    ];
  });

  constructor(
    private partenaireService: PartenaireService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin.set(this.authService.isAdmin());
    const role = this.authService.getRole();
    this.canRequestMeeting.set(role === 'USER' || role === 'MENTOR');
    this.load();
  }

  async load(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');
    try {
      const all = await this.partenaireService.getAll();

      if (this.isAdmin()) {
        // Admin sees everything — ACTIVE, SUSPENDED, TERMINATED
        this.organisations.set(all);
      } else {
        // Non-admins only see ACTIVE organisations
        this.organisations.set(all.filter(o => o.statut === PartnerStatus.ACTIVE));
      }
    } catch {
      this.errorMessage.set('Failed to load organisations.');
    } finally {
      this.isLoading.set(false);
    }
  }

  protected onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  protected onTypeChange(value: string): void {
    this.selectedType.set(value);
    this.currentPage.set(1);
  }

  protected onStatutChange(value: string): void {
    this.selectedStatut.set(value);
    this.currentPage.set(1);
  }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  protected getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  protected getColor(type: PartnerType): string {
    switch (type) {
      case PartnerType.ACADEMIC: return '#1C4FC3';
      case PartnerType.INCUBATOR: return '#1D1384';
      case PartnerType.PUBLIC: return '#059669';
      case PartnerType.NONPROFIT: return '#D97706';
      case PartnerType.COMPANY: return '#0891B2';
      default: return '#6B7280';
    }
  }

  // ── Admin actions ─────────────────────────────────────────────────────────

  protected goToCreate(): void {
    this.router.navigate(['/app/partenariat/form']);
  }

  protected goToDetail(id: number): void {
    this.router.navigate(['/app/partenariat/form', id]);
  }

  protected goToView(id: number): void {
    this.router.navigate(['/app/partenariat/mon-organisation', id]);
  }

  protected goToMeetingRequest(id: number): void {
    this.router.navigate(['/app/partenariat/meetings/request', id]);
  }

  /**
   * Toggle between SUSPENDED ↔ ACTIVE.
   * If currently ACTIVE → set SUSPENDED.
   * If currently SUSPENDED → set ACTIVE.
   */
  protected async toggleSuspend(org: OrganisationPartenaire): Promise<void> {
    if (this.changingStatus.has(org.id)) return;
    this.changingStatus.add(org.id);
    this.errorMessage.set('');
    this.successMessage.set('');

    const newStatus = org.statut === PartnerStatus.SUSPENDED
      ? PartnerStatus.ACTIVE
      : PartnerStatus.SUSPENDED;

    try {
      const updated = await this.partenaireService.updateStatut(org.id, newStatus);
      const orgs = this.organisations();
      const idx = orgs.findIndex(o => o.id === org.id);
      if (idx !== -1) {
        orgs[idx] = updated;
        this.organisations.set([...orgs]);
      }
      this.successMessage.set(newStatus === PartnerStatus.SUSPENDED
        ? `${org.nom} has been suspended.`
        : `${org.nom} is now active again.`);
    } catch {
      this.errorMessage.set('Failed to update status. Please try again.');
    } finally {
      this.changingStatus.delete(org.id);
    }
  }

  /**
   * Set status to TERMINATED.
   * Shows an inline confirmation first.
   */
  protected requestTerminate(org: OrganisationPartenaire): void {
    this.confirmTerminate.set(org.id);
  }

  protected cancelTerminate(): void {
    this.confirmTerminate.set(null);
  }

  protected async confirmTerminateAction(org: OrganisationPartenaire): Promise<void> {
    if (this.changingStatus.has(org.id)) return;
    this.changingStatus.add(org.id);
    this.confirmTerminate.set(null);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      const updated = await this.partenaireService.updateStatut(org.id, PartnerStatus.TERMINATED);
      const orgs = this.organisations();
      const idx = orgs.findIndex(o => o.id === org.id);
      if (idx !== -1) {
        orgs[idx] = updated;
        this.organisations.set([...orgs]);
      }
      this.successMessage.set(`${org.nom} has been terminated.`);
    } catch {
      this.errorMessage.set('Failed to terminate organisation. Please try again.');
    } finally {
      this.changingStatus.delete(org.id);
    }
  }

  /**
   * Delete — only allowed when org is TERMINATED.
   */
  protected async delete(org: OrganisationPartenaire): Promise<void> {
    if (org.statut !== PartnerStatus.TERMINATED) {
      this.errorMessage.set('Only terminated organisations can be deleted.');
      return;
    }
    if (!confirm(`Permanently delete "${org.nom}"? This cannot be undone.`)) return;

    this.errorMessage.set('');
    this.successMessage.set('');
    try {
      await this.partenaireService.delete(org.id);
      this.organisations.set(this.organisations().filter(o => o.id !== org.id));
      this.successMessage.set(`"${org.nom}" has been deleted.`);
    } catch {
      this.errorMessage.set('Failed to delete organisation.');
    }
  }

  protected isChanging(id: number): boolean {
    return this.changingStatus.has(id);
  }
}