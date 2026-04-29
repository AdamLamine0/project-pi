import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, Task } from '../../../../models/project';
import { GestionProjetsService } from '../../services/gestion-projets.service';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-project-roadmap-page',
  standalone: false,
  templateUrl: './project-roadmap-page.component.html',
  styleUrls: ['./project-roadmap-page.component.css']
})
export class ProjectRoadmapPageComponent implements OnInit {
  loading = false;
  project: Project | null = null;
  tasks: Task[] = [];
  updateProgress = 0;

  resources = [
    'Programme d acceleration cible startup early-stage',
    'Mentor growth B2B avec experience SaaS',
    'Piste financement pre-seed regionale',
  ];

  constructor(
    private route: ActivatedRoute,
    private projectService: GestionProjetsService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.load(id);
    });
  }

  load(projectId: number): void {
    this.loading = true;

    forkJoin({
      project: this.projectService.getProject(projectId),
      tasks: this.projectService.getTasks(projectId).pipe(catchError(() => of([] as Task[]))),
    }).subscribe({
      next: ({ project, tasks }) => {
        this.project = project;
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get completedCount(): number {
    return this.tasks.filter((t) => t.status === 'FAIT').length;
  }

  get completionPercent(): number {
    if (!this.tasks.length) {
      return 0;
    }
    return Math.round((this.completedCount / this.tasks.length) * 100);
  }

  get activeTask(): Task | null {
    return this.tasks.find((t) => t.status === 'EN_COURS')
      || this.tasks.find((t) => t.status === 'A_FAIRE')
      || null;
  }

  get nextDeadline(): string {
    const future = this.tasks
      .filter((t) => !!t.dueDate)
      .sort((a, b) => new Date(String(a.dueDate)).getTime() - new Date(String(b.dueDate)).getTime());
    return future[0]?.dueDate || '';
  }

  getDotClass(task: Task): string {
    if (task.status === 'FAIT') {
      return 'done';
    }
    if (task.status === 'EN_COURS') {
      return 'active';
    }
    return 'todo';
  }

  submitActiveUpdate(): void {
    if (!this.project?.id || !this.activeTask?.id) {
      return;
    }

    const status: Task['status'] = this.updateProgress >= 100
      ? 'FAIT'
      : this.updateProgress > 0
        ? 'EN_COURS'
        : 'A_FAIRE';

    const payload: Partial<Task> = {
      ...this.activeTask,
      status,
    };

    this.projectService.updateTask(this.project.id, this.activeTask.id, payload).subscribe({
      next: () => this.load(this.project!.id),
      error: () => {
        // no-op
      }
    });
  }
}
