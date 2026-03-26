import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Event } from '../../../../models/event';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: Event | null = null;
  isLoading = true;
  errorMessage = '';
  isAdmin = false;
  isDeleting = false;
  showDeleteConfirm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    this.isAdmin = role === 'ROLE_ADMIN' || role === 'ADMIN';

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEvent(+id);
    }
  }

  loadEvent(id: number): void {
    this.isLoading = true;
    this.eventService.getById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Événement introuvable.';
        this.isLoading = false;
      }
    });
  }

  getStatusClass(): string {
    switch (this.event?.status) {
      case 'PUBLIE':   return 'status-publie';
      case 'ANNULE':   return 'status-annule';
      case 'TERMINE':  return 'status-termine';
      default:         return 'status-brouillon';
    }
  }

  getStatusLabel(): string {
    switch (this.event?.status) {
      case 'PUBLIE':   return 'Publié';
      case 'ANNULE':   return 'Annulé';
      case 'TERMINE':  return 'Terminé';
      default:         return 'Brouillon';
    }
  }

  getTypeIcon(): string {
    switch (this.event?.type) {
      case 'WEBINAIRE':   return 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.889L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z';
      case 'WORKSHOP':    return 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z';
      case 'PITCH':       return 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z';
      case 'BOOTCAMP':    return 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';
      default:            return 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4';
    }
  }

  canEdit(): boolean {
    const role = this.authService.getRole();
    return ['ROLE_ADMIN', 'ADMIN', 'ROLE_MENTOR', 'MENTOR', 'ROLE_PARTENAIRE', 'PARTENAIRE'].includes(role);
  }

  editEvent(): void {
    this.router.navigate(['/events', this.event?.id, 'edit']);
  }

  confirmDelete(): void {
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  deleteEvent(): void {
    if (!this.event) return;
    this.isDeleting = true;
    this.eventService.delete(this.event.id).subscribe({
      next: () => this.router.navigate(['/events']),
      error: () => {
        this.errorMessage = 'Échec de la suppression.';
        this.isDeleting = false;
        this.showDeleteConfirm = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric',
      month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}