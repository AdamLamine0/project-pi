// mon-organisation.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PartenaireService } from '../../../services/partenaire.service';
import {
  OrganisationPartenaire,
  ContactInfoRequest,
  PartnerType,
  PartnerStatus
} from '../../../models/partenaire';

@Component({
  selector: 'app-mon-organisation',
  templateUrl: './mon-organisation.component.html',
  styleUrl: './mon-organisation.component.css'
})
export class MonOrganisationComponent implements OnInit {

  org: OrganisationPartenaire | null = null;
  form!: FormGroup;
  types = Object.values(PartnerType);

  viewOnly   = false;
  isUser     = false;
  isPartner  = false;

  isEditing    = false;
  isLoading    = false;
  isSubmitting = false;
  errorMessage  = '';
  successMessage = '';

  PartnerStatus = PartnerStatus; // expose to template

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private partenaireService: PartenaireService
  ) {}

  ngOnInit(): void {
    this.isUser    = this.authService.getRole() === 'USER';
    this.isPartner = this.authService.getRole() === 'PARTNER';
    this.buildForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Viewing another org (read-only)
      this.viewOnly = true;
      this.loadById(+id);
    } else {
      // PARTNER viewing their own org
      this.viewOnly = false;
      this.loadMyOrg();
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      nom:          ['', [Validators.required, Validators.minLength(2)]],
      type:         ['', Validators.required],
      description:  [''],
      region:       [''],
      contactNom:   ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      siteWeb:      ['']
    });
    this.form.disable();
  }

  get f() { return this.form.controls; }

  /**
   * Is this partner's own org editable?
   * NOT editable when SUSPENDED or TERMINATED.
   */
  get canEdit(): boolean {
    if (!this.org || this.viewOnly) return false;
    return this.org.statut === PartnerStatus.ACTIVE;
  }

  get isSuspended(): boolean {
    return this.org?.statut === PartnerStatus.SUSPENDED;
  }

  get isTerminated(): boolean {
    return this.org?.statut === PartnerStatus.TERMINATED;
  }

  // PARTNER: find their org by matching userId from all orgs
  async loadMyOrg(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const myUserId = Number(this.authService.getUserId());
      const allOrgs  = await this.partenaireService.getAll();
      const myOrg    = allOrgs.find(o => Number(o.userId) === myUserId) ?? null;

      if (!myOrg) {
        this.errorMessage = 'No organisation found for your account. Please contact an administrator.';
        return;
      }

      this.org = myOrg;
      this.patchForm(this.org);
    } catch {
      this.errorMessage = 'Unable to load your organisation.';
    } finally {
      this.isLoading = false;
    }
  }

  async loadById(id: number): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      this.org = await this.partenaireService.getById(id);
      this.patchForm(this.org);
    } catch {
      this.errorMessage = 'Unable to load this organisation.';
    } finally {
      this.isLoading = false;
    }
  }

  private patchForm(org: OrganisationPartenaire): void {
    this.form.patchValue({
      nom:          org.nom,
      type:         org.type,
      description:  org.description,
      region:       org.region,
      contactNom:   org.contactNom,
      contactEmail: org.contactEmail,
      siteWeb:      org.siteWeb
    });
  }

  faireDemandeConvention(): void {
    if (!this.org) return;
    this.router.navigate(
      ['/partenariat/conventions/form'],
      { queryParams: { orgId: this.org.id } }
    );
  }

  enableEdit(): void {
    if (!this.canEdit) return;
    this.isEditing = true;
    this.form.enable();
    this.successMessage = '';
    this.errorMessage = '';
  }

  cancelEdit(): void {
    this.isEditing = false;
    if (this.org) this.patchForm(this.org);
    this.form.disable();
  }

  async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.org) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload: ContactInfoRequest = {
      nom:          this.form.value.nom,
      type:         this.form.value.type,
      description:  this.form.value.description  || undefined,
      region:       this.form.value.region        || undefined,
      contactNom:   this.form.value.contactNom,
      contactEmail: this.form.value.contactEmail,
      siteWeb:      this.form.value.siteWeb       || undefined
    };

    try {
      const updated = await this.partenaireService.updateContactInfo(this.org.id, payload);
      this.org = { ...this.org, ...updated };
      this.isEditing = false;
      this.form.disable();
      this.successMessage = 'Contact information updated successfully!';
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Update failed. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}