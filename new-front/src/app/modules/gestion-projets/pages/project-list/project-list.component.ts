import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectStatus } from '../../../../models/project';
import { GestionProjetsService } from '../../services/gestion-projets.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: false,
  template: `
    <div class="page-shell">

      <!-- Header -->
      <div class="page-header">
        <div>
          <h2 class="text-lg font-bold" style="color:var(--text-primary); letter-spacing:-0.02em;">Project Hub</h2>
          <p class="text-xs mt-0.5" style="color:var(--text-secondary);">{{ filteredProjects.length }} {{ filteredProjects.length === 1 ? 'projet' : 'projets' }} dans l'écosystème</p>
        </div>
        <div class="page-header-actions">
          <button
            *ngIf="!isMentor"
            (click)="createProject()"
            class="flex w-full items-center justify-center gap-1.5 rounded-lg border-none text-xs font-semibold cursor-pointer transition-all hover:opacity-90 sm:w-auto"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 16px;"
            aria-label="Nouveau projet"
          >
            <i class="bi bi-plus-circle" style="font-size:14px;"></i>
            Nouveau Projet
          </button>
        </div>
      </div>

      <!-- Filters bar -->
      <div class="filter-toolbar">
        <div class="relative filter-toolbar__grow">
          <i class="bi bi-search" style="position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:13px;"></i>
          <input
            type="search"
            placeholder="Rechercher par titre..."
            aria-label="Rechercher"
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
            class="input-full text-xs rounded-lg border focus:outline-none"
            style="padding:6px 12px 6px 28px; background:var(--surface); border-color:var(--border); font-family:var(--font-sans);"
          />
        </div>

        <div class="chip-scroll">
          <button
            (click)="selectedStatus = ''; onStatusChange()"
            class="text-xs font-medium rounded-lg cursor-pointer border transition-colors"
            [style.background]="selectedStatus === '' ? 'var(--chip-active-bg)' : 'var(--chip-inactive-bg)'"
            [style.color]="selectedStatus === '' ? 'var(--chip-active-text)' : 'var(--chip-inactive-text)'"
            [style.border-color]="selectedStatus === '' ? 'var(--chip-active-border)' : 'var(--chip-inactive-border)'"
            style="padding:5px 12px;"
          >Tous</button>
          <button
            *ngFor="let status of statusOptions"
            (click)="selectedStatus = status; onStatusChange()"
            class="text-xs font-medium rounded-lg cursor-pointer border transition-colors"
            [style.background]="selectedStatus === status ? 'var(--chip-active-bg)' : 'var(--chip-inactive-bg)'"
            [style.color]="selectedStatus === status ? 'var(--chip-active-text)' : 'var(--chip-inactive-text)'"
            [style.border-color]="selectedStatus === status ? 'var(--chip-active-border)' : 'var(--chip-inactive-border)'"
            style="padding:5px 12px;"
          >{{ getStatusLabel(status) }}</button>
        </div>
      </div>

      <!-- Loading state -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border" role="status" style="color:#1C4FC3;">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Empty state -->
      <div *ngIf="!loading && hasLoadedOnce && filteredProjects.length === 0" class="text-center py-5">
        <div class="rounded-xl border" style="background:var(--surface); border-color:var(--border); padding:48px 24px;">
          <div class="flex items-center justify-center rounded-xl mx-auto mb-4" style="width:64px; height:64px; background:#EEF2FF; color:#1C4FC3; font-size:28px;">
            📁
          </div>
          <h5 class="text-base font-bold mb-2" style="color:var(--text-primary);">Aucun projet trouvé</h5>
          <p class="text-sm mb-4" style="color:var(--text-secondary);">Commencez en créant votre premier projet.</p>
          <button
            *ngIf="!isMentor"
            (click)="createProject()"
            class="rounded-lg border-none text-xs font-semibold cursor-pointer transition-all hover:opacity-90"
            style="background:linear-gradient(135deg,#1C4FC3,#1D1384); color:#fff; padding:8px 20px;"
          >
            Créer mon premier projet
          </button>
        </div>
      </div>

      <!-- Project cards grid -->
      <div *ngIf="!loading && filteredProjects.length > 0" class="card-grid-auto">
        <div *ngFor="let project of filteredProjects" class="rounded-xl border transition-all hover:shadow-md cursor-pointer group"
          style="background:var(--surface); border-color:var(--border); box-shadow:0 1px 4px rgba(11,15,42,0.04); padding:20px;"
          (click)="viewProject(project.id)">

          <!-- Card header -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center rounded-xl flex-shrink-0"
                [style.background]="getProjectColor(project) + '22'"
                style="width:40px; height:40px; font-size:13px; font-weight:700;"
                [style.color]="getProjectColor(project)">
                {{ getProjectInitials(project.title) }}
              </div>
              <div>
                <h3 class="text-sm font-bold leading-tight" style="color:var(--text-primary);">{{ project.title }}</h3>
                <p class="text-xs" style="color:var(--text-muted);">{{ project.sector || 'Non spécifié' }}</p>
              </div>
            </div>
            <span class="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
              [style.background]="getStatusBg(project.status)"
              [style.color]="getStatusColor(project.status)">
              {{ getStatusLabel(project.status) }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-xs leading-relaxed mb-4 line-clamp-2" style="color:var(--text-secondary);">
            {{ project.description || 'Aucune description disponible' }}
          </p>

          <!-- Sector + Stage -->
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span *ngIf="project.sector" class="text-xs px-2 py-0.5 rounded-full" style="background:var(--badge-purple-bg); color:#1C4FC3; font-weight:500;">
              {{ project.sector }}
            </span>
            <span *ngIf="project.stage" class="text-xs px-2 py-0.5 rounded-full" style="background:var(--surface-subtle); color:var(--text-body); font-weight:500;">
              {{ project.stage }}
            </span>
            <span *ngIf="project.teamSize" class="text-xs" style="color:var(--text-muted);">
              · Équipe: {{ project.teamSize }}
            </span>
          </div>

          <!-- Progress bar -->
          <div *ngIf="project.progress !== null && project.progress !== undefined" class="mb-4">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-medium" style="color:var(--text-secondary);">Progression</span>
              <span class="text-xs font-bold" [style.color]="project.progress >= 80 ? 'var(--badge-green-text)' : project.progress >= 50 ? 'var(--badge-amber-text)' : 'var(--badge-red-text)'">
                {{ project.progress }}%
              </span>
            </div>
            <div style="height:5px; background:var(--surface-subtle); border-radius:99px; overflow:hidden;">
              <div style="height:100%; border-radius:99px; transition:width 0.6s cubic-bezier(.4,0,.2,1);"
                [style.width.%]="project.progress"
                [style.background]="project.progress >= 80 ? 'linear-gradient(90deg,#059669,#34D399)' : project.progress >= 50 ? 'linear-gradient(90deg,#D97706,#FBBF24)' : 'linear-gradient(90deg,#DC2626,#F87171)'">
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between" style="border-top:1px solid var(--border-subtle); padding-top:12px;">
            <span *ngIf="project.budget" class="text-xs font-semibold" style="color:var(--badge-green-text);">
              {{ project.budget | currency:'EUR':'symbol':'1.0-0' }}
            </span>
            <span *ngIf="!project.budget" class="text-xs" style="color:var(--text-muted);">Budget non défini</span>
            
            <div class="flex items-center gap-2">
              <button
                (click)="viewProject(project.id); $event.stopPropagation()"
                class="flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                style="width:28px; height:28px; background:transparent; border:none; cursor:pointer; color:var(--text-muted);"
                [attr.aria-label]="'Voir ' + project.title"
              >
                <i class="bi bi-eye" style="font-size:14px;"></i>
              </button>
              <button
                *ngIf="!isMentor"
                (click)="editProject(project.id); $event.stopPropagation()"
                class="flex items-center justify-center rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
                style="width:28px; height:28px; background:transparent; border:none; cursor:pointer; color:#1C4FC3;"
                [attr.aria-label]="'Modifier ' + project.title"
              >
                <i class="bi bi-pencil" style="font-size:14px;"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = false;
  hasLoadedOnce = false;
  selectedStatus: ProjectStatus | '' = '';
  searchQuery = '';
  mentorRequestMap: Record<number, string> = {}; // projectId -> status

  statusOptions: ProjectStatus[] = ['BROUILLON', 'EN_COURS', 'EN_ATTENTE', 'TERMINE', 'ANNULE'];

  constructor(
    private projectService: GestionProjetsService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  get isMentor(): boolean {
    return this.authService.getRole() === 'MENTOR';
  }

  get currentMentorId(): number {
    return this.authService.getUserId();
  }

  getMentorRequestStatus(projectId: number): string {
    return this.mentorRequestMap[projectId] || '';
  }

  showInterest(project: Project, event: Event): void {
    event.stopPropagation();
    const mentorId = this.currentMentorId;
    const email = this.authService.getToken() ? localStorage.getItem('email') || 'mentor@pi.com' : 'mentor@pi.com';
    const name = email.split('@')[0];
    const req = this.projectService.sendMentoringRequest(
      project.id, project.title, mentorId, email, name
    );
    this.mentorRequestMap = { ...this.mentorRequestMap, [project.id]: req.status };
  }

  loadProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.applyFilters();
        this.hasLoadedOnce = true;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.hasLoadedOnce = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    this.filteredProjects = this.projects.filter(project => {
      const statusMatch = !this.selectedStatus || project.status === this.selectedStatus;
      const searchMatch = !this.searchQuery || 
        project.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return statusMatch && searchMatch;
    });
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  filterDrafts(): void {
    this.selectedStatus = 'BROUILLON';
    this.applyFilters();
  }

  filterActive(): void {
    this.selectedStatus = 'EN_COURS';
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  createProject(): void {
    this.router.navigate(['/app/projects/new']);
  }

  viewProject(projectId: number): void {
    this.router.navigate(['/app/projects', projectId]);
  }

  editProject(projectId: number, event?: Event): void {
    event?.stopPropagation();
    this.router.navigate(['/app/projects', projectId, 'edit']);
  }

  deleteProject(projectId: number, event?: Event): void {
    event?.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          this.projects = this.projects.filter(p => p.id !== projectId);
          this.applyFilters();
        },
        error: (error) => console.error('Error deleting project:', error)
      });
    }
  }

  get totalProjects(): number {
    return this.projects.length;
  }

  get activeProjects(): number {
    return this.projects.filter((p) => p.status === 'EN_COURS' || p.status === 'EN_ATTENTE').length;
  }

  get completedProjects(): number {
    return this.projects.filter((p) => p.status === 'TERMINE').length;
  }

  get onboardingCompletionRate(): number {
    if (!this.projects.length) {
      return 0;
    }
    return Math.round((this.completedProjects / this.projects.length) * 100);
  }

  getProjectInitials(title: string): string {
    if (!title) return '??';
    const words = title.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  getStatusBg(status: ProjectStatus): string {
    const map: Record<ProjectStatus, string> = {
      'BROUILLON': 'var(--badge-neutral-bg)',
      'EN_COURS': 'var(--badge-blue-bg)',
      'EN_ATTENTE': 'var(--badge-amber-bg)',
      'TERMINE': 'var(--badge-green-bg)',
      'ANNULE': 'var(--badge-red-bg)'
    };
    return map[status] || 'var(--badge-neutral-bg)';
  }

  getStatusColor(status: ProjectStatus): string {
    const map: Record<ProjectStatus, string> = {
      'BROUILLON': 'var(--badge-neutral-text)',
      'EN_COURS': 'var(--badge-blue-text)',
      'EN_ATTENTE': 'var(--badge-amber-text)',
      'TERMINE': 'var(--badge-green-text)',
      'ANNULE': 'var(--badge-red-text)'
    };
    return map[status] || 'var(--badge-neutral-text)';
  }

  getStatusLabel(status: ProjectStatus): string {
    const map: Record<ProjectStatus, string> = {
      'BROUILLON': 'Brouillon',
      'EN_COURS': 'En cours',
      'EN_ATTENTE': 'En attente',
      'TERMINE': 'Terminé',
      'ANNULE': 'Annulé'
    };
    return map[status] || status;
  }

  getProjectColor(project: Project): string {
    // Generate a consistent color based on project ID or title
    const colors = ['#1C4FC3', '#059669', '#1D1384', '#D97706', '#EC4899', '#0891B2', '#8B5CF6'];
    const index = project.id % colors.length;
    return colors[index];
  }
}
