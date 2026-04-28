import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { STARTUP_CATALOG_BY_ID } from '../../models/startup-catalog';
import { InvestmentRequestService } from '../../services/investment-request.service';
import { InvestmentRequest } from '../../models/investment-request';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-request-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatProgressBarModule, MatSnackBarModule, MatIconModule],
  templateUrl: './request-form.html',
  styleUrl: './request-form.css',
})
export class RequestForm implements OnInit {
  mode: 'add' | 'edit' = 'add';
  currentRequest: InvestmentRequest | null = null;

  isVisible = false;
  isSubmitting = false;
  submitSuccess = false;

  selectedFile: File | null = null;
  fileError = '';

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private requestService: InvestmentRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'edit';
      this.requestService.getById(id).subscribe((data) => {
        this.currentRequest = data;
        this.openEdit(data);
      });
      return;
    }

    const startupId = this.route.snapshot.paramMap.get('startupId');
    this.openAdd(startupId ?? '');
  }

  // ================= FORM =================

  private buildForm(): void {
    this.form = this.fb.group({
      introMessage: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500)
        ]
      ],
      ticketProposed: [null, [Validators.min(1)]],
      startupId: ['', Validators.required],
    });
  }

  // ================= CREATE =================

  openAdd(startupId = ''): void {
    this.mode = 'add';
    this.currentRequest = null;
    this.isVisible = true;
    this.submitSuccess = false;

    this.form.reset({
      startupId,
      introMessage: '',
      ticketProposed: null,
    });

    this.selectedFile = null;
    this.fileError = '';
  }

  // ================= EDIT =================

  openEdit(req: InvestmentRequest): void {
    this.mode = 'edit';
    this.currentRequest = req;
    this.isVisible = true;
    this.submitSuccess = false;

    this.selectedFile = null;
    this.fileError = '';

    this.form.reset({
      startupId: req.startupId ?? '',
      introMessage: req.introMessage ?? '',
      ticketProposed: req.ticketProposed ?? null,
    });

    this.form.get('startupId')?.disable();
  }

  // ================= CLOSE =================

  closeForm(): void {
    this.isVisible = false;

    this.form.reset({
      startupId: '',
      introMessage: '',
      ticketProposed: null,
    });

    this.selectedFile = null;
    this.fileError = '';
    this.submitSuccess = false;
  }

  // ================= SUBMIT =================

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const investorId = this.resolveInvestorId();
    console.log('Connected investor ID =', investorId);

    // ================= ADD =================
    if (this.mode === 'add') {
      const raw = this.form.getRawValue();

      const formData = new FormData();
      formData.append('startupId', raw.startupId);
      formData.append('introMessage', (raw.introMessage ?? '').trim());

      if (raw.ticketProposed != null) {
        formData.append('ticketProposed', String(raw.ticketProposed));
      }

      if (this.selectedFile) {
        formData.append('investorDoc', this.selectedFile, this.selectedFile.name);
      }

      this.requestService.create(formData, investorId).subscribe({
        next: () => this.handleSuccess(),
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
        }
      });

      return;
    }

    // ================= EDIT =================
    const raw = this.form.getRawValue();

    const payload: InvestmentRequest = {
      ...(this.currentRequest as InvestmentRequest),
      introMessage: (raw.introMessage ?? '').trim(),
      ticketProposed: raw.ticketProposed ?? undefined,
    };

    this.requestService.updateRequest(payload.id, payload).subscribe({
      next: () => this.handleSuccess(),
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
      }
    });
  }

  // ================= SUCCESS =================

  private handleSuccess(): void {
    this.isSubmitting = false;
    this.submitSuccess = true;

    setTimeout(() => {
      this.router.navigate(['/investment/demandes']);
    }, 800);
  }

  // ================= FILE =================

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    this.fileError = '';
    this.selectedFile = null;

    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.fileError = 'Only PDF files are accepted';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.fileError = 'Maximum size: 5 MB';
      return;
    }

    this.selectedFile = file;
  }

  removeFile(): void {
    this.selectedFile = null;
    this.fileError = '';
  }

  // ================= GETTERS =================

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  get isAddMode(): boolean {
    return this.mode === 'add';
  }

  get formTitle(): string {
    return this.mode === 'add'
      ? 'New Investment Request'
      : 'Edit Request';
  }

  get submitLabel(): string {
    if (this.isSubmitting) {
      return this.mode === 'add' ? 'Sending...' : 'Saving...';
    }
    return this.mode === 'add'
      ? 'Send Request'
      : 'Save Changes';
  }

  get successMessage(): string {
    return this.mode === 'add'
      ? 'Request sent successfully.'
      : 'Request updated successfully.';
  }

  get charCount(): number {
    return this.form.get('introMessage')?.value?.length ?? 0;
  }

  // ================= STARTUP INFO =================

  get startupResolved(): boolean {
    const startupId = this.form.getRawValue().startupId ?? this.currentRequest?.startupId ?? '';
    return !!STARTUP_CATALOG_BY_ID[startupId];
  }

  get startupName(): string {
    const startupId = this.form.getRawValue().startupId ?? this.currentRequest?.startupId ?? '';
    return STARTUP_CATALOG_BY_ID[startupId]?.name ?? 'Startup not selected';
  }

  get startupSector(): string {
    const startupId = this.form.getRawValue().startupId ?? this.currentRequest?.startupId ?? '';
    return STARTUP_CATALOG_BY_ID[startupId]?.sector ?? '';
  }

  // ================= VALIDATION =================

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  getError(field: string): string {
    const errors = this.form.get(field)?.errors;
    if (!errors) return '';

    if (errors['required']) return 'This field is required';
    if (errors['minlength']) {
      return `Minimum ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['maxlength']) {
      return `Maximum ${errors['maxlength'].requiredLength} characters`;
    }
    if (errors['min']) return 'Amount must be positive';

    return 'Invalid value';
  }

  trackById(_: number, req: InvestmentRequest): string {
    return req.id;
  }

  private resolveInvestorId(): string {
    const userId = this.authService.getUserId();
    return userId > 0 ? String(userId) : 'dev-investor';
  }
}
