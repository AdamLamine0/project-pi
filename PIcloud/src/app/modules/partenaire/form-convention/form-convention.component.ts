import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ConventionService } from '../../../services/convention.service';
import { PartenaireService } from '../../../services/partenaire.service';
import { OrganisationPartenaire } from '../../../models/partenaire';
import {
  ConventionResponse,
  ObjectifResponse,
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

  conventionId: number | null = null;
  existing: ConventionResponse | null = null;

  isUser    = false;
  isPartner = false;
  isAdmin   = false;
  myUserId  = 0;
  myRole    = '';

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
    const role    = this.auth.getRole();
    this.myUserId = this.auth.getUserId();
    this.myRole   = `ROLE_${role}`;
    this.isUser    = role === 'USER';
    this.isPartner = role === 'PARTNER';
    this.isAdmin   = role === 'ADMIN';

    this.buildForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.conventionId = +idParam;
      this.loadExisting(this.conventionId);
    } else {
      if (this.isUser) {
        this.loadOrganisations().then(() => {
          const orgIdParam = this.route.snapshot.queryParamMap.get('orgId');
          if (orgIdParam) {
            this.form.patchValue({ organisationPartenaireId: +orgIdParam });
          }
        });
      }
      this.addObjectif();
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      organisationPartenaireId: [null, Validators.required],
      dateDebut: ['', Validators.required],
      dateFin:   ['', Validators.required],
      objectifs: this.fb.array([])
    });
  }

  get objectifsArray(): FormArray {
    return this.form.get('objectifs') as FormArray;
  }

  objectifGroup(): FormGroup {
    return this.fb.group({
      titre:        ['', Validators.required],
      description:  [''],
      dateEcheance: ['']
    });
  }

  addObjectif(): void { this.objectifsArray.push(this.objectifGroup()); }
  removeObjectif(i: number): void { this.objectifsArray.removeAt(i); }

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

      // Load into editable form ONLY the objectifs I wrote
      // USER writes what PARTENAIRE must do → responsable = PARTENAIRE
      // PARTNER writes what USER must do    → responsable = USER
      const myObjectifs = this.existing.objectifs.filter(o =>
        this.isUser
          ? o.responsable === ResponsableObjectif.PARTENAIRE
          : o.responsable === ResponsableObjectif.USER
      );

      this.objectifsArray.clear();
      myObjectifs.forEach(o => {
        this.objectifsArray.push(this.fb.group({
          id:           [o.id],
          titre:        [o.titre, Validators.required],
          description:  [o.description],
          dateEcheance: [o.dateEcheance]
        }));
      });

      if (this.objectifsArray.length === 0) this.addObjectif();

    } catch {
      this.errorMessage = 'Impossible de charger la convention.';
    } finally {
      this.isLoading = false;
    }
  }

  // ── Computed: objectifs written by the OTHER party (read-only for me) ──────

  /** Objectifs that the OTHER party wrote — I need to READ these before confirming */
  get otherPartyObjectifs(): ObjectifResponse[] {
    if (!this.existing) return [];
    // USER reads what PARTNER wrote for them (responsable = USER)
    // PARTNER reads what USER wrote for them (responsable = PARTENAIRE)
    return this.existing.objectifs.filter(o =>
      this.isUser
        ? o.responsable === ResponsableObjectif.USER
        : o.responsable === ResponsableObjectif.PARTENAIRE
    );
  }

  /** Objectifs I wrote (shown read-only alongside my editable form) */
  get myWrittenObjectifs(): ObjectifResponse[] {
    if (!this.existing) return [];
    return this.existing.objectifs.filter(o =>
      this.isUser
        ? o.responsable === ResponsableObjectif.PARTENAIRE
        : o.responsable === ResponsableObjectif.USER
    );
  }

  // ── Key UX logic ──────────────────────────────────────────────────────────

  get myResponsable(): ResponsableObjectif {
    return this.isUser ? ResponsableObjectif.PARTENAIRE : ResponsableObjectif.USER;
  }

  isEditable(): boolean {
  if (!this.existing) return true;
  // Only lock editing once ACTIVE or EXPIREE
  return this.existing.statut !== StatutConvention.ACTIVE
      && this.existing.statut !== StatutConvention.EXPIREE;
}

  /**
   * Confirmation rules:
   * 1. Cannot confirm if YOU last modified (modifieParRole === myRole)
   *    UNLESS the other party already confirmed
   * 2. Cannot confirm if you already confirmed
   * 3. Cannot confirm if ACTIVE or EXPIREE
   */
  canConfirm(): boolean {
  if (!this.existing) return false;
  if (this.existing.statut === StatutConvention.ACTIVE)  return false;
  if (this.existing.statut === StatutConvention.EXPIREE) return false;

  // Already confirmed → no need again
  if (this.isUser    && this.existing.confirmeParUser)       return false;
  if (this.isPartner && this.existing.confirmeParPartenaire) return false;

  // YOU last modified → can only confirm AFTER the other party confirms first
  if (this.existing.modifieParRole === this.myRole) {
    const otherConfirmed = this.isUser
      ? this.existing.confirmeParPartenaire
      : this.existing.confirmeParUser;
    return !!otherConfirmed;
  }

  // Other party last modified, or no one modified → it's your turn
  return true;
}

  get confirmationStatusMessage(): string {
  if (!this.existing) return '';

  if (this.existing.statut === StatutConvention.ACTIVE) {
    return '✅ Convention activée — les deux parties ont confirmé.';
  }

  // I last modified and other hasn't confirmed yet → I must wait
  if (this.existing.modifieParRole === this.myRole) {
    const otherConfirmed = this.isUser
      ? this.existing.confirmeParPartenaire
      : this.existing.confirmeParUser;
    if (!otherConfirmed) {
      const other = this.isUser ? 'le partenaire' : 'le porteur de projet';
      return `⏳ Vous avez modifié la convention — attendez que ${other} confirme d'abord, puis confirmez à votre tour.`;
    }
    // Other confirmed, now I can confirm
    return `👆 L'autre partie a confirmé — c'est votre tour de confirmer.`;
  }

  // I already confirmed → wait for other
  if (this.isUser && this.existing.confirmeParUser) {
    return '⏳ Vous avez confirmé — en attente de la confirmation du partenaire.';
  }
  if (this.isPartner && this.existing.confirmeParPartenaire) {
    return '⏳ Vous avez confirmé — en attente de la confirmation du porteur de projet.';
  }

  // Other modified → it's my turn to confirm
  if (this.existing.modifieParRole && this.existing.modifieParRole !== this.myRole) {
    const who = this.isUser ? 'Le partenaire' : 'Le porteur de projet';
    return `👆 ${who} a modifié la convention — veuillez la confirmer.`;
  }

  // No one modified yet (fresh convention, no one confirmed) → other must go first
  if (!this.existing.modifieParRole) {
    return '⏳ En attente de la première confirmation.';
  }

  return '';
}

  // ── Submit ────────────────────────────────────────────────────────────────

  async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      const conventionPayload = {
        organisationPartenaireId: this.form.value.organisationPartenaireId,
        userId:    this.myUserId,
        dateDebut: this.form.value.dateDebut,
        dateFin:   this.form.value.dateFin
      };

      let convention: ConventionResponse;
      if (this.conventionId) {
        convention = await this.conventionService.update(this.conventionId, conventionPayload);
      } else {
        convention = await this.conventionService.create(conventionPayload);
      }

      // Save my objectifs
      for (const o of this.objectifsArray.value as any[]) {
        const payload = {
          conventionId: convention.id,
          titre:        o.titre,
          description:  o.description || undefined,
          responsable:  this.myResponsable,
          dateEcheance: o.dateEcheance || undefined
        };
        if (o.id) {
          await this.conventionService.updateObjectif(o.id, payload);
        } else {
          await this.conventionService.createObjectif(payload);
        }
      }

      this.successMessage = this.conventionId
        ? 'Convention mise à jour. L\'autre partie doit confirmer.'
        : 'Demande envoyée. Le partenaire doit maintenant ajouter ses objectifs et confirmer.';

      setTimeout(() => this.router.navigate(['/partenariat/conventions']), 1800);
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Une erreur est survenue.';
    } finally {
      this.isSubmitting = false;
    }
  }

  // ── Confirm ───────────────────────────────────────────────────────────────

  async confirmer(): Promise<void> {
    if (!this.existing) return;
    this.isSubmitting = true;
    this.errorMessage = '';
    try {
      const updated = await this.conventionService.confirmer(this.existing.id);
      this.existing = updated;

      if (updated.statut === StatutConvention.ACTIVE) {
        this.successMessage = '✅ Convention activée ! Les deux parties ont confirmé.';
      } else if (this.isUser) {
        this.successMessage = '✅ Confirmation enregistrée. En attente du partenaire.';
      } else {
        this.successMessage = '✅ Confirmation enregistrée. En attente du porteur de projet.';
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