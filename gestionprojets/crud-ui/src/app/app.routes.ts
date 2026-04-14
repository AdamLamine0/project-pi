import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./components/project-list/project-list.component').then(m => m.ProjectListComponent)
  },
  {
    path: 'projects/new',
    loadComponent: () => import('./components/project-form/project-form.component').then(m => m.ProjectFormComponent)
  },
  {
    path: 'projects/:id/edit',
    loadComponent: () => import('./components/project-form/project-form.component').then(m => m.ProjectFormComponent)
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./components/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)
  },
  {
    path: 'projects/:id/roadmap',
    loadComponent: () => import('./components/roadmap/roadmap.component').then(m => m.RoadmapComponent)
  },
  {
    path: 'projects/:id/documents',
    loadComponent: () => import('./components/documents/documents.component').then(m => m.DocumentsComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
