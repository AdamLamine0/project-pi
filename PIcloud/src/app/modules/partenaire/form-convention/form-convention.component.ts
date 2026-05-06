import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ConventionService } from '../../../services/convention.service';
import { PartenaireService } from '../../../services/partenaire.service';
import { OrganisationPartenaire } from '../../../models/partenaire';
import {
  ConventionResponse, ObjectifResponse,
  ResponsableObjectif, StatutConvention
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
  isLoading     = false;
  isSubmitting  = false;
  errorMessage  = '';
  successMessage = '';
  pendingStatutChanges = new Map<number, string>();
  // ── Signature + Date modal ────────────────────────────────────────────────
  showSignatureModal = false;
  signatureIsEmpty   = true;
  private sigCanvas!: HTMLCanvasElement;
  private sigCtx!:    CanvasRenderingContext2D;
  private sigDrawing  = false;

  // Date fields live INSIDE the modal (set at signature time)
  modalDateDebut = '';
  modalDateFin   = '';
  minDateDebut   = '';
  minDateFin     = '';
  modalDateError = '';

  // Whether this party is the first to confirm (so dates are required)
  get isFirstConfirmer(): boolean {
    if (!this.existing) return true;
    return !this.existing.confirmeParUser && !this.existing.confirmeParPartenaire;
  }

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

    // Compute minDateDebut (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDateDebut = tomorrow.toISOString().split('T')[0];

    this.buildForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.conventionId = +idParam;
      this.loadExisting(this.conventionId);
    } else {
      if (this.isUser) {
        this.loadOrganisations().then(() => {
          const orgIdParam = this.route.snapshot.queryParamMap.get('orgId');
          if (orgIdParam) this.form.patchValue({ organisationPartenaireId: +orgIdParam });
        });
      }
      this.addObjectif();
    }
  }

  buildForm(): void {
    // No date fields here — dates are collected at confirmation time in the modal.
    this.form = this.fb.group({
      organisationPartenaireId: [null, Validators.required],
      objectifs: this.fb.array([])
    });
  }

  get objectifsArray(): FormArray { return this.form.get('objectifs') as FormArray; }

  objectifGroup(): FormGroup {
    return this.fb.group({
      titre:       ['', Validators.required],
      description: ['']
      // dateEcheance REMOVED
    });
  }

  addObjectif():             void { this.objectifsArray.push(this.objectifGroup()); }
  removeObjectif(i: number): void { this.objectifsArray.removeAt(i); }

  async loadOrganisations(): Promise<void> {
    try { this.organisations = await this.partenaireService.getAll(); }
    catch { this.errorMessage = 'Impossible de charger les organisations.'; }
  }

  async loadExisting(id: number): Promise<void> {
    this.isLoading = true;
    try {
      this.existing = await this.conventionService.getById(id);
      this.form.patchValue({
        organisationPartenaireId: this.existing.organisationPartenaireId
      });

      // Pre-fill modal dates if already locked (second confirmer scenario)
      if (this.existing.dateDebut) this.modalDateDebut = String(this.existing.dateDebut);
      if (this.existing.dateFin)   this.modalDateFin   = String(this.existing.dateFin);

      const myObjectifs = this.existing.objectifs.filter(o =>
        this.isUser ? o.responsable === ResponsableObjectif.PARTENAIRE
                    : o.responsable === ResponsableObjectif.USER
      );

      this.objectifsArray.clear();
      myObjectifs.forEach(o => {
        this.objectifsArray.push(this.fb.group({
          id:          [o.id],
          titre:       [o.titre, Validators.required],
          description: [o.description]
          // dateEcheance REMOVED
        }));
      });

      if (this.objectifsArray.length === 0) this.addObjectif();
    } catch {
      this.errorMessage = 'Impossible de charger la convention.';
    } finally {
      this.isLoading = false;
    }
  }

  get otherPartyObjectifs(): ObjectifResponse[] {
    if (!this.existing) return [];
    return this.existing.objectifs.filter(o =>
      this.isUser ? o.responsable === ResponsableObjectif.USER
                  : o.responsable === ResponsableObjectif.PARTENAIRE
    );
  }

  get myResponsable(): ResponsableObjectif {
    return this.isUser ? ResponsableObjectif.PARTENAIRE : ResponsableObjectif.USER;
  }

  isEditable(): boolean {
  if (!this.existing) return true;
  return this.existing.statut !== StatutConvention.ACTIVE
      && this.existing.statut !== StatutConvention.COMPLETED
      && this.existing.statut !== StatutConvention.EXPIRED;
}

  canConfirm(): boolean {
    if (!this.existing) return false;
    if (this.existing.statut === StatutConvention.ACTIVE)  return false;
    if (this.existing.statut === StatutConvention.EXPIRED) return false;
    if (this.existing.statut === StatutConvention.COMPLETED) return false;
    if (this.isUser    && this.existing.confirmeParUser)       return false;
    if (this.isPartner && this.existing.confirmeParPartenaire) return false;
    if (this.existing.modifieParRole === this.myRole) {
      const otherConfirmed = this.isUser
        ? this.existing.confirmeParPartenaire
        : this.existing.confirmeParUser;
      return !!otherConfirmed;
    }
    return true;
  }

  canAnnuler(): boolean {
    if (!this.existing) return false;
    return this.existing.statut === StatutConvention.ACTIVE
        || this.existing.statut === StatutConvention.SIGNED
        || this.existing.statut === StatutConvention.DRAFT;
  }

  get confirmationStatusMessage(): string {
    if (!this.existing) return '';
    if (this.existing.statut === StatutConvention.ACTIVE)
      return '✅ Convention activée — les deux parties ont confirmé.';
    if (this.existing.modifieParRole === this.myRole) {
      const otherConfirmed = this.isUser
        ? this.existing.confirmeParPartenaire : this.existing.confirmeParUser;
      if (!otherConfirmed) {
        const other = this.isUser ? 'le partenaire' : 'le porteur de projet';
        return `⏳ Vous avez modifié la convention — attendez que ${other} confirme d'abord.`;
      }
      return `👆 L'autre partie a confirmé — c'est votre tour de confirmer.`;
    }
    if (this.isUser    && this.existing.confirmeParUser)
      return '⏳ Vous avez confirmé — en attente de la confirmation du partenaire.';
    if (this.isPartner && this.existing.confirmeParPartenaire)
      return '⏳ Vous avez confirmé — en attente de la confirmation du porteur de projet.';
    if (this.existing.modifieParRole && this.existing.modifieParRole !== this.myRole) {
      const who = this.isUser ? 'Le partenaire' : 'Le porteur de projet';
      return `👆 ${who} a modifié la convention — veuillez la confirmer.`;
    }
    if (!this.existing.modifieParRole)
      return '⏳ En attente de la première confirmation.';
    return '';
  }

  // ── Submit (save objectifs only — no dates) ───────────────────────────────

  async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.isSubmitting = true;
    this.errorMessage = '';
    try {
      const conventionPayload = {
        organisationPartenaireId: this.form.value.organisationPartenaireId,
        userId: this.myUserId
        // dateDebut / dateFin intentionally omitted — set at signature time
      };

      let convention: ConventionResponse;
      if (this.conventionId) {
        convention = await this.conventionService.update(this.conventionId, conventionPayload as any);
      } else {
        convention = await this.conventionService.create(conventionPayload as any);
      }

      for (const o of this.objectifsArray.value as any[]) {
        const payload = {
          conventionId: convention.id,
          titre:        o.titre,
          description:  o.description || undefined,
          responsable:  this.myResponsable
          // dateEcheance REMOVED
        };
        if (o.id) await this.conventionService.updateObjectif(o.id, payload);
        else      await this.conventionService.createObjectif(payload);
      }

      this.successMessage = this.conventionId
        ? 'Convention mise à jour.'
        : 'Demande envoyée. Le partenaire doit maintenant confirmer.';
      setTimeout(() => this.router.navigate(['/partenariat/conventions']), 1800);
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Une erreur est survenue.';
    } finally {
      this.isSubmitting = false;
    }
  }

  // ── Signature + Date modal ────────────────────────────────────────────────

  openSignatureModal(): void {
    if (!this.existing) return;
    this.modalDateError    = '';
    this.showSignatureModal = true;
    this.signatureIsEmpty   = true;
    setTimeout(() => {
      this.sigCanvas = document.getElementById('sigCanvas') as HTMLCanvasElement;
      this.sigCtx    = this.sigCanvas.getContext('2d')!;
      this.sigCtx.strokeStyle = '#1e293b';
      this.sigCtx.lineWidth   = 2.5;
      this.sigCtx.lineCap     = 'round';
      this.sigCtx.lineJoin    = 'round';
    }, 50);
  }

  onModalDateDebutChange(): void {
    if (this.modalDateDebut) {
      const minFin = new Date(this.modalDateDebut);
      minFin.setMonth(minFin.getMonth() + 3);
      this.minDateFin = minFin.toISOString().split('T')[0];
      if (this.modalDateFin && this.modalDateFin < this.minDateFin) {
        this.modalDateFin = '';
      }
    }
  }

  startDraw(e: MouseEvent): void {
    this.sigDrawing = true;
    const p = this.getSigPos(e);
    this.sigCtx.beginPath();
    this.sigCtx.moveTo(p.x, p.y);
  }

  draw(e: MouseEvent): void {
    if (!this.sigDrawing) return;
    const p = this.getSigPos(e);
    this.sigCtx.lineTo(p.x, p.y);
    this.sigCtx.stroke();
    this.signatureIsEmpty = false;
  }

  stopDraw(): void { this.sigDrawing = false; }

  private getSigPos(e: MouseEvent) {
    const rect = this.sigCanvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (this.sigCanvas.width  / rect.width),
      y: (e.clientY - rect.top)  * (this.sigCanvas.height / rect.height)
    };
  }

  clearSignature(): void {
    this.sigCtx.clearRect(0, 0, this.sigCanvas.width, this.sigCanvas.height);
    this.signatureIsEmpty = true;
  }

  async confirmSignature(): Promise<void> {
    this.modalDateError = '';

    // Dates are only required when this party is the FIRST to confirm
    if (this.isFirstConfirmer) {
      if (!this.modalDateDebut || !this.modalDateFin) {
        this.modalDateError = 'Veuillez renseigner les deux dates avant de confirmer.';
        return;
      }
    }

    const dataUrl = this.sigCanvas.toDataURL('image/png');
    this.showSignatureModal = false;
    await this.confirmer(
      dataUrl,
      this.isFirstConfirmer ? this.modalDateDebut : undefined,
      this.isFirstConfirmer ? this.modalDateFin   : undefined
    );
  }

  onCancelSignature(): void { this.showSignatureModal = false; }

  async confirmer(signature: string, dateDebut?: string, dateFin?: string): Promise<void> {
    if (!this.existing) return;
    this.isSubmitting = true;
    this.errorMessage = '';
    try {
      const updated = await this.conventionService.confirmer(
        this.existing.id, signature, dateDebut, dateFin
      );
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

  async annulerConvention(): Promise<void> {
    if (!this.existing) return;
    if (!confirm('Êtes-vous sûr de vouloir annuler cette convention ? Cette action est irréversible.')) return;
    this.isSubmitting = true;
    this.errorMessage = '';
    try {
      const updated = await this.conventionService.annuler(this.existing.id);
      this.existing = updated;
      this.successMessage = '✅ Convention annulée.';
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Échec de l\'annulation.';
    } finally {
      this.isSubmitting = false;
    }
  }

  // Called when user selects a new statut — just queues the change locally
onObjectifStatutChange(objectifId: number, statut: string): void {
  this.pendingStatutChanges.set(objectifId, statut);
  // Update the local display immediately so the select reflects the choice
  if (this.existing) {
    const obj = this.existing.objectifs.find(o => o.id === objectifId);
    if (obj) obj.statut = statut as any;
  }
}

// Called when user clicks "Confirmer les modifications" — sends all queued changes
async confirmStatutChanges(): Promise<void> {
  if (this.pendingStatutChanges.size === 0) return;
  this.isSubmitting = true;
  this.errorMessage = '';
  try {
    const promises = Array.from(this.pendingStatutChanges.entries()).map(
      ([id, statut]) => this.conventionService.updateObjectifStatut(id, statut as any)
    );
    await Promise.all(promises);
    this.pendingStatutChanges.clear();
    // Reload to get the definitive server state
    if (this.existing) {
      this.existing = await this.conventionService.getById(this.existing.id);
    }
    this.successMessage = '✅ Statuts des objectifs mis à jour.';
    setTimeout(() => (this.successMessage = ''), 3000);
  } catch (err: any) {
    this.errorMessage = err?.error?.message || 'Échec de la mise à jour des statuts.';
  } finally {
    this.isSubmitting = false;
  }
}

// Keep this for backward compatibility but it's no longer called from template
async updateObjectifStatut(objectifId: number, statut: string): Promise<void> {
  try {
    await this.conventionService.updateObjectifStatut(objectifId, statut as any);
    if (this.existing) {
      this.existing = await this.conventionService.getById(this.existing.id);
    }
  } catch (err: any) {
    this.errorMessage = err?.error?.message || 'Échec de la mise à jour du statut.';
  }
}

  downloadPdf(): void {
    if (!this.existing) return;
    this.conventionService.downloadConventionPdf(this.existing.id);
  }
  

  goBack(): void { this.router.navigate(['/partenariat/conventions']); }
}