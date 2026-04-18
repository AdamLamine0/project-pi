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
  @Output() deleted = new EventEmitter<number>();

  constructor(public authService: AuthService) {}

  get canEdit(): boolean {
    const role = this.authService.getRole();
    return ['ROLE_ADMIN', 'ADMIN', 'ROLE_MENTOR', 'MENTOR', 'ROLE_PARTENAIRE', 'PARTENAIRE'].includes(role);
  }

  get isAdmin(): boolean {
    const role = this.authService.getRole();
    return role === 'ADMIN' || role === 'ROLE_ADMIN';
  }

  get statusClass(): string {
    switch (this.event.status) {
      case 'PUBLIE':  return 'status-publie';
      case 'ANNULE':  return 'status-annule';
      case 'TERMINE': return 'status-termine';
      default:        return 'status-brouillon';
    }
  }

  get statusLabel(): string {
    switch (this.event.status) {
      case 'PUBLIE':  return 'Publié';
      case 'ANNULE':  return 'Annulé';
      case 'TERMINE': return 'Terminé';
      default:        return 'Brouillon';
    }
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  onDelete(): void {
    if (confirm(`Supprimer "${this.event.title}" ?`)) {
      this.deleted.emit(this.event.id);
    }
  }
}