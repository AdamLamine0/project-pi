import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import {
  ProcedureType,
  PROCEDURE_TYPE_LABELS,
  STATIC_EXPERTS,
  ExpertSummary
} from '../../../../models/legal-procedure.model';

// ⚠️ Remplacez par la vraie récupération depuis votre AuthService
const CURRENT_USER_ID = 'entrepreneur-uuid-placeholder';

@Component({
  selector: 'app-legal-procedure-form',
  templateUrl: './legal-procedure-form.component.html',
  styleUrls: ['./legal-procedure-form.component.css']
})
export class LegalProcedureFormComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  // Liste statique des types de procédure (aligne avec l'enum backend)
  readonly procedureTypes: ProcedureType[] = [
    'SARL',
    'SUARL',
    'LABEL_STARTUP',
    'PI',
    'FISCALITE',
    'CONFORMITE',
    'AUTRE',
  ];
   

  readonly procedureTypeLabels = PROCEDURE_TYPE_LABELS;

  // Liste statique des experts
  readonly experts: ExpertSummary[] = STATIC_EXPERTS;

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: LegalProcedureService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    // entrepreneurId est retiré du formulaire — injecté via X-User-Id côté backend
    this.form = this.fb.group({
      projectName:   ['', [Validators.required, Validators.maxLength(200)]],
      procedureType: ['', Validators.required],
      expertId:      ['', Validators.required],
      description:   ['', Validators.maxLength(5000)],
    });

    // Pré-sélection du type si venu via la home page
    const typeFromQuery = this.route.snapshot.queryParamMap.get('type');
    if (typeFromQuery) {
      this.form.patchValue({ procedureType: typeFromQuery });
    }
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
    this.loading = true;

    const raw = this.form.getRawValue();

    this.service.create(
      {
        projectName:   raw.projectName,
        procedureType: raw.procedureType,
        expertId:      raw.expertId,
        description:   raw.description || null,
      },
      CURRENT_USER_ID   // transmis comme X-User-Id
    ).subscribe({
      next: (created) => {
        this.successMessage = 'Dossier créé avec succès.';
        this.loading = false;
        // Redirige vers la checklist du dossier créé
        setTimeout(() => this.router.navigate(['/legal-procedures', created.id]), 800);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Erreur lors de la création.';
        this.loading = false;
      }
    });
  }
}
