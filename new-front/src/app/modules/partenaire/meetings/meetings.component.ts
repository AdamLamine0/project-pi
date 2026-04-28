import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ElementRef, OnInit, OnDestroy, ViewChild, NgZone, HostListener, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';
import { AuthService } from '../../../core/services/auth.service';
import { FloatingMeetingService } from '../../../services/floating-meeting.service';
import { MeetingResponse, MeetingService, PartnerResponseRequest, UpdateMeetingTimeRequest } from '../../../services/meeting.service';
import { ZoomService } from '../../../services/zoom.service';
import { AudioRecorderService } from '../../../services/audio-recorder.service';
import { TranscriptionService } from '../../../services/transcription.service';

type MeetingViewMode = 'list' | 'calendar';

interface MeetingDayGroup {
  key: string;
  label: string;
  date: Date;
  meetings: MeetingResponse[];
}

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MeetingsComponent implements OnInit, OnDestroy {

  meetings: MeetingResponse[] = [];
  isLoading = false;
  errorMessage = '';
  viewMode: MeetingViewMode = 'list';

  // ── Zoom overlay ──
  isMeetingOpen = false;
  containerKey = false;
  isJoiningMeeting = false;
  meetingError = '';
  currentMeeting: MeetingResponse | null = null;

  // ── Partner respond panel ──
  respondingTo: MeetingResponse | null = null;
  showSuggestTime = false;
  showRejectForm = false;
  partnerComment = '';
  partnerSuggestedTime = '';
  isResponding = false;
  respondError = '';

  // ── User update-time panel ──
  updatingTime: MeetingResponse | null = null;
  newSuggestedTime = '';
  updateNote = '';

  private client: any = null;
  private isCleaningUp = false;
  private cleanupPromise: Promise<void> | null = null;
  private leaveDialogObserver?: MutationObserver;
  private observerDebounceTimer?: any;

  private readonly LEAVE_BTN_CLASS = 'app-meetings-leave-btn';
  private readonly OTHER_LEAVE_BTN_CLASS = 'app-zoom-inline-leave-btn';

  private _isClosing = false;
  private _isInjecting = false;
  private joinTimeout: any = null;
  private meetingEndTimer: any = null;
  private currentSessionId = 0;

  private readonly boundQuitterClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.ngZone.run(() => this.closeMeeting());
  };

  @ViewChild('zoomContainer', { static: false }) zoomContainer?: ElementRef<HTMLDivElement>;

  readonly locale = 'fr-FR';

  constructor(
    private meetingService: MeetingService,
    private authService: AuthService,
    private floatingMeetingService: FloatingMeetingService,
    private zoomService: ZoomService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private audioRecorder: AudioRecorderService,
    private transcribeSvc: TranscriptionService
  ) {}

  ngOnInit(): void {
    // Defer to a microtask so the load runs after the parent layout finishes its
    // initial CD pass — fixes the "stuck loading" loop when navigating to this
    // page from the landing-layout navbar (different layout tree).
    Promise.resolve().then(() => this.loadMeetings());
    this.requestMicrophonePermission();
  }

  private async requestMicrophonePermission(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(t => t.stop());
    } catch {}
  }

  async loadMeetings(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();
    try {
      this.meetings = await this.meetingService.getMyMeetings();
      this.meetings = [...this.meetings].sort((a, b) =>
        new Date(a.suggestedDateTime).getTime() - new Date(b.suggestedDateTime).getTime()
      );
    } catch (error) {
      this.errorMessage = `Unable to load meetings: ${this.getApiErrorMessage(error)}`;
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  private getApiErrorMessage(error: unknown): string {
    const e = error as HttpErrorResponse;
    if (e?.error && typeof e.error === 'object' && 'message' in e.error) {
      const msg = String((e.error as { message?: unknown }).message ?? '').trim();
      if (msg) return msg;
    }
    if (typeof e?.error === 'string' && e.error.trim()) return e.error;
    if (e?.status) return `Server error (${e.status})`;
    return e?.message || 'Unknown error';
  }

  // ────────────────────────────────────────────────────────────────────────────
  // View helpers
  // ────────────────────────────────────────────────────────────────────────────

  setViewMode(mode: MeetingViewMode): void { this.viewMode = mode; }

  isPartner(): boolean {
    const role = this.authService.getRole() ?? '';
    return role.toUpperCase().includes('PARTNER') || role.toUpperCase().includes('PARTENAIRE');
  }

  get acceptedMeetings(): MeetingResponse[] {
    return this.meetings.filter(m => m.meetingStatus === 'ACCEPTED');
  }

  get pendingMeetings(): MeetingResponse[] {
    return this.meetings.filter(m => m.meetingStatus === 'PENDING');
  }

  get upcomingMeetings(): MeetingResponse[] {
    const now = Date.now();
    return this.acceptedMeetings.filter(m =>
      new Date(m.suggestedDateTime).getTime() >= now - 40 * 60 * 1000
    );
  }

  isPast(m: MeetingResponse): boolean {
    return Date.now() > new Date(m.suggestedDateTime).getTime() + 40 * 60 * 1000;
  }

  get pastMeetings(): MeetingResponse[] {
    const now = Date.now();
    return this.acceptedMeetings.filter(m =>
      new Date(m.suggestedDateTime).getTime() < now - 40 * 60 * 1000
    );
  }

  get nextMeeting(): MeetingResponse | null { return this.upcomingMeetings[0] ?? null; }

  get calendarGroups(): MeetingDayGroup[] {
    const groups = new Map<string, MeetingDayGroup>();
    for (const meeting of this.meetings) {
      const d = new Date(meeting.suggestedDateTime);
      const key = d.toISOString().slice(0, 10);
      const label = new Intl.DateTimeFormat(this.locale, {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
      }).format(d);
      const existing = groups.get(key);
      if (existing) existing.meetings.push(meeting);
      else groups.set(key, { key, label, date: d, meetings: [meeting] });
    }
    return [...groups.values()].sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  formatDateTime(v: string): string {
    return new Intl.DateTimeFormat(this.locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(v));
  }
  formatTime(v: string): string {
    return new Intl.DateTimeFormat(this.locale, { hour: '2-digit', minute: '2-digit' }).format(new Date(v));
  }
  formatDate(v: string): string {
    return new Intl.DateTimeFormat(this.locale, { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date(v));
  }

  statusLabel(s: string): string {
    const labels: Record<string, string> = {
      PENDING: 'Pending',
      ACCEPTED: 'Accepted',
      REJECTED: 'Rejected',
      TIME_SUGGESTED: 'New time proposed',
    };
    return labels[s] ?? (s ? s.replace(/_/g, ' ') : 'Unknown');
  }

  statusBadgeClass(s: string): Record<string, boolean> {
    return {
      'badge': true,
      'status': true,
      'status--pending': s === 'PENDING',
      'status--accepted': s === 'ACCEPTED',
      'status--rejected': s === 'REJECTED',
      'status--suggested': s === 'TIME_SUGGESTED',
    };
  }

  getPriorityLabel(p: string): string { return p === 'EMERGENCY' ? 'Urgent' : 'Normal'; }

  canJoin(m: MeetingResponse): boolean {
    if (m.meetingStatus !== 'ACCEPTED') return false;
    const meetingTime = new Date(m.suggestedDateTime).getTime();
    const now = Date.now();
    return now >= meetingTime - 5 * 60 * 1000 && now <= meetingTime + 40 * 60 * 1000;
  }

  meetingActionLabel(m: MeetingResponse): string {
    return this.isCurrentUserSender(m) ? 'Start' : 'Join';
  }

  isCurrentUserSender(m: MeetingResponse): boolean {
    const uid = this.authService.getUserId();
    return m.senderUserId !== null && Number(m.senderUserId) === Number(uid);
  }

  trackByMeetingId(_: number, m: MeetingResponse): number { return m.id; }

  // ────────────────────────────────────────────────────────────────────────────
  // Partner respond
  // ────────────────────────────────────────────────────────────────────────────

  startRespond(meeting: MeetingResponse): void {
    this.respondingTo = meeting;
    this.showSuggestTime = false;
    this.showRejectForm = false;
    this.partnerComment = '';
    this.partnerSuggestedTime = '';
    this.respondError = '';
    // scroll to panel
    setTimeout(() => document.querySelector('.respond-panel')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  cancelRespond(): void {
    this.respondingTo = null;
    this.showSuggestTime = false;
    this.showRejectForm = false;
    this.respondError = '';
  }

  async partnerRespond(action: string): Promise<void> {
    if (!this.respondingTo) return;
    this.isResponding = true;
    this.respondError = '';

    const payload: PartnerResponseRequest = { action };

    if (action === 'SUGGEST_TIME') {
      if (!this.partnerSuggestedTime) {
        this.respondError = 'Please choose a date/time.';
        this.isResponding = false;
        return;
      }
      payload.suggestedDateTime = this.partnerSuggestedTime;
      payload.comment = this.partnerComment || undefined;
    }

    if (action === 'REJECT') {
      if (!this.partnerComment?.trim()) {
        this.respondError = 'A reason is required when rejecting.';
        this.isResponding = false;
        return;
      }
      payload.comment = this.partnerComment;
    }

    try {
      await this.meetingService.respondToMeeting(this.respondingTo.id, payload);
      this.cancelRespond();
      await this.loadMeetings();
    } catch (err) {
      this.respondError = this.getApiErrorMessage(err);
    } finally {
      this.isResponding = false;
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // User update time
  // ────────────────────────────────────────────────────────────────────────────

  startUpdateTime(meeting: MeetingResponse): void {
    this.updatingTime = meeting;
    // Pre-fill with partner suggestion if available
    this.newSuggestedTime = meeting.suggestedDateTimeByPartner
      ? meeting.suggestedDateTimeByPartner.slice(0, 16)   // "YYYY-MM-DDTHH:MM"
      : '';
    this.updateNote = '';
    this.respondError = '';
    setTimeout(() => document.querySelector('.respond-panel')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  cancelUpdateTime(): void {
    this.updatingTime = null;
    this.respondError = '';
  }

  async submitTimeUpdate(): Promise<void> {
    if (!this.updatingTime || !this.newSuggestedTime) return;
    this.isResponding = true;
    this.respondError = '';

    const req: UpdateMeetingTimeRequest = {
      newSuggestedDateTime: this.newSuggestedTime,
      note: this.updateNote || undefined
    };

    try {
      await this.meetingService.updateMeetingTime(this.updatingTime.id, req);
      this.cancelUpdateTime();
      await this.loadMeetings();
    } catch (err) {
      this.respondError = this.getApiErrorMessage(err);
    } finally {
      this.isResponding = false;
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // Zoom (unchanged from original)
  // ────────────────────────────────────────────────────────────────────────────

  async openMeeting(meeting: MeetingResponse): Promise<void> {
    if (!meeting.zoomMeetingId || !this.canJoin(meeting)) return;

    if (this.meetingEndTimer) { clearTimeout(this.meetingEndTimer); this.meetingEndTimer = null; }
    if (this.cleanupPromise) { try { await this.cleanupPromise; } catch {} }

    const mySessionId = ++this.currentSessionId;
    if (this.joinTimeout) { clearTimeout(this.joinTimeout); this.joinTimeout = null; }

    this._isClosing = false;
    this._isInjecting = false;
    this.currentMeeting = meeting;
    this.meetingError = '';
    this.isJoiningMeeting = true;

    if (this.client) {
      try { await Promise.race([this.client.leaveMeeting(), new Promise((_, r) => setTimeout(r, 3000))]); } catch {}
      try { await Promise.race([this.client.destroyClient(), new Promise((_, r) => setTimeout(r, 3000))]); } catch {}
      this.client = null;
      await new Promise(r => setTimeout(r, 500));
    }

    if (mySessionId !== this.currentSessionId) return;

    this.isMeetingOpen = false;
    this.containerKey = false;
    this.zoomContainer = undefined;
    this.cdr.detectChanges();
    await new Promise(r => setTimeout(r, 50));

    if (mySessionId !== this.currentSessionId) return;

    this.isMeetingOpen = true;
    this.cdr.detectChanges();
    await new Promise(r => setTimeout(r, 30));

    this.containerKey = true;
    this.cdr.detectChanges();
    const zoomContainer = await this.waitForZoomContainer(mySessionId);

    if (mySessionId !== this.currentSessionId) return;

    this.startLeaveDialogObserver();

    this.joinTimeout = setTimeout(() => {
      if (this.isJoiningMeeting && mySessionId === this.currentSessionId) {
        this.ngZone.run(() => {
          this.isJoiningMeeting = false;
          this.meetingError = 'Connection timed out. Please try again.';
          this.isMeetingOpen = false;
        });
      }
    }, 30000);

    try {
      this.client = ZoomMtgEmbedded.createClient();
      const sig = await this.zoomService.getSignature(meeting.zoomMeetingId, 0);

      if (mySessionId !== this.currentSessionId) return;

      await this.client.init({ zoomAppRoot: zoomContainer, language: 'fr-FR', patchJsMedia: true });

      this.client.on('connection-change', (p: any) => {
        if (mySessionId !== this.currentSessionId || this._isClosing) return;
        const state = String(p?.state ?? '').toLowerCase();
        if (state === 'closed' || state === 'fail') this.ngZone.run(() => this.onMeetingEnded(mySessionId));
      });
      this.client.on('meeting-end', () => {
        if (mySessionId !== this.currentSessionId || this._isClosing) return;
        this.ngZone.run(() => this.onMeetingEnded(mySessionId));
      });
      this.client.on('error', (error: any) => {
        if (mySessionId !== this.currentSessionId || this._isClosing) return;
        this.ngZone.run(() => { this.meetingError = error?.message || 'Zoom error'; this.onMeetingEnded(mySessionId); });
      });

      await this.ngZone.runOutsideAngular(() =>
        this.client.join({
          signature: sig.signature,
          meetingNumber: meeting.zoomMeetingId,
          password: meeting.zoomPassword || '',
          userName: `User ${this.authService.getUserId() ?? 'Guest'}`
        })
      );

      if (mySessionId !== this.currentSessionId) return;
      try { await this.audioRecorder.startRecording(); } catch {}
      try { if (this.client.setViewType) this.client.setViewType('gallery'); } catch {}

    } catch (error: any) {
      if (mySessionId !== this.currentSessionId) return;
      const code = Number(error?.errorCode ?? error?.code ?? 0);
      this.meetingError = code === 3000 ? 'Another Zoom session is active.'
        : code === 2 ? 'Zoom signature error.'
        : error?.reason || error?.message || 'Connection error';
      this.isMeetingOpen = false;
      this.containerKey = false;
      this.zoomContainer = undefined;
      this.currentMeeting = null;
    } finally {
      if (mySessionId === this.currentSessionId) this.isJoiningMeeting = false;
      if (this.joinTimeout) { clearTimeout(this.joinTimeout); this.joinTimeout = null; }
    }
  }

  private async waitForZoomContainer(sessionId: number, timeoutMs = 3000): Promise<HTMLDivElement> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (sessionId !== this.currentSessionId) throw new Error('Join cancelled');
      const container = this.zoomContainer?.nativeElement;
      if (container && container.isConnected) {
        container.style.opacity = '1';
        container.style.display = 'block';
        container.style.visibility = 'visible';
        container.innerHTML = '';
        return container;
      }
      await new Promise(resolve => setTimeout(resolve, 25));
    }
    throw new Error('Zoom container not found');
  }

  closeMeeting(): void {
    if (this._isClosing) return;
    this._isClosing = true;
    if (this.meetingEndTimer) { clearTimeout(this.meetingEndTimer); this.meetingEndTimer = null; }
    this.currentSessionId++;
    this.stopLeaveDialogObserver();
    this.removeInjectedButtons();
    const meetingId = this.currentMeeting?.zoomMeetingId ?? '';
    if (this.zoomContainer?.nativeElement) this.zoomContainer.nativeElement.style.opacity = '0';
    this.cleanupPromise = this.cleanupZoom(meetingId).finally(() => {
      this.ngZone.run(() => {
        this.isMeetingOpen = false;
        this.containerKey = false;
        this.currentMeeting = null;
        this.meetingError = '';
        this.isJoiningMeeting = false;
        this._isClosing = false;
        this._isInjecting = false;
        this.isCleaningUp = false;
        this.cleanupPromise = null;
      });
    });
  }

  private onMeetingEnded(sessionId: number): void {
    if (sessionId !== this.currentSessionId || this._isClosing) return;
    this.currentSessionId++;
    const endSessionToken = this.currentSessionId;
    this.stopLeaveDialogObserver();
    this.removeInjectedButtons();
    const meetingId = this.currentMeeting?.zoomMeetingId ?? '';
    if (this.joinTimeout) { clearTimeout(this.joinTimeout); this.joinTimeout = null; }
    if (this.meetingEndTimer) { clearTimeout(this.meetingEndTimer); this.meetingEndTimer = null; }
    this.meetingEndTimer = setTimeout(() => {
      if (endSessionToken !== this.currentSessionId) return;
      if (this.zoomContainer?.nativeElement) this.zoomContainer.nativeElement.style.opacity = '0';
      this.cleanupPromise = this.cleanupZoom(meetingId).finally(() => {
        this.ngZone.run(() => {
          this.isMeetingOpen = false;
          this.containerKey = false;
          this.zoomContainer = undefined;
          this.currentMeeting = null;
          this.isJoiningMeeting = false;
          this._isClosing = false;
          this._isInjecting = false;
          this.isCleaningUp = false;
          this.cleanupPromise = null;
        });
      });
      this.meetingEndTimer = null;
    }, 1500);
  }

  private async cleanupZoom(meetingId = ''): Promise<void> {
    if (this.isCleaningUp) return;
    this.isCleaningUp = true;
    const id = meetingId || this.currentMeeting?.zoomMeetingId || '';
    const clientToCleanup = this.client;
    this.client = null;
    try {
      if (this.audioRecorder?.isRecording) {
        try {
          const blob = await this.audioRecorder.stopRecordingAndWait();
          if (blob.size > 0 && id) void this.handleTranscript(blob, id);
        } catch {}
      }
      if (clientToCleanup) {
        try { await Promise.race([clientToCleanup.leaveMeeting(), new Promise((_, r) => setTimeout(r, 5000))]); } catch {}
        try { await Promise.race([clientToCleanup.destroyClient(), new Promise((_, r) => setTimeout(r, 5000))]); } catch {}
      }
    } finally { this.isCleaningUp = false; }
  }

  private async handleTranscript(blob: Blob, meetingId: string): Promise<void> {
    try { await this.transcribeSvc.transcribeMeeting(blob, meetingId); } catch {}
  }

  // ── Leave dialog injection (unchanged) ──

  private startLeaveDialogObserver(): void {
    this.stopLeaveDialogObserver();
    if (!this.floatingMeetingService.claimLeaveDialog('meetings')) return;
    this.injectLeaveButton();
    this.leaveDialogObserver = new MutationObserver(() => {
      if (this.observerDebounceTimer) clearTimeout(this.observerDebounceTimer);
      this.observerDebounceTimer = setTimeout(() => {
        if (!this._isClosing && !this._isInjecting && this.isMeetingOpen) this.injectLeaveButton();
      }, 50);
    });
    this.leaveDialogObserver.observe(document.body, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class']
    });
  }

  private stopLeaveDialogObserver(): void {
    if (this.observerDebounceTimer) { clearTimeout(this.observerDebounceTimer); this.observerDebounceTimer = undefined; }
    this.leaveDialogObserver?.disconnect();
    this.leaveDialogObserver = undefined;
    this.floatingMeetingService.releaseLeaveDialog('meetings');
  }

  private removeInjectedButtons(): void {
    document.querySelectorAll(`.${this.LEAVE_BTN_CLASS}`).forEach(el => el.remove());
  }

  private injectLeaveButton(): void {
    if (!this.isMeetingOpen || this._isClosing || this.floatingMeetingService.leaveDialogOwner !== 'meetings' || this._isInjecting) return;
    this._isInjecting = true;
    try {
      this.cleanOrphanedButtons();
      const dialogs = document.querySelectorAll<HTMLElement>(
        '.zoom-MuiPopper-root[aria-label*="Leave dialog"], .zoom-MuiPopper-root[aria-label*="Quitter"]'
      );
      if (!dialogs.length) return;
      dialogs.forEach(dialog => {
        if (this._isClosing || !dialog.isConnected) return;
        this.hideNativeLeaveMenu(dialog);
        const cancelEl = this.findNearestVisibleCancel(dialog);
        if (!cancelEl?.parentElement?.isConnected) return;
        if (cancelEl.parentElement.querySelector(`.${this.LEAVE_BTN_CLASS}`) ||
            cancelEl.parentElement.querySelector(`.${this.OTHER_LEAVE_BTN_CLASS}`)) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'zoom-MuiButtonBase-root zoom-MuiButton-root zoom-MuiButton-text ' +
          'zoom-MuiButton-textPrimary zoom-MuiButton-sizeMedium zoom-MuiButton-textSizeMedium ' +
          'zoom-MuiButton-disableElevation ' + this.LEAVE_BTN_CLASS;
        btn.textContent = 'Quitter';
        btn.style.cssText = 'color:#fff;font-size:13px;font-weight:500;background:transparent;border:none;cursor:pointer;margin-right:12px;padding:0;';
        btn.addEventListener('click', this.boundQuitterClick, true);
        cancelEl.parentElement.insertBefore(btn, cancelEl);
      });
    } catch {} finally { setTimeout(() => { this._isInjecting = false; }, 100); }
  }

  private cleanOrphanedButtons(): void {
    document.querySelectorAll(`.${this.LEAVE_BTN_CLASS}`).forEach(el => {
      const d = el.closest('.zoom-MuiPopper-root[aria-label*="Leave"], .zoom-MuiPopper-root[aria-label*="Quitter"]');
      if (!d || !this.isVisible(d as HTMLElement)) el.remove();
    });
  }

  private hideNativeLeaveMenu(dialog: HTMLElement): void {
    if (this._isClosing) return;
    try {
      dialog.querySelectorAll<HTMLElement>('[role="menu"]').forEach(menu => {
        if (menu?.isConnected) {
          menu.style.display = 'none';
          const paper = menu.closest('.zoom-MuiPaper-root') as HTMLElement | null;
          if (paper?.isConnected) paper.style.display = 'none';
        }
      });
    } catch {}
  }

  private findNearestVisibleCancel(dialog: HTMLElement): HTMLElement | null {
    const dialogRect = dialog.getBoundingClientRect();
    const margin = 50;
    const exp = {
      left: dialogRect.left - margin, top: dialogRect.top - margin,
      right: dialogRect.right + margin, bottom: dialogRect.bottom + margin
    };
    const candidates = Array.from(document.querySelectorAll<HTMLElement>('button, [role="button"], span, div'))
      .filter(el => {
        if (!this.isCancelText(el.textContent) || !this.isVisible(el)) return false;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        return cx >= exp.left && cx <= exp.right && cy >= exp.top && cy <= exp.bottom;
      });
    if (!candidates.length) return null;
    const cx = dialogRect.left + dialogRect.width / 2, cy = dialogRect.top + dialogRect.height / 2;
    let best: HTMLElement | null = null, bestDist = Infinity;
    for (const candidate of candidates) {
      const clickable = (candidate.closest('button, [role="button"]') as HTMLElement | null) ?? candidate;
      if (!clickable.parentElement) continue;
      const r = clickable.getBoundingClientRect();
      const dist = (r.left + r.width / 2 - cx) ** 2 + (r.top + r.height / 2 - cy) ** 2;
      if (dist < bestDist) { bestDist = dist; best = clickable; }
    }
    return best;
  }

  private isCancelText(v: string | null | undefined): boolean {
    const t = (v ?? '').trim().toLowerCase();
    return t === 'annuler' || t === 'cancel';
  }

  private isVisible(el: HTMLElement): boolean {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this._isClosing = true;
    this.currentSessionId++;
    if (this.joinTimeout) clearTimeout(this.joinTimeout);
    if (this.meetingEndTimer) clearTimeout(this.meetingEndTimer);
    void this.cleanupZoom(this.currentMeeting?.zoomMeetingId ?? '');
  }

  ngOnDestroy(): void {
    this._isClosing = true;
    this.currentSessionId++;
    if (this.joinTimeout) clearTimeout(this.joinTimeout);
    if (this.meetingEndTimer) clearTimeout(this.meetingEndTimer);
    if (this.observerDebounceTimer) clearTimeout(this.observerDebounceTimer);
    this.stopLeaveDialogObserver();
    this.removeInjectedButtons();
    void this.cleanupZoom(this.currentMeeting?.zoomMeetingId ?? '');
  }
}