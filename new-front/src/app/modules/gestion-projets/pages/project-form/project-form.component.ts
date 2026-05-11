import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextDocument, Project, ProjectStatus, ProjectPriority, WebPlagiarismSource } from '../../../../models/project';
import { GestionProjetsService } from '../../services/gestion-projets.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-project-form',
  standalone: false,
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  loading = false;
  submitting = false;
  isEditMode = false;
  projectId!: number;
  private existingLeaderId: number | null = null;

  wizardStep = 1;
  readonly totalSteps = 4;

  contextDocuments: ContextDocument[] = [];
  contextError = '';
  webPlagiarismScore: number | null = null;
  webPlagiarismSources: WebPlagiarismSource[] = [];
  plagiarismScore: number | null = null;
  plagiarismMessage = '';

  readonly projectTypes = [
    'WEB_APP',
    'MOBILE_APP',
    'AI_ML',
    'IOT',
    'FINTECH',
    'E_COMMERCE',
    'SAAS',
    'OTHER',
  ];

  private readonly requiredDocsByType: Record<string, string[]> = {
    WEB_APP: ['Cahier des charges', 'Maquettes UI', 'Personas utilisateurs'],
    MOBILE_APP: ['User journeys mobile', 'Wireframes mobile', 'Specs API'],
    AI_ML: ['Dataset description', 'Model objectives', 'Metrics cibles'],
    IOT: ['Architecture hardware', 'Schema capteurs', 'Contraintes reseau'],
    FINTECH: ['Compliance/KYC notes', 'Risk model', 'Flux transactionnels'],
    E_COMMERCE: ['Catalogue produit', 'Tunnel de commande', 'Politique logistique'],
    SAAS: ['Pricing strategy', 'Roadmap produit', 'SLA et support'],
    OTHER: ['Contexte metier', 'Exigences fonctionnelles', 'Contraintes techniques'],
  };

  statusOptions: ProjectStatus[] = ['BROUILLON', 'EN_COURS', 'EN_ATTENTE', 'TERMINE', 'ANNULE'];
  priorityOptions: ProjectPriority[] = ['BASSE', 'NORMALE', 'HAUTE', 'CRITIQUE'];

  constructor(
    private fb: FormBuilder,
    private projectService: GestionProjetsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      projectType: ['WEB_APP', Validators.required],
      status: ['BROUILLON', Validators.required],
      priority: ['NORMALE', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', Validators.min(0)]
    });
  }

  checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.projectId = params['id'];
        this.loadProject(this.projectId);
      }
    });
  }

  loadProject(id: number): void {
    this.loading = true;
    this.projectService.getProject(id).subscribe({
      next: (project) => {
        this.existingLeaderId = Number(project.leaderId);
        const normalizedStartDate = this.normalizeDateForInput(project.startDate);
        const normalizedEndDate = this.normalizeDateForInput(project.endDate);
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          projectType: 'WEB_APP',
          status: project.status,
          priority: project.priority,
          startDate: normalizedStartDate,
          endDate: normalizedEndDate,
          budget: project.budget
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid || !this.hasMinimumContextDocuments) {
      Object.keys(this.projectForm.controls).forEach(key => {
        this.projectForm.get(key)?.markAsTouched();
      });
      this.contextError = this.hasMinimumContextDocuments
        ? ''
        : 'Ajoutez au moins un document de contexte pour personnaliser la roadmap.';
      return;
    }

    const startDate = this.projectForm.get('startDate')?.value;
    const endDate = this.projectForm.get('endDate')?.value;
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      this.projectForm.get('endDate')?.setErrors({ invalidRange: true });
      this.projectForm.get('endDate')?.markAsTouched();
      return;
    }

    this.submitting = true;
    const currentUserId = this.authService.getUserId() || 1;
    const startDateTime = this.toApiDateTime(this.projectForm.value.startDate, false);
    const endDateTime = this.toApiDateTime(this.projectForm.value.endDate, true);
    const projectType = this.projectForm.value.projectType;

    const projectData: Project = {
      id: this.isEditMode ? this.projectId : 0,
      ...this.projectForm.value,
      startDate: startDateTime,
      endDate: endDateTime,
      leaderId: this.isEditMode
        ? Number(this.existingLeaderId ?? currentUserId)
        : Number(currentUserId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: Number(currentUserId)
    };
    delete (projectData as unknown as { projectType?: string }).projectType;

    if (this.isEditMode) {
      this.saveProject(projectData);
      return;
    }

    this.projectService.getProjects().subscribe({
      next: (existingProjects) => {
        const detector = this.detectPlagiarism(projectData.title, projectData.description, existingProjects);
        this.plagiarismScore = detector.score;
        this.plagiarismMessage = `${detector.message} Analyse ML Spring déclenchée après sauvegarde.`;
        this.saveProject(projectData, (savedProject) => {
          this.projectService.analyzeProjectDescription(savedProject.id).subscribe({ next: () => undefined, error: () => undefined });
          this.projectService.scoreProject(savedProject.id).subscribe({ next: () => undefined, error: () => undefined });
          this.projectService.generateRoadmap(savedProject.id).subscribe({ next: () => undefined, error: () => undefined });
          this.projectService.analyzePlagiarism(savedProject.id, this.contextDocuments.map((doc) => doc.content)).subscribe({
            next: (result) => {
              this.webPlagiarismScore = result.score;
              this.webPlagiarismSources = result.sources || [];
            },
            error: () => undefined,
          });
        });
      },
      error: () => {
        this.plagiarismMessage = 'Detection de plagiat indisponible pour le moment. Enregistrement poursuivi.';
        this.saveProject(projectData);
      },
    });
  }

  onCancel(): void {
    if (this.isEditMode) {
      this.router.navigate(['/app/projects', this.projectId]);
    } else {
      this.router.navigate(['/app/projects']);
    }
  }

  get title() {
    return this.projectForm.get('title');
  }

  get description() {
    return this.projectForm.get('description');
  }

  get status() {
    return this.projectForm.get('status');
  }

  get projectType() {
    return this.projectForm.get('projectType');
  }

  get priority() {
    return this.projectForm.get('priority');
  }

  get startDate() {
    return this.projectForm.get('startDate');
  }

  get endDate() {
    return this.projectForm.get('endDate');
  }

  get budget() {
    return this.projectForm.get('budget');
  }

  get stepOneComplete(): boolean {
    return !!this.title?.valid && !!this.description?.valid;
  }

  get stepTwoComplete(): boolean {
    return !!this.status?.valid && !!this.priority?.valid && !!this.startDate?.valid && !!this.endDate?.valid;
  }

  get stepThreeComplete(): boolean {
    return this.stepOneComplete && this.stepTwoComplete;
  }

  get hasMinimumContextDocuments(): boolean {
    return this.contextDocuments.length > 0;
  }

  get requiredDocumentsForType(): string[] {
    const type = this.projectForm.get('projectType')?.value || 'OTHER';
    return this.requiredDocsByType[type] || this.requiredDocsByType['OTHER'];
  }

  goToStep(step: number): void {
    if (step < 1 || step > this.totalSteps) {
      return;
    }
    if (step > this.wizardStep + 1) {
      return;
    }
    this.wizardStep = step;
  }

  nextStep(): void {
    if (this.wizardStep === 1 && !this.stepOneComplete) {
      this.title?.markAsTouched();
      this.description?.markAsTouched();
      return;
    }

    if (this.wizardStep === 2 && !this.stepTwoComplete) {
      this.status?.markAsTouched();
      this.priority?.markAsTouched();
      this.startDate?.markAsTouched();
      this.endDate?.markAsTouched();
      return;
    }

    if (this.wizardStep === 3 && !this.hasMinimumContextDocuments) {
      this.contextError = 'Ajoutez au moins un document pour continuer.';
      return;
    }

    this.contextError = '';
    this.wizardStep = Math.min(this.totalSteps, this.wizardStep + 1);
  }

  previousStep(): void {
    this.wizardStep = Math.max(1, this.wizardStep - 1);
  }

  onContextDocsSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) {
      return;
    }

    const readers = Array.from(files).map((file) => this.readFileAsText(file));
    Promise.all(readers).then((docs) => {
      this.contextDocuments = [...this.contextDocuments, ...docs];
      this.contextError = '';
    }).catch(() => {
      this.contextError = 'Impossible de lire un ou plusieurs documents.';
    });

    input.value = '';
  }

  removeContextDocument(index: number): void {
    this.contextDocuments.splice(index, 1);
    if (this.contextDocuments.length === 0) {
      this.contextError = 'Ajoutez au moins un document de contexte.';
    }
  }

  private saveProject(projectData: Project, afterSave?: (project: Project) => void): void {
    const operation = this.isEditMode
      ? this.projectService.updateProject(this.projectId, projectData)
      : this.projectService.createProject(projectData);

    operation.subscribe({
      next: (result) => {
        this.submitting = false;
        if (afterSave) {
          afterSave(result);
        }
        this.router.navigate(['/app/projects', result.id]);
      },
      error: (error) => {
        console.error('Error saving project:', error);
        this.submitting = false;
      }
    });
  }

  private detectPlagiarism(title: string, description: string, projects: Project[]): { score: number; message: string } {
    const source = this.normalizeText(`${title} ${description}`);
    if (!source) {
      return { score: 0, message: 'Detection de plagiat: contenu insuffisant.' };
    }

    const sourceTokens = new Set(source.split(' ').filter((w) => w.length > 2));
    let maxScore = 0;

    for (const project of projects) {
      const target = this.normalizeText(`${project.title || ''} ${project.description || ''}`);
      if (!target) {
        continue;
      }

      const targetTokens = new Set(target.split(' ').filter((w) => w.length > 2));
      const intersection = [...sourceTokens].filter((w) => targetTokens.has(w)).length;
      const union = new Set([...sourceTokens, ...targetTokens]).size;
      const score = union ? Math.round((intersection / union) * 100) : 0;
      maxScore = Math.max(maxScore, score);
    }

    if (maxScore >= 40) {
      return { score: maxScore, message: `Alerte plagiat: similarite elevee detectee (${maxScore}%). Verification manuelle recommandee.` };
    }

    return { score: maxScore, message: `Detection de plagiat terminee: similarite maximale ${maxScore}%.` };
  }

  private readFileAsText(file: File): Promise<ContextDocument> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          content: String(reader.result || '').slice(0, 8000),
          uploadedAt: new Date().toISOString(),
          kind: this.matchDocumentKind(file.name),
        });
      };
      reader.onerror = () => reject(new Error('read_error'));
      reader.readAsText(file);
    });
  }

  private matchDocumentKind(fileName: string): string {
    const lower = (fileName || '').toLowerCase();
    const required = this.requiredDocumentsForType;
    const found = required.find((doc) => {
      const words = doc.toLowerCase().split(' ');
      return words.some((word) => lower.includes(word));
    });

    return found || 'Contexte libre';
  }

  private normalizeText(value: string): string {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private normalizeDateForInput(value?: string): string {
    if (!value) {
      return '';
    }
    return value.includes('T') ? value.split('T')[0] : value;
  }

  private toApiDateTime(value: string, endOfDay: boolean): string {
    if (!value) {
      return '';
    }
    return endOfDay ? `${value}T23:59:59` : `${value}T00:00:00`;
  }
}
