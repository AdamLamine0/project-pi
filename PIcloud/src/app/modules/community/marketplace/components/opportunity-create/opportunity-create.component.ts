import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MarketplaceService } from '../../services/marketplace.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-opportunity-create',
  template: `
    <div class="create-container animate-fade-in-up">

      <button mat-icon-button routerLink="/community/marketplace" class="back-btn">
        <mat-icon>arrow_back</mat-icon>
      </button>

      <div class="create-card glass-panel">
        <div class="card-header">
          <div class="header-icon-wrapper">
            <mat-icon class="header-icon">work</mat-icon>
          </div>
          <div>
            <h2 class="form-title">Publier une Offre</h2>
            <p class="form-subtitle">Trouvez les meilleurs talents pour votre projet</p>
          </div>
        </div>

        <div class="card-content">
          <form [formGroup]="form" (ngSubmit)="submit()" class="opp-form">

            <mat-form-field appearance="outline" class="full-width custom-field">
              <mat-label>Titre de l'offre</mat-label>
              <input matInput formControlName="title" placeholder="Ex: Développeur Full Stack FinTech" />
              <mat-error *ngIf="form.get('title')?.hasError('required')">Titre requis</mat-error>
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width custom-field">
                <mat-label>Type d'offre</mat-label>
                <mat-select formControlName="type" placeholder="Choisissez un type">
                  <mat-option value="EMPLOI">Emploi</mat-option>
                  <mat-option value="STAGE">Stage</mat-option>
                  <mat-option value="PARTENARIAT">Partenariat</mat-option>
                  <mat-option value="FREELANCE">Freelance</mat-option>
                </mat-select>
                <mat-error *ngIf="form.get('type')?.hasError('required')">Type requis</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width custom-field">
                <mat-label>Postes disponibles</mat-label>
                <input matInput type="number" formControlName="positionsAvailable" min="1" placeholder="Ex: 2" />
                <mat-icon matPrefix>work</mat-icon>
                <mat-error *ngIf="form.get('positionsAvailable')?.hasError('required')">Nombre requis</mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width custom-field">
              <mat-label>Secteur d'activité</mat-label>
              <mat-select formControlName="sector" placeholder="Choisissez un secteur">
                <mat-option *ngFor="let s of sectors" [value]="s">{{ s }}</mat-option>
              </mat-select>
              <mat-error *ngIf="form.get('sector')?.hasError('required')">Secteur requis</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width custom-field">
              <mat-label>Localisation</mat-label>
              <input matInput formControlName="location" placeholder="Ex: Tunis, Remote" />
              <mat-icon matPrefix>location_on</mat-icon>
              <mat-error *ngIf="form.get('location')?.hasError('required')">Localisation requise</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width custom-field">
              <mat-label>Description détaillée</mat-label>
              <textarea matInput formControlName="description" rows="6"
                placeholder="Décrivez le poste, les missions, les avantages..."></textarea>
              <mat-error *ngIf="form.get('description')?.hasError('required')">Description requise</mat-error>
            </mat-form-field>

            <!-- Skills Chips -->
            <div class="skills-section">
              <label class="skills-label">Compétences requises</label>
              <mat-form-field appearance="outline" class="full-width custom-field">
                <mat-label>Ajouter une compétence</mat-label>
                <mat-chip-grid #chipGrid>
                  <mat-chip-row *ngFor="let skill of skills" (removed)="removeSkill(skill)">
                    {{ skill }}
                    <mat-icon matChipRemove>cancel</mat-icon>
                  </mat-chip-row>
                </mat-chip-grid>
                <input matInput [matChipInputFor]="chipGrid"
                  [matChipInputSeparatorKeyCodes]="separatorKeyCodes"
                  (matChipInputTokenEnd)="addSkill($event)"
                  placeholder="Tapez et appuyez sur Entrée..." />
              </mat-form-field>
            </div>

            <div class="actions">
              <button mat-button type="button" class="cancel-btn" routerLink="/community/marketplace">Annuler</button>
              <button mat-raised-button color="primary" class="submit-btn" type="submit"
                [disabled]="form.invalid || loading">
                <mat-icon *ngIf="!loading">publish</mat-icon>
                <span *ngIf="loading">Publication en cours...</span>
                <span *ngIf="!loading">Publier l'offre</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .create-container { max-width: 750px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }
    .back-btn { margin-bottom: 24px; background: white; box-shadow: var(--shadow-sm); border-radius: 12px; }

    .create-card {
      background: white; border-radius: 20px; padding: 36px;
      box-shadow: var(--shadow-md); border: 1px solid rgba(0,0,0,0.05);
    }

    .card-header {
      display: flex; align-items: flex-start; gap: 16px;
      margin-bottom: 32px; padding-bottom: 24px;
      border-bottom: 1px solid var(--co-background);
    }
    .header-icon-wrapper {
      width: 56px; height: 56px; border-radius: 16px;
      background: linear-gradient(135deg, var(--co-primary), var(--co-primary-dark));
      display: flex; justify-content: center; align-items: center;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    }
    .header-icon { font-size: 28px; width: 28px; height: 28px; color: white; }
    .form-title { margin: 0 0 4px 0; font-size: 24px; font-weight: 800; color: var(--co-secondary); }
    .form-subtitle { margin: 0; color: var(--co-text-muted); font-size: 14px; }

    .opp-form { display: flex; flex-direction: column; gap: 8px; }
    .full-width { width: 100%; }
    .form-row { display: flex; gap: 16px; }
    .half-width { flex: 1; }

    ::ng-deep .custom-field .mdc-text-field--outlined { background: var(--co-background) !important; border-radius: 12px; }
    ::ng-deep .custom-field .mat-mdc-form-field-flex { background-color: transparent !important; }

    .skills-section { margin-bottom: 8px; }
    .skills-label { font-size: 13px; font-weight: 600; color: var(--co-text-muted); margin-bottom: 8px; display: block; }

    .actions {
      display: flex; justify-content: flex-end; align-items: center; gap: 16px;
      margin-top: 16px; padding-top: 24px; border-top: 1px solid var(--co-background);
    }
    .cancel-btn { font-weight: 600; color: var(--co-text-muted); border-radius: 20px; padding: 0 24px; }
    .submit-btn {
      border-radius: 20px; padding: 0 32px; font-weight: 600;
      height: 44px; display: flex; align-items: center; gap: 8px;
    }

    @media (max-width: 640px) {
      .form-row { flex-direction: column; gap: 8px; }
      .create-card { padding: 24px; }
    }
  `]
})
export class OpportunityCreateComponent implements OnInit {

  form: FormGroup;
  loading = false;
  skills: string[] = [];
  sectors = ['FinTech', 'AgriTech', 'EdTech', 'GreenTech', 'HealthTech', 'E-Commerce'];
  separatorKeyCodes = [ENTER, COMMA];
  canCreateOpportunity = false;

  constructor(
    private fb: FormBuilder,
    private marketplaceService: MarketplaceService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      sector: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      skillsRequired: [[]],
      positionsAvailable: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.checkUserRole();
    if (!this.canCreateOpportunity) {
      this.snackBar.open('Vous n\'êtes pas autorisé à publier des offres', 'Fermer', {
        duration: 3000, panelClass: ['snack-error']
      });
      this.router.navigate(['/community/marketplace']);
    }
  }

  checkUserRole() {
    // Only ADMIN, ENTREPRENEUR, PARTENAIRE, INVESTISSEUR can create opportunities
    this.canCreateOpportunity = this.authService.isAdmin() || 
                              this.authService.isEntrepreneur() || 
                              this.authService.isPartenaire() || 
                              this.authService.isInvestisseur();
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
      this.form.patchValue({ skillsRequired: this.skills });
    }
    event.chipInput!.clear();
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter(s => s !== skill);
    this.form.patchValue({ skillsRequired: this.skills });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    const dto = {
      ...this.form.value,
      publisherId: this.authService.getUserId()?.toString() || ''
    };
    this.marketplaceService.createOpportunity(dto).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Offre publiée avec succès ! 🎉', 'OK', {
          duration: 3000, panelClass: ['snack-success']
        });
        this.router.navigate(['/community/marketplace']);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erreur lors de la publication', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    });
  }
}