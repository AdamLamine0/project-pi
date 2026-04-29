import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../../services/event.service';
import { Event } from '../../../../models/event';

@Component({
  selector: 'app-pending-events',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pending-events.component.html',
  styleUrls: ['./pending-events.component.css']
})
export class PendingEventsComponent implements OnInit {

  events: Event[] = [];
  loading = true;
  error = '';

  // Per-card state
  rejectingId: number | null = null;
  rejectReason: { [id: number]: string } = {};
  actionLoading: { [id: number]: boolean } = {};
  actionSuccess: { [id: number]: string } = {};

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadPending();
  }

  loadPending(): void {
    this.loading = true;
    this.error = '';
    this.eventService.getPending().subscribe({
      next: (data) => { this.events = data; this.loading = false; },
      error: () => { this.error = 'Erreur lors du chargement des événements en attente.'; this.loading = false; }
    });
  }

  approve(id: number): void {
    this.actionLoading[id] = true;
    this.eventService.approve(id).subscribe({
      next: () => {
        this.actionSuccess[id] = 'approved';
        this.actionLoading[id] = false;
        setTimeout(() => this.events = this.events.filter(e => e.id !== id), 1200);
      },
      error: () => { this.actionLoading[id] = false; }
    });
  }

  startReject(id: number): void {
    this.rejectingId = id;
    if (!this.rejectReason[id]) this.rejectReason[id] = '';
  }

  cancelReject(): void {
    this.rejectingId = null;
  }

  confirmReject(id: number): void {
    if (!this.rejectReason[id]?.trim()) return;
    this.actionLoading[id] = true;
    this.eventService.reject(id, this.rejectReason[id]).subscribe({
      next: () => {
        this.actionSuccess[id] = 'rejected';
        this.actionLoading[id] = false;
        this.rejectingId = null;
        setTimeout(() => this.events = this.events.filter(e => e.id !== id), 1200);
      },
      error: () => { this.actionLoading[id] = false; }
    });
  }
  hasRejectReason(id: number): boolean {
  return !!(this.rejectReason[id] && this.rejectReason[id].trim());
}
}