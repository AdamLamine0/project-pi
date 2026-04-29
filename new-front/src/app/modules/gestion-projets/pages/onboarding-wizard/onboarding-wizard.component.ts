import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-wizard',
  standalone: false,
  templateUrl: './onboarding-wizard.component.html',
  styleUrls: ['./onboarding-wizard.component.css']
})
export class OnboardingWizardComponent {
  step = 2;
  loading = false;

  readonly sectors: string[] = [
    'AgriTech', 'AI', 'BioTech', 'ClimateTech', 'Cybersecurity', 'Data', 'DeepTech', 'E-commerce',
    'EdTech', 'Energy', 'FashionTech', 'FinTech', 'FoodTech', 'Gaming', 'GovTech', 'HealthTech',
    'HRTech', 'IoT', 'LegalTech', 'Logistics', 'MarTech', 'Media', 'Mobility', 'PropTech',
    'Retail', 'Robotics', 'SaaS', 'Smart City', 'SportTech', 'TravelTech'
  ];

  readonly stages = ['Idee', 'Prototype', 'MVP', 'Scale'];

  readonly skills: string[] = [
    'Product', 'Tech', 'Design', 'Sales', 'Marketing', 'Finance',
    'Legal', 'Data', 'Operations', 'Business Dev'
  ];

  readonly needs = ['Mentorat', 'Financement', 'Juridique', 'Tout'];

  form: FormGroup;
  selectedStage = 'Idee';
  selectedSkills: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      sector: ['', Validators.required],
      shortDescription: ['', [Validators.required, Validators.minLength(20)]],
      pitchDeckName: [''],
      teamSize: ['1', Validators.required],
      mainNeed: ['Mentorat', Validators.required],
      mentorshipHours: [4, [Validators.required, Validators.min(1), Validators.max(40)]],
      objective6Months: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  get missingSkills(): string[] {
    const recommendations: Record<string, string[]> = {
      AI: ['Data', 'Tech', 'Product'],
      FinTech: ['Finance', 'Legal', 'Tech'],
      HealthTech: ['Legal', 'Operations', 'Product'],
      SaaS: ['Sales', 'Marketing', 'Product'],
      default: ['Sales', 'Marketing', 'Finance'],
    };

    const sector = this.form.get('sector')?.value as string;
    const base = recommendations[sector] || recommendations['default'];
    return base.filter((item) => !this.selectedSkills.includes(item));
  }

  toggleSkill(skill: string): void {
    if (this.selectedSkills.includes(skill)) {
      this.selectedSkills = this.selectedSkills.filter((s) => s !== skill);
    } else {
      this.selectedSkills = [...this.selectedSkills, skill];
    }
  }

  setStage(stage: string): void {
    this.selectedStage = stage;
  }

  onPitchDeckSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.form.patchValue({ pitchDeckName: file ? file.name : '' });
  }

  next(): void {
    if (this.step === 2) {
      if (!this.form.get('projectName')?.valid || !this.form.get('sector')?.valid || !this.form.get('shortDescription')?.valid) {
        this.form.get('projectName')?.markAsTouched();
        this.form.get('sector')?.markAsTouched();
        this.form.get('shortDescription')?.markAsTouched();
        return;
      }
      this.step = 3;
      return;
    }

    if (this.step === 3) {
      if (!this.form.get('teamSize')?.valid) {
        this.form.get('teamSize')?.markAsTouched();
        return;
      }
      this.step = 4;
      return;
    }

    if (this.step === 4) {
      if (!this.form.get('mainNeed')?.valid || !this.form.get('objective6Months')?.valid) {
        this.form.get('mainNeed')?.markAsTouched();
        this.form.get('objective6Months')?.markAsTouched();
        return;
      }
      this.step = 5;
    }
  }

  previous(): void {
    this.step = Math.max(2, this.step - 1);
  }

  launchAiAnalysis(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }, 2400);
  }
}
