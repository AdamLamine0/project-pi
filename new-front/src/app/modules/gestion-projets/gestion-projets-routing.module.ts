import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { ProjectDashboardComponent } from './pages/project-dashboard/project-dashboard.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectRoadmapPageComponent } from './pages/project-roadmap-page/project-roadmap-page.component';
import { EntrepreneurPlaygroundComponent } from './pages/entrepreneur-playground/entrepreneur-playground.component';
import { MentorDashboardComponent } from './pages/mentor-dashboard/mentor-dashboard.component';
import { authGuard } from '../../core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    data: { breadcrumb: 'Projets' }
  },
  {
    path: 'new',
    component: ProjectCreateComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Nouveau Projet', roles: ['USER', 'ADMIN'] }
  },

  {
    path: 'dashboard',
    component: ProjectDashboardComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Dashboard Porteur', roles: ['USER', 'ADMIN', 'MENTOR'] }
  },
  {
    path: ':id/roadmap',
    component: ProjectRoadmapPageComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Roadmap IA', roles: ['USER', 'ADMIN', 'MENTOR'] }
  },
  {
    path: ':id/playground',
    component: EntrepreneurPlaygroundComponent,
    canActivate: [authGuard],
    data: {
      breadcrumb: 'Entrepreneur Playground',
      roles: ['USER', 'ADMIN', 'MENTOR', 'INVESTOR', 'PARTNER']
    }
  },
  {
    path: ':id/mentor-dashboard',
    component: MentorDashboardComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Dashboard Mentor', roles: ['MENTOR', 'ADMIN'] }
  },
  {
    path: ':id',
    component: ProjectDetailComponent,
    data: { breadcrumb: 'Détails du Projet' }
  },
  {
    path: ':id/edit',
    component: ProjectFormComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Modifier Projet', roles: ['USER', 'ADMIN'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionProjetsRoutingModule { }
