import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../services/event.service';
import { AuthService } from '../../../../core/services/auth.service';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    public authService: AuthService
  ) {
    this.form = this.fb.group({
      title:        ['', [Validators.required, Validators.maxLength(200)]],
      description:  [''],
      type:         ['', Validators.required],
      status:       ['BROUILLON'],
      startDate:    [''],
      locationType: [''],
      capacityMax:  [null, [Validators.min(1)]],
      coverImageUrl:[''],
      targetSector: [[]],
      targetStage:  [[]]
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

  isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

  loadEvent(id: number): void {
    this.isLoading = true;
    this.eventService.getById(id).subscribe({
      next: (event) => {
        this.form.patchValue({
          ...event,
          startDate: event.startDate ? event.startDate.substring(0, 16) : ''
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
      error: () => { this.errorMessage = "Échec du téléchargement de l'image."; this.isUploading = false; }
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
    const current: string[] = this.form.value.targetSector || [];
    this.form.patchValue({ targetSector: current.filter(x => x !== s) });
  }

  addStage(): void {
    const val = this.stageInput.trim();
    if (!val) return;
    const current: string[] = this.form.value.targetStage || [];
    if (!current.includes(val)) this.form.patchValue({ targetStage: [...current, val] });
    this.stageInput = '';
  }

  removeStage(s: string): void {
    const current: string[] = this.form.value.targetStage || [];
    this.form.patchValue({ targetStage: current.filter(x => x !== s) });
  }

  onSectorKeydown(e: KeyboardEvent): void { if (e.key === 'Enter') { e.preventDefault(); this.addSector(); } }
  onStageKeydown(e: KeyboardEvent): void  { if (e.key === 'Enter') { e.preventDefault(); this.addStage(); } }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = { ...this.form.value };

    const request$ = this.isEdit && this.eventId
      ? this.eventService.update(this.eventId, payload)
      : this.eventService.create(payload);

    request$.subscribe({
      next: () => {
        // ✅ Reset loading BEFORE navigation
        this.isLoading = false;
        this.successMessage = this.isEdit
          ? 'Événement mis à jour avec succès !'
          : 'Événement créé avec succès !';

        setTimeout(() => {
          // ✅ Clean navigation — timestamp queryParam forces EventList to detect
          // a real navigation change and re-run ngOnInit via ActivatedRoute subscription
          this.router.navigate(['/events'], {
            queryParams: { refresh: Date.now() }
          });
        }, 1200);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue.';
        this.isLoading = false;
      }
    });
  }

  generateDescription(): void {
    const title = this.form.get('title')?.value?.trim();
    const date  = this.form.get('startDate')?.value;
    const type  = this.form.get('type')?.value;

    if (!title) {
      this.aiError = 'Renseignez le titre avant de générer une description.';
      return;
    }

    this.aiError = '';
    this.isGenerating = true;

    this.eventService.generateDescription(title, date || '', type || '').subscribe({
      next: (res) => {
        this.form.patchValue({ description: res.description });
        this.isGenerating = false;
      },
      error: () => {
        this.aiError = 'La génération a échoué. Vérifiez votre connexion et réessayez.';
        this.isGenerating = false;
      }
    });
  }

  cancel(): void { this.router.navigate(['/events']); }
}