import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MeetingService, MeetingRequest } from '../../../services/meeting.service';
import { OrganisationPartenaire } from '../../../models/partenaire';

@Component({
  selector: 'app-request-meeting',
  templateUrl: './request-meeting.component.html',
  styleUrl: './request-meeting.component.css'
})
export class RequestMeetingComponent implements OnInit {
  @Input() partner!: OrganisationPartenaire;
  @Output() closed = new EventEmitter<boolean>();

  requesterName = '';
  subject = '';
  suggestedDateTime = '';
  durationMinutes = 45;
  note = '';

  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isSuccess = false;

  // For success state
  meetingResponse: any = null;

  constructor(
    private authService: AuthService,
    private meetingService: MeetingService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.requesterName = `User ${userId}`;
  }

  async submit(): Promise<void> {
    // Validation
    if (!this.requesterName.trim()) {
      this.errorMessage = 'Le nom du demandeur est requis.';
      return;
    }
    if (!this.subject.trim()) {
      this.errorMessage = 'Le sujet est requis.';
      return;
    }
    if (!this.suggestedDateTime) {
      this.errorMessage = 'La date/heure suggérée est requise.';
      return;
    }
    if (this.durationMinutes <= 0) {
      this.errorMessage = 'La durée doit être positive.';
      return;
    }

    // Check if date is in the future
    const selectedDate = new Date(this.suggestedDateTime);
    const now = new Date();
    if (selectedDate <= now) {
      this.errorMessage = 'Veuillez choisir une date/heure dans le futur.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const request: MeetingRequest = {
        requesterName: this.requesterName.trim(),
        subject: this.subject.trim(),
        suggestedDateTime: this.suggestedDateTime,
        durationMinutes: this.durationMinutes,
        note: this.note.trim() || undefined
      };

      const response = await this.meetingService.requestMeeting(this.partner.id, request);
      this.meetingResponse = response;
      this.successMessage = 'Invitation de réunion envoyée avec succès !';
      this.isSuccess = true;
    } catch (error: any) {
      console.error('Error requesting meeting:', error);
      this.errorMessage = error?.error?.message || 'Erreur lors de la demande de réunion.';
    } finally {
      this.isLoading = false;
    }
  }

  close(): void {
    this.closed.emit(this.isSuccess);
  }

  closeSuccess(): void {
    this.closed.emit(true);
  }
}
