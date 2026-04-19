import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SpeakerService } from '../../../../services/speaker.service';
import { ProgramService } from '../../../../services/program.service';
import { SpeakerCandidate } from '../../../../models/speaker';
import { EventType, LocationType, EventStatus } from '../../../../models/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  form: FormGroup;
  isEdit = false;
  eventId: number | null = null;
  isLoading = false;
  isUploading = false;
  isGenerating = false;
  aiError = '';
  successMessage = '';
  errorMessage = '';
  imagePreview: string | null = null;

  eventTypes: EventType[] = ['WEBINAIRE', 'WORKSHOP', 'PITCH', 'BOOTCAMP', 'CONFERENCE'];
  locationTypes: LocationType[] = ['PRESENTIEL', 'DISTANCIEL', 'HYBRIDE'];
  eventStatuses: EventStatus[] = [
    'BROUILLON', 'EN_ATTENTE_VALIDATION', 'APPROUVE', 'PUBLIE', 'REJETE', 'ANNULE', 'TERMINE'
  ];

  sectorInput = '';
  stageInput = '';

  // Speaker staging
  stagedSpeakers: SpeakerCandidate[] = [];
  speakerSearchQuery = '';
  speakerCandidates: SpeakerCandidate[] = [];
  isSearchingSpeakers = false;
  speakerSearchError = '';
  showSpeakerSearch = false;

  // Program generation
  shouldGenerateProgram = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    public authService: AuthService,
    private speakerService: SpeakerService,
    private programService: ProgramService
  ) {
    this.form = this.fb.group({
      title:         ['', [Validators.required, Validators.maxLength(200)]],
      description:   ['', [Validators.maxLength(5000)]],
      type:          ['', Validators.required],
      status:        ['BROUILLON'],
      startDate:     [''],
      endDate:       [''],
      locationType:  [''],
      location:      ['', [Validators.maxLength(300)]],
      ticketPrice:   [null, [Validators.min(0)]],
      capacityMax:   [null, [Validators.min(1)]],
      coverImageUrl: [''],
      targetSector:  [[]],
      targetStage:   [[]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.eventId = +id;
      this.loadEvent(this.eventId);
    }
  }

  isAdmin(): boolean { return this.authService.getRole() === 'ADMIN'; }

  loadEvent(id: number): void {
    this.isLoading = true;
    this.eventService.getById(id).subscribe({
      next: (event) => {
        this.form.patchValue({
          ...event,
          startDate: event.startDate ? event.startDate.substring(0, 16) : '',
          endDate:   event.endDate   ? event.endDate.substring(0, 16)   : ''
        });
        if (event.coverImageUrl) this.imagePreview = event.coverImageUrl;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = "Impossible de charger l'événement.";
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(file);
    this.isUploading = true;
    this.eventService.uploadImage(file).subscribe({
      next: (res) => { this.form.patchValue({ coverImageUrl: res.url }); this.isUploading = false; },
      error: () => { this.errorMessage = "Échec du téléchargement."; this.isUploading = false; }
    });
  }

  removeImage(): void {
    this.imagePreview = null;
    this.form.patchValue({ coverImageUrl: '' });
  }

  addSector(): void {
    const val = this.sectorInput.trim();
    if (!val) return;
    const current: string[] = this.form.value.targetSector || [];
    if (!current.includes(val)) this.form.patchValue({ targetSector: [...current, val] });
    this.sectorInput = '';
  }

  removeSector(s: string): void {
    this.form.patchValue({ targetSector: (this.form.value.targetSector || []).filter((x: string) => x !== s) });
  }

  addStage(): void {
    const val = this.stageInput.trim();
    if (!val) return;
    const current: string[] = this.form.value.targetStage || [];
    if (!current.includes(val)) this.form.patchValue({ targetStage: [...current, val] });
    this.stageInput = '';
  }

  removeStage(s: string): void {
    this.form.patchValue({ targetStage: (this.form.value.targetStage || []).filter((x: string) => x !== s) });
  }

  onSectorKeydown(e: KeyboardEvent): void { if (e.key === 'Enter') { e.preventDefault(); this.addSector(); } }
  onStageKeydown(e: KeyboardEvent):  void { if (e.key === 'Enter') { e.preventDefault(); this.addStage(); } }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    // Client-side cross-field date check
    const start = this.form.value.startDate;
    const end   = this.form.value.endDate;
    if (start && end && new Date(end) <= new Date(start)) {
      this.errorMessage = 'La date de fin doit être postérieure à la date de début.';
      return;
    }
    if (start && new Date(start) < new Date()) {
      this.errorMessage = 'La date de début doit être dans le futur.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const raw = { ...this.form.value };
    // Convert empty strings to null for enum fields so the backend doesn't
    // receive "" which Jackson refuses to coerce to an enum value.
    const payload = {
      ...raw,
      locationType: raw.locationType || null,
      type: raw.type || null,
      status: raw.status || null,
    };

    const request$ = this.isEdit && this.eventId
      ? this.eventService.update(this.eventId, payload)
      : this.eventService.create(payload);

    request$.subscribe({
      next: (saved) => {
        const targetId = this.isEdit ? this.eventId! : saved.id;
        const hasPostOps = !this.isEdit && (this.stagedSpeakers.length > 0 || this.shouldGenerateProgram);

        if (hasPostOps) {
          this.postCreateOperations(saved.id).subscribe({
            next: () => {
              this.isLoading = false;
              this.successMessage = 'Événement créé avec intervenants et programme !';
              setTimeout(() => this.router.navigate(['/events', targetId]), 1500);
            },
            error: () => {
              this.isLoading = false;
              this.successMessage = 'Événement créé. Certaines opérations post-création ont échoué.';
              setTimeout(() => this.router.navigate(['/events', targetId]), 2000);
            }
          });
        } else {
          this.isLoading = false;
          this.successMessage = this.isEdit ? 'Événement mis à jour !' : 'Événement créé !';
          setTimeout(() => this.router.navigate(['/events', targetId]), 1500);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue.';
        this.isLoading = false;
      }
    });
  }

  private postCreateOperations(eventId: number): Observable<any> {
    const speakerOps$: Observable<any> = this.stagedSpeakers.length > 0
      ? forkJoin(this.stagedSpeakers.map(c =>
          this.speakerService.importOne(c).pipe(
            switchMap(speaker => this.speakerService.linkToEvent(eventId, speaker.id))
          )
        ))
      : of(null);

    if (this.shouldGenerateProgram) {
      return speakerOps$.pipe(switchMap(() => this.programService.generate(eventId)));
    }
    return speakerOps$;
  }

  searchLinkedInForSpeakers(): void {
    const q = this.speakerSearchQuery.trim();
    if (!q) return;
    this.isSearchingSpeakers = true;
    this.speakerSearchError = '';
    this.speakerCandidates = [];
    this.speakerService.searchLinkedIn(q).subscribe({
      next: (results) => { this.speakerCandidates = results; this.isSearchingSpeakers = false; },
      error: () => { this.speakerSearchError = 'La recherche a échoué.'; this.isSearchingSpeakers = false; }
    });
  }

  stageSpeaker(candidate: SpeakerCandidate): void {
    const alreadyStaged = this.stagedSpeakers.some(
      s => s.linkedinUrl && s.linkedinUrl === candidate.linkedinUrl
    );
    if (!alreadyStaged) this.stagedSpeakers.push(candidate);
  }

  removeStagedSpeaker(candidate: SpeakerCandidate): void {
    this.stagedSpeakers = this.stagedSpeakers.filter(s => s !== candidate);
  }

  isSpeakerStaged(candidate: SpeakerCandidate): boolean {
    return this.stagedSpeakers.some(
      s => s.linkedinUrl && s.linkedinUrl === candidate.linkedinUrl
    );
  }

  generateDescription(): void {
    const title = this.form.get('title')?.value?.trim();
    if (!title) { this.aiError = 'Renseignez le titre avant de générer.'; return; }
    this.aiError = '';
    this.isGenerating = true;
    this.eventService.generateDescription(
      title,
      this.form.get('startDate')?.value || '',
      this.form.get('type')?.value || ''
    ).subscribe({
      next: (res) => { this.form.patchValue({ description: res.description }); this.isGenerating = false; },
      error: () => { this.aiError = 'La génération a échoué.'; this.isGenerating = false; }
    });
  }

  cancel(): void { this.router.navigate(['/events']); }
}