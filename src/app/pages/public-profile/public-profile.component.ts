import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideUser,
  lucideSettings,
  lucideCalendar,
  lucideCheck,
  lucideX,
  lucideSun,
  lucideMoon,
  lucideMonitor,
  lucideStar,
  lucideDownload,
  lucideArrowLeft,
  lucideSave,
  lucideCamera,
  lucideLoader,
  lucideAlertCircle,
  lucideTrash2,
} from '@ng-icons/lucide';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { ThemeService } from '../../services/theme.service';
import { RegistrationService } from '../../services/registration.service';
import { FeedbackService } from '../../services/feedback.service';
import { User } from '../../core/models/user.model';
import { EventRegistration } from '../../models/registration';
import { FeedbackEligibility } from '../../models/feedback';
import { catchError, of } from 'rxjs';

type Tab = 'profile' | 'settings' | 'reservations';

interface FeedbackFormState {
  open: boolean;
  rating: number;
  comment: string;
  submitting: boolean;
  submitted: boolean;
}

@Component({
  selector: 'app-public-profile',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideUser, lucideSettings, lucideCalendar, lucideCheck,
      lucideX, lucideSun, lucideMoon, lucideMonitor, lucideStar,
      lucideDownload, lucideArrowLeft, lucideSave, lucideCamera,
      lucideLoader, lucideAlertCircle, lucideTrash2,
    }),
  ],
  styles: `
    :host {
      --pp-bg:          #EFF1F7;
      --pp-surface:     #FFFFFF;
      --pp-border:      rgba(101,116,205,0.18);
      --pp-title:       #101C5E;
      --pp-text:        #374151;
      --pp-muted:       #6B7280;
      --pp-accent:      #2A7DE1;
      --pp-accent-pale: rgba(42,125,225,0.10);
      display: block;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: var(--pp-bg);
      min-height: 100vh;
    }
    :host-context(html.dark) {
      --pp-bg:          #050d1e;
      --pp-surface:     #0a1628;
      --pp-border:      rgba(42,125,225,0.18);
      --pp-title:       #FFFFFF;
      --pp-text:        rgba(255,255,255,0.85);
      --pp-muted:       rgba(255,255,255,0.45);
      --pp-accent:      #4F9FFF;
      --pp-accent-pale: rgba(42,125,225,0.12);
    }

    /* Page header */
    .page-header {
      background: linear-gradient(135deg, #101C5E, #1A3C6E);
      padding: 48px 28px 0;
    }
    .page-header-inner {
      max-width: 900px; margin: 0 auto;
    }
    .back-link {
      display: inline-flex; align-items: center; gap: 6px;
      color: rgba(255,255,255,0.65); font-size: 13px; font-weight: 600;
      text-decoration: none; margin-bottom: 24px;
      transition: color 0.2s; cursor: pointer; border: none; background: none;
    }
    .back-link:hover { color: #fff; }

    .profile-hero { display: flex; align-items: flex-end; gap: 20px; flex-wrap: wrap; margin-bottom: 0; }
    .profile-avatar {
      width: 80px; height: 80px; border-radius: 50%;
      background: linear-gradient(135deg, #2A7DE1, #4F9FFF);
      border: 3px solid rgba(255,255,255,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 32px; font-weight: 800; color: #fff;
      flex-shrink: 0; position: relative; overflow: hidden;
    }
    .profile-avatar img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
    .profile-info { flex: 1; }
    .profile-name { font-size: 24px; font-weight: 800; color: #fff; margin: 0 0 4px; }
    .profile-email { font-size: 14px; color: rgba(255,255,255,0.6); margin: 0; }

    /* Tabs */
    .tabs {
      display: flex; gap: 0; margin-top: 24px;
      border-bottom: none;
    }
    .tab-btn {
      display: flex; align-items: center; gap: 8px;
      padding: 12px 20px; border: none; background: transparent;
      color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 600;
      cursor: pointer; border-bottom: 2px solid transparent;
      transition: color 0.2s, border-color 0.2s;
    }
    .tab-btn:hover { color: rgba(255,255,255,0.9); }
    .tab-btn.active { color: #fff; border-bottom-color: #4F9FFF; }

    /* Content area */
    .content-area {
      max-width: 900px; margin: 0 auto; padding: 32px 28px 80px;
    }

    /* Card */
    .card {
      background: var(--pp-surface); border: 1.5px solid var(--pp-border);
      border-radius: 20px; padding: 28px; margin-bottom: 24px;
    }
    .card-title {
      font-size: 16px; font-weight: 700; color: var(--pp-title);
      margin: 0 0 20px;
    }
    .card-subtitle {
      font-size: 13px; color: var(--pp-muted); margin: -12px 0 20px;
    }

    /* Form */
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-label { font-size: 13px; font-weight: 600; color: var(--pp-title); }
    .form-input {
      padding: 10px 14px; border-radius: 10px;
      background: var(--pp-bg); border: 1.5px solid var(--pp-border);
      color: var(--pp-title); font-size: 14px; outline: none;
      transition: border-color 0.2s;
      font-family: inherit;
    }
    .form-input:focus { border-color: var(--pp-accent); }
    .form-input:read-only { opacity: 0.6; cursor: not-allowed; }
    .form-input::placeholder { color: var(--pp-muted); }

    /* Photo upload */
    .photo-upload-area {
      display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
      padding: 20px; border-radius: 14px; border: 2px dashed var(--pp-border);
      margin-bottom: 24px; cursor: pointer; transition: border-color 0.2s;
    }
    .photo-upload-area:hover { border-color: var(--pp-accent); }
    .photo-preview {
      width: 72px; height: 72px; border-radius: 50%;
      background: var(--pp-accent-pale); border: 2px solid var(--pp-border);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; flex-shrink: 0;
    }
    .photo-preview img { width: 100%; height: 100%; object-fit: cover; }
    .photo-upload-text h4 { font-size: 14px; font-weight: 700; color: var(--pp-title); margin: 0 0 4px; }
    .photo-upload-text p { font-size: 12px; color: var(--pp-muted); margin: 0; }
    .photo-note { font-size: 11px; color: var(--pp-muted); margin-top: 8px; font-style: italic; }

    /* Save button */
    .btn-save {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 24px; border-radius: 10px;
      background: linear-gradient(135deg, #2A7DE1, #4F9FFF);
      color: #fff; font-size: 14px; font-weight: 700; border: none; cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 16px rgba(42,125,225,0.3);
    }
    .btn-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(42,125,225,0.5); }
    .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

    /* Toast */
    .toast {
      position: fixed; bottom: 32px; right: 32px; z-index: 9000;
      padding: 14px 22px; border-radius: 12px;
      font-size: 14px; font-weight: 600; color: #fff;
      display: flex; align-items: center; gap: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      animation: toastIn 0.35s cubic-bezier(0.16,1,0.3,1);
    }
    .toast-success { background: #064e3b; border: 1px solid rgba(52,211,153,0.35); }
    .toast-error   { background: #7f1d1d; border: 1px solid rgba(239,68,68,0.35); }
    @keyframes toastIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

    /* Theme cards */
    .theme-cards { display: flex; gap: 12px; flex-wrap: wrap; }
    .theme-card {
      flex: 1; min-width: 100px; padding: 16px 12px;
      border-radius: 14px; border: 2px solid var(--pp-border);
      background: var(--pp-bg); cursor: pointer; text-align: center;
      transition: border-color 0.2s, background 0.2s;
    }
    .theme-card:hover { border-color: var(--pp-accent); }
    .theme-card.active { border-color: var(--pp-accent); background: var(--pp-accent-pale); }
    .theme-card-icon { display: flex; justify-content: center; margin-bottom: 8px; color: var(--pp-muted); }
    .theme-card.active .theme-card-icon { color: var(--pp-accent); }
    .theme-card-label { font-size: 13px; font-weight: 600; color: var(--pp-title); }

    /* Language select */
    .form-select {
      padding: 10px 14px; border-radius: 10px;
      background: var(--pp-bg); border: 1.5px solid var(--pp-border);
      color: var(--pp-title); font-size: 14px; outline: none;
      transition: border-color 0.2s; cursor: pointer; font-family: inherit;
      max-width: 260px;
    }
    .form-select:focus { border-color: var(--pp-accent); }

    /* Reservations */
    .reg-list { display: flex; flex-direction: column; gap: 16px; }
    .reg-card {
      background: var(--pp-bg); border: 1.5px solid var(--pp-border);
      border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 12px;
    }
    .reg-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    .reg-event-title { font-size: 15px; font-weight: 700; color: var(--pp-title); margin: 0; }
    .reg-date { font-size: 12px; color: var(--pp-muted); margin-top: 2px; }

    .reg-status {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 700;
      flex-shrink: 0;
    }
    .status-inscrit  { background: rgba(5,150,105,0.1);  color: #059669; border: 1px solid rgba(5,150,105,0.25); }
    .status-attente  { background: rgba(124,58,237,0.1); color: #7C3AED; border: 1px solid rgba(124,58,237,0.25); }
    .status-annule   { background: rgba(107,114,128,0.1); color: #6B7280; border: 1px solid rgba(107,114,128,0.25); }
    .status-present  { background: rgba(42,125,225,0.1); color: #2A7DE1; border: 1px solid rgba(42,125,225,0.25); }

    .reg-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .btn-cancel {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 14px; border-radius: 9px;
      background: transparent; border: 1.5px solid rgba(220,38,38,0.3);
      color: #DC2626; font-size: 13px; font-weight: 600; cursor: pointer;
      transition: background 0.2s;
    }
    .btn-cancel:hover:not(:disabled) { background: rgba(220,38,38,0.08); }
    .btn-cancel:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-feedback {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 14px; border-radius: 9px;
      background: var(--pp-accent-pale); border: 1.5px solid var(--pp-accent);
      color: var(--pp-accent); font-size: 13px; font-weight: 600; cursor: pointer;
      transition: background 0.2s;
    }
    .btn-feedback:hover { background: var(--pp-accent); color: #fff; }

    /* Feedback inline form */
    .feedback-form {
      background: var(--pp-surface); border: 1.5px solid var(--pp-border);
      border-radius: 14px; padding: 16px; margin-top: 4px;
    }
    .star-row { display: flex; gap: 8px; margin-bottom: 12px; }
    .star-btn {
      border: none; background: none; cursor: pointer; padding: 2px;
      transition: transform 0.15s;
    }
    .star-btn:hover { transform: scale(1.2); }
    .star-filled { color: #F59E0B; }
    .star-empty  { color: var(--pp-border); }
    .feedback-textarea {
      width: 100%; padding: 10px 12px; border-radius: 10px;
      background: var(--pp-bg); border: 1.5px solid var(--pp-border);
      color: var(--pp-title); font-size: 13px; font-family: inherit;
      resize: vertical; outline: none; box-sizing: border-box;
      min-height: 72px; transition: border-color 0.2s;
    }
    .feedback-textarea:focus { border-color: var(--pp-accent); }
    .feedback-actions { display: flex; gap: 10px; margin-top: 10px; }

    .btn-submit-feedback {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 9px;
      background: linear-gradient(135deg, #2A7DE1, #4F9FFF);
      color: #fff; font-size: 13px; font-weight: 600; border: none; cursor: pointer;
      transition: transform 0.2s;
    }
    .btn-submit-feedback:hover:not(:disabled) { transform: translateY(-1px); }
    .btn-submit-feedback:disabled { opacity: 0.6; cursor: not-allowed; }

    .btn-cancel-feedback {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 14px; border-radius: 9px;
      background: transparent; border: 1.5px solid var(--pp-border);
      color: var(--pp-muted); font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .feedback-submitted {
      display: flex; align-items: center; gap: 8px;
      font-size: 13px; color: #059669; font-weight: 600;
    }

    /* Empty state */
    .empty-state {
      text-align: center; padding: 60px 20px;
      color: var(--pp-muted); font-size: 15px;
    }
    .loading-state {
      display: flex; align-items: center; justify-content: center;
      gap: 10px; padding: 40px; color: var(--pp-muted); font-size: 14px;
    }
    .spinner {
      width: 24px; height: 24px; border: 2px solid var(--pp-border);
      border-top-color: var(--pp-accent); border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Section divider */
    .section-divider { height: 1px; background: var(--pp-border); margin: 24px 0; }
  `,
  template: `
    <!-- ── Page header ── -->
    <div class="page-header">
      <div class="page-header-inner">
        <a routerLink="/events" class="back-link">
          <ng-icon name="lucideArrowLeft" size="14" /> Back to Events
        </a>
        <div class="profile-hero">
          <div class="profile-avatar">
            @if (photoPreview()) {
              <img [src]="photoPreview()!" alt="Profile photo" />
            } @else {
              {{ userInitial() }}
            }
          </div>
          <div class="profile-info">
            <h1 class="profile-name">{{ displayName() }}</h1>
            <p class="profile-email">{{ authService.getEmail() }}</p>
          </div>
        </div>
        <div class="tabs">
          <button class="tab-btn" [class.active]="activeTab() === 'profile'" (click)="switchTab('profile')">
            <ng-icon name="lucideUser" size="14" /> Profile
          </button>
          <button class="tab-btn" [class.active]="activeTab() === 'settings'" (click)="switchTab('settings')">
            <ng-icon name="lucideSettings" size="14" /> Settings
          </button>
          <button class="tab-btn" [class.active]="activeTab() === 'reservations'" (click)="switchTab('reservations')">
            <ng-icon name="lucideCalendar" size="14" /> My Reservations
          </button>
        </div>
      </div>
    </div>

    <!-- ── Content ── -->
    <div class="content-area">

      <!-- ══ PROFILE TAB ══ -->
      @if (activeTab() === 'profile') {
        <div class="card">
          <h2 class="card-title">Profile Information</h2>
          <p class="card-subtitle">Update your personal details</p>

          <!-- Photo upload -->
          <div class="photo-upload-area" (click)="fileInput.click()">
            <div class="photo-preview">
              @if (photoPreview()) {
                <img [src]="photoPreview()!" alt="Preview" />
              } @else {
                <ng-icon name="lucideCamera" size="24" style="color:var(--pp-accent);" />
              }
            </div>
            <div class="photo-upload-text">
              <h4>Upload profile photo</h4>
              <p>Click to browse — JPG, PNG or GIF, max 5MB</p>
              <p class="photo-note">Note: photo preview only — upload endpoint not yet connected.</p>
            </div>
            <input #fileInput type="file" accept="image/*" style="display:none;" (change)="onPhotoSelect($event)" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">First Name</label>
              <input class="form-input" type="text" [(ngModel)]="editName" placeholder="First name" />
            </div>
            <div class="form-group">
              <label class="form-label">Last Name</label>
              <input class="form-input" type="text" [(ngModel)]="editPrenom" placeholder="Last name" />
            </div>
          </div>
          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label">Email</label>
            <input class="form-input" type="email" [value]="authService.getEmail()" readonly />
          </div>

          <button class="btn-save" [disabled]="saving()" (click)="saveProfile()">
            @if (saving()) {
              <ng-icon name="lucideLoader" size="16" /> Saving…
            } @else {
              <ng-icon name="lucideSave" size="16" /> Save Changes
            }
          </button>
        </div>

        <!-- Change Password -->
        <div class="card">
          <h2 class="card-title">Change Password</h2>
          <div class="form-group" style="margin-bottom:14px;">
            <label class="form-label">Current Password</label>
            <input class="form-input" type="password" [(ngModel)]="oldPassword" placeholder="Current password" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">New Password</label>
              <input class="form-input" type="password" [(ngModel)]="newPassword" placeholder="New password" />
            </div>
            <div class="form-group">
              <label class="form-label">Confirm Password</label>
              <input class="form-input" type="password" [(ngModel)]="confirmPassword" placeholder="Confirm new password" />
            </div>
          </div>
          <button class="btn-save" style="margin-top:8px;" [disabled]="changingPw()" (click)="changePassword()">
            @if (changingPw()) {
              <ng-icon name="lucideLoader" size="16" /> Updating…
            } @else {
              <ng-icon name="lucideCheck" size="16" /> Update Password
            }
          </button>
        </div>
      }

      <!-- ══ SETTINGS TAB ══ -->
      @if (activeTab() === 'settings') {
        <div class="card">
          <h2 class="card-title">Theme</h2>
          <p class="card-subtitle">Choose your preferred appearance</p>
          <div class="theme-cards">
            <button class="theme-card" [class.active]="currentTheme() === 'light'" (click)="setTheme('light')">
              <div class="theme-card-icon"><ng-icon name="lucideSun" size="22" /></div>
              <div class="theme-card-label">Light</div>
            </button>
            <button class="theme-card" [class.active]="currentTheme() === 'dark'" (click)="setTheme('dark')">
              <div class="theme-card-icon"><ng-icon name="lucideMoon" size="22" /></div>
              <div class="theme-card-label">Dark</div>
            </button>
            <button class="theme-card" [class.active]="currentTheme() === 'system'" (click)="setTheme('system')">
              <div class="theme-card-icon"><ng-icon name="lucideMonitor" size="22" /></div>
              <div class="theme-card-label">System</div>
            </button>
          </div>
        </div>

        <div class="card">
          <h2 class="card-title">Language</h2>
          <p class="card-subtitle">Choose your preferred language</p>
          <select class="form-select" [(ngModel)]="selectedLang" (change)="saveLang()">
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      }

      <!-- ══ RESERVATIONS TAB ══ -->
      @if (activeTab() === 'reservations') {
        @if (regsLoading()) {
          <div class="loading-state">
            <div class="spinner"></div>
            Loading your reservations…
          </div>
        } @else if (registrations().length === 0) {
          <div class="empty-state">
            <ng-icon name="lucideCalendar" size="48" style="color:var(--pp-accent);opacity:0.4;" />
            <p style="margin-top:16px;">You have no event registrations yet.</p>
            <a routerLink="/events" style="color:var(--pp-accent);font-weight:700;text-decoration:none;">Browse Events →</a>
          </div>
        } @else {
          <div class="reg-list">
            @for (reg of registrations(); track reg.id) {
              <div class="reg-card">
                <div class="reg-card-header">
                  <div>
                    <p class="reg-event-title">{{ reg.eventTitle }}</p>
                    <p class="reg-date">Registered {{ formatDate(reg.registeredAt) }}</p>
                  </div>
                  <span class="reg-status" [class]="regStatusClass(reg.status)">
                    {{ regStatusLabel(reg.status) }}
                  </span>
                </div>

                <div class="reg-actions">
                  @if (reg.status === 'INSCRIT' || reg.status === 'LISTE_ATTENTE') {
                    <button class="btn-cancel" [disabled]="cancellingId() === reg.id" (click)="cancelReg(reg)">
                      @if (cancellingId() === reg.id) {
                        <ng-icon name="lucideLoader" size="14" /> Cancelling…
                      } @else {
                        <ng-icon name="lucideX" size="14" /> Cancel
                      }
                    </button>
                  }
                  @if (feedbackEligibility()[reg.eventId]?.canSubmit) {
                    <button class="btn-feedback" (click)="toggleFeedbackForm(reg.eventId)">
                      <ng-icon name="lucideStar" size="14" /> Leave Feedback
                    </button>
                  }
                  @if (feedbackEligibility()[reg.eventId]?.hasSubmitted) {
                    <span style="font-size:13px;color:var(--pp-muted);display:flex;align-items:center;gap:6px;">
                      <ng-icon name="lucideCheck" size="14" style="color:#059669;" /> Feedback submitted
                    </span>
                  }
                </div>

                <!-- Inline feedback form -->
                @if (feedbackForms()[reg.eventId]?.open) {
                  <div class="feedback-form">
                    @if (feedbackForms()[reg.eventId]?.submitted) {
                      <div class="feedback-submitted">
                        <ng-icon name="lucideCheck" size="16" /> Thank you for your feedback!
                      </div>
                    } @else {
                      <p style="font-size:13px;font-weight:700;color:var(--pp-title);margin:0 0 10px;">Rate this event</p>
                      <div class="star-row">
                        @for (s of [1,2,3,4,5]; track s) {
                          <button class="star-btn" (click)="setRating(reg.eventId, s)">
                            <ng-icon name="lucideStar" size="22"
                              [class.star-filled]="(feedbackForms()[reg.eventId]?.rating ?? 0) >= s"
                              [class.star-empty]="(feedbackForms()[reg.eventId]?.rating ?? 0) < s" />
                          </button>
                        }
                      </div>
                      <textarea
                        class="feedback-textarea"
                        placeholder="Optional comment…"
                        [value]="feedbackForms()[reg.eventId]?.comment ?? ''"
                        (input)="setComment(reg.eventId, $event)">
                      </textarea>
                      <div class="feedback-actions">
                        <button class="btn-submit-feedback"
                          [disabled]="feedbackForms()[reg.eventId]?.submitting || !feedbackForms()[reg.eventId]?.rating"
                          (click)="submitFeedback(reg.eventId)">
                          @if (feedbackForms()[reg.eventId]?.submitting) {
                            <ng-icon name="lucideLoader" size="14" /> Submitting…
                          } @else {
                            <ng-icon name="lucideStar" size="14" /> Submit
                          }
                        </button>
                        <button class="btn-cancel-feedback" (click)="toggleFeedbackForm(reg.eventId)">
                          Cancel
                        </button>
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        }
      }
    </div>

    <!-- Toast -->
    @if (toast()) {
      <div class="toast" [class.toast-success]="toast()!.type === 'success'" [class.toast-error]="toast()!.type === 'error'">
        <ng-icon [name]="toast()!.type === 'success' ? 'lucideCheck' : 'lucideX'" size="16" />
        {{ toast()!.message }}
      </div>
    }
  `,
})
export class PublicProfileComponent implements OnInit {
  private readonly cdr                 = inject(ChangeDetectorRef);
  private readonly route               = inject(ActivatedRoute);
  private readonly router              = inject(Router);
  readonly authService                 = inject(AuthService);
  private readonly userService         = inject(UserService);
  private readonly themeService        = inject(ThemeService);
  private readonly registrationService = inject(RegistrationService);
  private readonly feedbackService     = inject(FeedbackService);

  protected readonly activeTab       = signal<Tab>('profile');
  protected readonly saving          = signal(false);
  protected readonly changingPw      = signal(false);
  protected readonly regsLoading     = signal(false);
  protected readonly cancellingId    = signal<number | null>(null);
  protected readonly registrations   = signal<EventRegistration[]>([]);
  protected readonly feedbackEligibility = signal<Record<number, FeedbackEligibility>>({});
  protected readonly feedbackForms   = signal<Record<number, FeedbackFormState>>({});
  protected readonly photoPreview    = signal<string | null>(null);
  protected readonly toast           = signal<{ type: 'success' | 'error'; message: string } | null>(null);

  protected readonly currentTheme = computed(() => this.themeService.theme());
  protected readonly userInitial  = computed(() => {
    const e = this.authService.getEmail();
    return e ? e[0].toUpperCase() : '?';
  });
  protected readonly displayName = computed(() => {
    const u = this.user;
    if (u) return `${u.name} ${u.prenom}`.trim();
    return this.authService.getEmail() || 'User';
  });

  protected editName    = '';
  protected editPrenom  = '';
  protected oldPassword = '';
  protected newPassword = '';
  protected confirmPassword = '';
  protected selectedLang = 'en';

  private user: User | null = null;
  private toastTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    // Read tab from query params
    this.route.queryParamMap.subscribe((params) => {
      const tab = (params.get('tab') as Tab) || 'profile';
      this.activeTab.set(tab);
      if (tab === 'reservations' && this.registrations().length === 0) {
        this.loadRegistrations();
      }
      this.cdr.markForCheck();
    });

    // Load lang from localStorage
    this.selectedLang = localStorage.getItem('lang') || 'en';

    // Load user data
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).then((u) => {
        this.user     = u;
        this.editName   = u.name || '';
        this.editPrenom = u.prenom || '';
        this.cdr.markForCheck();
      }).catch(() => {});
    }
  }

  protected switchTab(tab: Tab): void {
    this.router.navigate([], { queryParams: { tab }, queryParamsHandling: 'merge' });
    this.activeTab.set(tab);
    if (tab === 'reservations' && this.registrations().length === 0) {
      this.loadRegistrations();
    }
    this.cdr.markForCheck();
  }

  private loadRegistrations(): void {
    this.regsLoading.set(true);
    this.registrationService.getMyRegistrations().pipe(catchError(() => of([]))).subscribe((regs) => {
      this.registrations.set(regs);
      this.regsLoading.set(false);
      this.cdr.markForCheck();

      // Check feedback eligibility for completed events
      regs.forEach((reg) => {
        if (reg.status === 'INSCRIT' || reg.status === 'PRESENT') {
          this.feedbackService.getEligibility(reg.eventId).pipe(catchError(() => of(null))).subscribe((elig) => {
            if (elig) {
              this.feedbackEligibility.update((prev) => ({ ...prev, [reg.eventId]: elig }));
              this.cdr.markForCheck();
            }
          });
        }
      });
    });
  }

  protected onPhotoSelect(event: globalThis.Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    this.photoPreview.set(url);
    this.cdr.markForCheck();
  }

  protected saveProfile(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;
    this.saving.set(true);
    const updated: User = {
      ...(this.user as User),
      name: this.editName,
      prenom: this.editPrenom,
    };
    this.userService.updateUser(updated, userId).then((u) => {
      this.user = u;
      this.saving.set(false);
      this.showToast('success', 'Profile updated successfully!');
      this.cdr.markForCheck();
    }).catch(() => {
      this.saving.set(false);
      this.showToast('error', 'Failed to update profile. Please try again.');
      this.cdr.markForCheck();
    });
  }

  protected changePassword(): void {
    if (!this.oldPassword || !this.newPassword) {
      this.showToast('error', 'Please fill in all password fields.');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.showToast('error', 'New passwords do not match.');
      return;
    }
    const userId = this.authService.getUserId();
    if (!userId) return;
    this.changingPw.set(true);
    this.userService.changePassword(userId, this.oldPassword, this.newPassword).then(() => {
      this.changingPw.set(false);
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.showToast('success', 'Password updated successfully!');
      this.cdr.markForCheck();
    }).catch(() => {
      this.changingPw.set(false);
      this.showToast('error', 'Failed to change password. Check your current password.');
      this.cdr.markForCheck();
    });
  }

  protected setTheme(theme: 'light' | 'dark' | 'system'): void {
    this.themeService.theme.set(theme);
    this.cdr.markForCheck();
  }

  protected saveLang(): void {
    localStorage.setItem('lang', this.selectedLang);
    this.showToast('success', 'Language preference saved.');
  }

  protected cancelReg(reg: EventRegistration): void {
    this.cancellingId.set(reg.id);
    this.registrationService.cancel(reg.eventId).subscribe({
      next: () => {
        this.registrations.update((list) =>
          list.map((r) => r.id === reg.id ? { ...r, status: 'ANNULE' as const } : r)
        );
        this.cancellingId.set(null);
        this.showToast('success', 'Registration cancelled.');
        this.cdr.markForCheck();
      },
      error: () => {
        this.cancellingId.set(null);
        this.showToast('error', 'Could not cancel. Please try again.');
        this.cdr.markForCheck();
      },
    });
  }

  protected toggleFeedbackForm(eventId: number): void {
    this.feedbackForms.update((prev) => {
      const current = prev[eventId];
      if (current?.open) {
        return { ...prev, [eventId]: { ...current, open: false } };
      }
      return {
        ...prev,
        [eventId]: { open: true, rating: 0, comment: '', submitting: false, submitted: false },
      };
    });
    this.cdr.markForCheck();
  }

  protected setRating(eventId: number, rating: number): void {
    this.feedbackForms.update((prev) => ({
      ...prev,
      [eventId]: { ...(prev[eventId] ?? { open: true, comment: '', submitting: false, submitted: false }), rating },
    }));
    this.cdr.markForCheck();
  }

  protected setComment(eventId: number, event: globalThis.Event): void {
    const comment = (event.target as HTMLTextAreaElement).value;
    this.feedbackForms.update((prev) => ({
      ...prev,
      [eventId]: { ...(prev[eventId] ?? { open: true, rating: 0, submitting: false, submitted: false }), comment },
    }));
  }

  protected submitFeedback(eventId: number): void {
    const form = this.feedbackForms()[eventId];
    if (!form || !form.rating) return;
    this.feedbackForms.update((prev) => ({
      ...prev,
      [eventId]: { ...form, submitting: true },
    }));
    this.feedbackService.submit(eventId, { rating: form.rating, comment: form.comment }).subscribe({
      next: () => {
        this.feedbackForms.update((prev) => ({
          ...prev,
          [eventId]: { ...form, submitting: false, submitted: true },
        }));
        this.feedbackEligibility.update((prev) => ({
          ...prev,
          [eventId]: { canSubmit: false, hasSubmitted: true },
        }));
        this.showToast('success', 'Thank you for your feedback!');
        this.cdr.markForCheck();
      },
      error: () => {
        this.feedbackForms.update((prev) => ({
          ...prev,
          [eventId]: { ...form, submitting: false },
        }));
        this.showToast('error', 'Could not submit feedback. Please try again.');
        this.cdr.markForCheck();
      },
    });
  }

  protected formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  protected regStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      INSCRIT: 'Registered', LISTE_ATTENTE: 'Waitlisted', ANNULE: 'Cancelled', PRESENT: 'Attended',
    };
    return labels[status] ?? status;
  }

  protected regStatusClass(status: string): string {
    const map: Record<string, string> = {
      INSCRIT: 'status-inscrit', LISTE_ATTENTE: 'status-attente',
      ANNULE: 'status-annule', PRESENT: 'status-present',
    };
    return 'reg-status ' + (map[status] ?? '');
  }

  private showToast(type: 'success' | 'error', message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set({ type, message });
    this.toastTimer = setTimeout(() => { this.toast.set(null); this.cdr.markForCheck(); }, 4000);
  }
}
