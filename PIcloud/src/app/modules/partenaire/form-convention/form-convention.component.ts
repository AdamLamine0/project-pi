import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ConventionService } from '../../../services/convention.service';
import { PartenaireService } from '../../../services/partenaire.service';
import { OrganisationPartenaire } from '../../../models/partenaire';
import {
  ConventionResponse,
  ResponsableObjectif,
  StatutConvention
} from '../../../models/convention';

@Component({
  selector: 'app-form-convention',
  templateUrl: './form-convention.component.html',
  styleUrl: './form-convention.component.css'
})
export class FormConventionComponent implements OnInit {

  form!: FormGroup;

  // Edit mode
  conventionId: number | null = null;
  existing: ConventionResponse | null = null;

  // Context
  isUser      = false;   // current user is ROLE_USER (entrepreneur)
  isPartner   = false;   // current user is ROLE_PARTNER
  isAdmin     = false;
  myUserId    = 0;
  myOrgId     = 0;       // set when partner loads their org

  // For USER: choose which org to partner with
  organisations: OrganisationPartenaire[] = [];

  isLoading    = false;
  isSubmitting = false;
  errorMessage  = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private conventionService: ConventionService,
    private partenaireService: PartenaireService
  ) {}

  ngOnInit(): void {
    const role      = this.auth.getRole();          // 'USER' | 'PARTNER' | 'ADMIN'
    this.myUserId   = this.auth.getUserId();
    this.isUser     = role === 'USER';
    this.isPartner  = role === 'PARTNER';
    this.isAdmin    = role === 'ADMIN';

    this.buildForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.conventionId = +idParam;
      this.loadExisting(this.conventionId);
    } else {
      // Create mode: USER picks org, PARTNER picks user (not needed — user creates)
      if (this.isUser) this.loadOrganisations();
    }
  }

  // ── Form builder ──────────────────────────────────────────────────────────

  buildForm(): void {
    this.form = this.fb.group({
      organisationPartenaireId: [null, Validators.required],
      dateDebut: ['', Validators.required],
      dateFin:   ['', Validators.required],
      objectifs: this.fb.array([])
    });

    // In create mode for USER: auto-add one objectif row
    if (!this.conventionId) this.addObjectif();
  }

  get objectifsArray(): FormArray {
    return this.form.get('objectifs') as FormArray;
  }

  objectifGroup(): FormGroup {
    return this.fb.group({
      titre:       ['', Validators.required],
      description: [''],
      dateEcheance:['']
    });
  }

  addObjectif(): void {
    this.objectifsArray.push(this.objectifGroup());
  }

  removeObjectif(i: number): void {
    this.objectifsArray.removeAt(i);
  }

  // ── Data loading ──────────────────────────────────────────────────────────

  async loadOrganisations(): Promise<void> {
    try {
      this.organisations = await this.partenaireService.getAll();
    } catch {
      this.errorMessage = 'Impossible de charger les organisations.';
    }
  }

  async loadExisting(id: number): Promise<void> {
    this.isLoading = true;
    try {
      this.existing = await this.conventionService.getById(id);
      this.form.patchValue({
        organisationPartenaireId: this.existing.organisationPartenaireId,
        dateDebut: this.existing.dateDebut,
        dateFin:   this.existing.dateFin
      });

      // Load objectifs created by the CURRENT party (the ones they own = they can edit)
      // USER sees objectifs where responsable === PARTENAIRE (they wrote what partner must do)
      // PARTNER sees objectifs where responsable === USER (they wrote what user must do)
      const myObjectifs = this.existing.objectifs.filter(o =>
        this.isUser
          ? o.responsable === ResponsableObjectif.PARTENAIRE
          : o.responsable === ResponsableObjectif.USER
      );

      // Clear and repopulate form array
      this.objectifsArray.clear();
      myObjectifs.forEach(o => {
        this.objectifsArray.push(this.fb.group({
          id:          [o.id],                         // keep id for update
          titre:       [o.titre, Validators.required],
          description: [o.description],
          dateEcheance:[o.dateEcheance]
        }));
      });

      if (this.objectifsArray.length === 0) this.addObjectif();
    } catch {
      this.errorMessage = 'Impossible de charger la convention.';
    } finally {
      this.isLoading = false;
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /**
   * When a USER writes objectifs, those objectifs are the things
   * the PARTENAIRE is responsible for — and vice versa.
   * This is the key UX insight: you define what the other party owes you.
   */
  get myResponsable(): ResponsableObjectif {
    return this.isUser ? ResponsableObjectif.PARTENAIRE : ResponsableObjectif.USER;
  }

  canConfirm(): boolean {
    if (!this.existing) return false;
    const s = this.existing.statut;
    // USER can confirm if convention is BROUILLON and they didn't create it
    // (or partner already confirmed → statut SIGNEE, user confirms → ACTIVE)
    return s === StatutConvention.BROUILLON || s === StatutConvention.SIGNEE;
  }

  isEditable(): boolean {
    if (!this.existing) return true; // create mode always editable
    return this.existing.statut === StatutConvention.BROUILLON;
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      let convention: ConventionResponse;

      const conventionPayload = {
        organisationPartenaireId: this.form.value.organisationPartenaireId,
        userId: this.myUserId,
        dateDebut: this.form.value.dateDebut,
        dateFin:   this.form.value.dateFin
      };

      if (this.conventionId) {
        // Update convention dates
        convention = await this.conventionService.update(this.conventionId, conventionPayload);
      } else {
        // Create convention first
        convention = await this.conventionService.create(conventionPayload);
      }

      // Save objectifs
      const objectifsValue = this.objectifsArray.value as any[];
      for (const o of objectifsValue) {
        const payload = {
          conventionId: convention.id,
          titre:        o.titre,
          description:  o.description || undefined,
          responsable:  this.myResponsable,  // I write what the OTHER party must do
          dateEcheance: o.dateEcheance || undefined
        };

        if (o.id) {
          // Update existing objectif
          await this.conventionService.updateObjectif(o.id, payload);
        } else {
          // Create new objectif
          await this.conventionService.createObjectif(payload);
        }
      }

      this.successMessage = this.conventionId
        ? 'Convention mise à jour avec succès.'
        : 'Demande de convention envoyée avec succès.';

      setTimeout(() => this.router.navigate(['/partenariat/conventions']), 1500);
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Une erreur est survenue.';
    } finally {
      this.isSubmitting = false;
    }
  }

  // ── Confirmation workflow ─────────────────────────────────────────────────

  async confirmer(): Promise<void> {
    if (!this.existing) return;
    this.isSubmitting = true;
    try {
      const updated = await this.conventionService.confirmer(this.existing.id);
      this.existing = updated;
      // If now SIGNEE, the other party still needs to confirm → ACTIVE
      // If now ACTIVE, done!
      if (updated.statut === StatutConvention.ACTIVE) {
        this.successMessage = 'Convention activée ! Les deux parties ont confirmé.';
      } else {
        this.successMessage = 'Votre confirmation a été enregistrée. En attente de l\'autre partie.';
      }
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Échec de la confirmation.';
    } finally {
      this.isSubmitting = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/partenariat/conventions']);
  }
}