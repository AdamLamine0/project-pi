import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FloatingMeetingState {
  isOpen: boolean;
  requestId: number;
  meetingNumber: string;
  meetingPassword: string;
  role: number;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class FloatingMeetingService {

  private readonly state = new BehaviorSubject<FloatingMeetingState>({
    isOpen: false,
    requestId: 0,
    meetingNumber: '',
    meetingPassword: '',
    role: 0,
    title: ''
  });

  /** Observable for components to subscribe to */
  readonly state$ = this.state.asObservable();

  private _requestIdCounter = 0;

  // ══════════════════════════════════════════════════
  // LEAVE DIALOG OWNERSHIP — prevents double injection
  // ══════════════════════════════════════════════════

  /** Which component currently owns the leave-dialog button injection */
  leaveDialogOwner: 'meetings' | 'floating' | null = null;

  /**
   * Claim exclusive rights to inject the "Quitter" button.
   * @returns true if claim succeeded, false if another component already owns it
   */
  claimLeaveDialog(owner: 'meetings' | 'floating'): boolean {
    if (this.leaveDialogOwner && this.leaveDialogOwner !== owner) {
      console.warn(`[FloatingMeetingService] Leave dialog already owned by "${this.leaveDialogOwner}" — claim denied for "${owner}"`);
      return false;
    }
    this.leaveDialogOwner = owner;
    console.log(`[FloatingMeetingService] Leave dialog claimed by "${owner}"`);
    return true;
  }

  /**
   * Release ownership so the other component can claim it next time.
   */
  releaseLeaveDialog(owner: 'meetings' | 'floating'): void {
    if (this.leaveDialogOwner === owner) {
      console.log(`[FloatingMeetingService] Leave dialog released by "${owner}"`);
      this.leaveDialogOwner = null;
    }
  }

  // ══════════════════════════════════════════════════
  // MEETING STATE MANAGEMENT
  // ═════════════════════════════════════════════════
  openMeeting(params: Omit<FloatingMeetingState, 'isOpen' | 'requestId'>): void {
this._requestIdCounter++;
this.state.next({
...params,
isOpen: true,
requestId: this._requestIdCounter
});
}

closeMeeting(): void {
this.state.next({ ...this.state.value, isOpen: false });
}

get currentState(): FloatingMeetingState {
return this.state.value;
}
}