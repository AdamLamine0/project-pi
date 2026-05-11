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
import { StartupList } from '../investment-module/investment/components/startup-list/startup-list';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Projets', roles: ['ENTREPRENEUR', 'INVESTOR', 'ADMIN', 'MENTOR'] }
  },
  {
    path: 'new',
    component: ProjectCreateComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Nouveau Projet', roles: ['ENTREPRENEUR'] }
  },

  {
    path: 'dashboard',
    component: ProjectDashboardComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Dashboard Porteur', roles: ['ENTREPRENEUR', 'ADMIN', 'MENTOR'] }
  },
  {
    path: 'investment',
    component: StartupList,
    canActivate: [authGuard],
    data: { breadcrumb: 'Investissements projets', roles: ['INVESTOR', 'ADMIN'] }
  },
  {
    path: ':id/roadmap',
    component: ProjectRoadmapPageComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Roadmap IA', roles: ['ENTREPRENEUR', 'ADMIN', 'MENTOR'] }
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
    canActivate: [authGuard],
    data: { breadcrumb: 'Détails du Projet' }
  },
  {
    path: ':id/edit',
    component: ProjectFormComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Modifier Projet', roles: ['ENTREPRENEUR', 'ADMIN'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionProjetsRoutingModule { }
