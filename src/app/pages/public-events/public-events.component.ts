import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideSearch,
  lucideCalendar,
  lucideMapPin,
  lucideClock3,
  lucideUsers,
  lucideTicket,
  lucideArrowRight,
  lucideCheck,
  lucideX,
  lucideGlobe,
  lucideMonitor,
  lucideLoader,
  lucideLock,
  lucideExternalLink,
} from '@ng-icons/lucide';
import { EventService } from '../../services/event.service';
import { RegistrationService } from '../../services/registration.service';
import { AuthService } from '../../core/services/auth.service';
import { Event, EventType } from '../../models/event';
import { normalizeImageUrl } from '../../core/utils/image.utils';

@Component({
  selector: 'app-public-events',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      lucideSearch, lucideCalendar, lucideMapPin, lucideClock3,
      lucideUsers, lucideTicket, lucideArrowRight, lucideCheck,
      lucideX, lucideGlobe, lucideMonitor, lucideLoader,
      lucideLock, lucideExternalLink,
    }),
  ],
  styles: `
    /* ── Light / Dark variables ── */
    :host {
      --pe-bg:          #EFF1F7;
      --pe-surface:     #FFFFFF;
      --pe-border:      rgba(101,116,205,0.18);
      --pe-title:       #101C5E;
      --pe-text:        #374151;
      --pe-muted:       #6B7280;
      --pe-accent:      #2A7DE1;
      --pe-accent-pale: rgba(42,125,225,0.10);
      --pe-hero-from:   #101C5E;
      --pe-hero-to:     #1A3C6E;
      --pe-filter-bg:   #FFFFFF;
      --pe-input-bg:    #F3F4F6;
      --pe-card-hover:  rgba(42,125,225,0.08);
      display: block;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: var(--pe-bg);
      min-height: 100vh;
      transition: background 0.3s;
    }
    :host-context(html.dark) {
      --pe-bg:          #050d1e;
      --pe-surface:     #0a1628;
      --pe-border:      rgba(42,125,225,0.18);
      --pe-title:       #FFFFFF;
      --pe-text:        rgba(255,255,255,0.85);
      --pe-muted:       rgba(255,255,255,0.45);
      --pe-accent:      #4F9FFF;
      --pe-accent-pale: rgba(42,125,225,0.12);
      --pe-hero-from:   #050d1e;
      --pe-hero-to:     #0d1a38;
      --pe-filter-bg:   #0a1628;
      --pe-input-bg:    rgba(255,255,255,0.06);
      --pe-card-hover:  rgba(42,125,225,0.08);
    }

    /* ── Hero ── */
    .page-hero {
      position: relative;
      padding: 80px 28px 64px;
      overflow: hidden;
      background: linear-gradient(135deg, var(--pe-hero-from), var(--pe-hero-to));
    }
    .page-hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(42,125,225,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(42,125,225,0.08) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    }
    .hero-orb {
      position: absolute; border-radius: 50%;
      filter: blur(80px); pointer-events: none;
    }
    .page-hero-inner {
      position: relative; z-index: 2;
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap;
    }
    .page-hero-tag {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 5px 14px; border-radius: 100px;
      background: rgba(42,125,225,0.18); border: 1px solid rgba(42,125,225,0.35);
      font-size: 12px; font-weight: 600; color: #a5c8ff; letter-spacing: 0.04em;
      margin-bottom: 20px;
      animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
    }
    @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    .page-hero-title {
      font-size: clamp(28px, 5vw, 56px); font-weight: 800;
      color: #fff; letter-spacing: -0.04em; margin: 0 0 12px; line-height: 1.1;
      animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
    }
    .page-hero-sub {
      font-size: clamp(14px, 2vw, 17px); color: rgba(255,255,255,0.7);
      line-height: 1.7; max-width: 520px;
      animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
    }

    /* ── Auth banner ── */
    .auth-banner {
      background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
      border: 1px solid #BFDBFE; border-radius: 16px;
      padding: 28px 32px; margin: 32px auto; max-width: 1200px;
      display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
    }
    :host-context(html.dark) .auth-banner {
      background: rgba(42,125,225,0.12); border-color: rgba(42,125,225,0.3);
    }
    .auth-banner-icon {
      width: 56px; height: 56px; border-radius: 16px;
      background: #DBEAFE; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    :host-context(html.dark) .auth-banner-icon { background: rgba(42,125,225,0.2); }
    .auth-banner-text { flex: 1; min-width: 200px; }
    .auth-banner-title { font-size: 18px; font-weight: 700; color: var(--pe-title); margin: 0 0 6px; }
    .auth-banner-sub { font-size: 14px; color: var(--pe-muted); line-height: 1.6; margin: 0; }
    .auth-banner-actions { display: flex; gap: 12px; flex-wrap: wrap; }
    .btn-login {
      padding: 10px 20px; border-radius: 10px;
      background: var(--pe-accent); color: #fff;
      font-size: 14px; font-weight: 700; text-decoration: none;
      transition: opacity 0.2s;
    }
    .btn-login:hover { opacity: 0.88; }
    .btn-signup {
      padding: 10px 20px; border-radius: 10px;
      background: transparent; color: var(--pe-accent);
      border: 1.5px solid var(--pe-accent);
      font-size: 14px; font-weight: 700; text-decoration: none;
      transition: background 0.2s;
    }
    .btn-signup:hover { background: var(--pe-accent-pale); }

    /* ── Filter bar ── */
    .filter-bar {
      background: var(--pe-filter-bg);
      border-bottom: 1px solid var(--pe-border);
      padding: 16px 28px;
      position: sticky; top: 80px; z-index: 50;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      transition: background 0.3s;
    }
    .filter-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
    }
    .search-wrap { position: relative; flex: 1 1 260px; min-width: 200px; }
    .search-icon {
      position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
      color: var(--pe-muted); pointer-events: none;
    }
    .search-input {
      width: 100%; padding: 10px 14px 10px 40px; border-radius: 10px;
      background: var(--pe-input-bg); border: 1.5px solid var(--pe-border);
      color: var(--pe-title); font-size: 14px; outline: none;
      box-sizing: border-box; transition: border-color 0.2s, background 0.2s;
    }
    .search-input::placeholder { color: var(--pe-muted); }
    .search-input:focus { border-color: var(--pe-accent); }

    .type-filters { display: flex; gap: 8px; flex-wrap: wrap; }
    .type-btn {
      padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 600;
      border: 1.5px solid var(--pe-border); background: transparent;
      color: var(--pe-muted); cursor: pointer;
      transition: all 0.2s;
    }
    .type-btn:hover { border-color: var(--pe-accent); color: var(--pe-accent); }
    .type-btn.active { background: var(--pe-accent-pale); border-color: var(--pe-accent); color: var(--pe-accent); }
    .results-info { font-size: 13px; color: var(--pe-muted); margin-left: auto; white-space: nowrap; }

    /* ── Main content ── */
    .page-body { max-width: 1200px; margin: 0 auto; padding: 40px 28px 80px; }

    /* ── Events grid ── */
    .events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px,1fr)); gap: 24px; }
    .event-card {
      background: var(--pe-surface); border: 1.5px solid var(--pe-border);
      border-radius: 20px; overflow: hidden;
      transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s;
      display: flex; flex-direction: column;
      opacity: 0; transform: translateY(24px);
      animation: cardIn 0.55s cubic-bezier(0.16,1,0.3,1) var(--delay,0s) both;
    }
    @keyframes cardIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    .event-card:hover {
      transform: translateY(-6px);
      border-color: var(--pe-accent);
      box-shadow: 0 16px 48px rgba(42,125,225,0.14);
    }

    .event-img-wrap { position: relative; }
    .event-img { width: 100%; height: 196px; object-fit: cover; display: block; }
    .event-img-placeholder {
      width: 100%; height: 196px;
      background: linear-gradient(135deg, #EFF6FF, #BFDBFE 50%, #93C5FD);
      display: flex; align-items: center; justify-content: center;
    }
    :host-context(html.dark) .event-img-placeholder {
      background: linear-gradient(135deg, #0d1a38, #1A3C6E 50%, #2A7DE1);
    }
    .event-type-badge {
      position: absolute; top: 14px; left: 14px;
      padding: 5px 12px; border-radius: 100px;
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
      backdrop-filter: blur(12px); background: rgba(255,255,255,0.85);
      border: 1px solid rgba(42,125,225,0.2); color: #101C5E;
    }
    :host-context(html.dark) .event-type-badge {
      background: rgba(0,0,0,0.55); border-color: rgba(255,255,255,0.15); color: #fff;
    }
    .event-status-dot {
      position: absolute; top: 14px; right: 14px;
      padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 700;
      backdrop-filter: blur(8px); border: 1px solid;
    }
    .status-publie     { background: rgba(209,250,229,0.9); color: #065F46; border-color: rgba(52,211,153,0.4); }
    .status-inscriptions{ background: rgba(219,234,254,0.9); color: #1E40AF; border-color: rgba(96,165,250,0.4); }
    .status-en_cours   { background: rgba(237,233,254,0.9); color: #5B21B6; border-color: rgba(167,139,250,0.4); }
    .status-other      { background: rgba(243,244,246,0.9); color: #6B7280; border-color: rgba(0,0,0,0.1); }
    :host-context(html.dark) .status-publie      { background: rgba(6,78,59,0.6);  color: #34D399; border-color: rgba(52,211,153,0.3); }
    :host-context(html.dark) .status-inscriptions{ background: rgba(30,58,138,0.5); color: #60A5FA; border-color: rgba(96,165,250,0.3); }
    :host-context(html.dark) .status-en_cours    { background: rgba(91,33,182,0.4); color: #A78BFA; border-color: rgba(167,139,250,0.3); }
    :host-context(html.dark) .status-other       { background: rgba(0,0,0,0.4);     color: rgba(255,255,255,0.6); border-color: rgba(255,255,255,0.12); }

    .event-body { padding: 24px; display: flex; flex-direction: column; flex: 1; }
    .event-title { font-size: 17px; font-weight: 700; color: var(--pe-title); margin: 0 0 14px; line-height: 1.4; }
    .event-meta { display: flex; flex-direction: column; gap: 7px; flex: 1; }
    .event-meta-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--pe-muted); }
    .event-desc {
      font-size: 13px; color: var(--pe-muted); line-height: 1.6; margin: 12px 0;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }

    .event-footer {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: 20px; padding-top: 16px;
      border-top: 1px solid var(--pe-border); gap: 12px; flex-wrap: wrap;
    }
    .event-price { font-size: 15px; font-weight: 800; }
    .event-price-free { color: #059669; }
    .event-price-paid { color: var(--pe-accent); }
    .capacity-bar { flex: 1; min-width: 80px; }
    .capacity-label { font-size: 11px; color: var(--pe-muted); margin-bottom: 4px; }
    .capacity-track { height: 4px; background: var(--pe-border); border-radius: 4px; overflow: hidden; }
    .capacity-fill { height: 100%; background: linear-gradient(90deg, #2A7DE1, #4F9FFF); border-radius: 4px; transition: width 0.8s cubic-bezier(0.16,1,0.3,1); }
    .capacity-fill.full { background: linear-gradient(90deg, #EF4444, #F87171); }

    /* action buttons */
    .btn-details {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 9px 16px; border-radius: 9px;
      background: var(--pe-accent-pale); border: 1.5px solid var(--pe-accent);
      color: var(--pe-accent); font-size: 13px; font-weight: 700;
      text-decoration: none; white-space: nowrap;
      transition: background 0.2s, transform 0.2s;
    }
    .btn-details:hover { background: var(--pe-accent); color: #fff; transform: translateY(-1px); }
    .btn-register {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 9px 18px; border-radius: 9px;
      background: linear-gradient(135deg, #2A7DE1, #4F9FFF);
      color: #fff; font-size: 13px; font-weight: 700;
      border: none; white-space: nowrap; cursor: pointer;
      transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s;
      box-shadow: 0 4px 16px rgba(42,125,225,0.3);
    }
    .btn-register:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(42,125,225,0.5); }
    .btn-register:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-register.registered { background: rgba(5,150,105,0.12); border: 1.5px solid rgba(5,150,105,0.3); box-shadow: none; color: #059669; }
    .btn-register.registered:hover { transform: none; }
    .btn-register.full { background: rgba(0,0,0,0.07); box-shadow: none; color: var(--pe-muted); cursor: default; }
    :host-context(html.dark) .btn-register.full { background: rgba(255,255,255,0.07); }
    .btn-register.full:hover { transform: none; box-shadow: none; }

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

    /* Skeleton */
    .skeleton-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(320px,1fr)); gap: 24px; }
    .skeleton-card { background: var(--pe-surface); border: 1.5px solid var(--pe-border); border-radius: 20px; overflow: hidden; height: 380px; }
    .skeleton-block { background: var(--pe-border); border-radius: 6px; animation: shimmer 1.5s ease-in-out infinite; }
    @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:0.9} }

    /* Empty state */
    .empty-state { text-align: center; padding: 96px 32px; }
    .empty-icon {
      width: 80px; height: 80px; border-radius: 50%;
      background: var(--pe-accent-pale); border: 1.5px solid var(--pe-border);
      display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;
    }
    .empty-title { font-size: 22px; font-weight: 700; color: var(--pe-title); margin: 0 0 12px; }
    .empty-sub { font-size: 15px; color: var(--pe-muted); max-width: 360px; margin: 0 auto 32px; line-height: 1.6; }
    .btn-clear {
      padding: 10px 20px; border-radius: 10px;
      background: var(--pe-accent-pale); border: 1.5px solid var(--pe-accent);
      color: var(--pe-accent); font-size: 14px; font-weight: 600; cursor: pointer;
      transition: background 0.2s;
    }
    .btn-clear:hover { background: var(--pe-accent); color: #fff; }
  `,
  template: `
    <!-- ═══ HERO ═══ -->
    <div class="page-hero">
      <div class="page-hero-grid"></div>
      <div class="hero-orb"
        style="width:480px;height:480px;background:radial-gradient(circle,rgba(42,125,225,0.3),transparent 70%);top:-160px;right:-80px;"></div>
      <div class="page-hero-inner">
        <div>
          <div class="page-hero-tag">
            <ng-icon name="lucideCalendar" size="13" />
            Events &amp; Workshops
          </div>
          <h1 class="page-hero-title">
            Discover &amp; Join<br>
            <span style="background:linear-gradient(135deg,#93C5FD,#E0F2FE);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
              Amazing Events
            </span>
          </h1>
          <p class="page-hero-sub">
            Pitch competitions, workshops, bootcamps and networking events curated for startup founders.
            @if (isLoggedIn()) {
              Register directly — no extra steps needed.
            } @else {
              <a routerLink="/auth/login" style="color:#93C5FD;font-weight:700;text-decoration:underline;">Sign in</a>
              to register and join the community.
            }
          </p>
        </div>
      </div>
    </div>

    <!-- ═══ AUTH BANNER (unauthenticated) ═══ -->
    @if (!isLoggedIn()) {
      <div class="auth-banner" style="margin-left:28px;margin-right:28px;">
        <div class="auth-banner-icon">
          <ng-icon name="lucideLock" size="24" style="color:#2A7DE1;" />
        </div>
        <div class="auth-banner-text">
          <p class="auth-banner-title">Create an account or sign in to access events</p>
          <p class="auth-banner-sub">
            You need to be logged in to register for events, download tickets, and earn certificates.
            Browse below to see what's coming up!
          </p>
        </div>
        <div class="auth-banner-actions">
          <a routerLink="/auth/login" class="btn-login">Sign in</a>
          <a routerLink="/auth/signup" class="btn-signup">Create account</a>
        </div>
      </div>
    }

    <!-- ═══ FILTER BAR ═══ -->
    <div class="filter-bar">
      <div class="filter-inner">
        <div class="search-wrap">
          <div class="search-icon"><ng-icon name="lucideSearch" size="16" /></div>
          <input
            class="search-input"
            type="text"
            placeholder="Search events..."
            [value]="searchQuery"
            (input)="onSearch($event)" />
        </div>
        <div class="type-filters">
          <button class="type-btn" [class.active]="selectedType === ''" (click)="setType('')">All</button>
          @for (t of eventTypes; track t) {
            <button class="type-btn" [class.active]="selectedType === t" (click)="setType(t)">{{ t }}</button>
          }
        </div>
        <span class="results-info">{{ filteredEvents.length }} event{{ filteredEvents.length !== 1 ? 's' : '' }}</span>
      </div>
    </div>

    <!-- ═══ BODY ═══ -->
    <div class="page-body">

      @if (loading) {
        <div class="skeleton-grid">
          @for (s of [1,2,3,4,5,6]; track s) {
            <div class="skeleton-card">
              <div class="skeleton-block" style="height:196px;border-radius:0;"></div>
              <div style="padding:24px;">
                <div class="skeleton-block" style="height:16px;width:60%;margin-bottom:16px;"></div>
                <div class="skeleton-block" style="height:12px;width:80%;margin-bottom:8px;"></div>
                <div class="skeleton-block" style="height:12px;width:50%;margin-bottom:8px;"></div>
                <div class="skeleton-block" style="height:12px;width:65%;"></div>
              </div>
            </div>
          }
        </div>

      } @else if (filteredEvents.length === 0) {
        <div class="empty-state">
          <div class="empty-icon">
            <ng-icon name="lucideCalendar" size="36" style="color:#2A7DE1;" />
          </div>
          <h2 class="empty-title">No events found</h2>
          <p class="empty-sub">
            {{ searchQuery || selectedType ? 'Try adjusting your filters or search terms.' : 'There are no upcoming events right now. Check back soon!' }}
          </p>
          @if (searchQuery || selectedType) {
            <button class="btn-clear" (click)="clearFilters()">Clear filters</button>
          }
        </div>

      } @else {
        <div class="events-grid">
          @for (event of filteredEvents; track event.id; let i = $index) {
            <div class="event-card" [style]="'--delay:' + (i * 0.05) + 's'">

              <div class="event-img-wrap">
                @if (imgUrl(event.coverImageUrl)) {
                  <img [src]="imgUrl(event.coverImageUrl)" [alt]="event.title" class="event-img"
                    (error)="onImgError($event, event.id)" />
                } @else {
                  <div class="event-img-placeholder">
                    <ng-icon name="lucideCalendar" size="48" style="color:rgba(42,125,225,0.4);" />
                  </div>
                }
                <span class="event-type-badge">{{ event.type }}</span>
                <span class="event-status-dot" [class]="statusClass(event.status)">
                  {{ statusLabel(event.status) }}
                </span>
              </div>

              <div class="event-body">
                <h3 class="event-title">{{ event.title }}</h3>

                <div class="event-meta">
                  <div class="event-meta-row">
                    <ng-icon name="lucideClock3" size="14" style="color:#2A7DE1;flex-shrink:0;" />
                    {{ formatDate(event.startDate) }}
                    @if (event.endDate) {
                      <span style="color:var(--pe-border);">→ {{ formatDate(event.endDate) }}</span>
                    }
                  </div>
                  @if (event.location || event.locationType) {
                    <div class="event-meta-row">
                      <ng-icon [name]="locationIcon(event.locationType)" size="14" style="color:#2A7DE1;flex-shrink:0;" />
                      {{ event.location || event.locationType }}
                    </div>
                  }
                  <div class="event-meta-row">
                    <ng-icon name="lucideUsers" size="14" style="color:#2A7DE1;flex-shrink:0;" />
                    {{ event.registeredCount }} / {{ event.capacityMax }} registered
                    @if (event.isFull) {
                      <span style="color:#EF4444;font-weight:700;">&nbsp;· Full</span>
                    }
                  </div>
                  @if (event.description) {
                    <p class="event-desc">{{ event.description }}</p>
                  }
                </div>

                <div class="event-footer">
                  <div class="event-price"
                    [class.event-price-free]="!event.ticketPrice"
                    [class.event-price-paid]="!!event.ticketPrice">
                    {{ event.ticketPrice ? (event.ticketPrice + ' TND') : 'Free' }}
                  </div>

                  <div class="capacity-bar">
                    <div class="capacity-label">{{ fillPct(event) }}% full</div>
                    <div class="capacity-track">
                      <div class="capacity-fill" [class.full]="event.isFull" [style.width]="fillPct(event) + '%'"></div>
                    </div>
                  </div>

                  <a [routerLink]="['/events', event.id]" class="btn-details">
                    View Details
                    <ng-icon name="lucideArrowRight" size="14" />
                  </a>
                </div>
              </div>

            </div>
          }
        </div>
      }
    </div>

    <!-- ═══ TOAST ═══ -->
    @if (toast()) {
      <div class="toast" [class.toast-success]="toast()!.type === 'success'" [class.toast-error]="toast()!.type === 'error'">
        <ng-icon [name]="toast()!.type === 'success' ? 'lucideCheck' : 'lucideX'" size="16" />
        {{ toast()!.message }}
      </div>
    }
  `,
})
export class PublicEventsComponent implements OnInit {
  private readonly cdr                 = inject(ChangeDetectorRef);
  private readonly eventService        = inject(EventService);
  private readonly authService         = inject(AuthService);

  protected readonly isLoggedIn  = computed(() => this.authService.isLoggedIn());
  protected readonly toast       = signal<{ type: 'success' | 'error'; message: string } | null>(null);

  protected loading       = true;
  protected events: Event[] = [];
  protected searchQuery   = '';
  protected selectedType: EventType | '' = '';

  private toastTimer?: ReturnType<typeof setTimeout>;

  protected readonly eventTypes: EventType[] = ['WEBINAIRE', 'WORKSHOP', 'PITCH', 'BOOTCAMP', 'CONFERENCE'];

  ngOnInit(): void {
    this.eventService.getAll({ status: 'PUBLIE' }).subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  protected imgUrl(url: string | null): string | null {
    return normalizeImageUrl(url);
  }

  protected get filteredEvents(): Event[] {
    const q = this.searchQuery.trim().toLowerCase();
    return this.events.filter((ev) => {
      const matchesSearch = !q || [ev.title, ev.description ?? '', ev.location ?? ''].join(' ').toLowerCase().includes(q);
      const matchesType   = !this.selectedType || ev.type === this.selectedType;
      return matchesSearch && matchesType;
    });
  }

  protected onSearch(event: globalThis.Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.cdr.markForCheck();
  }

  protected setType(type: EventType | ''): void {
    this.selectedType = type;
    this.cdr.markForCheck();
  }

  protected clearFilters(): void {
    this.searchQuery  = '';
    this.selectedType = '';
    this.cdr.markForCheck();
  }

  protected fillPct(event: Event): number {
    if (!event.capacityMax || event.capacityMax === 0) return 0;
    return Math.min(100, Math.round((event.registeredCount / event.capacityMax) * 100));
  }

  protected formatDate(iso: string | null): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  protected locationIcon(type: string): string {
    if (type === 'DISTANCIEL') return 'lucideMonitor';
    if (type === 'HYBRIDE') return 'lucideGlobe';
    return 'lucideMapPin';
  }

  protected statusLabel(status: string): string {
    const labels: Record<string, string> = {
      PUBLIE: 'Open', INSCRIPTIONS: 'Enrolling', EN_COURS: 'Live', TERMINE: 'Ended',
    };
    return labels[status] ?? status;
  }

  protected statusClass(status: string): string {
    const classes: Record<string, string> = {
      PUBLIE: 'status-publie', INSCRIPTIONS: 'status-inscriptions', EN_COURS: 'status-en_cours',
    };
    return classes[status] ?? 'status-other';
  }

  protected onImgError(event: globalThis.Event, id: number): void {
    (event.target as HTMLImageElement).src = `https://picsum.photos/seed/ev${id}/600/400`;
  }

  private showToast(type: 'success' | 'error', message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set({ type, message });
    this.toastTimer = setTimeout(() => {
      this.toast.set(null);
      this.cdr.markForCheck();
    }, 4000);
  }
}
