import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartenaireService } from '../../../services/partenaire.service';
import {
  OrganisationPartenaire,
  ContactInfoRequest,
  TypePartenaire
} from '../../../models/partenaire';

@Component({
  selector: 'app-mon-organisation',
  templateUrl: './mon-organisation.component.html',
  styleUrl: './mon-organisation.component.css'
})
export class MonOrganisationComponent implements OnInit {

  org: OrganisationPartenaire | null = null;
  form!: FormGroup;
  types = Object.values(TypePartenaire);

  /** true when the route contains an :id — pure read-only view for other users */
  viewOnly = false;

  isEditing    = false;
  isLoading    = false;
  isSubmitting = false;
  errorMessage  = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private partenaireService: PartenaireService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Visiting someone else's org — read-only
      this.viewOnly = true;
      this.loadById(+id);
    } else {
      // PARTNER visiting their own dashboard
      this.viewOnly = false;
      this.load();
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

  /** Load own organisation via dashboard endpoint */
  async load(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      this.org = await this.partenaireService.getMyDashboard();
      this.patchForm(this.org);
    } catch {
      this.errorMessage = 'Impossible de charger votre organisation.';
    } finally {
      this.isLoading = false;
    }
  }

  /** Load any organisation by id — view-only */
  async loadById(id: number): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      this.org = await this.partenaireService.getById(id);
      this.patchForm(this.org);
    } catch {
      this.errorMessage = 'Impossible de charger cette organisation.';
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

  enableEdit(): void {
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
      this.successMessage = 'Informations de contact mises à jour !';
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Échec de la mise à jour.';
    } finally {
      this.isSubmitting = false;
    }
  }
}