import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Event, EventStatus, EventType } from '../../../../models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  events: Event[] = [];
  loading = false;
  error = '';

  selectedType: EventType | '' = '';
  selectedStatus: EventStatus | '' = '';

  eventTypes: EventType[] = ['WEBINAIRE', 'WORKSHOP', 'PITCH', 'BOOTCAMP', 'CONFERENCE'];
  eventStatuses: EventStatus[] = [
    'BROUILLON', 'EN_ATTENTE_VALIDATION', 'APPROUVE', 'PUBLIE', 'REJETE', 'ANNULE', 'TERMINE'
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private eventService: EventService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ KEY FIX: subscribe to queryParams — every time ?refresh=xxx changes,
    // this fires and re-fetches. Works with onSameUrlNavigation: 'reload' too.
    this.route.queryParams
      .pipe(
        distinctUntilChanged((a, b) => a['refresh'] === b['refresh']),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadEvents();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadEvents(): void {
    this.loading = true;
    this.error = '';

    const filters = {
      ...(this.selectedType   && { type: this.selectedType }),
      ...(this.selectedStatus && { status: this.selectedStatus })
    };

    // Non-admin users only see PUBLIE events
    const effectiveFilters = this.canCreate()
      ? filters
      : { ...filters, status: 'PUBLIE' as EventStatus };

    this.eventService.getAll(effectiveFilters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.events = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Impossible de charger les événements. Veuillez réessayer.';
          this.loading = false;
          console.error('[EventList] load error:', err);
        }
      });
  }

  onFilterChange(): void {
    this.loadEvents();
  }

  onDelete(id: number): void {
    this.eventService.delete(id).subscribe({
      next: () => {
        // ✅ Remove from local array immediately — no need to re-fetch
        this.events = this.events.filter(e => e.id !== id);
      },
      error: () => {
        this.error = 'Impossible de supprimer cet événement.';
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

  canCreate(): boolean {
    const role = this.authService.getRole();
    return ['ADMIN', 'MENTOR', 'PARTENAIRE'].includes(role);
  }
}