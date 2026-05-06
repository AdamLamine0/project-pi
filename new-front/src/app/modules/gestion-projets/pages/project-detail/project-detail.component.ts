import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneratedRoadmapStep, MaturityAssessment, MentoringRequest, MlRoadmapStep, MlScoreResult, Project, Task } from '../../../../models/project';
import { GestionProjetsService } from '../../services/gestion-projets.service';
import { catchError, forkJoin, of } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

type RoadmapPhase = 'discovery' | 'build' | 'validation' | 'launch';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project!: Project;
  tasks: Task[] = [];
  loading = false;
  activeTab = 'description';
  currentRole = 'USER';
  aiLoading = false;
  aiInsight = '';
  aiError = '';
  roadmapLoading = false;
  roadmapError = '';
  roadmapFeedback = '';
  uploadedDocuments: Array<{ name: string; content: string; uploadedAt: string }> = [];
  maturityLoading = false;
  maturityError = '';
  plagiarismLoading = false;
  plagiarismError = '';
  originalityScore = 96;
  plagiarismSources: Array<{ title: string; url: string; snippet: string; score: number }> = [];
  plagiarismAnalyzedAt = new Date().toISOString();
  maturity: MaturityAssessment = {
    score: 0,
    stage: 'IDEATION',
    strengths: [],
    gaps: [],
    recommendations: [],
  };
  private roadmapOrderMap: Record<number, number> = {};
  private draggedTaskId: number | null = null;
  private kanbanDraggedTaskId: number | null = null;
  kanbanChecklistDraft: Record<number, string> = {};
  kanbanChecklist: Record<number, Array<{ id: number; label: string; done: boolean }>> = {};
  readonly roadmapStatusOptions: Task['status'][] = ['A_FAIRE', 'EN_COURS', 'FAIT', 'BLOQUE'];
  mentoringRequests: MentoringRequest[] = [];
  myMentoringRequest: MentoringRequest | null = null;
  showMentoringPanel = false;
  persistedDocuments: any[] = [];
  docLoading = false;
  docError = '';

  constructor(
    private projectService: GestionProjetsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentRole = (this.authService.getRole() || 'USER').toUpperCase();
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.loadProject(id);
    });
  }

  loadProject(id: number): void {
    this.loading = true;
    this.projectService.getProject(id).subscribe({
      next: (data) => {
        const projectId = Number(data.id ?? id);

        forkJoin({
          tasks: this.projectService.getTasks(projectId).pipe(catchError(() => of([] as Task[]))),
          members: this.projectService.getTeamMembers(projectId).pipe(catchError(() => of([]))),
        }).subscribe({
          next: ({ tasks, members }) => {
            this.project = { ...data, teamMembers: members };
            this.tasks = tasks;
            this.loadUploadedDocumentsFromStorage();
            this.syncRoadmapOrder(tasks);
            this.loadChecklistFromStorage();
            this.syncProjectProgressIfNeeded();
            this.assessMaturity();
            this.analyzeProjectPlagiarism();
            this.loadMentoringData(projectId);
            this.loadProjectDocuments(projectId);
            this.loading = false;
          },
          error: () => {
            this.project = data;
            this.tasks = [];
            this.loading = false;
          },
        });
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.loading = false;
      }
    });
  }

  editProject(): void {
    this.router.navigate(['/app/projects', this.project.id, 'edit']);
  }

  deleteProject(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectService.deleteProject(this.project.id).subscribe({
        next: () => {
          this.router.navigate(['/app/projects']);
        },
        error: (error) => console.error('Error deleting project:', error)
      });
    }
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      'BROUILLON': 'secondary',
      'EN_COURS': 'info',
      'EN_ATTENTE': 'warning',
      'TERMINE': 'success',
      'ANNULE': 'danger'
    };
    return colors[status] || 'secondary';
  }

  getRemainingDays(): number {
    const today = new Date();
    const endDate = new Date(this.project.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getCompletedTasks(): number {
    return this.tasks.filter(t => t.status === 'FAIT').length;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'documents' && this.project?.id) {
      this.loadProjectDocuments(this.project.id);
    }
  }

  onRoadmapDragStart(taskId: number): void {
    this.draggedTaskId = taskId;
  }

  onRoadmapDragEnd(): void {
    this.draggedTaskId = null;
  }

  onRoadmapDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onRoadmapDropOnTask(targetTaskId: number, event: DragEvent): void {
    event.preventDefault();
    if (!this.draggedTaskId || this.draggedTaskId === targetTaskId) {
      return;
    }

    const orderedIds = this.roadmapTasks.map((t) => Number(t.id)).filter((id) => !Number.isNaN(id));
    const fromIndex = orderedIds.indexOf(this.draggedTaskId);
    const targetIndex = orderedIds.indexOf(targetTaskId);
    if (fromIndex < 0 || targetIndex < 0) {
      this.draggedTaskId = null;
      return;
    }

    const [moved] = orderedIds.splice(fromIndex, 1);
    orderedIds.splice(targetIndex, 0, moved);
    this.persistRoadmapOrderIds(orderedIds);
    this.draggedTaskId = null;
  }

  onRoadmapDropToPhase(phase: RoadmapPhase, event: DragEvent): void {
    event.preventDefault();
    if (!this.draggedTaskId || !this.project?.id) {
      return;
    }

    const task = this.tasks.find((t) => t.id === this.draggedTaskId);
    if (!task?.id) {
      this.draggedTaskId = null;
      return;
    }

    const updatedTitle = this.applyPhaseToTaskTitle(task.title, phase);
    const payload: Partial<Task> = {
      title: updatedTitle,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignedToId: task.assignedToId,
      dueDate: task.dueDate,
    };

    this.projectService.updateTask(this.project.id, task.id, payload).subscribe({
      next: () => {
        this.loadProject(this.project.id);
      },
      error: () => {
        this.roadmapError = 'Impossible de deplacer cette etape dans la phase choisie.';
      },
    });

    this.draggedTaskId = null;
  }

  onTaskStatusChange(event: { task: Task; status: Task['status'] }): void {
    if (!this.project?.id || !event.task.id) {
      return;
    }

    const payload: Partial<Task> = {
      title: event.task.title,
      description: event.task.description,
      status: event.status,
      priority: event.task.priority,
      assignedToId: event.task.assignedToId,
      dueDate: event.task.dueDate,
    };

    this.projectService.updateTask(this.project.id, event.task.id, payload).subscribe({
      next: () => {
        this.loadProject(this.project.id);
      },
      error: () => {
        this.roadmapError = 'Impossible de mettre a jour le statut de l etape roadmap.';
      },
    });
  }

  onDocumentsSelected(event: Event): void {
    if (!this.canUploadDocuments) {
      return;
    }

    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) {
      return;
    }

    const readers = Array.from(files).map((file) => this.readFileAsText(file));
    Promise.all(readers).then((docs) => {
      this.uploadedDocuments = [...this.uploadedDocuments, ...docs];
      this.saveUploadedDocumentsToStorage();
      this.generatePersonalizedRoadmap(true);
      this.assessMaturity();
    }).catch(() => {
      this.roadmapError = 'Certains documents n ont pas pu etre lus. Utilisez des fichiers texte, md, json ou csv.';
    });

    input.value = '';
  }

  loadProjectDocuments(projectId: number): void {
    this.docLoading = true;
    this.projectService.getProjectDocuments(projectId).subscribe({
      next: (docs) => {
        this.persistedDocuments = docs;
        this.docLoading = false;
      },
      error: () => {
        this.docError = 'Impossible de charger les documents du projet.';
        this.docLoading = false;
      }
    });
  }

  generateBmc(): void {
    if (!this.project?.id) return;
    this.docLoading = true;
    this.projectService.generateBmc(this.project.id).subscribe({
      next: () => this.loadProjectDocuments(this.project.id),
      error: () => {
        this.docError = 'Echec de la generation du BMC.';
        this.docLoading = false;
      }
    });
  }

  generateSwot(): void {
    if (!this.project?.id) return;
    const ctx = prompt('Contexte de marché (optionnel):', '');
    this.docLoading = true;
    this.projectService.generateSwot(this.project.id, ctx || '').subscribe({
      next: () => this.loadProjectDocuments(this.project.id),
      error: () => {
        this.docError = 'Echec de la generation du SWOT.';
        this.docLoading = false;
      }
    });
  }

  generatePitch(): void {
    if (!this.project?.id) return;
    const market = prompt('Marché cible (optionnel):', '');
    this.docLoading = true;
    this.projectService.generatePitch(this.project.id, market || '').subscribe({
      next: () => this.loadProjectDocuments(this.project.id),
      error: () => {
        this.docError = 'Echec de la generation du Pitch Deck.';
        this.docLoading = false;
      }
    });
  }

  deletePersistedDocument(docId: number): void {
    if (!confirm('Supprimer ce document ?')) return;
    this.projectService.deleteDocument(docId).subscribe({
      next: () => this.loadProjectDocuments(this.project.id),
      error: () => (this.docError = 'Echec de la suppression.')
    });
  }

  generatePersonalizedRoadmap(fromDocumentUpload = false, feedback = ''): void {
    if (!this.project?.id) {
      return;
    }

    this.roadmapLoading = true;
    this.roadmapError = '';

    this.projectService.generateRoadmap(this.project.id, feedback).subscribe({
      next: (res) => {
        const steps = this.mapMlRoadmapSteps(res?.steps || []);
        if (!steps.length) {
          this.roadmapLoading = false;
          this.roadmapError = 'Generation roadmap vide. Reessayez avec plus de contexte.';
          return;
        }

        this.persistGeneratedRoadmap(steps, fromDocumentUpload);
        this.roadmapFeedback = '';
      },
      error: () => {
        this.roadmapLoading = false;
        this.roadmapError = 'Echec de generation roadmap via le backend ML.';
      },
    });
  }

  regenerateRoadmapFromFeedback(): void {
    const feedback = (this.roadmapFeedback || '').trim();
    if (!feedback) {
      this.roadmapError = 'Ajoutez un commentaire pour regenerer une meilleure roadmap.';
      return;
    }
    this.generatePersonalizedRoadmap(false, feedback);
  }

  generateAiInsight(): void {
    if (!this.project) {
      return;
    }

    this.aiLoading = true;
    this.aiError = '';
    this.aiInsight = '';

    this.projectService.analyzeProjectDescription(this.project.id).subscribe({
      next: (res) => {
        this.aiLoading = false;
        const keywords = Array.isArray(res?.keywords) ? res.keywords.slice(0, 5).join(', ') : '';
        const summary = String(res?.summary || 'Aucun résumé disponible.');
        this.aiInsight = keywords ? `${summary}\n\nMots-cles: ${keywords}` : summary;
      },
      error: () => {
        this.aiLoading = false;
        this.aiError = 'Impossible de recuperer les insights via le backend ML.';
      },
    });
  }

  get completionRate(): number {
    if (!this.tasks.length) {
      return 0;
    }
    return Math.round((this.getCompletedTasks() / this.tasks.length) * 100);
  }

  get milestones(): Array<{ label: string; done: boolean }> {
    const completion = this.completionRate;
    return [
      { label: 'Milestone 1 - Cadrage (25%)', done: completion >= 25 },
      { label: 'Milestone 2 - Build (50%)', done: completion >= 50 },
      { label: 'Milestone 3 - Validation (75%)', done: completion >= 75 },
      { label: 'Milestone 4 - Livraison (100%)', done: completion >= 100 },
    ];
  }

  get displayAiScore(): number {
    if (!this.maturity?.score) {
      return 67;
    }
    return this.maturity.score;
  }

  get isAuthenticProject(): boolean {
    return this.originalityScore >= 75;
  }

  get authenticityBadgeLabel(): string {
    return this.isAuthenticProject ? 'Authentic Project' : 'Needs Review';
  }

  get aiScoreDimensions(): Array<{ label: string; value: number; recommendation: string }> {
    const descQuality = Math.min(100, Math.max(25, Math.round((this.project?.description?.length || 0) / 5)));
    const market = this.project?.budget && this.project.budget > 0 ? 60 : 42;
    const team = Math.min(100, 40 + ((this.project?.teamMembers?.length || 0) * 12));
    const technical = Math.min(100, 45 + (this.tasks.length * 6));
    const traction = Math.min(100, Math.round((this.project?.progress || 0) * 0.9));

    return [
      {
        label: 'Innovation',
        value: descQuality,
        recommendation: descQuality < 65
          ? 'Preciser davantage la proposition de valeur differenciante.'
          : 'Conserver l angle d innovation, puis ajouter preuves de desirabilite.',
      },
      {
        label: 'Marche',
        value: market,
        recommendation: market < 60
          ? 'Ajouter chiffres TAM/SAM/SOM et hypothese de pricing.'
          : 'Prioriser un segment client et valider la willingness-to-pay.',
      },
      {
        label: 'Team',
        value: team,
        recommendation: team < 60
          ? 'Combler les gaps de competences via cofounder ou advisors.'
          : 'Documenter la governance et la reponse operationnelle.',
      },
      {
        label: 'Technical',
        value: technical,
        recommendation: technical < 65
          ? 'Structurer la roadmap technique en milestones mesurables.'
          : 'Renforcer la qualite delivery avec QA et monitoring.',
      },
      {
        label: 'Traction',
        value: traction,
        recommendation: traction < 50
          ? 'Definir KPI traction hebdomadaires et experiments growth.'
          : 'Passer a un plan de scaling progressif sur 90 jours.',
      },
    ];
  }

  get radarLabels(): string[] {
    return this.aiScoreDimensions.map((d) => d.label);
  }

  get radarPoints(): string {
    const dims = this.aiScoreDimensions;
    if (!dims.length) {
      return '';
    }

    const cx = 150;
    const cy = 150;
    const maxRadius = 98;

    return dims.map((d, index) => {
      const angle = ((Math.PI * 2) / dims.length) * index - Math.PI / 2;
      const radius = (Math.max(0, Math.min(100, d.value)) / 100) * maxRadius;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      return `${x},${y}`;
    }).join(' ');
  }

  radarAxisPoint(index: number, radius = 110): { x: number; y: number } {
    const dims = this.aiScoreDimensions;
    const angle = ((Math.PI * 2) / dims.length) * index - Math.PI / 2;
    return {
      x: 150 + Math.cos(angle) * radius,
      y: 150 + Math.sin(angle) * radius,
    };
  }

  radarGridPoint(index: number, levelRadius: number): string {
    const point = this.radarAxisPoint(index, levelRadius);
    return `${point.x},${point.y}`;
  }

  get canEditProject(): boolean {
    return this.currentRole === 'USER' || this.currentRole === 'PORTEUR' || this.currentRole === 'ADMIN';
  }

  get canMentorProject(): boolean {
    return this.currentRole === 'MENTOR' || this.currentRole === 'ADMIN';
  }

  get canInvestorInterest(): boolean {
    return this.currentRole === 'INVESTOR' || this.currentRole === 'INVESTISSEUR' || this.currentRole === 'ADMIN';
  }

  get canUploadDocuments(): boolean {
    return this.currentRole === 'USER' || this.currentRole === 'PORTEUR' || this.currentRole === 'ADMIN';
  }

  get canViewMentorProgress(): boolean {
    return this.currentRole === 'MENTOR' || this.currentRole === 'ADMIN';
  }

  // ── Mentoring ──
  get pendingMentoringRequests(): MentoringRequest[] {
    return this.mentoringRequests.filter(r => r.status === 'PENDING');
  }

  get acceptedMentoringRequests(): MentoringRequest[] {
    return this.mentoringRequests.filter(r => r.status === 'ACCEPTED');
  }

  get isAcceptedMentor(): boolean {
    return this.myMentoringRequest?.status === 'ACCEPTED';
  }

  get hasSentMentoringRequest(): boolean {
    return !!this.myMentoringRequest;
  }

  loadMentoringData(projectId: number): void {
    this.mentoringRequests = this.projectService.getMentoringRequestsForProject(projectId);
    if (this.currentRole === 'MENTOR') {
      const mentorId = this.authService.getUserId();
      this.myMentoringRequest = this.projectService.getMentoringRequestByMentor(projectId, mentorId);
    }
  }

  sendMentoringInterest(): void {
    if (!this.project) return;
    const mentorId = this.authService.getUserId();
    const email = localStorage.getItem('email') || 'mentor@pi.com';
    const name = email.split('@')[0];
    this.myMentoringRequest = this.projectService.sendMentoringRequest(
      this.project.id, this.project.title, mentorId, email, name
    );
  }

  acceptMentoringRequest(requestId: string): void {
    this.projectService.respondToMentoringRequest(requestId, 'ACCEPTED');
    this.loadMentoringData(this.project.id);
  }

  declineMentoringRequest(requestId: string): void {
    this.projectService.respondToMentoringRequest(requestId, 'DECLINED');
    this.loadMentoringData(this.project.id);
  }

  openMentorDashboard(): void {
    this.router.navigate(['/app/projects', this.project.id, 'mentor-dashboard']);
  }

  get roadmapTasks(): Task[] {
    const withId = this.tasks.filter((task) => !!task.id);
    const withoutId = this.tasks.filter((task) => !task.id);

    const ordered = [...withId].sort((a, b) => {
      const aOrder = this.roadmapOrderMap[a.id as number] ?? Number.MAX_SAFE_INTEGER;
      const bOrder = this.roadmapOrderMap[b.id as number] ?? Number.MAX_SAFE_INTEGER;
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      return String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
    });

    return [...ordered, ...withoutId];
  }

  get roadmapColumns(): Array<{ id: RoadmapPhase; label: string; tasks: Task[]; completion: number }> {
    const phases: Array<{ id: RoadmapPhase; label: string }> = [
      { id: 'discovery', label: 'Discovery' },
      { id: 'build', label: 'Build' },
      { id: 'validation', label: 'Validation' },
      { id: 'launch', label: 'Launch' },
    ];

    return phases.map((phase) => {
      const phaseTasks = this.roadmapTasks.filter((task) => this.classifyTaskPhase(task) === phase.id);
      const done = phaseTasks.filter((t) => t.status === 'FAIT').length;
      const completion = phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0;
      return {
        id: phase.id,
        label: phase.label,
        tasks: phaseTasks,
        completion,
      };
    });
  }

  get kanbanColumns(): Array<{ status: Task['status']; label: string; tasks: Task[] }> {
    const columns: Array<{ status: Task['status']; label: string }> = [
      { status: 'A_FAIRE', label: 'A faire' },
      { status: 'EN_COURS', label: 'En cours' },
      { status: 'BLOQUE', label: 'Bloque' },
      { status: 'FAIT', label: 'Fait' },
    ];

    return columns.map((col) => ({
      ...col,
      tasks: this.tasks.filter((task) => task.status === col.status),
    }));
  }

  onKanbanDragStart(taskId: number): void {
    this.kanbanDraggedTaskId = taskId;
  }

  onKanbanDragEnd(): void {
    this.kanbanDraggedTaskId = null;
  }

  onKanbanDrop(status: Task['status'], event: DragEvent): void {
    event.preventDefault();
    if (!this.kanbanDraggedTaskId || !this.project?.id) {
      return;
    }

    const task = this.tasks.find((t) => t.id === this.kanbanDraggedTaskId);
    this.kanbanDraggedTaskId = null;
    if (!task || !task.id || task.status === status) {
      return;
    }

    this.onTaskStatusChange({ task, status });
  }

  getTaskChecklist(task: Task): Array<{ id: number; label: string; done: boolean }> {
    const taskId = Number(task.id || 0);
    if (!taskId) {
      return [];
    }
    return this.kanbanChecklist[taskId] || [];
  }

  getChecklistCompletion(task: Task): number {
    const items = this.getTaskChecklist(task);
    if (!items.length) {
      return 0;
    }
    const done = items.filter((item) => item.done).length;
    return Math.round((done / items.length) * 100);
  }

  addChecklistItem(task: Task): void {
    const taskId = Number(task.id || 0);
    if (!taskId) {
      return;
    }

    const label = (this.kanbanChecklistDraft[taskId] || '').trim();
    if (!label) {
      return;
    }

    const items = this.getTaskChecklist(task);
    const nextId = items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    this.kanbanChecklist[taskId] = [...items, { id: nextId, label, done: false }];
    this.kanbanChecklistDraft[taskId] = '';
    this.saveChecklistForTask(taskId);
  }

  toggleChecklistItem(task: Task, itemId: number): void {
    const taskId = Number(task.id || 0);
    if (!taskId) {
      return;
    }

    const items = this.getTaskChecklist(task).map((item) =>
      item.id === itemId ? { ...item, done: !item.done } : item
    );

    this.kanbanChecklist[taskId] = items;
    this.saveChecklistForTask(taskId);
  }

  removeChecklistItem(task: Task, itemId: number): void {
    const taskId = Number(task.id || 0);
    if (!taskId) {
      return;
    }

    this.kanbanChecklist[taskId] = this.getTaskChecklist(task).filter((item) => item.id !== itemId);
    this.saveChecklistForTask(taskId);
  }

  getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
      BASSE: 'info',
      NORMALE: 'secondary',
      HAUTE: 'warning',
      CRITIQUE: 'danger',
    };
    return colors[(priority || '').toUpperCase()] || 'secondary';
  }

  goBack(): void {
    this.router.navigate(['/app/projects']);
  }

  assessMaturity(): void {
    if (!this.project) {
      return;
    }

    this.maturityLoading = true;
    this.maturityError = '';

    this.projectService.scoreProject(this.project.id).subscribe({
      next: (res) => {
        this.maturityLoading = false;
        this.maturity = this.mapScoreToMaturity(res) || this.heuristicMaturityAssessment();
      },
      error: () => {
        this.maturityLoading = false;
        this.maturityError = 'Score maturite indisponible, fallback heuristique utilise.';
        this.maturity = this.heuristicMaturityAssessment();
      },
    });
  }

  getMaturityBadgeColor(stage: MaturityAssessment['stage']): string {
    const map: Record<MaturityAssessment['stage'], string> = {
      IDEATION: 'secondary',
      PLANIFIE: 'info',
      EXECUTION: 'warning',
      READY_TO_LAUNCH: 'success',
    };
    return map[stage] || 'secondary';
  }

  private readFileAsText(file: File): Promise<{ name: string; content: string; uploadedAt: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          content: String(reader.result || ''),
          uploadedAt: new Date().toISOString(),
        });
      };
      reader.onerror = () => reject(new Error('read_error'));
      reader.readAsText(file);
    });
  }

  private parseRoadmapSteps(raw: string): GeneratedRoadmapStep[] {
    try {
      const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map((step) => ({
          title: String(step?.title || '').trim(),
          description: String(step?.description || '').trim(),
          priority: this.normalizePriority(String(step?.priority || 'NORMALE')),
          dueInDays: Number(step?.dueInDays || 7),
          milestone: String(step?.milestone || 'Execution roadmap').trim(),
        }))
        .filter((step) => !!step.title && !!step.description)
        .slice(0, 8);
    } catch {
      return [];
    }
  }

  private persistGeneratedRoadmap(steps: GeneratedRoadmapStep[], fromDocumentUpload: boolean): void {
    if (!this.project?.id) {
      this.roadmapLoading = false;
      return;
    }

    const createSteps = () => {
      const now = new Date();
      const requests = steps.map((step) => {
        const dueDate = new Date(now);
        dueDate.setDate(now.getDate() + Math.max(1, Math.min(120, step.dueInDays)));

        const payload: Partial<Task> = {
          title: `${step.milestone}: ${step.title}`,
          description: step.description,
          status: 'A_FAIRE',
          priority: step.priority,
          dueDate: dueDate.toISOString(),
        };

        return this.projectService.createTask(this.project.id!, payload).pipe(catchError(() => of(null)));
      });

      forkJoin(requests).subscribe({
        next: () => {
          this.roadmapLoading = false;
          this.loadProject(this.project.id!);
          this.activeTab = 'roadmap';
          if (fromDocumentUpload) {
            this.aiInsight = 'Roadmap auto mise a jour suite a l upload des documents.';
          }
        },
        error: () => {
          this.roadmapLoading = false;
          this.roadmapError = 'Impossible d enregistrer certaines etapes roadmap.';
        },
      });
    };

    if (fromDocumentUpload && this.tasks.length > 0) {
      const deleteRequests = this.tasks
        .filter((task) => !!task.id)
        .map((task) => this.projectService.deleteTask(this.project.id!, task.id!).pipe(catchError(() => of(null))));

      forkJoin(deleteRequests).subscribe({
        next: () => createSteps(),
        error: () => createSteps(),
      });
      return;
    }

    createSteps();
  }

  private normalizePriority(value: string): 'BASSE' | 'NORMALE' | 'HAUTE' | 'CRITIQUE' {
    const normalized = (value || '').toUpperCase();
    if (normalized === 'BASSE' || normalized === 'NORMALE' || normalized === 'HAUTE' || normalized === 'CRITIQUE') {
      return normalized;
    }
    return 'NORMALE';
  }

  private classifyTaskPhase(task: Task): RoadmapPhase {
    const title = (task.title || '').toLowerCase();
    const description = (task.description || '').toLowerCase();
    const text = `${title} ${description}`;

    if (text.includes('discover') || text.includes('cadrage') || text.includes('research') || text.includes('analyse')) {
      return 'discovery';
    }
    if (text.includes('build') || text.includes('develop') || text.includes('implementation') || text.includes('integration')) {
      return 'build';
    }
    if (text.includes('valid') || text.includes('test') || text.includes('qa') || text.includes('review')) {
      return 'validation';
    }
    if (text.includes('launch') || text.includes('go live') || text.includes('release') || text.includes('deploy')) {
      return 'launch';
    }

    const index = this.roadmapTasks.findIndex((t) => t.id === task.id);
    if (index < 0) {
      return 'build';
    }
    const ratio = this.roadmapTasks.length ? index / this.roadmapTasks.length : 0;
    if (ratio < 0.25) {
      return 'discovery';
    }
    if (ratio < 0.6) {
      return 'build';
    }
    if (ratio < 0.85) {
      return 'validation';
    }
    return 'launch';
  }

  private applyPhaseToTaskTitle(currentTitle: string, phase: RoadmapPhase): string {
    const phaseLabel: Record<RoadmapPhase, string> = {
      discovery: 'Discovery',
      build: 'Build',
      validation: 'Validation',
      launch: 'Launch',
    };

    const parts = (currentTitle || '').split(':');
    if (parts.length > 1) {
      return `${phaseLabel[phase]}: ${parts.slice(1).join(':').trim()}`;
    }
    return `${phaseLabel[phase]}: ${currentTitle}`;
  }

  private syncRoadmapOrder(tasks: Task[]): void {
    const persisted = this.readRoadmapOrderMap();
    this.roadmapOrderMap = { ...persisted };

    let maxOrder = Object.values(this.roadmapOrderMap).reduce((max, val) => Math.max(max, val), -1);
    tasks.forEach((task) => {
      const id = task.id;
      if (!id) {
        return;
      }
      if (this.roadmapOrderMap[id] == null) {
        maxOrder += 1;
        this.roadmapOrderMap[id] = maxOrder;
      }
    });

    this.saveRoadmapOrderMap();
  }

  private persistRoadmapOrderIds(ids: number[]): void {
    ids.forEach((id, index) => {
      this.roadmapOrderMap[id] = index;
    });
    this.saveRoadmapOrderMap();
  }

  private readRoadmapOrderMap(): Record<number, number> {
    if (!this.project?.id) {
      return {};
    }
    try {
      const raw = localStorage.getItem(`roadmap_order_${this.project.id}`);
      if (!raw) {
        return {};
      }
      const parsed = JSON.parse(raw) as Record<string, number>;
      const result: Record<number, number> = {};
      Object.entries(parsed).forEach(([k, v]) => {
        const id = Number(k);
        if (!Number.isNaN(id) && typeof v === 'number') {
          result[id] = v;
        }
      });
      return result;
    } catch {
      return {};
    }
  }

  private saveRoadmapOrderMap(): void {
    if (!this.project?.id) {
      return;
    }
    localStorage.setItem(`roadmap_order_${this.project.id}`, JSON.stringify(this.roadmapOrderMap));
  }

  private loadChecklistFromStorage(): void {
    this.kanbanChecklist = {};
    if (!this.project?.id) {
      return;
    }

    this.tasks.forEach((task) => {
      const taskId = Number(task.id || 0);
      if (!taskId) {
        return;
      }

      try {
        const raw = localStorage.getItem(this.getChecklistStorageKey(taskId));
        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw) as Array<{ id: number; label: string; done: boolean }>;
        if (Array.isArray(parsed)) {
          this.kanbanChecklist[taskId] = parsed
            .filter((item) => typeof item?.id === 'number' && typeof item?.label === 'string')
            .map((item) => ({ id: item.id, label: item.label, done: !!item.done }));
        }
      } catch {
        this.kanbanChecklist[taskId] = [];
      }
    });
  }

  private loadUploadedDocumentsFromStorage(): void {
    if (!this.project?.id) {
      return;
    }
    try {
      const raw = localStorage.getItem(this.getDocumentsStorageKey());
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as Array<{ name: string; content: string; uploadedAt: string }>;
      if (Array.isArray(parsed)) {
        this.uploadedDocuments = parsed
          .filter((d) => typeof d?.name === 'string' && typeof d?.content === 'string')
          .map((d) => ({ name: d.name, content: d.content, uploadedAt: d.uploadedAt || new Date().toISOString() }));
      }
    } catch {
      this.uploadedDocuments = [];
    }
  }

  private saveUploadedDocumentsToStorage(): void {
    if (!this.project?.id) {
      return;
    }
    localStorage.setItem(this.getDocumentsStorageKey(), JSON.stringify(this.uploadedDocuments));
  }

  private getDocumentsStorageKey(): string {
    return `project_docs_${this.project?.id || 0}`;
  }

  private saveChecklistForTask(taskId: number): void {
    if (!this.project?.id || !taskId) {
      return;
    }
    localStorage.setItem(this.getChecklistStorageKey(taskId), JSON.stringify(this.kanbanChecklist[taskId] || []));
  }

  private getChecklistStorageKey(taskId: number): string {
    return `kanban_checklist_${this.project?.id || 0}_${taskId}`;
  }

  private parseMaturity(raw: string): MaturityAssessment | null {
    try {
      const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
      const parsed = JSON.parse(cleaned);
      const stage = this.normalizeStage(String(parsed?.stage || 'IDEATION'));
      return {
        score: Math.max(0, Math.min(100, Number(parsed?.score || 0))),
        stage,
        strengths: Array.isArray(parsed?.strengths) ? parsed.strengths.map((s: string) => String(s)).slice(0, 4) : [],
        gaps: Array.isArray(parsed?.gaps) ? parsed.gaps.map((s: string) => String(s)).slice(0, 4) : [],
        recommendations: Array.isArray(parsed?.recommendations) ? parsed.recommendations.map((s: string) => String(s)).slice(0, 4) : [],
      };
    } catch {
      return null;
    }
  }

  private mapMlRoadmapSteps(steps: MlRoadmapStep[]): GeneratedRoadmapStep[] {
    return steps.map((step) => ({
      title: step.title,
      description: step.description,
      priority: this.normalizePriority(step.confidence >= 0.8 ? 'HAUTE' : step.confidence >= 0.6 ? 'NORMALE' : 'BASSE'),
      dueInDays: Math.max(7, Math.round(step.durationWeeks * 7)),
      milestone: step.phase.toUpperCase(),
    }));
  }

  private mapScoreToMaturity(result: MlScoreResult): MaturityAssessment {
    const score = Math.max(0, Math.min(100, Math.round((result?.score || 0) * 100)));
    const stage: MaturityAssessment['stage'] = score >= 75 ? 'READY_TO_LAUNCH' : score >= 55 ? 'EXECUTION' : score >= 30 ? 'PLANIFIE' : 'IDEATION';
    return {
      score,
      stage,
      strengths: score >= 60 ? ['Structure produit', 'Cohérence sectorielle'] : ['Base conceptuelle'],
      gaps: score < 60 ? ['Préciser la proposition de valeur', 'Renforcer les preuves d exécution'] : ['Documenter les métriques de traction'],
      recommendations: [result?.explanation || 'Compléter les données de projet pour améliorer le score.'],
    };
  }

  analyzeProjectPlagiarism(): void {
    if (!this.project?.title || !this.project?.description) {
      return;
    }

    this.plagiarismLoading = true;
    this.plagiarismError = '';

    this.projectService.analyzePlagiarism(
      this.project.id,
      this.uploadedDocuments.map((doc) => doc.content),
      []
    ).subscribe({
      next: (result) => {
        this.plagiarismLoading = false;
        this.originalityScore = Math.max(0, Math.min(100, 100 - Math.round(Number(result.score || 0) * 100)));
        this.plagiarismSources = result.sources || [];
        this.plagiarismAnalyzedAt = new Date().toISOString();
      },
      error: () => {
        this.plagiarismLoading = false;
        this.plagiarismError = 'Analyse plagiat indisponible pour le moment.';
      }
    });
  }

  private normalizeStage(value: string): MaturityAssessment['stage'] {
    const upper = value.toUpperCase();
    if (upper === 'IDEATION' || upper === 'PLANIFIE' || upper === 'EXECUTION' || upper === 'READY_TO_LAUNCH') {
      return upper;
    }
    return 'IDEATION';
  }

  private heuristicMaturityAssessment(): MaturityAssessment {
    const descScore = Math.min(35, Math.round((this.project?.description?.length || 0) / 12));
    const budgetScore = (this.project?.budget || 0) > 0 ? 20 : 5;
    const docsScore = Math.min(25, this.uploadedDocuments.length * 8);
    const taskScore = Math.min(20, this.tasks.length * 3);
    const score = Math.max(0, Math.min(100, descScore + budgetScore + docsScore + taskScore));

    let stage: MaturityAssessment['stage'] = 'IDEATION';
    if (score >= 70) {
      stage = 'READY_TO_LAUNCH';
    } else if (score >= 50) {
      stage = 'EXECUTION';
    } else if (score >= 30) {
      stage = 'PLANIFIE';
    }

    const strengths: string[] = [];
    const gaps: string[] = [];
    const recommendations: string[] = [];

    if ((this.project?.description?.length || 0) > 180) {
      strengths.push('Description projet detaillee.');
    } else {
      gaps.push('Description projet a approfondir.');
      recommendations.push('Ajouter contraintes, objectifs SMART et livrables.');
    }

    if ((this.project?.budget || 0) > 0) {
      strengths.push('Budget defini pour pilotage financier.');
    } else {
      gaps.push('Budget non defini.');
      recommendations.push('Definir une enveloppe budgetaire de reference.');
    }

    if (this.uploadedDocuments.length > 0) {
      strengths.push('Documents de contexte disponibles.');
    } else {
      gaps.push('Aucun document de contexte upload.');
      recommendations.push('Uploader specs, maquettes et planning pour fiabiliser la roadmap.');
    }

    if (this.tasks.length < 3) {
      recommendations.push('Generer une roadmap avec au moins 5 etapes actionnables.');
    }

    return { score, stage, strengths, gaps, recommendations };
  }

  private syncProjectProgressIfNeeded(): void {
    if (!this.project?.id) {
      return;
    }

    const targetProgress = this.completionRate;
    const current = Math.round(this.project.progress || 0);
    if (targetProgress === current) {
      return;
    }

    const payload: Partial<Project> = {
      ...this.project,
      progress: targetProgress,
    };

    this.projectService.updateProject(this.project.id, payload as Project).subscribe({
      next: (updated) => {
        this.project = { ...updated, teamMembers: this.project.teamMembers };
      },
      error: () => {
        // Keep local computed progress even if persistence fails.
        this.project = { ...this.project, progress: targetProgress };
      },
    });
  }
}
