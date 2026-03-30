import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartenaireService } from '../../../services/partenaire.service';
import {
  OrganisationPartenaireRequest,
  StatutPartenaire,
  TypePartenaire
} from '../../../models/partenaire';

@Component({
  selector: 'app-form-organisation',
  templateUrl: './form-organisation.component.html',
  styleUrl: './form-organisation.component.css'
})
export class FormOrganisationComponent implements OnInit {

  form!: FormGroup;
  isEditMode  = false;
  editId: number | null = null;

  isLoading    = false;
  isSubmitting = false;
  errorMessage  = '';
  successMessage = '';

  types   = Object.values(TypePartenaire);
  statuts = Object.values(StatutPartenaire);

  constructor(
    private fb: FormBuilder,
    private partenaireService: PartenaireService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editId     = Number(id);
      this.loadOrg(this.editId);
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      nom:          ['', [Validators.required, Validators.minLength(2)]],
      type:         ['', Validators.required],
      description:  [''],
      siteWeb:      [''],
      contactNom:   ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      region:       [''],
      userId:       [null]
    });
  }

  get f() { return this.form.controls; }

  async loadOrg(id: number): Promise<void> {
    this.isLoading = true;
    try {
      const org = await this.partenaireService.getById(id);
      this.form.patchValue({
        nom:          org.nom,
        type:         org.type,
        description:  org.description,
        siteWeb:      org.siteWeb,
        contactNom:   org.nom,
        contactEmail: org.contactEmail,
        region:       org.region,
        userId:       org.userID
      });
    } catch {
      this.errorMessage = 'Impossible de charger les données de l\'organisation.';
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.errorMessage  = '';

    const payload: OrganisationPartenaireRequest = {
      nom:          this.form.value.nom,
      type:         this.form.value.type,
      description:  this.form.value.description || undefined,
      siteWeb:      this.form.value.siteWeb      || undefined,
      contactNom:   this.form.value.contactNom,
      contactEmail: this.form.value.contactEmail,
      region:       this.form.value.region       || undefined,
      userId:       this.form.value.userId        || undefined
    };

    try {
      if (this.isEditMode && this.editId !== null) {
        await this.partenaireService.update(this.editId, payload);
        this.successMessage = 'Organisation mise à jour avec succès !';
      } else {
        await this.partenaireService.create(payload);
        this.successMessage = 'Organisation créée avec succès !';
      }
      setTimeout(() => this.router.navigate(['/partenariat/list']), 1500);
    } catch (err: any) {
      this.errorMessage =
        err?.error?.message || err?.error?.error || 'Une erreur est survenue.';
    } finally {
      this.isSubmitting = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/partenariat/list']);
  }
}