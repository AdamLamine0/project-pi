import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectStatus } from '../../../../models/project';
import { GestionProjetsService } from '../../services/gestion-projets.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.component.html',
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
    private authService: AuthService
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
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.hasLoadedOnce = true;
        this.loading = false;
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

  getStatusColor(status: ProjectStatus): string {
    const colors: Record<ProjectStatus, string> = {
      'BROUILLON': 'secondary',
      'EN_COURS': 'info',
      'EN_ATTENTE': 'warning',
      'TERMINE': 'success',
      'ANNULE': 'danger'
    };
    return colors[status] || 'secondary';
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
}
