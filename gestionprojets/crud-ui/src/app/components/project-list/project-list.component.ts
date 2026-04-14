import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../project.service';
import { ProjectItem } from '../../project.models';
import { AuthService, UserRole } from '../../auth.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: ProjectItem[] = [];
  filtered: ProjectItem[] = [];
  loading = true;
  search = '';
  categoryFilter = 'ALL';
  currentRole: UserRole = 'MANAGER';

  constructor(
    private projectService: ProjectService,
    public authService: AuthService
  ) {
    this.authService.currentRole$.subscribe(r => {
      this.currentRole = r;
      this.loadProjects();
    });
  }

  ngOnInit(): void {}

  loadProjects(): void {
    this.loading = true;
    this.projectService.getAll().subscribe({
      next: (data) => {
        if (this.currentRole === 'MEMBER') {
          this.projects = data.filter(p => p.managerId !== 'admin');
        } else {
          this.projects = data;
        }
        this.applyFilter();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  applyFilter(): void {
    const term = this.search.trim().toLowerCase();
    this.filtered = this.projects.filter(p => {
      const matchSearch = !term || 
        (p.titre || '').toLowerCase().includes(term) || 
        (p.description || '').toLowerCase().includes(term);
      const matchCategory = this.categoryFilter === 'ALL' || p.categorie === this.categoryFilter;
      return matchSearch && matchCategory;
    });
  }

  get categories(): string[] {
    return Array.from(new Set(this.projects.map(p => p.categorie).filter(Boolean))) as string[];
  }

  deleteProject(id: string): void {
    if (!this.authService.canDeleteProject()) return;
    
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.remove(id, this.authService.getUserId()).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  get canCreate(): boolean {
    return this.authService.canCreateProject();
  }

  get canDelete(): boolean {
    return this.authService.canDeleteProject();
  }

  get canViewAiFields(): boolean {
    return this.authService.canViewAiScore();
  }
}
