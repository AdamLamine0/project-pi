import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartenaireService } from '../../../services/partenaire.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import {
  OrganisationPartenaireRequest,
  StatutPartenaire,
  TypePartenaire
} from '../../../models/partenaire';

@Component({
  selector: 'app-form-organisation',
  standalone: false,
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

  // available PARTNER users not yet linked to any organisation
  availablePartners: User[] = [];
  currentUserId: number | null = null; // keep track of the currently assigned user in edit mode

  constructor(
    private fb: FormBuilder,
    private partenaireService: PartenaireService,
    private userService: UserService,
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
    } else {
      // create mode: load partners right away
      this.loadAvailablePartners(null);
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

  // Load all PARTNER users that are not already assigned to an organisation.
  // currentAssignedId: the user currently assigned to THIS org (edit mode) —
  // we keep them in the list so the dropdown doesn't appear empty.
  async loadAvailablePartners(currentAssignedId: number | null): Promise<void> {
    try {
      const [allUsers, allOrgs] = await Promise.all([
        this.userService.getAllUsers(),
        this.partenaireService.getAll()
      ]);

      // collect all userIds already linked to an organisation
      const takenIds = new Set(
        allOrgs
          .map(o => o.userId)
          .filter((id): id is number => id !== null && id !== undefined)
      );

      // keep PARTNER users who are either unassigned OR the current org's user
      this.availablePartners = allUsers.filter(u =>
        u.role === 'PARTNER' &&
        (!takenIds.has(u.id) || u.id === currentAssignedId)
      );
    } catch {
      // non-blocking: form still works, dropdown will just be empty
      this.availablePartners = [];
    }
  }

  async loadOrg(id: number): Promise<void> {
    this.isLoading = true;
    try {
      const org = await this.partenaireService.getById(id);
      this.currentUserId = org.userId;

      this.form.patchValue({
        nom:          org.nom,
        type:         org.type,
        description:  org.description,
        siteWeb:      org.siteWeb,
        contactNom:   org.contactNom,
        contactEmail: org.contactEmail,
        region:       org.region,
        userId:       org.userId
      });

      // load partners AFTER we know the current assigned user
      await this.loadAvailablePartners(org.userId);
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
      userId:       this.form.value.userId       || undefined
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