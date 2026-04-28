import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FloatingMeetingService } from '../../../services/floating-meeting.service';
import { MeetingService, MeetingRequest, MeetingResponse } from '../../../services/meeting.service';
import { OrganisationPartenaire } from '../../../models/partenaire';
import { PartenaireService } from '../../../services/partenaire.service';

@Component({
  selector: 'app-request-meeting',
  standalone: false,
  templateUrl: './request-meeting.component.html',
  styleUrls: ['./request-meeting.component.css']
})
export class RequestMeetingComponent implements OnInit {
  partner: OrganisationPartenaire | null = null;
  isPartnerLoading = false;
  partnerLoadError = '';

  requesterName = '';
  subject = '';
  /** kept for backwards compat — derived from suggestedDate + suggestedTime on submit */
  suggestedDateTime = '';
  suggestedDate = '';
  suggestedTime = '';
  durationMinutes = 45;
  note = '';

  /** Quick-pick presets so the user doesn't have to type a time manually. */
  readonly timePresets: string[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isSuccess = false;

  meetingResponse: MeetingResponse | null = null;

  private readonly authService = inject(AuthService);
  private readonly meetingService = inject(MeetingService);
  private readonly partenaireService = inject(PartenaireService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly floatingMeetingService = inject(FloatingMeetingService);

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.requesterName = `User ${userId}`;
    this.loadPartner();
  }

  async loadPartner(): Promise<void> {
    const partnerId = Number(this.route.snapshot.paramMap.get('id'));
    if (!partnerId) {
      this.partnerLoadError = 'Partner identifier is missing.';
      return;
    }
    this.isPartnerLoading = true;
    this.partnerLoadError = '';
    try {
      this.partner = await this.partenaireService.getById(partnerId);
    } catch (error) {
      this.partnerLoadError = 'Could not load the selected partner.';
    } finally {
      this.isPartnerLoading = false;
    }
  }

  async submit(): Promise<void> {
    if (!this.requesterName.trim()) { this.errorMessage = 'Requester name is required.'; return; }
    if (!this.subject.trim()) { this.errorMessage = 'Subject is required.'; return; }
    if (!this.suggestedDate) { this.errorMessage = 'A date is required.'; return; }
    if (!this.suggestedTime) { this.errorMessage = 'A time is required.'; return; }
    this.suggestedDateTime = `${this.suggestedDate}T${this.suggestedTime}`;
    if (this.durationMinutes <= 0) { this.errorMessage = 'Duration must be positive.'; return; }

    const selectedDate = new Date(this.suggestedDateTime);
    if (isNaN(selectedDate.getTime())) { this.errorMessage = 'Invalid date or time.'; return; }
    if (selectedDate <= new Date()) { this.errorMessage = 'Please choose a future date/time.'; return; }

    if (!this.partner) { this.errorMessage = 'Partner must be loaded before creating a request.'; return; }

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
      this.successMessage = 'Meeting request sent successfully!';
      this.isSuccess = true;
    } catch (error: any) {
      this.errorMessage = error?.error?.message || 'Error sending the meeting request.';
    } finally {
      this.isLoading = false;
    }
  }

  close(): void { this.router.navigate(['/partenariat/list']); }

  closeSuccess(): void { this.router.navigate(['/partenariat/meetings']); }

  /**
   * Only available once the partner has ACCEPTED (meetingStatus === 'ACCEPTED').
   * At that point zoomMeetingId is populated.
   */
  openZoomMeeting(): void {
    if (!this.meetingResponse?.zoomMeetingId) return;
    this.floatingMeetingService.openMeeting({
      meetingNumber: this.meetingResponse.zoomMeetingId,
      meetingPassword: this.meetingResponse.zoomPassword,
      role: 0,
      title: 'Zoom Meeting'
    });
  }
}