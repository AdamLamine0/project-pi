import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FloatingMeetingService } from '../../../services/floating-meeting.service';
import { MeetingService, MeetingRequest, MeetingResponse } from '../../../services/meeting.service';
import { OrganisationPartenaire } from '../../../models/partenaire';
import { PartenaireService } from '../../../services/partenaire.service';

@Component({
  selector: 'app-request-meeting',
  templateUrl: './request-meeting.component.html',
  styleUrls: ['./request-meeting.component.css']
})
export class RequestMeetingComponent implements OnInit {
  partner: OrganisationPartenaire | null = null;
  isPartnerLoading = false;
  partnerLoadError = '';

  requesterName = '';
  subject = '';
  suggestedDateTime = '';
  durationMinutes = 45;
  note = '';

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
    if (!this.suggestedDateTime) { this.errorMessage = 'A date/time is required.'; return; }
    if (this.durationMinutes <= 0) { this.errorMessage = 'Duration must be positive.'; return; }

    const selectedDate = new Date(this.suggestedDateTime);
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