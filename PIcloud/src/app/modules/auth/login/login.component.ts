import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user/profile']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.loginForm.value);
      this.router.navigate(['/user/profile']);
    } catch (error: any) {
      this.errorMessage = error.error?.error || 'Login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  loginWithGoogle(): void {
  // goes through gateway :8091 now
  window.location.href = 'http://localhost:8091/oauth2/authorization/google';
}
}