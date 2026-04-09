import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../../../models/event';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() event!: Event;
  @Input() selected = false;
  @Output() deleted  = new EventEmitter<number>();
  @Output() selected$ = new EventEmitter<Event>();

  constructor(public authService: AuthService) {}

  get canEdit(): boolean {
    const role = this.authService.getRole();
    return ['ADMIN', 'MENTOR', 'PARTENAIRE'].includes(role);
  }

  get isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

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
      case 'PUBLIE':                return 'Publié';
      case 'ANNULE':                return 'Annulé';
      case 'TERMINE':               return 'Terminé';
      case 'EN_ATTENTE_VALIDATION': return 'En attente';
      case 'APPROUVE':              return 'Approuvé';
      case 'REJETE':                return 'Rejeté';
      default:                      return 'Brouillon';
    }
  }

  formatTime(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  onCardClick(): void {
    this.selected$.emit(this.event);
  }

  onDelete(e: MouseEvent): void {
    e.stopPropagation();
    if (confirm(`Supprimer "${this.event.title}" ?`)) {
      this.deleted.emit(this.event.id);
    }
  }

  onEdit(e: MouseEvent): void {
    e.stopPropagation();
  }
}