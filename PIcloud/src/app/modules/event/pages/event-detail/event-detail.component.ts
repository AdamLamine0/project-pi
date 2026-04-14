import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../services/event.service';
import { SpeakerService } from '../../../../services/speaker.service';
import { ProgramService } from '../../../../services/program.service';
import { RegistrationService } from '../../../../services/registration.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Event } from '../../../../models/event';
import { Speaker } from '../../../../models/speaker';
import { EventProgram } from '../../../../models/program';
import { EventRegistration } from '../../../../models/registration';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: Event | null = null;
  speakers: Speaker[] = [];
  program: EventProgram[] = [];
  registrations: EventRegistration[] = [];
  myRegistration: EventRegistration | null = null;

  isLoading = true;
  errorMessage = '';
  successMessage = '';
  isAdmin = false;
  isDeleting = false;
  isSubmitting = false;
  isPublishing = false;
  isApproving = false;
  isRejecting = false;
  showRejectForm = false;
  rejectReason = '';
  showDeleteConfirm = false;
  isRegistering = false;
  isGeneratingProgram = false;

  activeTab: 'apercu' | 'programme' | 'intervenants' | 'inscriptions' = 'apercu';

  slotTypes = ['PRESENTATION', 'KEYNOTE', 'WORKSHOP', 'QA', 'BREAK'];
  showProgramForm = false;
  showSpeakerForm = false;
  editingSlot: EventProgram | null = null;

  programForm = {
    title: '', description: '', type: 'PRESENTATION',
    startTime: '', endTime: '', orderIndex: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private speakerService: SpeakerService,
    private programService: ProgramService,
    private registrationService: RegistrationService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // role is now always normalized: 'ADMIN', 'MENTOR', 'PARTENAIRE', 'USER'
    this.isAdmin = this.authService.getRole() === 'ADMIN';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadAll(+id);
  }

  loadAll(id: number): void {
    this.isLoading = true;
    this.eventService.getById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.isLoading = false;
        this.loadSpeakers(id);
        this.loadProgram(id);
        if (this.canEdit()) this.loadRegistrations(id);
        this.loadMyRegistration(id);
      },
      error: () => {
        this.errorMessage = 'Événement introuvable.';
        this.isLoading = false;
      }
    });
  }

  loadSpeakers(id: number): void {
    this.speakerService.getByEvent(id).subscribe({ next: (s) => this.speakers = s, error: () => {} });
  }

  loadProgram(id: number): void {
    this.programService.getByEvent(id).subscribe({ next: (p) => this.program = p, error: () => {} });
  }

  loadRegistrations(id: number): void {
    this.registrationService.getByEvent(id).subscribe({ next: (r) => this.registrations = r, error: () => {} });
  }

  loadMyRegistration(id: number): void {
    this.registrationService.getMyRegistrations().subscribe({
      next: (regs) => { this.myRegistration = regs.find(r => r.eventId === id) || null; },
      error: () => {}
    });
  }

  // ── REGISTRATION ──────────────────────────────────────────────────────
  register(): void {
    if (!this.event) return;
    this.isRegistering = true;
    this.registrationService.register(this.event.id).subscribe({
      next: (reg) => {
        this.myRegistration = reg;
        this.isRegistering = false;
        this.successMessage = reg.status === 'LISTE_ATTENTE'
          ? "Vous êtes sur la liste d'attente."
          : 'Inscription confirmée !';
        if (this.canEdit()) this.loadRegistrations(this.event!.id);
      },
      error: () => { this.errorMessage = "Échec de l'inscription."; this.isRegistering = false; }
    });
  }

  cancelRegistration(): void {
    if (!this.event) return;
    this.isRegistering = true;
    this.registrationService.cancel(this.event.id).subscribe({
      next: () => {
        this.myRegistration = null;
        this.isRegistering = false;
        this.successMessage = 'Inscription annulée.';
        if (this.canEdit()) this.loadRegistrations(this.event!.id);
      },
      error: () => { this.errorMessage = "Échec de l'annulation."; this.isRegistering = false; }
    });
  }

  checkIn(registrationId: number): void {
    this.registrationService.checkIn(registrationId).subscribe({
      next: (updated) => {
        const idx = this.registrations.findIndex(r => r.id === registrationId);
        if (idx !== -1) this.registrations[idx] = updated;
      },
      error: () => { this.errorMessage = 'Échec du check-in.'; }
    });
  }

  // ── PROGRAM ───────────────────────────────────────────────────────────
  openAddSlot(): void {
    this.editingSlot = null;
    this.programForm = { title: '', description: '', type: 'PRESENTATION', startTime: '', endTime: '', orderIndex: this.program.length };
    this.showProgramForm = true;
  }

  openEditSlot(slot: EventProgram): void {
    this.editingSlot = slot;
    this.programForm = {
      title: slot.title, description: slot.description, type: slot.type,
      startTime: slot.startTime ? slot.startTime.substring(0, 16) : '',
      endTime: slot.endTime ? slot.endTime.substring(0, 16) : '',
      orderIndex: slot.orderIndex
    };
    this.showProgramForm = true;
  }

  saveSlot(): void {
    if (!this.event || !this.programForm.title) return;
    const request = { ...this.programForm, type: this.programForm.type as any };
    if (this.editingSlot) {
      this.programService.update(this.event.id, this.editingSlot.id, request).subscribe({
        next: (updated) => {
          const idx = this.program.findIndex(p => p.id === this.editingSlot!.id);
          if (idx !== -1) this.program[idx] = updated;
          this.showProgramForm = false;
        },
        error: () => { this.errorMessage = 'Échec de la mise à jour du créneau.'; }
      });
    } else {
      this.programService.create(this.event.id, request).subscribe({
        next: (slot) => {
          this.program = [...this.program, slot].sort((a, b) => a.orderIndex - b.orderIndex);
          this.showProgramForm = false;
        },
        error: () => { this.errorMessage = 'Échec de la création du créneau.'; }
      });
    }
  }

  deleteSlot(slotId: number): void {
    if (!this.event) return;
    this.programService.delete(this.event.id, slotId).subscribe({
      next: () => { this.program = this.program.filter(p => p.id !== slotId); },
      error: () => { this.errorMessage = 'Échec de la suppression.'; }
    });
  }

  generateProgram(): void {
    if (!this.event) return;
    const hasExisting = this.program.length > 0;
    if (hasExisting) {
      const ok = confirm(
        `Un programme de ${this.program.length} créneau(x) existe déjà.\n` +
        `L'IA va ajouter de nouveaux créneaux à la suite.\n\n` +
        `Continuer ?`
      );
      if (!ok) return;
    }
    this.isGeneratingProgram = true;
    this.errorMessage = '';
    this.programService.generate(this.event.id).subscribe({
      next: (generated) => {
        this.program = [...this.program, ...generated]
          .sort((a, b) => a.orderIndex - b.orderIndex);
        this.isGeneratingProgram = false;
        this.successMessage = `Programme généré : ${generated.length} créneau(x) ajouté(s).`;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Échec de la génération du programme.';
        this.isGeneratingProgram = false;
      }
    });
  }

  // ── SPEAKERS ──────────────────────────────────────────────────────────
  unlinkSpeaker(speakerId: number): void {
    if (!this.event) return;
    this.speakerService.unlinkFromEvent(this.event.id, speakerId).subscribe({
      next: () => { this.speakers = this.speakers.filter(s => s.id !== speakerId); },
      error: () => { this.errorMessage = 'Échec de la dissociation.'; }
    });
  }

  // ── EVENT WORKFLOW ────────────────────────────────────────────────────
  // role is normalized so no ROLE_ prefix needed anywhere
  canEdit(): boolean {
    const role = this.authService.getRole();
    return ['ADMIN', 'MENTOR', 'PARTENAIRE'].includes(role);
  }

  canApprove(): boolean {
    if (!this.event || !this.isAdmin) return false;
    return !['PUBLIE', 'APPROUVE', 'ANNULE', 'TERMINE'].includes(this.event.status);
  }

  canReject(): boolean {
    if (!this.event || !this.isAdmin) return false;
    return !['PUBLIE', 'REJETE', 'ANNULE', 'TERMINE'].includes(this.event.status);
  }

  canSubmit(): boolean {
    if (!this.event) return false;
    if (this.event.status !== 'BROUILLON') return false;
    const role = this.authService.getRole();
    if (role === 'ADMIN') return true; // admin can submit any BROUILLON event
    const isOwner = this.event.organizerId === this.authService.getUserId();
    return isOwner && ['MENTOR', 'PARTENAIRE'].includes(role);
  }

  canPublish(): boolean {
    if (!this.event) return false;
    const role = this.authService.getRole();
    if (role === 'ADMIN') {
      // Admin can publish from any status except already published, cancelled, or terminated
      return !['PUBLIE', 'ANNULE', 'TERMINE'].includes(this.event.status);
    }
    const isOwner = this.event.organizerId === this.authService.getUserId();
    return isOwner && this.event.status === 'APPROUVE';
  }

  submitForValidation(): void {
    if (!this.event) return;
    this.isSubmitting = true;
    this.errorMessage = '';
    this.eventService.submit(this.event.id).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isSubmitting = false;
        this.successMessage = 'Événement soumis pour validation. Vous serez notifié par email.';
      },
      error: () => { this.errorMessage = 'Échec de la soumission.'; this.isSubmitting = false; }
    });
  }

  publishEvent(): void {
    if (!this.event) return;
    this.isPublishing = true;
    this.errorMessage = '';
    this.eventService.publish(this.event.id).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isPublishing = false;
        this.successMessage = 'Événement publié avec succès !';
      },
      error: () => { this.errorMessage = 'Échec de la publication.'; this.isPublishing = false; }
    });
  }

  approveEvent(): void {
    if (!this.event) return;
    this.isApproving = true;
    this.errorMessage = '';
    this.eventService.approve(this.event.id).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isApproving = false;
        this.successMessage = 'Événement approuvé.';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Échec de l'approbation.";
        this.isApproving = false;
      }
    });
  }

  startReject(): void { this.showRejectForm = true; this.rejectReason = ''; }
  cancelReject(): void { this.showRejectForm = false; }

  confirmReject(): void {
    if (!this.event || !this.rejectReason.trim()) return;
    this.isRejecting = true;
    this.errorMessage = '';
    this.eventService.reject(this.event.id, this.rejectReason).subscribe({
      next: (updated) => {
        this.event = updated;
        this.isRejecting = false;
        this.showRejectForm = false;
        this.successMessage = 'Événement rejeté.';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Échec du rejet.';
        this.isRejecting = false;
      }
    });
  }

  editEvent(): void { this.router.navigate(['/events', this.event?.id, 'edit']); }
  confirmDelete(): void { this.showDeleteConfirm = true; }
  cancelDelete(): void { this.showDeleteConfirm = false; }
  goBack(): void { this.router.navigate(['/events']); }

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

  // ── HELPERS ───────────────────────────────────────────────────────────
  getStatusClass(): string {
    switch (this.event?.status) {
      case 'PUBLIE':                return 'status-publie';
      case 'ANNULE':                return 'status-annule';
      case 'TERMINE':               return 'status-termine';
      case 'EN_ATTENTE_VALIDATION': return 'status-pending';
      case 'APPROUVE':              return 'status-approuve';
      case 'REJETE':                return 'status-rejete';
      default:                      return 'status-brouillon';
    }
  }

  getStatusLabel(): string {
    switch (this.event?.status) {
      case 'PUBLIE':                return 'Publié';
      case 'ANNULE':                return 'Annulé';
      case 'TERMINE':               return 'Terminé';
      case 'EN_ATTENTE_VALIDATION': return 'En attente de validation';
      case 'APPROUVE':              return 'Approuvé';
      case 'REJETE':                return 'Rejeté';
      default:                      return 'Brouillon';
    }
  }

  getSlotTypeColor(type: string): string {
    switch (type) {
      case 'KEYNOTE':  return 'slot-keynote';
      case 'WORKSHOP': return 'slot-workshop';
      case 'BREAK':    return 'slot-break';
      case 'QA':       return 'slot-qa';
      default:         return 'slot-presentation';
    }
  }

  getRegistrationStatusClass(status: string): string {
    switch (status) {
      case 'PRESENT':       return 'reg-present';
      case 'LISTE_ATTENTE': return 'reg-waitlist';
      case 'ANNULE':        return 'reg-annule';
      default:              return 'reg-inscrit';
    }
  }

  formatDate(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  formatTime(date: string): string {
    if (!date) return '—';
    return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  getTypeIcon(): string {
    switch (this.event?.type) {
      case 'WEBINAIRE': return 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.889L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z';
      case 'WORKSHOP':  return 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z';
      case 'PITCH':     return 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z';
      case 'BOOTCAMP':  return 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253';
      default:          return 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4';
    }
  }
}