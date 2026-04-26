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
  lucideCalendar,
  lucideMapPin,
  lucideClock3,
  lucideUsers,
  lucideTicket,
  lucideArrowLeft,
  lucideArrowRight,
  lucideCheck,
  lucideX,
  lucideGlobe,
  lucideMonitor,
  lucideLoader,
  lucideDownload,
  lucideStar,
  lucideAward,
  lucideLock,
  lucideAlertCircle,
  lucideClockAlert,
  lucideMinus,
  lucidePlus,
  lucideLinkedin,
  lucideTag,
  lucideBuilding2,
  lucideChevronRight,
  lucideMail,
} from '@ng-icons/lucide';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventService } from '../../services/event.service';
import { RegistrationService } from '../../services/registration.service';
import { TicketService } from '../../services/ticket.service';
import { CertificateService } from '../../services/certificate.service';
import { ProgramService } from '../../services/program.service';
import { SpeakerService } from '../../services/speaker.service';
import { AuthService } from '../../core/services/auth.service';
import { Event } from '../../models/event';
import { EventRegistration } from '../../models/registration';
import { EventProgram } from '../../models/program';
import { Speaker } from '../../models/speaker';
import { Certificate } from '../../models/certificate';
import { normalizeImageUrl } from '../../core/utils/image.utils';

@Component({
  selector: 'app-public-event-detail',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideCalendar, lucideMapPin, lucideClock3, lucideUsers,
      lucideTicket, lucideArrowLeft, lucideArrowRight, lucideCheck,
      lucideX, lucideGlobe, lucideMonitor, lucideLoader,
      lucideDownload, lucideStar, lucideAward, lucideLock,
      lucideAlertCircle, lucideClockAlert, lucideMinus, lucidePlus,
      lucideLinkedin, lucideTag, lucideBuilding2,
      lucideChevronRight, lucideMail,
    }),
  ],
  styles: `
    :host {
      --d-bg:           #EFF1F7;
      --d-surface:      #FFFFFF;
      --d-surface2:     #F8FAFF;
      --d-border:       rgba(101,116,205,0.18);
      --d-title:        #101C5E;
      --d-text:         #374151;
      --d-muted:        #6B7280;
      --d-accent:       #2A7DE1;
      --d-accent-pale:  rgba(42,125,225,0.10);
      --d-hero-from:    #101C5E;
      --d-hero-to:      #1A3C6E;
      --d-success:      #059669;
      --d-warning:      #D97706;
      --d-danger:       #DC2626;
      display: block;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: var(--d-bg);
      min-height: 100vh;
      transition: background 0.3s;
    }
    :host-context(html.dark) {
      --d-bg:           #050d1e;
      --d-surface:      #0a1628;
      --d-surface2:     #0d1e36;
      --d-border:       rgba(42,125,225,0.18);
      --d-title:        #FFFFFF;
      --d-text:         rgba(255,255,255,0.85);
      --d-muted:        rgba(255,255,255,0.45);
      --d-accent:       #4F9FFF;
      --d-accent-pale:  rgba(42,125,225,0.12);
      --d-hero-from:    #050d1e;
      --d-hero-to:      #0d1a38;
    }

    /* ── Hero ── */
    .event-hero {
      position: relative; min-height: 420px;
      display: flex; align-items: flex-end;
      background: linear-gradient(135deg, var(--d-hero-from), var(--d-hero-to));
      overflow: hidden;
    }
    .event-hero-img {
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover;
    }
    .event-hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(5,13,30,0.96) 0%, rgba(5,13,30,0.55) 50%, rgba(5,13,30,0.25) 100%);
    }
    .event-hero-inner {
      position: relative; z-index: 2;
      width: 100%; max-width: 1200px;
      margin: 0 auto; padding: 0 28px 40px;
    }
    .hero-back {
      display: inline-flex; align-items: center; gap: 6px;
      color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 600;
      text-decoration: none; margin-bottom: 24px;
      transition: color 0.2s;
    }
    .hero-back:hover { color: #fff; }
    .hero-badges { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
    .hero-badge {
      padding: 5px 14px; border-radius: 100px;
      font-size: 12px; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .badge-type { background: rgba(42,125,225,0.3); border: 1px solid rgba(42,125,225,0.5); color: #93C5FD; }
    .badge-status-open { background: rgba(5,150,105,0.25); border: 1px solid rgba(5,150,105,0.5); color: #34D399; }
    .badge-status-full { background: rgba(220,38,38,0.25); border: 1px solid rgba(220,38,38,0.4); color: #FCA5A5; }
    .badge-status-ended{ background: rgba(107,114,128,0.3); border: 1px solid rgba(107,114,128,0.4); color: #D1D5DB; }
    .badge-status-live { background: rgba(124,58,237,0.3); border: 1px solid rgba(124,58,237,0.5); color: #C4B5FD; }
    .event-hero-title { font-size: clamp(26px,5vw,52px); font-weight: 800; color: #fff; margin: 0 0 8px; line-height: 1.1; letter-spacing: -0.03em; }
    .event-hero-org   { font-size: 15px; color: rgba(255,255,255,0.6); }

    /* ── Layout ── */
    .page-layout {
      max-width: 1200px; margin: 0 auto; padding: 40px 28px 80px;
      display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start;
    }
    @media (max-width: 900px) {
      .page-layout { grid-template-columns: 1fr; }
      .panel { position: static !important; }
    }

    /* ── Section card ── */
    .section-card {
      background: var(--d-surface); border: 1.5px solid var(--d-border);
      border-radius: 20px; padding: 28px; margin-bottom: 24px;
      transition: background 0.3s;
    }
    .section-title {
      font-size: 18px; font-weight: 700; color: var(--d-title);
      margin: 0 0 20px; display: flex; align-items: center; gap: 10px;
    }
    .section-title-icon {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--d-accent-pale); display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    /* ── Description ── */
    .description-text { font-size: 15px; color: var(--d-text); line-height: 1.8; white-space: pre-wrap; }

    /* ── Tags ── */
    .tag-group { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
    .tag-label { font-size: 12px; font-weight: 600; color: var(--d-muted); margin-bottom: 6px; }
    .tag {
      padding: 4px 12px; border-radius: 100px;
      font-size: 12px; font-weight: 600;
      background: var(--d-accent-pale); border: 1px solid var(--d-border);
      color: var(--d-accent);
    }

    /* ── Program timeline ── */
    .timeline { display: flex; flex-direction: column; gap: 0; }
    .timeline-item { display: flex; gap: 16px; }
    .timeline-left { display: flex; flex-direction: column; align-items: center; width: 56px; flex-shrink: 0; }
    .timeline-dot {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--d-accent-pale); border: 2px solid var(--d-accent);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .timeline-line { width: 2px; flex: 1; background: var(--d-border); margin: 4px 0; min-height: 20px; }
    .timeline-time { font-size: 12px; font-weight: 700; color: var(--d-accent); text-align: center; margin-top: 8px; }
    .timeline-body { padding: 4px 0 24px; flex: 1; }
    .timeline-title-text { font-size: 15px; font-weight: 700; color: var(--d-title); margin: 0 0 4px; }
    .timeline-speaker { font-size: 13px; color: var(--d-muted); display: flex; align-items: center; gap: 6px; }
    .timeline-type-badge {
      display: inline-block; padding: 2px 8px; border-radius: 6px;
      font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
      background: var(--d-accent-pale); color: var(--d-accent); border: 1px solid var(--d-border);
    }

    /* ── Speakers grid ── */
    .speakers-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(200px,1fr)); gap: 16px; }
    .speaker-card {
      background: var(--d-surface2); border: 1.5px solid var(--d-border);
      border-radius: 16px; padding: 20px; text-align: center;
      transition: border-color 0.2s, transform 0.2s;
    }
    .speaker-card:hover { border-color: var(--d-accent); transform: translateY(-2px); }
    .speaker-avatar {
      width: 72px; height: 72px; border-radius: 50%; object-fit: cover;
      margin: 0 auto 12px; display: block;
      border: 2px solid var(--d-border);
    }
    .speaker-avatar-placeholder {
      width: 72px; height: 72px; border-radius: 50%;
      background: var(--d-accent-pale); border: 2px solid var(--d-border);
      margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;
      font-size: 24px; font-weight: 800; color: var(--d-accent);
    }
    .speaker-name  { font-size: 14px; font-weight: 700; color: var(--d-title); margin: 0 0 4px; }
    .speaker-title { font-size: 12px; color: var(--d-muted); line-height: 1.4; }
    .speaker-company { font-size: 12px; color: var(--d-accent); font-weight: 600; margin-top: 2px; }
    .speaker-linkedin {
      display: inline-flex; align-items: center; gap: 4px; margin-top: 10px;
      font-size: 12px; color: var(--d-muted); text-decoration: none;
      transition: color 0.2s;
    }
    .speaker-linkedin:hover { color: var(--d-accent); }

    /* ── Registration panel ── */
    .panel {
      position: sticky; top: 100px;
    }
    .panel-card {
      background: var(--d-surface); border: 1.5px solid var(--d-border);
      border-radius: 20px; overflow: hidden;
      transition: background 0.3s;
    }
    .panel-header {
      padding: 20px 24px; background: linear-gradient(135deg, #101C5E, #1A3C6E);
      color: #fff;
    }
    .panel-price { font-size: 28px; font-weight: 800; color: #fff; }
    .panel-price-free { color: #34D399; }
    .panel-price-sub { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 4px; }
    .panel-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

    .panel-meta-row { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--d-text); }
    .panel-meta-icon { color: var(--d-accent); flex-shrink: 0; }

    .capacity-wrap { margin-top: 4px; }
    .capacity-label { font-size: 12px; color: var(--d-muted); margin-bottom: 6px; display: flex; justify-content: space-between; }
    .capacity-track { height: 6px; background: var(--d-border); border-radius: 6px; overflow: hidden; }
    .capacity-fill { height: 100%; background: linear-gradient(90deg,#2A7DE1,#4F9FFF); border-radius: 6px; transition: width 0.8s; }
    .capacity-fill.full { background: linear-gradient(90deg,#EF4444,#F87171); }

    /* registration states */
    .reg-divider { border: none; border-top: 1.5px solid var(--d-border); margin: 0; }

    .reg-section { display: flex; flex-direction: column; gap: 12px; }
    .reg-section-title { font-size: 13px; font-weight: 700; color: var(--d-title); }

    /* quantity */
    .qty-row { display: flex; align-items: center; gap: 12px; }
    .qty-label { font-size: 13px; color: var(--d-text); flex: 1; }
    .qty-ctrl { display: flex; align-items: center; gap: 10px; }
    .qty-btn {
      width: 32px; height: 32px; border-radius: 8px;
      background: var(--d-accent-pale); border: 1.5px solid var(--d-border);
      color: var(--d-accent); cursor: pointer; font-size: 16px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .qty-btn:hover:not(:disabled) { background: var(--d-accent); color: #fff; }
    .qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .qty-val { font-size: 18px; font-weight: 800; color: var(--d-title); min-width: 24px; text-align: center; }

    /* action buttons */
    .btn-primary {
      width: 100%; padding: 14px; border-radius: 12px;
      background: linear-gradient(135deg, #2A7DE1, #4F9FFF);
      color: #fff; font-size: 15px; font-weight: 700;
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 16px rgba(42,125,225,0.35);
    }
    .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(42,125,225,0.5); }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .btn-secondary {
      width: 100%; padding: 12px; border-radius: 12px;
      background: transparent; border: 1.5px solid var(--d-border);
      color: var(--d-muted); font-size: 14px; font-weight: 700; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-secondary:hover:not(:disabled) { border-color: var(--d-danger); color: var(--d-danger); }
    .btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }

    .btn-success {
      width: 100%; padding: 14px; border-radius: 12px;
      background: rgba(5,150,105,0.12); border: 1.5px solid rgba(5,150,105,0.3);
      color: #059669; font-size: 15px; font-weight: 700; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: background 0.2s;
    }
    .btn-success:hover { background: rgba(5,150,105,0.2); }

    .btn-cert {
      width: 100%; padding: 14px; border-radius: 12px;
      background: linear-gradient(135deg, #7C3AED, #A78BFA);
      color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; border: none;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 16px rgba(124,58,237,0.3);
    }
    .btn-cert:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.5); }

    .btn-signin-panel {
      width: 100%; padding: 14px; border-radius: 12px;
      background: var(--d-accent); color: #fff;
      font-size: 15px; font-weight: 700; text-decoration: none;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: opacity 0.2s;
    }
    .btn-signin-panel:hover { opacity: 0.88; }

    /* status messages */
    .status-msg {
      padding: 14px 16px; border-radius: 12px;
      font-size: 14px; line-height: 1.6;
      display: flex; gap: 10px; align-items: flex-start;
    }
    .status-msg-icon { flex-shrink: 0; margin-top: 2px; }
    .status-info     { background: rgba(42,125,225,0.08); border: 1px solid rgba(42,125,225,0.2); color: var(--d-text); }
    .status-success  { background: rgba(5,150,105,0.08); border: 1px solid rgba(5,150,105,0.2); color: var(--d-text); }
    .status-warning  { background: rgba(217,119,6,0.08); border: 1px solid rgba(217,119,6,0.2); color: var(--d-text); }
    .status-waitlist { background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.2); color: var(--d-text); }

    /* cert banner */
    .cert-banner {
      background: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(167,139,250,0.08));
      border: 1.5px solid rgba(124,58,237,0.25); border-radius: 16px; padding: 20px;
      text-align: center;
    }
    .cert-banner-title { font-size: 16px; font-weight: 700; color: var(--d-title); margin: 10px 0 6px; }
    .cert-banner-sub   { font-size: 13px; color: var(--d-muted); margin: 0 0 16px; }

    /* Loading / error */
    .page-loading {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: 60vh; gap: 16px;
    }
    .spinner {
      width: 48px; height: 48px; border: 3px solid var(--d-border);
      border-top-color: var(--d-accent); border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { color: var(--d-muted); font-size: 15px; }

    .error-state { text-align: center; padding: 80px 32px; }
    .error-icon  { font-size: 48px; margin-bottom: 16px; }
    .error-title { font-size: 22px; font-weight: 700; color: var(--d-title); margin: 0 0 10px; }
    .error-sub   { font-size: 15px; color: var(--d-muted); margin: 0 0 24px; }

    /* Toast */
    .toast {
      position: fixed; bottom: 32px; right: 32px; z-index: 9000;
      padding: 14px 22px; border-radius: 12px; font-size: 14px; font-weight: 600; color: #fff;
      display: flex; align-items: center; gap: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      animation: toastIn 0.35s cubic-bezier(0.16,1,0.3,1);
    }
    .toast-success { background: #064e3b; border: 1px solid rgba(52,211,153,0.35); }
    .toast-error   { background: #7f1d1d; border: 1px solid rgba(239,68,68,0.35); }
    @keyframes toastIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  `,
  template: `
    @if (loading) {
      <div class="page-loading">
        <div class="spinner"></div>
        <p class="loading-text">Loading event…</p>
      </div>
    } @else if (!event) {
      <div class="error-state">
        <div class="error-icon">📭</div>
        <h2 class="error-title">Event not found</h2>
        <p class="error-sub">This event may have been removed or doesn't exist.</p>
        <a routerLink="/events" class="btn-signin-panel" style="width:auto;display:inline-flex;">
          <ng-icon name="lucideArrowLeft" size="16" /> Back to Events
        </a>
      </div>
    } @else {

      <!-- ═══ HERO ═══ -->
      <div class="event-hero">
        @if (imgUrl(event.coverImageUrl)) {
          <img [src]="imgUrl(event.coverImageUrl)" [alt]="event.title" class="event-hero-img"
            (error)="onImgError($event)" />
        }
        <div class="event-hero-overlay"></div>

        <div class="event-hero-inner">
          <a routerLink="/events" class="hero-back">
            <ng-icon name="lucideArrowLeft" size="16" /> Back to Events
          </a>
          <div class="hero-badges">
            <span class="hero-badge badge-type">{{ event.type }}</span>
            <span class="hero-badge" [class]="statusBadgeClass(event.status)">{{ statusLabel(event.status) }}</span>
            @if (event.isFull) {
              <span class="hero-badge badge-status-full">Full</span>
            }
          </div>
          <h1 class="event-hero-title">{{ event.title }}</h1>
          @if (event.organizerName) {
            <p class="event-hero-org">Organized by {{ event.organizerName }}</p>
          }
        </div>
      </div>

      <!-- ═══ MAIN LAYOUT ═══ -->
      <div class="page-layout">

        <!-- LEFT COLUMN -->
        <div class="left-col">

          <!-- Description -->
          @if (event.description) {
            <div class="section-card">
              <h2 class="section-title">
                <span class="section-title-icon">
                  <ng-icon name="lucideCalendar" size="18" style="color:#2A7DE1;" />
                </span>
                About This Event
              </h2>
              <p class="description-text">{{ event.description }}</p>

              @if (event.targetSector?.length || event.targetStage?.length) {
                <div style="margin-top:20px;display:flex;flex-direction:column;gap:12px;">
                  @if (event.targetSector?.length) {
                    <div>
                      <p class="tag-label">Target Sectors</p>
                      <div class="tag-group">
                        @for (s of event.targetSector; track s) {
                          <span class="tag">{{ s }}</span>
                        }
                      </div>
                    </div>
                  }
                  @if (event.targetStage?.length) {
                    <div>
                      <p class="tag-label">Target Stages</p>
                      <div class="tag-group">
                        @for (s of event.targetStage; track s) {
                          <span class="tag">{{ s }}</span>
                        }
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          }

          <!-- Program / Timeline -->
          @if (program.length > 0) {
            <div class="section-card">
              <h2 class="section-title">
                <span class="section-title-icon">
                  <ng-icon name="lucideClock3" size="18" style="color:#2A7DE1;" />
                </span>
                Program &amp; Timeline
              </h2>
              <div class="timeline">
                @for (slot of program; track slot.id; let last = $last) {
                  <div class="timeline-item">
                    <div class="timeline-left">
                      <div class="timeline-dot">
                        <ng-icon name="lucideChevronRight" size="14" style="color:#2A7DE1;" />
                      </div>
                      @if (!last) {
                        <div class="timeline-line"></div>
                      }
                    </div>
                    <div class="timeline-body">
                      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;">
                        <span class="timeline-type-badge">{{ slot.type }}</span>
                        <span style="font-size:12px;color:var(--d-muted);">
                          {{ formatTime(slot.startTime) }}
                          @if (slot.endTime) { – {{ formatTime(slot.endTime) }} }
                        </span>
                      </div>
                      <p class="timeline-title-text">{{ slot.title }}</p>
                      @if (slot.speakerName) {
                        <div class="timeline-speaker">
                          <ng-icon name="lucideStar" size="13" style="color:#2A7DE1;" />
                          {{ slot.speakerName }}
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Speakers -->
          @if (speakers.length > 0) {
            <div class="section-card">
              <h2 class="section-title">
                <span class="section-title-icon">
                  <ng-icon name="lucideUsers" size="18" style="color:#2A7DE1;" />
                </span>
                Speakers
              </h2>
              <div class="speakers-grid">
                @for (sp of speakers; track sp.id) {
                  <div class="speaker-card">
                    @if (sp.photoUrl) {
                      <img [src]="sp.photoUrl" [alt]="sp.fullName" class="speaker-avatar"
                        (error)="onSpeakerImgError($event, sp.fullName)" />
                    } @else {
                      <div class="speaker-avatar-placeholder">{{ sp.fullName[0] }}</div>
                    }
                    <p class="speaker-name">{{ sp.fullName }}</p>
                    @if (sp.title) { <p class="speaker-title">{{ sp.title }}</p> }
                    @if (sp.company) { <p class="speaker-company">{{ sp.company }}</p> }
                    @if (sp.linkedinUrl) {
                      <a [href]="sp.linkedinUrl" target="_blank" rel="noopener" class="speaker-linkedin">
                        <ng-icon name="lucideLinkedin" size="13" /> LinkedIn
                      </a>
                    }
                  </div>
                }
              </div>
            </div>
          }

        </div>

        <!-- RIGHT PANEL -->
        <aside class="panel">
          <div class="panel-card">

            <!-- Price header -->
            <div class="panel-header">
              <div class="panel-price" [class.panel-price-free]="!event.ticketPrice">
                {{ event.ticketPrice ? (event.ticketPrice + ' TND') : 'Free' }}
              </div>
              <p class="panel-price-sub">
                @if (event.ticketPrice) { per ticket } @else { No ticket fee }
              </p>
            </div>

            <div class="panel-body">

              <!-- Event meta -->
              <div class="panel-meta-row">
                <ng-icon name="lucideClock3" size="16" class="panel-meta-icon" />
                <span>{{ formatDate(event.startDate) }}
                  @if (event.endDate) { → {{ formatDate(event.endDate) }} }
                </span>
              </div>
              @if (event.location || event.address) {
                <div class="panel-meta-row">
                  <ng-icon name="lucideMapPin" size="16" class="panel-meta-icon" />
                  <span>{{ event.address || event.location }}</span>
                </div>
              }
              <div class="panel-meta-row">
                <ng-icon [name]="locationIcon(event.locationType)" size="16" class="panel-meta-icon" />
                <span>{{ locationLabel(event.locationType) }}</span>
              </div>

              <!-- Capacity bar -->
              <div class="capacity-wrap">
                <div class="capacity-label">
                  <span>{{ event.registeredCount }} / {{ event.capacityMax ?? '∞' }} registered</span>
                  <span>{{ fillPct() }}% full</span>
                </div>
                <div class="capacity-track">
                  <div class="capacity-fill" [class.full]="event.isFull" [style.width]="fillPct() + '%'"></div>
                </div>
              </div>

              <hr class="reg-divider" />

              <!-- ── REGISTRATION STATE MACHINE ── -->

              @if (!isLoggedIn()) {
                <!-- STATE: Not logged in -->
                <div class="status-msg status-info">
                  <ng-icon name="lucideLock" size="18" class="status-msg-icon" style="color:#2A7DE1;" />
                  <div>
                    <strong>Sign in required</strong><br>
                    You need to create an account or sign in to register for events.
                  </div>
                </div>
                <a routerLink="/auth/login" class="btn-signin-panel">
                  <ng-icon name="lucideArrowRight" size="16" />
                  Sign in to Register
                </a>
                <a routerLink="/auth/signup"
                  style="text-align:center;font-size:13px;color:var(--d-muted);text-decoration:none;display:block;">
                  Don't have an account? <span style="color:var(--d-accent);font-weight:700;">Sign up free</span>
                </a>

              } @else if (event.status === 'TERMINE') {
                <!-- STATE: Event ended -->
                @if (certificate) {
                  <!-- Has certificate -->
                  <div class="cert-banner">
                    <ng-icon name="lucideAward" size="36" style="color:#7C3AED;" />
                    <p class="cert-banner-title">Certificate Available!</p>
                    <p class="cert-banner-sub">You attended this event. Download your certificate of participation.</p>
                    <button class="btn-cert" [disabled]="downloading()" (click)="downloadCertificate()">
                      @if (downloading()) {
                        <ng-icon name="lucideLoader" size="16" /> Preparing…
                      } @else {
                        <ng-icon name="lucideDownload" size="16" /> Download Certificate
                      }
                    </button>
                  </div>
                } @else if (registration?.status === 'INSCRIT' || registration?.status === 'PRESENT') {
                  <div class="status-msg status-info">
                    <ng-icon name="lucideClockAlert" size="18" class="status-msg-icon" style="color:#2A7DE1;" />
                    <div>
                      This event has ended. Your certificate will be available shortly once the organizer processes attendance.
                    </div>
                  </div>
                } @else {
                  <div class="status-msg status-warning">
                    <ng-icon name="lucideAlertCircle" size="18" class="status-msg-icon" style="color:#D97706;" />
                    <div>This event has ended and registration is closed.</div>
                  </div>
                }

              } @else if (registration?.status === 'INSCRIT') {
                <!-- STATE: Registered -->
                <div class="status-msg status-success">
                  <ng-icon name="lucideCheck" size="18" class="status-msg-icon" style="color:#059669;" />
                  <div>
                    <strong>You're registered!</strong><br>
                    Your spot is confirmed. See you there!
                  </div>
                </div>
                <button class="btn-success" [disabled]="downloading()" (click)="downloadTicket()">
                  @if (downloading()) {
                    <ng-icon name="lucideLoader" size="16" /> Preparing ticket…
                  } @else {
                    <ng-icon name="lucideDownload" size="16" /> Download Ticket
                  }
                </button>
                <button class="btn-secondary" [disabled]="cancelling()" (click)="cancelRegistration()">
                  @if (cancelling()) {
                    <ng-icon name="lucideLoader" size="16" /> Cancelling…
                  } @else {
                    <ng-icon name="lucideX" size="16" /> Cancel Registration
                  }
                </button>

              } @else if (registration?.status === 'LISTE_ATTENTE') {
                <!-- STATE: Waitlisted -->
                <div class="status-msg status-waitlist">
                  <ng-icon name="lucideClockAlert" size="18" class="status-msg-icon" style="color:#7C3AED;" />
                  <div>
                    <strong>You're on the waitlist.</strong><br>
                    We'll notify you if a spot opens up. Keep an eye on your email!
                  </div>
                </div>
                <button class="btn-secondary" [disabled]="cancelling()" (click)="cancelRegistration()">
                  @if (cancelling()) {
                    <ng-icon name="lucideLoader" size="16" /> Cancelling…
                  } @else {
                    <ng-icon name="lucideX" size="16" /> Leave Waitlist
                  }
                </button>

              } @else if (event.isFull) {
                <!-- STATE: Full, can join waitlist -->
                <div class="status-msg status-warning">
                  <ng-icon name="lucideAlertCircle" size="18" class="status-msg-icon" style="color:#D97706;" />
                  <div>
                    <strong>This event is full</strong>, but you can request a spot and wait for admin confirmation.
                  </div>
                </div>
                <button class="btn-primary" [disabled]="registering()" (click)="joinWaitlist()">
                  @if (registering()) {
                    <ng-icon name="lucideLoader" size="16" /> Joining waitlist…
                  } @else {
                    <ng-icon name="lucideClockAlert" size="16" /> Join Waitlist
                  }
                </button>

              } @else {
                <!-- STATE: Can register -->
                <div class="reg-section">
                  <p class="reg-section-title">Register for this event</p>

                  @if ((event.availablePlaces ?? 999) > 1) {
                    <div class="qty-row">
                      <span class="qty-label">Number of tickets</span>
                      <div class="qty-ctrl">
                        <button class="qty-btn" [disabled]="qty <= 1" (click)="qty = qty - 1">
                          <ng-icon name="lucideMinus" size="14" />
                        </button>
                        <span class="qty-val">{{ qty }}</span>
                        <button class="qty-btn"
                          [disabled]="qty >= maxQty()"
                          (click)="qty = qty + 1">
                          <ng-icon name="lucidePlus" size="14" />
                        </button>
                      </div>
                    </div>
                  }

                  @if (event.ticketPrice) {
                    <div style="display:flex;justify-content:space-between;font-size:14px;">
                      <span style="color:var(--d-muted);">Total</span>
                      <span style="font-weight:800;color:var(--d-title);">{{ (event.ticketPrice * qty).toFixed(2) }} TND</span>
                    </div>
                  }

                  <button class="btn-primary" [disabled]="registering()" (click)="register()">
                    @if (registering()) {
                      <ng-icon name="lucideLoader" size="16" /> Registering…
                    } @else {
                      <ng-icon name="lucideCheck" size="16" />
                      Register {{ qty > 1 ? '(' + qty + ' tickets)' : '' }}
                    }
                  </button>
                </div>
              }

            </div>
          </div>
        </aside>
      </div>
    }

    <!-- ═══ TOAST ═══ -->
    @if (toast()) {
      <div class="toast" [class.toast-success]="toast()!.type === 'success'" [class.toast-error]="toast()!.type === 'error'">
        <ng-icon [name]="toast()!.type === 'success' ? 'lucideCheck' : 'lucideX'" size="16" />
        {{ toast()!.message }}
      </div>
    }
  `,
})
export class PublicEventDetailComponent implements OnInit {
  private readonly cdr                 = inject(ChangeDetectorRef);
  private readonly route               = inject(ActivatedRoute);
  private readonly router              = inject(Router);
  private readonly eventService        = inject(EventService);
  private readonly registrationService = inject(RegistrationService);
  private readonly ticketService       = inject(TicketService);
  private readonly certificateService  = inject(CertificateService);
  private readonly programService      = inject(ProgramService);
  private readonly speakerService      = inject(SpeakerService);
  private readonly authService         = inject(AuthService);

  protected readonly isLoggedIn  = computed(() => this.authService.isLoggedIn());
  protected readonly registering = signal(false);
  protected readonly cancelling  = signal(false);
  protected readonly downloading = signal(false);
  protected readonly toast       = signal<{ type: 'success' | 'error'; message: string } | null>(null);

  protected loading    = true;
  protected event: Event | null = null;
  protected program: EventProgram[] = [];
  protected speakers: Speaker[] = [];
  protected registration: EventRegistration | null = null;
  protected certificate: Certificate | null = null;
  protected qty = 1;

  private eventId!: number;
  private toastTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.eventId) { this.loading = false; return; }
    this.loadEvent();
  }

  private loadEvent(): void {
    forkJoin({
      event:    this.eventService.getById(this.eventId),
      program:  this.programService.getByEvent(this.eventId).pipe(catchError(() => of([]))),
      speakers: this.speakerService.getByEvent(this.eventId).pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ event, program, speakers }) => {
        this.event    = event;
        this.program  = program;
        this.speakers = speakers;
        this.loading  = false;
        this.cdr.markForCheck();

        if (this.authService.isLoggedIn()) {
          this.loadUserData();
        }
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private loadUserData(): void {
    this.registrationService.getMyRegistrations().pipe(
      catchError(() => of([])),
    ).subscribe((regs) => {
      this.registration = regs.find((r) => r.eventId === this.eventId) ?? null;
      this.cdr.markForCheck();

      if (this.event?.status === 'TERMINE' &&
          (this.registration?.status === 'INSCRIT' || this.registration?.status === 'PRESENT')) {
        this.certificateService.getMyCertificates().pipe(catchError(() => of([]))).subscribe((certs) => {
          this.certificate = certs.find((c) => c.eventId === this.eventId) ?? null;
          this.cdr.markForCheck();
        });
      }
    });
  }

  protected imgUrl(url: string | null | undefined): string | null {
    return normalizeImageUrl(url);
  }

  protected register(): void {
    this.registering.set(true);
    this.registrationService.register(this.eventId, this.qty).subscribe({
      next: (reg) => {
        this.registration = reg;
        this.registering.set(false);
        this.showToast('success', 'Registration confirmed! Download your ticket below.');
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.registering.set(false);
        this.showToast('error', err?.error?.message || 'Registration failed. Please try again.');
        this.cdr.markForCheck();
      },
    });
  }

  protected joinWaitlist(): void {
    this.registering.set(true);
    this.registrationService.register(this.eventId, 1).subscribe({
      next: (reg) => {
        this.registration = reg;
        this.registering.set(false);
        this.showToast('success', 'You joined the waitlist! We\'ll notify you if a spot opens up.');
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.registering.set(false);
        this.showToast('error', err?.error?.message || 'Could not join the waitlist. Please try again.');
        this.cdr.markForCheck();
      },
    });
  }

  protected cancelRegistration(): void {
    this.cancelling.set(true);
    this.registrationService.cancel(this.eventId).subscribe({
      next: () => {
        this.registration = null;
        this.cancelling.set(false);
        this.showToast('success', 'Your registration has been cancelled.');
        if (this.event) { this.event = { ...this.event, registeredCount: Math.max(0, this.event.registeredCount - 1), isFull: false }; }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.cancelling.set(false);
        this.showToast('error', err?.error?.message || 'Could not cancel. Please try again.');
        this.cdr.markForCheck();
      },
    });
  }

  protected downloadTicket(): void {
    this.downloading.set(true);
    this.ticketService.downloadTicketPdf(this.eventId).subscribe({
      next: (blob) => {
        this.downloading.set(false);
        this.triggerDownload(blob, `ticket-event-${this.eventId}.pdf`);
        this.cdr.markForCheck();
      },
      error: () => {
        this.downloading.set(false);
        this.showToast('error', 'Could not download ticket. Please try again.');
        this.cdr.markForCheck();
      },
    });
  }

  protected downloadCertificate(): void {
    if (!this.certificate) return;
    this.downloading.set(true);
    this.certificateService.downloadCertificate(this.certificate.id).subscribe({
      next: (blob) => {
        this.downloading.set(false);
        this.triggerDownload(blob, `certificate-${this.certificate!.id}.pdf`);
        this.cdr.markForCheck();
      },
      error: () => {
        this.downloading.set(false);
        this.showToast('error', 'Could not download certificate. Please try again.');
        this.cdr.markForCheck();
      },
    });
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href    = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private showToast(type: 'success' | 'error', message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set({ type, message });
    this.toastTimer = setTimeout(() => { this.toast.set(null); this.cdr.markForCheck(); }, 4500);
  }

  protected fillPct(): number {
    if (!this.event || !this.event.capacityMax) return 0;
    return Math.min(100, Math.round((this.event.registeredCount / this.event.capacityMax) * 100));
  }

  protected maxQty(): number {
    const avail = this.event?.availablePlaces ?? 10;
    return Math.min(10, avail);
  }

  protected formatDate(iso: string | null): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  protected formatTime(iso: string | null): string {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  protected locationIcon(type: string): string {
    if (type === 'DISTANCIEL') return 'lucideMonitor';
    if (type === 'HYBRIDE')   return 'lucideGlobe';
    return 'lucideMapPin';
  }

  protected locationLabel(type: string): string {
    const labels: Record<string, string> = {
      PRESENTIEL: 'In-person', DISTANCIEL: 'Online', HYBRIDE: 'Hybrid',
    };
    return labels[type] ?? type;
  }

  protected statusLabel(status: string): string {
    const labels: Record<string, string> = {
      PUBLIE: 'Open', INSCRIPTIONS: 'Enrolling', EN_COURS: 'Live',
      TERMINE: 'Ended', ANNULE: 'Cancelled',
    };
    return labels[status] ?? status;
  }

  protected statusBadgeClass(status: string): string {
    const map: Record<string, string> = {
      PUBLIE: 'badge-status-open', INSCRIPTIONS: 'badge-status-open',
      EN_COURS: 'badge-status-live', TERMINE: 'badge-status-ended',
      ANNULE: 'badge-status-ended',
    };
    return 'hero-badge ' + (map[status] ?? 'badge-status-ended');
  }

  protected onImgError(event: globalThis.Event): void {
    (event.target as HTMLImageElement).src =
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop&q=80';
  }

  protected onSpeakerImgError(event: globalThis.Event, name: string): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
