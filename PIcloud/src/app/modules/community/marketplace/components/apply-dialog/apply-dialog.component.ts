import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketplaceService } from '../../services/marketplace.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { ApplyDTO } from '../../../shared/models/opportunity.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ApplyDialogData {
  opportunityId: string;
  opportunityTitle: string;
}

@Component({
  selector: 'app-apply-dialog',
  template: `
    <div class="apply-dialog">
      <!-- Header -->
      <div class="dialog-header">
        <div class="header-icon-wrapper">
          <mat-icon>send</mat-icon>
        </div>
        <div>
          <h2 class="dialog-title">Postuler</h2>
          <p class="dialog-subtitle">{{ data.opportunityTitle }}</p>
        </div>
        <button mat-icon-button class="close-btn" (click)="cancel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Form -->
      <form [formGroup]="form" (ngSubmit)="submit()" class="apply-form">
        
          <!-- File Upload -->
        <div class="file-input-section">
          <div class="file-upload-container">
            <input type="file" 
              #fileInput
              accept=".pdf"
              (change)="onFileSelected($event)"
              style="display: none;" />
            <button mat-stroked-button type="button" class="upload-btn" (click)="fileInput.click()">
              <mat-icon>cloud_upload</mat-icon>
              {{ selectedFileName || 'Choisir un fichier PDF' }}
            </button>
            <mat-hint>Format PDF uniquement, max 10MB</mat-hint>
            <mat-error *ngIf="!selectedFile && form.touched">CV requis</mat-error>
          </div>
        </div>

        <mat-form-field appearance="outline" class="full-width custom-field">
          <mat-label>Lettre de motivation</mat-label>
          <textarea matInput formControlName="coverLetter" rows="6"
            placeholder="Présentez-vous et expliquez pourquoi vous êtes le candidat idéal..."></textarea>
          <mat-error *ngIf="form.get('coverLetter')?.hasError('required')">Lettre de motivation requise</mat-error>
          <mat-hint align="end">{{ form.get('coverLetter')?.value?.length || 0 }} / 2000</mat-hint>
        </mat-form-field>

        <!-- Actions -->
        <div class="dialog-actions">
          <button mat-button type="button" class="cancel-btn" (click)="cancel()">Annuler</button>
          <button mat-raised-button type="submit" class="submit-btn"
            [disabled]="form.invalid || loading">
            <mat-icon *ngIf="!loading">send</mat-icon>
            <mat-progress-spinner *ngIf="loading" mode="indeterminate" diameter="20"></mat-progress-spinner>
            {{ loading ? 'Envoi...' : 'Envoyer ma candidature' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .apply-dialog { padding: 0; max-width: 520px; }

    .dialog-header {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 28px 28px 20px; position: relative;
      border-bottom: 1px solid #F1F5F9;
    }
    .header-icon-wrapper {
      width: 48px; height: 48px; border-radius: 14px;
      background: linear-gradient(135deg, var(--co-primary), var(--co-primary-dark));
      display: flex; justify-content: center; align-items: center;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
      flex-shrink: 0;
    }
    .header-icon-wrapper mat-icon { color: white; font-size: 24px; width: 24px; height: 24px; }
    .dialog-title { margin: 0; font-size: 20px; font-weight: 800; color: var(--co-secondary); }
    .dialog-subtitle {
      margin: 4px 0 0; font-size: 13px; color: var(--co-text-muted);
      font-weight: 500; max-width: 320px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .close-btn { position: absolute; top: 16px; right: 16px; color: var(--co-text-muted); }

    .apply-form { padding: 24px 28px 28px; display: flex; flex-direction: column; gap: 8px; }
    .full-width { width: 100%; }

    ::ng-deep .custom-field .mdc-text-field--outlined {
      background: #F8FAFC !important; border-radius: 12px;
    }

    .dialog-actions {
      display: flex; justify-content: flex-end; gap: 12px;
      margin-top: 12px; padding-top: 20px;
      border-top: 1px solid #F1F5F9;
    }
    .cancel-btn { border-radius: 20px; font-weight: 600; color: var(--co-text-muted); padding: 0 24px; }
    .submit-btn {
      border-radius: 20px; font-weight: 600; padding: 0 28px; height: 44px;
      background: var(--co-primary) !important; color: white;
      display: flex; align-items: center; gap: 8px;
    }
    .submit-btn:disabled { opacity: 0.6; }
    .submit-btn mat-icon { font-size: 18px; width: 18px; height: 18px; }

    /* File Upload Styles */
    .cv-section {
      margin-bottom: 16px;
      padding: 16px;
      background: #F8FAFC;
      border-radius: 12px;
      border: 1px solid #E2E8F0;
    }

    .submit-mode-select {
      width: 100%;
    }

    .url-input-section,
    .file-input-section {
      margin-top: 8px;
    }

    .file-upload-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      border: 2px dashed #CBD5E1;
      border-radius: 12px;
      background: #F8FAFC;
    }
    .upload-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 8px;
    }
    .upload-btn mat-icon {
      margin-right: 8px;
    }
  `]
})
export class ApplyDialogComponent {

  form: FormGroup;
  loading = false;
  selectedFileName = '';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private marketplaceService: MarketplaceService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ApplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApplyDialogData
  ) {
    this.form = this.fb.group({
      cvFile: [null, Validators.required],
      coverLetter: ['', [Validators.required, Validators.maxLength(2000)]]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) { // 10MB limit
        this.selectedFile = file;
        this.selectedFileName = file.name;
        this.form.patchValue({ cvFile: file });
      } else {
        this.snackBar.open('Veuillez sélectionner un fichier PDF de moins de 10MB', 'Fermer', {
          duration: 3000, panelClass: ['snack-error']
        });
      }
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;

    const dto: ApplyDTO = {
      candidateId: this.authService.getUserId()?.toString() || '',
      coverLetter: this.form.value.coverLetter
    };

    if (this.selectedFile) {
      this.marketplaceService.applyWithFile(this.data.opportunityId, dto, this.selectedFile).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open('Candidature envoyée avec succès ! 🎉', 'OK', {
            duration: 4000, panelClass: ['snack-success']
          });
          this.dialogRef.close(true);
        },
        error: () => {
          this.loading = false;
          this.snackBar.open('Erreur lors de l\'envoi de la candidature', 'Fermer', {
            duration: 3000, panelClass: ['snack-error']
          });
        }
      });
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
