import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from './project.service';
import { CreateProjectPayload, ProjectItem, UpdateProjectPayload } from './project.models';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
