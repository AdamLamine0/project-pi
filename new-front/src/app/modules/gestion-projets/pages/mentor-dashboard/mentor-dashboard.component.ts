import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { MentoringRequest, Project, Task } from '../../../../models/project';
import { AuthService } from '../../../../core/services/auth.service';
import { GestionProjetsService } from '../../services/gestion-projets.service';

@Component({
  selector: 'app-mentor-dashboard',
  standalone: false,
  templateUrl: './mentor-dashboard.component.html',
  styleUrls: ['./mentor-dashboard.component.css']
})
export class MentorDashboardComponent implements OnInit {
  project!: Project;
  tasks: Task[] = [];
  loading = true;
  myRequest: MentoringRequest | null = null;
  uploadedDocuments: Array<{ name: string; uploadedAt: string }> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: GestionProjetsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    const mentorId = this.authService.getUserId();
    this.myRequest = this.projectService.getMentoringRequestByMentor(projectId, mentorId);

    // Redirect if not accepted
    if (!this.myRequest || this.myRequest.status !== 'ACCEPTED') {
      this.router.navigate(['/app/projects', projectId]);
      return;
    }

    forkJoin({
      project: this.projectService.getProject(projectId),
      tasks: this.projectService.getTasks(projectId).pipe(catchError(() => of([] as Task[]))),
    }).subscribe({
      next: ({ project, tasks }) => {
        this.project = project;
        this.tasks = tasks;
        this.loadDocuments(projectId);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  private loadDocuments(projectId: number): void {
    try {
      const raw = localStorage.getItem(`project_docs_${projectId}`);
      this.uploadedDocuments = raw ? JSON.parse(raw) : [];
    } catch { this.uploadedDocuments = []; }
  }

  get doneCount(): number { return this.tasks.filter(t => t.status === 'FAIT').length; }
  get inProgressCount(): number { return this.tasks.filter(t => t.status === 'EN_COURS').length; }
  get blockedCount(): number { return this.tasks.filter(t => t.status === 'BLOQUE').length; }

  get completionRate(): number {
    if (!this.tasks.length) return 0;
    return Math.round((this.tasks.filter(t => t.status === 'FAIT').length / this.tasks.length) * 100);
  }

  get tasksByPhase(): Record<string, Task[]> {
    const phases: Record<string, Task[]> = { Discovery: [], Build: [], Validation: [], Launch: [] };
    this.tasks.forEach(t => {
      const text = `${t.title} ${t.description}`.toLowerCase();
      if (text.includes('discover') || text.includes('cadrage') || text.includes('research')) phases['Discovery'].push(t);
      else if (text.includes('build') || text.includes('develop') || text.includes('implement')) phases['Build'].push(t);
      else if (text.includes('valid') || text.includes('test') || text.includes('qa')) phases['Validation'].push(t);
      else if (text.includes('launch') || text.includes('deploy') || text.includes('release')) phases['Launch'].push(t);
      else phases['Build'].push(t);
    });
    return phases;
  }

  getPhaseCompletion(phaseTasks: Task[]): number {
    if (!phaseTasks.length) return 0;
    return Math.round((phaseTasks.filter(t => t.status === 'FAIT').length / phaseTasks.length) * 100);
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = { FAIT: '#10b981', EN_COURS: '#6366f1', BLOQUE: '#ef4444', A_FAIRE: '#52525b' };
    return map[status] || '#52525b';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = { FAIT: 'Fait', EN_COURS: 'En cours', BLOQUE: 'Bloqué', A_FAIRE: 'À faire' };
    return map[status] || status;
  }

  getPriorityColor(priority: string): string {
    const map: Record<string, string> = { CRITIQUE: 'danger', HAUTE: 'warning', NORMALE: 'secondary', BASSE: 'info' };
    return map[(priority || '').toUpperCase()] || 'secondary';
  }

  goBack(): void {
    this.router.navigate(['/app/projects', this.project.id]);
  }

  openPlayground(): void {
    this.router.navigate(['/app/projects', this.project.id, 'playground']);
  }

  get phases(): Array<{ name: string; tasks: Task[]; completion: number; color: string }> {
    const byPhase = this.tasksByPhase;
    return [
      { name: 'Discovery', tasks: byPhase['Discovery'], completion: this.getPhaseCompletion(byPhase['Discovery']), color: '#6366f1' },
      { name: 'Build', tasks: byPhase['Build'], completion: this.getPhaseCompletion(byPhase['Build']), color: '#8b5cf6' },
      { name: 'Validation', tasks: byPhase['Validation'], completion: this.getPhaseCompletion(byPhase['Validation']), color: '#0ea5e9' },
      { name: 'Launch', tasks: byPhase['Launch'], completion: this.getPhaseCompletion(byPhase['Launch']), color: '#10b981' },
    ];
  }
}
