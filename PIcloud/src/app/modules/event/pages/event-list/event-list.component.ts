import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../core/services/auth.service';
import { RegistrationService } from '../../../../services/registration.service';
import { Event, EventStatus, EventType, DayGroup } from '../../../../models/event';
import { EventRegistration } from '../../../../models/registration';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  events: Event[] = [];
  allEvents: Event[] = [];
  dayGroups: DayGroup[] = [];
  loading = false;
  error = '';

  searchQuery = '';
  viewMode: 'grid' | 'list' = 'grid';

  selectedType: EventType | '' = '';
  selectedStatus: EventStatus | '' = '';
  selectedEvent: Event | null = null;

  myRegistrations: EventRegistration[] = [];

  eventTypes: EventType[] = ['WEBINAIRE', 'WORKSHOP', 'PITCH', 'BOOTCAMP', 'CONFERENCE'];
  eventStatuses: EventStatus[] = [
    'BROUILLON', 'EN_ATTENTE_VALIDATION', 'APPROUVE', 'PUBLIE', 'REJETE', 'ANNULE', 'TERMINE'
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private eventService: EventService,
    public authService: AuthService,
    private registrationService: RegistrationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(
      distinctUntilChanged((a, b) => a['refresh'] === b['refresh']),
      takeUntil(this.destroy$)
    ).subscribe(() => this.loadEvents());

    this.loadMyRegistrations();
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

    // Regular users always get PUBLIE only — backend enforces this too,
    // but we guard client-side as well to strip any BROUILLON that slips through
    const effectiveFilters = this.canCreate()
      ? filters
      : { ...filters, status: 'PUBLIE' as EventStatus };

    this.eventService.getAll(effectiveFilters).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        // Extra client-side guard: never show BROUILLON to non-editors
        this.allEvents = this.canCreate()
          ? data
          : data.filter(e => e.status === 'PUBLIE');
        this.applySearch();
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les événements.';
        this.loading = false;
      }
    });
  }

  applySearch(): void {
    const q = this.searchQuery.trim().toLowerCase();
    this.events = q
      ? this.allEvents.filter(e => e.title.toLowerCase().includes(q))
      : [...this.allEvents];
    this.dayGroups = this.groupByDay(this.events);
  }

  groupByDay(events: Event[]): DayGroup[] {
    const map = new Map<string, Event[]>();
    const noDate: Event[] = [];

    events.forEach(e => {
      if (!e.startDate) { noDate.push(e); return; }
      const key = new Date(e.startDate).toISOString().substring(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    });

    const groups: DayGroup[] = [];
    Array.from(map.keys()).sort().forEach(key => {
      const date = new Date(key + 'T00:00:00');
      groups.push({ label: this.formatDayLabel(date), date, events: map.get(key)! });
    });

    if (noDate.length) {
      groups.push({ label: 'Date non définie', date: new Date(0), events: noDate });
    }
    return groups;
  }

  formatDayLabel(date: Date): string {
    const today    = new Date(); today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

    if (date.getTime() === today.getTime())    return "Aujourd'hui";
    if (date.getTime() === tomorrow.getTime()) return 'Demain';

    return date.toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  get filteredEvents(): Event[] { return this.events; }

  onFilterChange(): void { this.loadEvents(); }
  onSearchChange(): void { this.applySearch(); }

  onEventSelected(event: Event): void {
    this.selectedEvent = this.selectedEvent?.id === event.id ? null : event;
  }

  onPanelClosed(): void { this.selectedEvent = null; }

  loadMyRegistrations(): void {
    if (!this.authService.isLoggedIn()) return;
    this.registrationService.getMyRegistrations().subscribe({
      next: (regs) => { this.myRegistrations = regs.filter(r => r.status !== 'ANNULE'); },
      error: () => {}
    });
  }

  getMyReg(eventId: number): EventRegistration | null {
    return this.myRegistrations.find(r => r.eventId === eventId) || null;
  }

  getRegistrationForEvent(eventId: number): EventRegistration | null {
    return this.getMyReg(eventId);
  }

  onEventUpdated(): void {
    if (this.selectedEvent) {
      this.refreshEvent(this.selectedEvent.id, (updated) => {
        this.selectedEvent = updated;
      });
    }
    this.loadMyRegistrations();
  }

  onCardEventUpdated(eventId: number): void {
    this.refreshEvent(eventId);
    this.loadMyRegistrations();
  }

  private refreshEvent(id: number, onDone?: (e: Event) => void): void {
    this.eventService.getById(id).subscribe({
      next: (updated) => {
        this.allEvents = this.allEvents.map(e => e.id === updated.id ? updated : e);
        this.applySearch();
        onDone?.(updated);
      }
    });
  }

  onDelete(id: number): void {
    this.eventService.delete(id).subscribe({
      next: () => {
        this.allEvents = this.allEvents.filter(e => e.id !== id);
        this.applySearch();
        if (this.selectedEvent?.id === id) this.selectedEvent = null;
      },
      error: () => { this.error = 'Impossible de supprimer cet événement.'; }
    });
  }

  isAdmin(): boolean   { return this.authService.getRole() === 'ADMIN'; }
  canCreate(): boolean {
    return ['ADMIN', 'MENTOR', 'PARTENAIRE'].includes(this.authService.getRole());
  }
}