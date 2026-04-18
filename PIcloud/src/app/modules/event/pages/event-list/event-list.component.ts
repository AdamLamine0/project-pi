import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
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

  // Filter state
  selectedType: EventType | '' = '';
  selectedStatus: EventStatus | '' = '';

  eventTypes: EventType[] = ['WEBINAIRE', 'WORKSHOP', 'PITCH', 'BOOTCAMP', 'CONFERENCE'];
  eventStatuses: EventStatus[] = ['BROUILLON', 'PUBLIE', 'ANNULE', 'TERMINE'];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.error = '';

    const filters = {
      type:   this.selectedType   || undefined,
      status: this.selectedStatus || undefined
    };

    this.eventService.getAll(filters).subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load events.';
        this.loading = false;
      }
    });
  }

  onDelete(id: number): void {
    this.eventService.delete(id).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== id);
      },
      error: () => {
        alert('Failed to delete event.');
      }
    });
  }

  onFilterChange(): void {
    this.loadEvents();
  }
}