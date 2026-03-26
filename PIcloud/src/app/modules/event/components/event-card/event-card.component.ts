import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../../../models/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent {
  @Input() event!: Event;
  @Output() deleted = new EventEmitter<number>();

  onDelete() {
    if (confirm(`Delete "${this.event.title}"?`)) {
      this.deleted.emit(this.event.id);
    }
  }
}