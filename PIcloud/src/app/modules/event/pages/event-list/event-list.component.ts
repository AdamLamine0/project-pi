import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Event, EventStatus, EventType, DayGroup } from '../../../../models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  events: Event[] = [];
  dayGroups: DayGroup[] = [];
  loading = false;
  error = '';

  selectedType: EventType | '' = '';
  selectedStatus: EventStatus | '' = '';

  // Side panel
  selectedEvent: Event | null = null;

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
    this.route.queryParams.pipe(
      distinctUntilChanged((a, b) => a['refresh'] === b['refresh']),
      takeUntil(this.destroy$)
    ).subscribe(() => this.loadEvents());
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

    const effectiveFilters = this.canCreate()
      ? filters
      : { ...filters, status: 'PUBLIE' as EventStatus };

    this.eventService.getAll(effectiveFilters).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.events = data;
        this.dayGroups = this.groupByDay(data);
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les événements.';
        this.loading = false;
      }
    });
  }

  groupByDay(events: Event[]): DayGroup[] {
    const map = new Map<string, Event[]>();

    // Events with no date go into a special bucket
    const noDate: Event[] = [];

    events.forEach(e => {
      if (!e.startDate) { noDate.push(e); return; }
      const d = new Date(e.startDate);
      const key = d.toISOString().substring(0, 10); // YYYY-MM-DD
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    });

    const groups: DayGroup[] = [];

    // Sort keys chronologically
    Array.from(map.keys()).sort().forEach(key => {
      const date = new Date(key + 'T00:00:00');
      groups.push({
        label: this.formatDayLabel(date),
        date,
        events: map.get(key)!
      });
    });

    if (noDate.length) {
      groups.push({ label: 'Date non définie', date: new Date(0), events: noDate });
    }

    return groups;
  }

  formatDayLabel(date: Date): string {
    const today    = new Date(); today.setHours(0,0,0,0);
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

    if (date.getTime() === today.getTime())    return 'Aujourd\'hui';
    if (date.getTime() === tomorrow.getTime()) return 'Demain';

    return date.toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  onFilterChange(): void { this.loadEvents(); }

  onEventSelected(event: Event): void {
    this.selectedEvent = this.selectedEvent?.id === event.id ? null : event;
  }

  onPanelClosed(): void {
    this.selectedEvent = null;
  }

  onEventUpdated(): void {
    // Refresh event in list after registration change
    if (this.selectedEvent) {
      this.eventService.getById(this.selectedEvent.id).subscribe({
        next: (updated) => {
          this.events = this.events.map(e => e.id === updated.id ? updated : e);
          this.dayGroups = this.groupByDay(this.events);
          this.selectedEvent = updated;
        }
      });
    }
  }

  onDelete(id: number): void {
    this.eventService.delete(id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== id);
        this.dayGroups = this.groupByDay(this.events);
        if (this.selectedEvent?.id === id) this.selectedEvent = null;
      },
      error: () => { this.error = 'Impossible de supprimer cet événement.'; }
    });
  }

  isAdmin(): boolean  { return this.authService.getRole() === 'ADMIN'; }
  canCreate(): boolean {
    return ['ADMIN', 'MENTOR', 'PARTENAIRE'].includes(this.authService.getRole());
  }
}