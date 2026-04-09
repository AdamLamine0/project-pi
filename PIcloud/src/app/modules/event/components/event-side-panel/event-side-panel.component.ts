import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../../../models/event';
import { RegistrationService } from '../../../../services/registration.service';
import { AuthService } from '../../../../core/services/auth.service';
import { EventRegistration } from '../../../../models/registration';

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

  constructor(
    private registrationService: RegistrationService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnChanges(): void {
    this.regMessage = '';
    this.regError = '';
    this.myRegistration = null;
    if (this.event) {
      this.loadMyRegistration();
    }
  }

  loadMyRegistration(): void {
    this.registrationService.getMyRegistrations().subscribe({
      next: (regs) => {
        this.myRegistration = regs.find(r => r.eventId === this.event?.id) || null;
      },
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

  openDetail(): void {
    this.router.navigate(['/events', this.event?.id]);
  }

  close(): void {
    this.closed.emit();
  }

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