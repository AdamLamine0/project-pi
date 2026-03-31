import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Event, EventType, EventStatus } from '../../../../models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[] = [];
  loading = true;
  error = '';

  selectedType: EventType | '' = '';
  selectedStatus: EventStatus | '' = '';

  eventTypes: EventType[] = ['WEBINAIRE', 'WORKSHOP', 'PITCH', 'BOOTCAMP', 'CONFERENCE'];

  // Admins see all statuses, regular users only see PUBLIE
  get eventStatuses(): EventStatus[] {
    if (this.isAdmin()) {
      return ['BROUILLON', 'EN_ATTENTE_VALIDATION', 'APPROUVE', 'PUBLIE', 'REJETE', 'ANNULE', 'TERMINE'];
    }
    if (this.canCreate()) {
      return ['BROUILLON', 'EN_ATTENTE_VALIDATION', 'APPROUVE', 'PUBLIE', 'REJETE', 'ANNULE', 'TERMINE'];
    }
    return ['PUBLIE']; // regular users only
  }

  constructor(
    private eventService: EventService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.error = '';

    const role = this.authService.getRole();
    const userId = this.authService.getUserId();
    const filters: any = {
      type:   this.selectedType  || undefined,
      status: this.selectedStatus || undefined
    };

    if (role === 'MENTOR' || role === 'PARTENAIRE') {
      // Mentor/Partenaire see only their own events
      filters.organizerId = userId;
    } else if (role === 'USER' || role === '' || !role) {
      // Regular users and guests see only published events
      if (!filters.status) filters.status = 'PUBLIE';
    }
    // ADMIN sees everything — no extra filter

    this.eventService.getAll(filters).subscribe({
      next: (data) => { this.events = data; this.loading = false; },
      error: () => { this.error = 'Échec du chargement des événements.'; this.loading = false; }
    });
  }

  onDelete(id: number): void {
    this.eventService.delete(id).subscribe({
      next: () => { this.events = this.events.filter(e => e.id !== id); },
      error: () => { alert('Échec de la suppression.'); }
    });
  }

  onFilterChange(): void { this.loadEvents(); }

  isAdmin(): boolean   { return this.authService.getRole() === 'ADMIN'; }
  canCreate(): boolean {
    const role = this.authService.getRole();
    return ['ADMIN', 'MENTOR', 'PARTENAIRE'].includes(role);
  }
}