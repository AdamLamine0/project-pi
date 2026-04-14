import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../project.service';
import { ProjectItem } from '../../project.models';
import { AuthService, UserRole } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: ProjectItem[] = [];
  loading = true;
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

  ngOnInit(): void {
    // Subscribed in constructor
  }

  loadProjects(): void {
    this.loading = true;
    this.projectService.getAll().subscribe({
      next: (data) => {
        // Filter based on role if needed
        if (this.currentRole === 'MEMBER') {
          // Simply simulate filtering for members: show assigned projects
          this.projects = data.filter(p => p.managerId !== 'admin'); 
        } else {
          this.projects = data;
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  get welcomeMessage(): string {
    switch (this.currentRole) {
      case 'ADMIN': return 'Welcome back, Administrator. System is operating normally.';
      case 'MANAGER': return 'Hello Manager. Here is an overview of your active projects.';
      case 'INVESTOR': return 'Welcome to the Portfolio view. Review the generated AI Scores below.';
      case 'MEMBER': return 'Welcome back! Check your current assigned tasks and roadmaps.';
    }
  }

  get canCreate(): boolean {
    return this.authService.canCreateProject();
  }
}
