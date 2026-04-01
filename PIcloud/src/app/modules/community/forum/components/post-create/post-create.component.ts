import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../../../../core/services/auth.service';

import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="create-container animate-fade-in-up">
      
      <button mat-icon-button routerLink="/community/forum" class="back-btn">
        <mat-icon>arrow_back</mat-icon>
      </button>

      <div class="create-card glass-panel">
        <div class="card-header">
          <mat-icon class="header-icon">edit_square</mat-icon>
          <div>
            <h2 class="form-title">Nouveau Post</h2>
            <p class="form-subtitle">Partagez votre idée avec la communauté</p>
          </div>
        </div>

        <div class="card-content">
          <form [formGroup]="form" (ngSubmit)="submit()" class="post-form">

            <mat-form-field appearance="outline" class="full-width custom-field">
              <mat-label>Titre de votre post</mat-label>
              <input matInput formControlName="title" placeholder="Ex: Recherche de conseils en AgriTech" />
              <mat-error *ngIf="form.get('title')?.hasError('required')">Titre requis</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width custom-field">
              <mat-label>Secteur d'activité</mat-label>
              <mat-select formControlName="sector" placeholder="Choisissez un secteur">
                <mat-option *ngFor="let s of sectors" [value]="s">{{ s }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width custom-field">
              <mat-label>Contenu détaillé</mat-label>
              <textarea matInput formControlName="content" rows="8" placeholder="Décrivez votre idée, posez votre question..."></textarea>
              <mat-error *ngIf="form.get('content')?.hasError('required')">Contenu requis</mat-error>
            </mat-form-field>

            <div class="actions">
              <button mat-button type="button" class="cancel-btn" routerLink="/community/forum">Annuler</button>
              <button mat-raised-button color="primary" class="submit-btn" type="submit" [disabled]="form.invalid || loading">
                <mat-icon *ngIf="!loading">send</mat-icon>
                {{ loading ? 'Publication en cours...' : 'Publier le post' }}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .create-container { max-width: 700px; margin: 40px auto; padding: 0 16px; min-height: 80vh; }
    .back-btn { margin-bottom: 24px; background: white; box-shadow: var(--shadow-sm); }
    
    .create-card { background: white; border-radius: 16px; padding: 32px; box-shadow: var(--shadow-md); border: 1px solid rgba(0,0,0,0.05); }
    
    .card-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--co-background); }
    .header-icon { font-size: 40px; width: 40px; height: 40px; color: var(--co-primary); }
    .form-title { margin: 0 0 4px 0; font-size: 24px; font-weight: 800; color: var(--co-secondary); }
    .form-subtitle { margin: 0; color: var(--co-text-muted); font-size: 14px; }
    
    .post-form { display: flex; flex-direction: column; gap: 8px; }
    .full-width { width: 100%; }
    
    ::ng-deep .custom-field .mdc-text-field--outlined { background: var(--co-background) !important; border-radius: 12px; }
    ::ng-deep .custom-field .mat-mdc-form-field-flex { background-color: transparent !important; }
    
    .actions { display: flex; justify-content: flex-end; align-items: center; gap: 16px; margin-top: 16px; padding-top: 24px; border-top: 1px solid var(--co-background); }
    .cancel-btn { font-weight: 600; color: var(--co-text-muted); border-radius: 20px; padding: 0 24px; }
    .submit-btn { border-radius: 20px; padding: 0 32px; font-weight: 600; height: 44px; display: flex; align-items: center; gap: 8px; }
  `]
})
export class PostCreateComponent {

  form: FormGroup;
  loading = false;
  sectors = ['FinTech', 'AgriTech', 'EdTech', 'GreenTech', 'HealthTech', 'E-Commerce'];

  constructor(
    private fb: FormBuilder,
    private forumService: ForumService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      sector: [''],
      tags: [[]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    const dto = {
      ...this.form.value,
      authorId: this.authService.getUserId()?.toString() || ''
    };

    this.forumService.createPost(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/community/forum']);
      },
      error: () => { this.loading = false; }
    });
  }
}