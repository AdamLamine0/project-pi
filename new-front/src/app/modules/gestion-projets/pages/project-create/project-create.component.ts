import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextDocument, Project } from '../../../../models/project';
import { GestionProjetsService } from '../../services/gestion-projets.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-project-create',
  standalone: false,
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {
  step = 1;
  loading = false;
  submitting = false;
  uploadedDocuments: ContextDocument[] = [];
  selectedSkills: string[] = [];
  errorMessage = '';

  readonly sectors: string[] = [
    'AgriTech', 'AI', 'BioTech', 'ClimateTech', 'Cybersecurity', 'Data', 'DeepTech', 'E-commerce',
    'EdTech', 'Energy', 'FashionTech', 'FinTech', 'FoodTech', 'Gaming', 'GovTech', 'HealthTech',
    'HRTech', 'IoT', 'LegalTech', 'Logistics', 'MarTech', 'Media', 'Mobility', 'PropTech',
    'Retail', 'Robotics', 'SaaS', 'Smart City', 'SportTech', 'TravelTech'
  ];

  readonly stages = ['Idee', 'Prototype', 'MVP', 'Scale'];
  readonly revenueModels = ['Abonnement', 'Commission', 'Freemium', 'Licensing', 'Marketplace', 'Publicite'];
  readonly skills: string[] = [
    'Product', 'Tech', 'Design', 'Sales', 'Marketing', 'Finance',
    'Legal', 'Data', 'Operations', 'Business Dev'
  ];
  readonly needs = ['Mentorat', 'Financement', 'Juridique', 'Tout'];

  form: FormGroup;
  selectedStage = 'Idee';

  readonly steps = [
    { num: 1, label: 'Projet' },
    { num: 2, label: 'Équipe' },
    { num: 3, label: 'Besoins' },
    { num: 4, label: 'Confirmation' },
  ];

  constructor(
    private fb: FormBuilder,
    private projectService: GestionProjetsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      sector: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      problemSolved: ['', [Validators.required, Validators.minLength(10)]],
      teamSize: ['1-3', Validators.required],
      revenueModel: ['', Validators.required],
      mainNeed: ['Mentorat', Validators.required],
      objective6Months: ['', [Validators.required, Validators.minLength(15)]],
      budget: [0, [Validators.required, Validators.min(0)]],
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
    const base = (recommendations[sector] || recommendations['default']) as string[];
    return base.filter((item) => !this.selectedSkills.includes(item));
  }

  get progressWidth(): number {
    return (this.step / 4) * 100;
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

  onDocsSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) return;
    const readers = Array.from(files).map((file) => this.readFileAsText(file));
    Promise.all(readers).then((docs) => {
      this.uploadedDocuments = [...this.uploadedDocuments, ...docs];
    });
    input.value = '';
  }

  removeDoc(index: number): void {
    this.uploadedDocuments.splice(index, 1);
  }

  next(): void {
    this.errorMessage = '';
    if (this.step === 1) {
      const f = this.form;
      if (f.get('title')?.invalid || f.get('sector')?.invalid || f.get('description')?.invalid || f.get('problemSolved')?.invalid) {
        f.get('title')?.markAsTouched();
        f.get('sector')?.markAsTouched();
        f.get('description')?.markAsTouched();
        f.get('problemSolved')?.markAsTouched();
        this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
        return;
      }
    }
    if (this.step === 3) {
      if (this.form.get('mainNeed')?.invalid || this.form.get('objective6Months')?.invalid) {
        this.form.get('mainNeed')?.markAsTouched();
        this.form.get('objective6Months')?.markAsTouched();
        this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
        return;
      }
    }
    this.step = Math.min(4, this.step + 1);
  }

  previous(): void {
    this.step = Math.max(1, this.step - 1);
  }

  launchProject(): void {
    if (this.submitting) return;
    this.submitting = true;
    this.errorMessage = '';

    const currentUserId = this.authService.getUserId() || 1;
    const now = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 6);

    const composedDescription = [
      `Secteur: ${this.form.value.sector}`,
      `Stade: ${this.selectedStage}`,
      `Description: ${this.form.value.description}`,
      `Probleme resolu: ${this.form.value.problemSolved}`,
      `Modele de revenu: ${this.form.value.revenueModel}`,
      `Competences: ${this.selectedSkills.join(', ')}`,
      `Besoin principal: ${this.form.value.mainNeed}`,
      `Objectif 6 mois: ${this.form.value.objective6Months}`,
    ].join('\n');

    const projectPayload: Project = {
      id: 0,
      title: this.form.value.title,
      sector: this.form.value.sector,
      stage: this.selectedStage,
      shortDescription: this.form.value.description,
      problemSolved: this.form.value.problemSolved,
      revenueModel: this.form.value.revenueModel,
      teamSize: this.form.value.teamSize,
      hasPitchDeck: this.uploadedDocuments.length > 0,
      hasBusinessPlan: true,
      description: composedDescription,
      status: 'BROUILLON',
      priority: 'NORMALE',
      startDate: now.toISOString(),
      endDate: end.toISOString(),
      budget: Number(this.form.value.budget) || 0,
      leaderId: Number(currentUserId),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      createdBy: Number(currentUserId),
      progress: 0,
    };

    this.projectService.createProject(projectPayload).subscribe({
      next: (created) => {
        // Fire-and-forget ML analysis
        this.projectService.analyzeProjectDescription(created.id).subscribe({ next: () => undefined, error: () => undefined });
        this.projectService.scoreProject(created.id).subscribe({ next: () => undefined, error: () => undefined });
        this.projectService.generateRoadmap(created.id).subscribe({ next: () => undefined, error: () => undefined });
        this.projectService.analyzePlagiarism(created.id, this.uploadedDocuments.map((d) => d.content)).subscribe({ next: () => undefined, error: () => undefined });
        this.submitting = false;
        this.router.navigate(['/app/projects', created.id]);
      },
      error: (err) => {
        console.error('Create project error:', err);
        this.errorMessage = 'Erreur lors de la création du projet. Vérifiez que le backend est démarré.';
        this.submitting = false;
      }
    });
  }

  private readFileAsText(file: File): Promise<ContextDocument> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          content: String(reader.result || '').slice(0, 6000),
          uploadedAt: new Date().toISOString(),
        });
      };
      reader.onerror = () => reject(new Error('read_error'));
      reader.readAsText(file);
    });
  }
}
