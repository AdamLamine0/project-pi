import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Event } from '../../../../models/event';
import { AuthService } from '../../../../core/services/auth.service';
import { RegistrationService } from '../../../../services/registration.service';
import { EventRegistration } from '../../../../models/registration';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnChanges {
  @Input() event!: Event;
  @Input() selected = false;
  @Input() myRegistration: EventRegistration | null = null;
  @Output() deleted      = new EventEmitter<number>();
  @Output() selected$    = new EventEmitter<Event>();
  @Output() eventUpdated = new EventEmitter<void>();

  localRegistration: EventRegistration | null = null;
  isRegistering = false;
  regError = '';

  constructor(
    public authService: AuthService,
    private registrationService: RegistrationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['myRegistration']) {
      this.localRegistration = this.myRegistration;
    }
  }

  // ── REGISTRATION STATE ────────────────────────────────────────────────

  get isRegistered(): boolean {
    return this.localRegistration?.status === 'INSCRIT' ||
           this.localRegistration?.status === 'PRESENT';
  }

  get isOnWaitlist(): boolean {
    return this.localRegistration?.status === 'LISTE_ATTENTE';
  }

  get isCancelled(): boolean {
    return this.localRegistration?.status === 'ANNULE';
  }

  // ── CAPACITY ──────────────────────────────────────────────────────────

  get registeredCount(): number {
    return this.event.registeredCount ?? 0;
  }

  get fillPct(): number {
    const max = this.event.capacityMax;
    if (!max) return 0;
    return Math.min(100, Math.round((this.registeredCount / max) * 100));
  }

  // ── ACTIONS ───────────────────────────────────────────────────────────

  onRegisterClick(e: MouseEvent): void {
    e.stopPropagation();
    if (this.isRegistering || (this.localRegistration && !this.isCancelled)) return;
    this.isRegistering = true;
    this.regError = '';
    this.registrationService.register(this.event.id).subscribe({
      next: (reg) => {
        this.localRegistration = reg;
        this.isRegistering = false;
        this.eventUpdated.emit();
      },
      error: () => {
        this.isRegistering = false;
        this.regError = "Échec de l'inscription.";
      }
    });
  }

  // ── ROLE HELPERS ──────────────────────────────────────────────────────

  get canEdit(): boolean {
    return ['ADMIN', 'MENTOR', 'PARTENAIRE'].includes(this.authService.getRole());
  }

  get isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

  // ── DISPLAY HELPERS ───────────────────────────────────────────────────

  get statusClass(): string {
    switch (this.event.status) {
      case 'PUBLIE':                return 'status-publie';
      case 'ANNULE':                return 'status-annule';
      case 'TERMINE':               return 'status-termine';
      case 'EN_ATTENTE_VALIDATION': return 'status-pending';
      case 'APPROUVE':              return 'status-approuve';
      case 'REJETE':                return 'status-rejete';
      default:                      return 'status-brouillon';
    }
  }

  get statusLabel(): string {
    switch (this.event.status) {
      case 'PUBLIE':                return 'Upcoming';
      case 'ANNULE':                return 'Annulé';
      case 'TERMINE':               return 'Terminé';
      case 'EN_ATTENTE_VALIDATION': return 'En attente';
      case 'APPROUVE':              return 'Approuvé';
      case 'REJETE':                return 'Rejeté';
      default:                      return 'Brouillon';
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
  }

  formatTime(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-GB', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }

  onCardClick(): void { this.selected$.emit(this.event); }

  onDelete(e: MouseEvent): void {
    e.stopPropagation();
    if (confirm(`Supprimer "${this.event.title}" ?`)) {
      this.deleted.emit(this.event.id);
    }
  }

  onEdit(e: MouseEvent): void { e.stopPropagation(); }
}