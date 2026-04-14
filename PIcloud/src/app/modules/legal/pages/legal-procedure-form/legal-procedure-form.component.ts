import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import { ProcedureType } from '../../../../models/legal-procedure.model';

@Component({
  selector: 'app-legal-procedure-form',
  templateUrl: './legal-procedure-form.component.html',
  styleUrls: ['./legal-procedure-form.component.css']
})
export class LegalProcedureFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  procedureId = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  readonly procedureTypes: ProcedureType[] = [
    'SARL',
    'SUARL',
    'LABEL_STARTUP',
    'PI',
    'FISCALITE',
    'CONFORMITE',
    'AUTRE'
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: LegalProcedureService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      entrepreneurId: ['', Validators.required],
      expertId: [''],
      procedureType: ['', Validators.required],
      notes: ['']
    })
    const typeFromQuery = this.route.snapshot.queryParamMap.get('type');
if (typeFromQuery) {
  this.form.patchValue({ procedureType: typeFromQuery });
};

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.procedureId = id;
      this.loadProcedure(id);
      this.form.get('entrepreneurId')?.disable();
    }
  }

  loadProcedure(id: string): void {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (data) => {
        this.form.patchValue({
          entrepreneurId: data.entrepreneurId,
          expertId: data.expertId || '',
          procedureType: data.procedureType,
          notes: data.notes || ''
        });
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Erreur lors du chargement.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    const raw = this.form.getRawValue();
    const payload = {
      entrepreneurId: raw.entrepreneurId,
      expertId: raw.expertId || null,
      procedureType: raw.procedureType,
      notes: raw.notes || null
    };

    this.loading = true;

    if (this.isEditMode) {
      this.service.update(this.procedureId, {
        expertId: payload.expertId,
        procedureType: payload.procedureType,
        notes: payload.notes
      }).subscribe({
        next: () => {
          this.successMessage = 'Dossier mis à jour avec succès.';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/legal-procedures']), 800);
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'Erreur lors de la mise à jour.';
          this.loading = false;
        }
      });
    } else {
      this.service.create(payload).subscribe({
        next: () => {
          this.successMessage = 'Dossier créé avec succès.';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/legal-procedures']), 800);
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'Erreur lors de la création.';
          this.loading = false;
        }
      });
    }
  }
}