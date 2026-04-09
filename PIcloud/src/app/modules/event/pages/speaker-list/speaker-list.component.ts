import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeakerService } from '../../../../services/speaker.service';
import { Speaker, SpeakerRequest } from '../../../../models/speaker';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.css']
})
export class SpeakerListComponent implements OnInit {

  allSpeakers: Speaker[] = [];
  eventSpeakers: Speaker[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';
  showForm = false;
  editingSpeaker: Speaker | null = null;
  isSubmitting = false;
  eventId: number | null = null;

  // ── Photo upload ──────────────────────────────
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isUploadingPhoto = false;

  form: SpeakerRequest = {
    fullName: '', title: '', company: '',
    bio: '', photoUrl: '', linkedinUrl: ''
  };

  constructor(
    private speakerService: SpeakerService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventIdParam = this.route.snapshot.queryParamMap.get('eventId');
    if (eventIdParam) {
      this.eventId = +eventIdParam;
      this.loadEventSpeakers();
    }
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading = true;
    this.speakerService.getAll().subscribe({
      next: (speakers) => {
        this.allSpeakers = speakers;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les intervenants.';
        this.isLoading = false;
      }
    });
  }

  loadEventSpeakers(): void {
    if (!this.eventId) return;
    this.speakerService.getByEvent(this.eventId).subscribe({
      next: (speakers) => this.eventSpeakers = speakers,
      error: () => {}
    });
  }

  canEdit(): boolean {
    const role = this.authService.getRole();
    return ['ROLE_ADMIN', 'ADMIN', 'ROLE_MENTOR', 'MENTOR',
            'ROLE_PARTENAIRE', 'PARTENAIRE'].includes(role);
  }

  isAdmin(): boolean {
    const role = this.authService.getRole();
    return role === 'ADMIN' || role === 'ROLE_ADMIN';
  }

  isLinkedToEvent(speaker: Speaker): boolean {
    return this.eventSpeakers.some(s => s.id === speaker.id);
  }

  // ── FORM ──────────────────────────────────────
  openCreate(): void {
    this.editingSpeaker = null;
    this.imagePreview = null;
    this.selectedFile = null;
    this.form = {
      fullName: '', title: '', company: '',
      bio: '', photoUrl: '', linkedinUrl: ''
    };
    this.showForm = true;
    this.clearMessages();
  }

  openEdit(speaker: Speaker): void {
    this.editingSpeaker = speaker;
    this.imagePreview = speaker.photoUrl || null;
    this.selectedFile = null;
    this.form = {
      fullName: speaker.fullName,
      title: speaker.title || '',
      company: speaker.company || '',
      bio: speaker.bio || '',
      photoUrl: speaker.photoUrl || '',
      linkedinUrl: speaker.linkedinUrl || ''
    };
    this.showForm = true;
    this.clearMessages();
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingSpeaker = null;
    this.imagePreview = null;
    this.selectedFile = null;
  }

  // ── PHOTO UPLOAD ──────────────────────────────
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(this.selectedFile);
  }

  uploadPhoto(speakerId: number): void {
    if (!this.selectedFile) return;
    this.isUploadingPhoto = true;
    this.speakerService.uploadPhoto(speakerId, this.selectedFile).subscribe({
      next: (res) => {
        this.form.photoUrl = res.url;
        this.isUploadingPhoto = false;
        this.selectedFile = null;
        this.successMessage = 'Photo téléchargée.';
      },
      error: () => {
        this.errorMessage = 'Échec du téléchargement de la photo.';
        this.isUploadingPhoto = false;
      }
    });
  }

  // ── SUBMIT ────────────────────────────────────
  submit(): void {
    if (!this.form.fullName.trim()) return;
    this.isSubmitting = true;

    const request$ = this.editingSpeaker
      ? this.speakerService.update(this.editingSpeaker.id, this.form)
      : this.speakerService.create(this.form);

    request$.subscribe({
      next: (saved) => {
        // New speaker with photo selected — upload after creation
        if (!this.editingSpeaker && this.selectedFile) {
          this.speakerService.uploadPhoto(saved.id, this.selectedFile).subscribe({
            next: (res) => {
              saved.photoUrl = res.url;
              this.allSpeakers = [...this.allSpeakers, saved];
            },
            error: () => {
              this.allSpeakers = [...this.allSpeakers, saved];
            }
          });
        } else if (this.editingSpeaker) {
          const idx = this.allSpeakers.findIndex(
            s => s.id === this.editingSpeaker!.id
          );
          if (idx !== -1) this.allSpeakers[idx] = saved;
        } else {
          this.allSpeakers = [...this.allSpeakers, saved];
        }

        this.successMessage = this.editingSpeaker
          ? 'Intervenant mis à jour.' : 'Intervenant créé.';
        this.showForm = false;
        this.editingSpeaker = null;
        this.imagePreview = null;
        this.selectedFile = null;
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'Échec de l\'enregistrement.';
        this.isSubmitting = false;
      }
    });
  }

  // ── DELETE ────────────────────────────────────
  delete(speaker: Speaker): void {
    if (!confirm(`Supprimer "${speaker.fullName}" ?`)) return;
    this.speakerService.delete(speaker.id).subscribe({
      next: () => {
        this.allSpeakers = this.allSpeakers.filter(s => s.id !== speaker.id);
        this.eventSpeakers = this.eventSpeakers.filter(s => s.id !== speaker.id);
        this.successMessage = 'Intervenant supprimé.';
      },
      error: () => { this.errorMessage = 'Échec de la suppression.'; }
    });
  }

  // ── LINK / UNLINK ─────────────────────────────
  linkToEvent(speaker: Speaker): void {
    if (!this.eventId) return;
    this.speakerService.linkToEvent(this.eventId, speaker.id).subscribe({
      next: () => {
        this.eventSpeakers = [...this.eventSpeakers, speaker];
        this.successMessage = `${speaker.fullName} ajouté à l'événement.`;
      },
      error: () => { this.errorMessage = 'Échec de l\'ajout.'; }
    });
  }

  unlinkFromEvent(speaker: Speaker): void {
    if (!this.eventId) return;
    this.speakerService.unlinkFromEvent(this.eventId, speaker.id).subscribe({
      next: () => {
        this.eventSpeakers = this.eventSpeakers.filter(s => s.id !== speaker.id);
        this.successMessage = `${speaker.fullName} retiré de l'événement.`;
      },
      error: () => { this.errorMessage = 'Échec de la dissociation.'; }
    });
  }

  // ── NAVIGATION ────────────────────────────────
  goBack(): void {
    if (this.eventId) {
      this.router.navigate(['/events', this.eventId]);
    } else {
      this.router.navigate(['/events']);
    }
  }

  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}