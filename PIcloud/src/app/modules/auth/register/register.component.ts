import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  // Rôles disponibles à l'inscription
  readonly availableRoles = [
    { value: '',             label: 'Simple utilisateur (découverte)' },
    { value: 'ENTREPRENEUR', label: '🚀 Entrepreneur' },
    { value: 'MENTOR',       label: '🎓 Mentor' },
    { value: 'INVESTOR',     label: '💰 Investisseur' },
    { value: 'PARTNER',      label: '🤝 Partenaire' },
    { value: 'EXPERT',       label: '⚖️ Expert juridique' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user/profile']);
    }

    this.registerForm = this.fb.group({
      name:            ['', Validators.required],
      prenom:          ['', Validators.required],
      email:           ['', [Validators.required, Validators.email]],
      password:        ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role:            [null]  // optionnel
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm  = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  get name()            { return this.registerForm.get('name'); }
  get prenom()          { return this.registerForm.get('prenom'); }
  get email()           { return this.registerForm.get('email'); }
  get password()        { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  async onSubmit(): Promise<void> {
  if (this.registerForm.invalid) return;

  this.isLoading = true;
  this.errorMessage = '';

  const { confirmPassword, role, ...rest } = this.registerForm.value;

  try {
    await this.authService.register({ ...rest, role: role || null });
    this.router.navigate(['/user/profile']);
  } catch (err: any) {
    this.errorMessage = err?.error?.error || 'Erreur lors de l\'inscription.';
  } finally {
    this.isLoading = false;
  }
}
}
