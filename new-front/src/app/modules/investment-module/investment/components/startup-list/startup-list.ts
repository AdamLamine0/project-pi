import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { STARTUP_CATALOG, StartupCatalogEntry } from '../../data/startup-catalog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../../../../models/project';
import { GestionProjetsService } from '../../../../gestion-projets/services/gestion-projets.service';

type Startup = StartupCatalogEntry & {
  source: 'project' | 'catalog';
  projectId?: number;
  budget?: number;
  progress?: number;
  status?: string;
};

@Component({
  selector: 'app-startup-list',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './startup-list.html',
  styleUrl: './startup-list.css',
})
export class StartupList implements OnInit {
  startups: Startup[] = [];
  loading = false;
  errorMessage = '';
  usingDemoCatalog = false;

  constructor(
    private router: Router,
    private projectService: GestionProjetsService
  ) {}

  ngOnInit(): void {
    this.loadProjectOpportunities();
  }

  requestInvestment(startup: Startup) {
    this.router.navigate(['/investment/request', startup.id], {
      queryParams: {
        name: startup.name,
        projectId: startup.projectId,
        sector: startup.sector,
      },
    });
  }

  private loadProjectOpportunities(): void {
    this.loading = true;
    this.errorMessage = '';

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        const projectStartups = projects
          .filter((project) => project.status !== 'BROUILLON' && project.status !== 'ANNULE')
          .map((project) => this.mapProjectToStartup(project));

        if (projectStartups.length) {
          this.startups = projectStartups;
          this.usingDemoCatalog = false;
        } else {
          this.useDemoCatalog();
        }

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les projets pour le moment.';
        this.useDemoCatalog();
        this.loading = false;
      },
    });
  }

  private mapProjectToStartup(project: Project): Startup {
    return {
      id: String(project.id),
      name: project.title,
      tagline: project.shortDescription || project.description || 'Projet ouvert aux investisseurs',
      sector: project.sector || 'Secteur non specifie',
      stage: project.stage || this.formatStatus(project.status),
      location: 'Projet PI',
      source: 'project',
      projectId: project.id,
      budget: project.budget,
      progress: project.progress,
      status: project.status,
    };
  }

  private useDemoCatalog(): void {
    this.startups = STARTUP_CATALOG.map((startup) => ({
      ...startup,
      source: 'catalog',
    }));
    this.usingDemoCatalog = true;
  }

  private formatStatus(status: string): string {
    const labels: Record<string, string> = {
      EN_COURS: 'En cours',
      EN_ATTENTE: 'En attente',
      TERMINE: 'Termine',
    };
    return labels[status] || status;
  }
}
