import { Component, OnInit } from '@angular/core';
import { GestionProjetsService } from '../../services/gestion-projets.service';
import { Project } from '../../../../models/project';

@Component({
  selector: 'app-project-dashboard',
  standalone: false,
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  today = new Date();
  userName = 'Porteur';
  projects: Project[] = [];

  stats = [
    { label: 'Score IA projet', value: '67/100' },
    { label: 'Avancement roadmap', value: '45%' },
    { label: 'Mentors actifs', value: '3' },
    { label: 'Investisseurs interesses', value: '5' },
  ];

  notifications = [
    'Nouveau mentor compatible avec votre projet.',
    'Votre dossier juridique a ete mis a jour.',
    'Rappel: session mentoring demain a 10:00.',
  ];

  legalSteps = [
    { label: 'Statuts societe', status: 'En cours' },
    { label: 'Pacte associes', status: 'A valider' },
    { label: 'Depot marque', status: 'Planifie' },
  ];

  roadmapMini = [
    { label: 'Problem fit', done: true },
    { label: 'Prototype', done: true },
    { label: 'Tests terrain', done: false },
    { label: 'MVP launch', done: false },
    { label: 'Go to market', done: false },
    { label: 'Scale', done: false },
  ];

  constructor(private projectService: GestionProjetsService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email') || '';
    this.userName = email ? email.split('@')[0] : 'Karim';

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: () => {
        this.projects = [];
      }
    });
  }

  get mainProject(): Project | null {
    return this.projects.length ? this.projects[0] : null;
  }
}
