import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  form: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() { return this.form.get('email'); }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      await firstValueFrom(
        this.http.post('http://localhost:8090/api/auth/forgot-password',
          { email: this.form.value.email },
          { responseType: 'text' }
        )
      );
      this.successMessage = 'Un lien de réinitialisation a été envoyé à votre adresse e-mail.';
      this.form.reset();
    } catch (error: any) {
      this.errorMessage = error.error || 'Une erreur est survenue. Veuillez réessayer.';
    } finally {
      this.isLoading = false;
    }
  }
}