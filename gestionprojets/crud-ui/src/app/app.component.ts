import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from './project.service';
import {
  CreateProjectPayload,
  CreateRoadmapStepPayload,
  ProjectItem,
  RoadmapStepItem,
  UpdateProjectPayload
} from './project.models';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activeView: 'projects' | 'roadmap' = 'projects';

  projects: ProjectItem[] = [];
  filteredProjects: ProjectItem[] = [];

  loading = false;
  submitting = false;
  deletingId = '';
  message = '';
  error = '';
  search = '';

  mode: 'create' | 'edit' = 'create';
  editingId: string | null = null;

  roadmapProject: ProjectItem | null = null;
  roadmapProgress: number | null = null;
  roadmapLoading = false;
  roadmapSubmitting = false;
  roadmapStatusUpdatingKey = '';
  roadmapDeletingKey = '';

  roadmapForm: CreateRoadmapStepPayload = this.defaultRoadmapForm();

  form: CreateProjectPayload = this.defaultForm();
  memberIdsInput = '';

  constructor(private readonly projectService: ProjectService) {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = '';
    this.projectService.getAll().subscribe({
      next: (items) => {
        this.projects = items ?? [];
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = this.getApiError(err, 'Failed to load projects.');
      }
    });
  }

  applyFilter(): void {
    const q = this.search.trim().toLowerCase();
    if (!q) {
      this.filteredProjects = [...this.projects];
      return;
    }

    this.filteredProjects = this.projects.filter((p) => {
      return (
        p.titre?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.managerId?.toLowerCase().includes(q) ||
        p.categorie?.toLowerCase().includes(q)
      );
    });
  }

  submit(): void {
    this.error = '';
    this.message = '';
    this.form.memberIds = this.parseMembers(this.memberIdsInput);

    if (!this.validate()) {
      return;
    }

    this.submitting = true;
    if (this.mode === 'create') {
      this.projectService.create(this.form).subscribe({
        next: () => {
          this.submitting = false;
          this.message = 'Project created.';
          this.resetForm();
          this.loadProjects();
        },
        error: (err) => {
          this.submitting = false;
          this.error = this.getApiError(err, 'Create failed.');
        }
      });
      return;
    }

    if (!this.editingId) {
      this.submitting = false;
      this.error = 'Missing project id.';
      return;
    }

    const payload: UpdateProjectPayload = {
      titre: this.form.titre,
      description: this.form.description,
      dateDebut: this.form.dateDebut,
      dateFin: this.form.dateFin,
      budget: this.form.budget,
      priorite: this.form.priorite,
      categorie: this.form.categorie,
      memberIds: this.form.memberIds,
      statut: 'IN_PROGRESS'
    };

    this.projectService.update(this.editingId, payload, this.form.managerId).subscribe({
      next: () => {
        this.submitting = false;
        this.message = 'Project updated.';
        this.resetForm();
        this.loadProjects();
      },
      error: (err) => {
        this.submitting = false;
        this.error = this.getApiError(err, 'Update failed.');
      }
    });
  }

  edit(item: ProjectItem): void {
    this.mode = 'edit';
    this.editingId = item.id ?? null;
    this.form = {
      titre: item.titre,
      description: item.description,
      dateDebut: item.dateDebut,
      dateFin: item.dateFin,
      budget: item.budget,
      managerId: item.managerId,
      memberIds: item.memberIds ?? [],
      priorite: item.priorite || 'MEDIUM',
      categorie: item.categorie || 'General'
    };
    this.memberIdsInput = (item.memberIds ?? []).join(', ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  remove(item: ProjectItem): void {
    if (!item.id) {
      return;
    }

    if (!confirm(`Delete ${item.titre}?`)) {
      return;
    }

    this.deletingId = item.id;
    this.error = '';
    this.message = '';
    this.projectService.remove(item.id, item.managerId || 'manager-1').subscribe({
      next: () => {
        this.deletingId = '';
        this.message = 'Project deleted.';
        this.loadProjects();
      },
      error: (err) => {
        this.deletingId = '';
        this.error = this.getApiError(err, 'Delete failed.');
      }
    });
  }

  trackByProject(_: number, item: ProjectItem): string {
    return item.id || item.titre;
  }

  openRoadmap(item: ProjectItem): void {
    this.activeView = 'roadmap';
    this.roadmapProject = item;
    this.roadmapProgress = item.progressPercentage ?? null;
    this.roadmapForm = this.defaultRoadmapForm();
    this.fetchProgress();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  switchToProjects(): void {
    this.activeView = 'projects';
  }

  switchToRoadmap(): void {
    this.activeView = 'roadmap';
  }

  closeRoadmap(): void {
    this.roadmapProject = null;
    this.roadmapProgress = null;
    this.roadmapForm = this.defaultRoadmapForm();
    this.activeView = 'projects';
  }

  addRoadmapStep(): void {
    if (!this.roadmapProject?.id) {
      return;
    }
    if (!this.roadmapForm.titre || !this.roadmapForm.description || !this.roadmapForm.ordre) {
      this.error = 'Roadmap step title, description, and order are required.';
      return;
    }

    this.roadmapSubmitting = true;
    this.projectService
      .addRoadmapStep(this.roadmapProject.id, this.roadmapForm, this.roadmapProject.managerId || 'manager-1')
      .subscribe({
        next: (updatedProject) => {
          this.roadmapSubmitting = false;
          this.message = 'Roadmap step added.';
          this.updateProjectInLists(updatedProject);
          this.roadmapProject = updatedProject;
          this.roadmapForm = this.defaultRoadmapForm();
          this.fetchProgress();
        },
        error: (err) => {
          this.roadmapSubmitting = false;
          this.error = this.getApiError(err, 'Could not add roadmap step.');
        }
      });
  }

  updateStepStatus(step: RoadmapStepItem, status: string): void {
    if (!this.roadmapProject?.id || !step.id) {
      return;
    }

    this.roadmapStatusUpdatingKey = `${this.roadmapProject.id}-${step.id}`;
    this.projectService
      .updateRoadmapStepStatus(this.roadmapProject.id, step.id, status, this.roadmapProject.managerId || 'manager-1')
      .subscribe({
        next: (updatedProject) => {
          this.roadmapStatusUpdatingKey = '';
          this.message = 'Step status updated.';
          this.updateProjectInLists(updatedProject);
          this.roadmapProject = updatedProject;
          this.fetchProgress();
        },
        error: (err) => {
          this.roadmapStatusUpdatingKey = '';
          this.error = this.getApiError(err, 'Could not update step status.');
        }
      });
  }

  deleteStep(step: RoadmapStepItem): void {
    if (!this.roadmapProject?.id || !step.id) {
      return;
    }

    if (!confirm(`Delete roadmap step: ${step.titre}?`)) {
      return;
    }

    this.roadmapDeletingKey = `${this.roadmapProject.id}-${step.id}`;
    this.projectService
      .deleteRoadmapStep(this.roadmapProject.id, step.id, this.roadmapProject.managerId || 'manager-1')
      .subscribe({
        next: (updatedProject) => {
          this.roadmapDeletingKey = '';
          this.message = 'Roadmap step deleted.';
          this.updateProjectInLists(updatedProject);
          this.roadmapProject = updatedProject;
          this.fetchProgress();
        },
        error: (err) => {
          this.roadmapDeletingKey = '';
          this.error = this.getApiError(err, 'Could not delete roadmap step.');
        }
      });
  }

  generateRoadmap(): void {
    if (!this.roadmapProject?.id) {
      return;
    }

    this.roadmapLoading = true;
    this.projectService.generateRoadmap(this.roadmapProject.id, this.roadmapProject.managerId || 'manager-1').subscribe({
      next: (updatedProject) => {
        this.roadmapLoading = false;
        this.message = 'AI roadmap generated.';
        this.updateProjectInLists(updatedProject);
        this.roadmapProject = updatedProject;
        this.fetchProgress();
      },
      error: (err) => {
        this.roadmapLoading = false;
        this.error = this.getApiError(err, 'Could not generate roadmap.');
      }
    });
  }

  fetchProgress(): void {
    if (!this.roadmapProject?.id) {
      return;
    }

    this.projectService.getProgress(this.roadmapProject.id).subscribe({
      next: (progress) => {
        this.roadmapProgress = progress;
      },
      error: () => {
        this.roadmapProgress = null;
      }
    });
  }

  private updateProjectInLists(updated: ProjectItem): void {
    this.projects = this.projects.map((p) => (p.id === updated.id ? updated : p));
    this.filteredProjects = this.filteredProjects.map((p) => (p.id === updated.id ? updated : p));
  }

  private validate(): boolean {
    if (!this.form.titre || !this.form.description || !this.form.dateDebut || !this.form.dateFin) {
      this.error = 'Title, description, start date and end date are required.';
      return false;
    }
    if (!this.form.managerId) {
      this.error = 'Manager ID is required.';
      return false;
    }
    if (this.form.budget <= 0) {
      this.error = 'Budget must be greater than 0.';
      return false;
    }
    if (this.form.dateFin < this.form.dateDebut) {
      this.error = 'End date cannot be before start date.';
      return false;
    }
    return true;
  }

  private parseMembers(value: string): string[] {
    return (value || '')
      .split(',')
      .map((x) => x.trim())
      .filter((x) => x.length > 0);
  }

  private resetForm(): void {
    this.mode = 'create';
    this.editingId = null;
    this.form = this.defaultForm();
    this.memberIdsInput = '';
  }

  private defaultForm(): CreateProjectPayload {
    return {
      titre: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      budget: 1000,
      managerId: 'manager-1',
      memberIds: [],
      priorite: 'MEDIUM',
      categorie: 'General'
    };
  }

  private defaultRoadmapForm(): CreateRoadmapStepPayload {
    return {
      titre: '',
      description: '',
      ordre: 1,
      parent: '',
      statut: 'PENDING'
    };
  }

  private getApiError(err: any, fallback: string): string {
    const message = err?.error?.message;
    if (message) {
      return message;
    }
    const validation = err?.error?.errors?.[0]?.defaultMessage;
    if (validation) {
      return validation;
    }
    return fallback;
  }
}
