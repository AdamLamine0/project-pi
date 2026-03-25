import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
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
    // role is always disabled — cannot change role
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

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const updatedUser = await this.userService.updateUser(
        this.profileForm.getRawValue()
      );
      this.user = updatedUser;
      this.isEditing = false;
      this.profileForm.patchValue(updatedUser);
      this.profileForm.disable();
      this.successMessage = 'Profile updated successfully!';
    } catch (error: any) {
      this.errorMessage = error.error?.error || 'Update failed';
    } finally {
      this.isLoading = false;
    }
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
      this.successMessage = 'Password changed successfully!';
      this.passwordForm.reset();
      this.showPasswordForm = false;
    } catch (error: any) {
      this.errorMessage = error.error?.error || 'Password change failed';
    } finally {
      this.isLoading = false;
    }
  }
}