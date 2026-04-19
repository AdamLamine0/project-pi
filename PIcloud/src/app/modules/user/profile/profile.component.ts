import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isEditing: boolean = false;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  showPasswordForm: boolean = false;
  activeTab: 'profile' | 'password' = 'profile';
  currentUrl: string = '';   // ← for sidebar active state

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private userService: UserService,
    private router: Router             // ← inject Router
  ) {
    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      statut: ['']
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Track current URL for sidebar active highlighting
    this.currentUrl = this.router.url;
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentUrl = e.urlAfterRedirects;
      }
    });

    this.loadProfile();
  }

  async loadProfile(): Promise<void> {
    try {
      const userId = this.authService.getUserId();
      this.user = await this.userService.getUserById(userId);
      this.profileForm.patchValue(this.user);
      this.profileForm.disable();
    } catch (error) {
      this.errorMessage = 'Failed to load profile';
    }
  }

  get initials(): string {
    if (!this.user) return '??';
    return `${this.user.name.charAt(0)}${this.user.prenom.charAt(0)}`.toUpperCase();
  }

  enableEdit(): void {
    this.isEditing = true;
    this.profileForm.enable();
    this.profileForm.get('id')?.disable();
    this.successMessage = '';
    this.errorMessage = '';
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.profileForm.patchValue(this.user!);
    this.profileForm.disable();
    this.successMessage = '';
    this.errorMessage = '';
  }

  // Only profile and password are real tabs — badges/certificates navigate away
  switchTab(tab: 'profile' | 'password'): void {
    this.activeTab = tab;
    this.showPasswordForm = tab === 'password';
    this.successMessage = '';
    this.errorMessage = '';
    if (tab === 'password' && this.isEditing) {
      this.cancelEdit();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    try {
      const userId = this.authService.getUserId();

      // Keep existing immutable fields expected by backend update contract.
      const payload: User = {
        ...this.profileForm.getRawValue(),
        role: this.user!.role,
        dateInscription: this.user!.dateInscription
      };

      const updatedUser = await this.userService.updateUser(payload, userId);
      this.user = updatedUser;
      this.isEditing = false;
      this.profileForm.patchValue(updatedUser);
      this.profileForm.disable();
      this.successMessage = 'Profil mis à jour avec succès !';
    } catch (error: any) {
      this.errorMessage = error.error?.error || 'Échec de la mise à jour';
    } finally {
      this.isLoading = false;
    }
  }
  getRoleLabel(role: string | undefined | null): string {
  const labels: Record<string, string> = {
    USER:         '👤 Utilisateur',
    ADMIN:        '🛡️ Administrateur',
    MENTOR:       '🎓 Mentor',
    INVESTOR:     '💰 Investisseur',
    PARTNER:      '🤝 Partenaire',
    ENTREPRENEUR: '🚀 Entrepreneur',
    EXPERT:       '⚖️ Expert juridique',
  };
  return labels[role ?? ''] ?? role ?? '—';
}

  async onChangePassword(): Promise<void> {
    if (this.passwordForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    try {
      const userId = this.authService.getUserId();
      await this.userService.changePassword(
        userId,
        this.passwordForm.value.oldPassword,
        this.passwordForm.value.newPassword
      );
      this.successMessage = 'Mot de passe modifié avec succès !';
      this.passwordForm.reset();
      this.showPasswordForm = false;
      this.activeTab = 'profile';
    } catch (error: any) {
      this.errorMessage = error.error?.error || 'Échec du changement de mot de passe';
    } finally {
      this.isLoading = false;
    }
  }
}