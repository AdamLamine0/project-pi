import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalProcedureService } from '../../../../services/legal-procedure.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ProcedureType, PROCEDURE_TYPE_LABELS, ExpertSummary } from '../../../../models/legal-procedure.model';

@Component({
  selector: 'app-legal-procedure-form',
  templateUrl: './legal-procedure-form.component.html',
  standalone: false,
  styleUrls: ['./legal-procedure-form.component.css']
})
export class LegalProcedureFormComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  experts: ExpertSummary[] = [];

  readonly procedureTypes: ProcedureType[] = [
    'SARL', 'SUARL', 'LABEL_STARTUP', 'PI', 'FISCALITE', 'CONFORMITE'
  ];
  readonly procedureTypeLabels = PROCEDURE_TYPE_LABELS;

  private readonly userId: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: LegalProcedureService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
    private readonly auth: AuthService,
  ) {
    this.userId = this.auth.getUserId();
  }

  ngOnInit(): void {
    // Description removed from the form
    this.form = this.fb.group({
      projectName:   ['', [Validators.required, Validators.maxLength(200)]],
      procedureType: ['', Validators.required],
      expertId:      [null, Validators.required],
    });

    const typeFromQuery = this.route.snapshot.queryParamMap.get('type');
    if (typeFromQuery && this.procedureTypes.includes(typeFromQuery as ProcedureType)) {
      this.form.patchValue({ procedureType: typeFromQuery });
    }

    this.service.getExperts().subscribe({
      next: (data) => this.experts = data,
      error: () => this.errorMessage = 'Unable to load the expert list.'
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
    this.loading = true;

    const raw = this.form.getRawValue();

    this.service.create(
      {
        projectName:   raw.projectName,
        procedureType: raw.procedureType,
        expertId:      Number(raw.expertId),
      },
      this.userId
    ).subscribe({
      next: (created) => {
        this.successMessage = 'Case created successfully.';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/app/legal', created.id]), 800);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'An error occurred while creating the case.';
        this.loading = false;
      }
    });
  }
}


