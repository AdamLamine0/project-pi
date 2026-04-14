import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../../../models/event';
import { EventService } from '../../../../services/event.service';
import { RegistrationService } from '../../../../services/registration.service';
import { TicketService } from '../../../../services/ticket.service';
import { AuthService } from '../../../../core/services/auth.service';
import { EventRegistration } from '../../../../models/registration';
import { Ticket } from '../../../../models/ticket';

@Component({
  selector: 'app-event-side-panel',
  templateUrl: './event-side-panel.component.html',
  styleUrls: ['./event-side-panel.component.css']
})
export class EventSidePanelComponent implements OnChanges {
  @Input() event: Event | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() eventUpdated = new EventEmitter<void>();

  myRegistration: EventRegistration | null = null;
  isRegistering = false;
  regMessage = '';
  regError = '';

  // Ticket state
  ticket: Ticket | null = null;
  isPaying = false;
  isDownloading = false;
  ticketError = '';

  // Organizer check-in
  checkInInput = '';
  isCheckingIn = false;
  checkInResult: Ticket | null = null;
  checkInError = '';

  // Admin status management
  isStatusActing = false;
  statusActionError = '';
  statusActionSuccess = '';
  showRejectForm = false;
  adminRejectReason = '';

  constructor(
    private eventService: EventService,
    private registrationService: RegistrationService,
    private ticketService: TicketService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnChanges(): void {
    this.regMessage = '';
    this.regError = '';
    this.myRegistration = null;
    this.ticket = null;
    this.ticketError = '';
    this.checkInInput = '';
    this.checkInResult = null;
    this.checkInError = '';
    this.statusActionError = '';
    this.statusActionSuccess = '';
    this.showRejectForm = false;
    this.adminRejectReason = '';
    if (this.event) {
      this.loadMyRegistration();
    }
  }

  loadMyRegistration(): void {
    if (!this.authService.isLoggedIn()) return;
    this.registrationService.getMyRegistrations().subscribe({
      next: (regs) => {
        this.myRegistration = regs.find(
          r => r.eventId === this.event?.id && r.status !== 'ANNULE'
        ) || null;
        if (this.myRegistration && this.isRegistered) {
          this.loadTicket();
        }
      },
      error: () => {}
    });
  }

  loadTicket(): void {
    if (!this.event) return;
    this.ticketService.getMyTicket(this.event.id).subscribe({
      next: (t) => { this.ticket = t; },
      error: () => {}
    });
  }

  register(): void {
    if (!this.event) return;
    this.isRegistering = true;
    this.regError = '';
    this.registrationService.register(this.event.id).subscribe({
      next: (reg) => {
        this.myRegistration = reg;
        this.isRegistering = false;
        this.regMessage = reg.status === 'LISTE_ATTENTE'
          ? "Vous êtes sur la liste d'attente."
          : 'Inscription confirmée !';
        this.eventUpdated.emit();
        if (reg.status === 'INSCRIT') {
          this.loadTicket();
        }
      },
      error: (err) => {
        this.regError = err.error?.message || "Échec de l'inscription.";
        this.isRegistering = false;
      }
    });
  }

  cancelRegistration(): void {
    if (!this.event) return;
    this.isRegistering = true;
    this.regError = '';
    this.registrationService.cancel(this.event.id).subscribe({
      next: () => {
        this.myRegistration = null;
        this.ticket = null;
        this.isRegistering = false;
        this.regMessage = 'Inscription annulée.';
        this.eventUpdated.emit();
      },
      error: () => {
        this.regError = "Échec de l'annulation.";
        this.isRegistering = false;
      }
    });
  }

  payNow(): void {
    if (!this.event) return;
    this.isPaying = true;
    this.ticketError = '';
    this.ticketService.payForTicket(this.event.id).subscribe({
      next: (t) => {
        this.ticket = t;
        if (this.myRegistration) {
          this.myRegistration.paymentStatus = t.paymentStatus;
        }
        this.isPaying = false;
      },
      error: (err) => {
        this.ticketError = err.error?.message || 'Échec du paiement.';
        this.isPaying = false;
      }
    });
  }

  downloadTicket(): void {
    if (!this.event) return;
    this.isDownloading = true;
    this.ticketService.downloadTicketPdf(this.event.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-${this.event!.id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.isDownloading = false;
      },
      error: () => {
        this.ticketError = 'Échec du téléchargement.';
        this.isDownloading = false;
      }
    });
  }

  doCheckIn(): void {
    const num = this.checkInInput.trim();
    if (!num) return;
    this.isCheckingIn = true;
    this.checkInError = '';
    this.checkInResult = null;
    this.ticketService.checkInByTicket(num).subscribe({
      next: (t) => {
        this.checkInResult = t;
        this.checkInInput = '';
        this.isCheckingIn = false;
      },
      error: (err) => {
        this.checkInError = err.error?.message || 'Ticket invalide ou introuvable.';
        this.isCheckingIn = false;
      }
    });
  }

  // ── ADMIN STATUS ACTIONS ───────────────────────────────────────────────

  adminPublish(): void {
    if (!this.event) return;
    this.isStatusActing = true;
    this.statusActionError = '';
    this.eventService.publish(this.event.id).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isStatusActing = false;
        this.statusActionSuccess = 'Événement publié.';
        this.eventUpdated.emit();
      },
      error: (err) => {
        this.statusActionError = err.error?.message || 'Échec de la publication.';
        this.isStatusActing = false;
      }
    });
  }

  adminSubmit(): void {
    if (!this.event) return;
    this.isStatusActing = true;
    this.statusActionError = '';
    this.eventService.submit(this.event.id).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isStatusActing = false;
        this.statusActionSuccess = 'Événement publié directement.';
        this.eventUpdated.emit();
      },
      error: (err) => {
        this.statusActionError = err.error?.message || 'Échec.';
        this.isStatusActing = false;
      }
    });
  }

  adminApprove(): void {
    if (!this.event) return;
    this.isStatusActing = true;
    this.statusActionError = '';
    this.eventService.approve(this.event.id).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isStatusActing = false;
        this.statusActionSuccess = 'Événement approuvé.';
        this.eventUpdated.emit();
      },
      error: (err) => {
        this.statusActionError = err.error?.message || 'Échec.';
        this.isStatusActing = false;
      }
    });
  }

  adminStartReject(): void { this.showRejectForm = true; this.adminRejectReason = ''; }
  adminCancelReject(): void { this.showRejectForm = false; }

  adminConfirmReject(): void {
    if (!this.event || !this.adminRejectReason.trim()) return;
    this.isStatusActing = true;
    this.statusActionError = '';
    this.eventService.reject(this.event.id, this.adminRejectReason).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isStatusActing = false;
        this.showRejectForm = false;
        this.statusActionSuccess = 'Événement rejeté.';
        this.eventUpdated.emit();
      },
      error: (err) => {
        this.statusActionError = err.error?.message || 'Échec.';
        this.isStatusActing = false;
      }
    });
  }

  // ── ADMIN VISIBILITY HELPERS ───────────────────────────────────────────

  get adminCanPublish(): boolean {
    if (!this.event) return false;
    return !['PUBLIE', 'ANNULE', 'TERMINE'].includes(this.event.status);
  }

  get adminCanApprove(): boolean {
    if (!this.event) return false;
    return !['PUBLIE', 'APPROUVE', 'ANNULE', 'TERMINE'].includes(this.event.status);
  }

  get adminCanReject(): boolean {
    if (!this.event) return false;
    return !['PUBLIE', 'REJETE', 'ANNULE', 'TERMINE'].includes(this.event.status);
  }

  openDetail(): void {
    this.router.navigate(['/events', this.event?.id]);
  }

  close(): void {
    this.closed.emit();
  }

  // ── Getters ───────────────────────────────────────────────────────────────

  get canRegister(): boolean {
    return this.event?.status === 'PUBLIE' && !this.event?.isFull;
  }

  get isOnWaitlist(): boolean {
    return this.myRegistration?.status === 'LISTE_ATTENTE';
  }

  get isRegistered(): boolean {
    return this.myRegistration?.status === 'INSCRIT' ||
           this.myRegistration?.status === 'PRESENT';
  }

  get isOrganizer(): boolean {
    const role = this.authService.getRole();
    return ['ADMIN', 'MENTOR', 'PARTENAIRE'].includes(role);
  }

  get paymentLabel(): string {
    switch (this.ticket?.paymentStatus) {
      case 'FREE':    return 'Gratuit';
      case 'PAID':    return 'Payé';
      case 'PENDING': return 'En attente de paiement';
      case 'FAILED':  return 'Paiement échoué';
      default:        return '';
    }
  }

  get paymentClass(): string {
    switch (this.ticket?.paymentStatus) {
      case 'FREE':    return 'badge-free';
      case 'PAID':    return 'badge-paid';
      case 'PENDING': return 'badge-pending';
      case 'FAILED':  return 'badge-failed';
      default:        return '';
    }
  }

  formatDate(date: string | null): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  getStatusLabel(): string {
    switch (this.event?.status) {
      case 'PUBLIE':                return 'Publié';
      case 'ANNULE':                return 'Annulé';
      case 'TERMINE':               return 'Terminé';
      case 'EN_ATTENTE_VALIDATION': return 'En attente de validation';
      case 'APPROUVE':              return 'Approuvé';
      case 'REJETE':                return 'Rejeté';
      default:                      return 'Brouillon';
    }
  }

  getStatusClass(): string {
    switch (this.event?.status) {
      case 'PUBLIE':                return 'status-publie';
      case 'ANNULE':                return 'status-annule';
      case 'TERMINE':               return 'status-termine';
      case 'EN_ATTENTE_VALIDATION': return 'status-pending';
      case 'APPROUVE':              return 'status-approuve';
      case 'REJETE':                return 'status-rejete';
      default:                      return 'status-brouillon';
    }
  }
}