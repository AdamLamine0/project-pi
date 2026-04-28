import { Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FloatingMeetingService, FloatingMeetingState } from '../../../services/floating-meeting.service';
import { ZoomService } from '../../../services/zoom.service';
import { AudioRecorderService } from '../../../services/audio-recorder.service';
import { TranscriptionService } from '../../../services/transcription.service';

@Component({
  selector: 'app-floating-zoom-meeting',
  encapsulation: ViewEncapsulation.None,
  template: `
    <section class="zm-float" *ngIf="state.isOpen">
      <div class="zm-sandbox">
        <p *ngIf="isLoading" class="zm-status">Connexion...</p>
        <p *ngIf="errorMessage" class="zm-error">{{ errorMessage }}</p>
        <div #root class="zm-root"></div>
      </div>
    </section>
  `,
  styles: [`
    .zm-float { position: fixed; right: 16px; bottom: 16px; width: 620px; height: 450px; z-index: 2147483647; border-radius: 12px; background: #1a1a1a; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .zm-sandbox, .zm-root { width: 100%; height: 100%; position: relative; }
    .zm-status { position: absolute; top: 45%; width: 100%; text-align: center; color: #fff; z-index: 10; }
    .zm-error { position: absolute; top: 45%; width: 100%; text-align: center; color: #ff4757; padding: 20px; z-index: 10; }
  `]
})
export class FloatingZoomMeetingComponent implements OnInit, OnDestroy {
  @ViewChild('root', { static: false }) root?: ElementRef<HTMLDivElement>;

  state: FloatingMeetingState = { isOpen: false, requestId: 0, meetingNumber: '', meetingPassword: '', role: 0, title: '' };
  isLoading = false;
  errorMessage = '';

  private client: any = null;
  private stateSub?: Subscription;
  private cleaningUp = false;
  private _isClosing = false;
  private _isInjecting = false;
  private leaveObserver?: MutationObserver;
  private observerDebounceTimer?: any;

  private readonly LEAVE_BTN_CLASS = 'app-zoom-inline-leave-btn';

  private readonly boundQuitterClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.ngZone.run(() => this.close());
  };

  constructor(
    private floatingSvc: FloatingMeetingService,
    private zoomService: ZoomService,
    private authService: AuthService,
    private audioRecorder: AudioRecorderService,
    private transcribeSvc: TranscriptionService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.stateSub = this.floatingSvc.state$.subscribe(s => {
      this.state = s;
      if (s.isOpen && s.requestId !== 0) {
        this._isClosing = false;
        setTimeout(() => void this.join(s), 100);
      }
    });
  }

  private async join(s: FloatingMeetingState): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      this.client = ZoomMtgEmbedded.createClient();
      const sig = await this.zoomService.getSignature(s.meetingNumber, s.role);
      
      await this.client.init({ 
        zoomAppRoot: this.root?.nativeElement, 
        language: 'fr-FR', 
        patchJsMedia: true 
      });

      this.startLeaveDialogObserver();

      this.client.on('meeting-end', () => this.ngZone.run(() => this.close(true)));
      this.client.on('connection-change', (p: any) => {
        if (['closed', 'fail'].includes(p?.state)) this.ngZone.run(() => this.close(true));
      });

      await this.client.join({
        signature: sig.signature,
        meetingNumber: s.meetingNumber,
        password: s.meetingPassword,
        userName: `User ${this.authService.getUserId() ?? 'Guest'}`
      });
      await this.audioRecorder.startRecording();
    } catch (e: any) { this.errorMessage = e.message || 'Erreur Zoom'; }
    finally { this.isLoading = false; }
  }

  async close(wasNative: boolean = false) {
    if (this._isClosing) return;
    this._isClosing = true;
    
    this.stopLeaveDialogObserver();
    this.removeInjectedButtons();

    if (this.root?.nativeElement) this.root.nativeElement.style.opacity = '0';

    await this.cleanup(wasNative);
    this.ngZone.run(() => {
      this.floatingSvc.closeMeeting();
      this.state.isOpen = false;
      this._isClosing = false;
    });
  }

  // ==================== LOGIQUE D'INJECTION DU BOUTON (VOTRE DESIGN) ====================

  private startLeaveDialogObserver(): void {
    this.stopLeaveDialogObserver();
    if (!this.floatingSvc.claimLeaveDialog('floating')) return;

    this.injectLeaveButton();

    this.leaveObserver = new MutationObserver(() => {
      if (this.observerDebounceTimer) clearTimeout(this.observerDebounceTimer);
      this.observerDebounceTimer = setTimeout(() => {
        if (!this._isClosing && !this._isInjecting && this.state.isOpen) {
          this.injectLeaveButton();
        }
      }, 50);
    });

    this.leaveObserver.observe(document.body, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class']
    });
  }

  private stopLeaveDialogObserver(): void {
    if (this.observerDebounceTimer) clearTimeout(this.observerDebounceTimer);
    this.leaveObserver?.disconnect();
    this.floatingSvc.releaseLeaveDialog('floating');
  }

  private injectLeaveButton(): void {
    if (!this.state.isOpen || this._isClosing || this._isInjecting) return;
    this._isInjecting = true;

    try {
      this.cleanOrphanedButtons();
      const dialogs = document.querySelectorAll<HTMLElement>(
        '.zoom-MuiPopper-root[aria-label*="Leave dialog"], .zoom-MuiPopper-root[aria-label*="Quitter"]'
      );

      dialogs.forEach((dialog) => {
        if (!dialog.isConnected) return;
        this.hideNativeLeaveMenu(dialog);

        const cancelEl = this.findNearestVisibleCancel(dialog);
        if (!cancelEl?.parentElement || !cancelEl.parentElement.isConnected) return;
        if (cancelEl.parentElement.querySelector(`.${this.LEAVE_BTN_CLASS}`)) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'zoom-MuiButtonBase-root zoom-MuiButton-root zoom-MuiButton-text ' +
                        'zoom-MuiButton-textPrimary zoom-MuiButton-sizeMedium ' +
                        'zoom-MuiButton-textSizeMedium zoom-MuiButton-disableElevation ' +
                        this.LEAVE_BTN_CLASS;
        btn.textContent = 'Quitter';
        btn.style.cssText = 'color:#fff;font-size:13px;font-weight:500;background:transparent;' +
                           'border:none;cursor:pointer;margin-right:12px;padding:0;';

        btn.addEventListener('click', this.boundQuitterClick, true);
        cancelEl.parentElement.insertBefore(btn, cancelEl);
      });
    } finally {
      setTimeout(() => { this._isInjecting = false; }, 100);
    }
  }

  private cleanOrphanedButtons(): void {
    document.querySelectorAll(`.${this.LEAVE_BTN_CLASS}`).forEach(el => {
      const dialog = el.closest('.zoom-MuiPopper-root[aria-label*="Leave"], .zoom-MuiPopper-root[aria-label*="Quitter"]');
      if (!dialog || !this.isVisible(dialog as HTMLElement)) el.remove();
    });
  }

  private hideNativeLeaveMenu(dialog: HTMLElement): void {
    dialog.querySelectorAll<HTMLElement>('[role="menu"]').forEach((menu) => {
      if (menu && menu.isConnected) {
        menu.style.display = 'none';
        const paper = menu.closest('.zoom-MuiPaper-root') as HTMLElement;
        if (paper) paper.style.display = 'none';
      }
    });
  }

  private findNearestVisibleCancel(dialog: HTMLElement): HTMLElement | null {
    const dialogRect = dialog.getBoundingClientRect();
    const candidates = Array.from(document.querySelectorAll<HTMLElement>('button, [role="button"], span, div'))
      .filter(el => this.isCancelText(el.textContent) && this.isVisible(el));

    let best: HTMLElement | null = null;
    let bestDist = Infinity;
    const cx = dialogRect.left + dialogRect.width / 2;
    const cy = dialogRect.top + dialogRect.height / 2;

    for (const candidate of candidates) {
      const clickable = (candidate.closest('button, [role="button"]') as HTMLElement) ?? candidate;
      const r = clickable.getBoundingClientRect();
      const dist = (r.left + r.width / 2 - cx) ** 2 + (r.top + r.height / 2 - cy) ** 2;
      if (dist < bestDist) { bestDist = dist; best = clickable; }
    }
    return best;
  }

  private isCancelText(v: string | null): boolean {
    const t = (v ?? '').trim().toLowerCase();
    return t === 'annuler' || t === 'cancel';
  }

  private isVisible(el: HTMLElement): boolean {
    const s = getComputedStyle(el);
    return s.display !== 'none' && s.visibility !== 'hidden' && el.getBoundingClientRect().width > 0;
  }

  private removeInjectedButtons(): void {
    document.querySelectorAll(`.${this.LEAVE_BTN_CLASS}`).forEach(el => el.remove());
  }

  // ==================== CLEANUP ====================

  private async cleanup(wasNative: boolean) {
    if (this.cleaningUp) return;
    this.cleaningUp = true;
    try {
      if (this.audioRecorder.isRecording) {
        const blob = await this.audioRecorder.stopRecordingAndWait();
        if (blob.size > 0) void this.transcribeSvc.transcribeMeeting(blob, this.state.meetingNumber);
      }
      if (this.client) {
        if (!wasNative) try { await this.client.leaveMeeting(); } catch {}
        try { await this.client.destroyClient(); } catch {}
      }
    } finally { 
      this.cleaningUp = false; 
      this.client = null; 
    }
  }

  @HostListener('window:beforeunload')
  onUnload() { this._isClosing = true; void this.cleanup(false); }

  ngOnDestroy() { this.stateSub?.unsubscribe(); void this.close(); }
}