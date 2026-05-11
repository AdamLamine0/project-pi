import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GestionProjetsRoutingModule } from './gestion-projets-routing.module';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TeamMemberListComponent } from './components/team-member-list/team-member-list.component';
import { ProjectDashboardComponent } from './pages/project-dashboard/project-dashboard.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectRoadmapPageComponent } from './pages/project-roadmap-page/project-roadmap-page.component';
import { EntrepreneurPlaygroundComponent } from './pages/entrepreneur-playground/entrepreneur-playground.component';
import { MentorDashboardComponent } from './pages/mentor-dashboard/mentor-dashboard.component';
import { OnboardingWizardComponent } from './pages/onboarding-wizard/onboarding-wizard.component';
import { StartupList } from '../investment-module/investment/components/startup-list/startup-list';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectFormComponent,
    ProjectCardComponent,
    TaskListComponent,
    TaskFormComponent,
    TeamMemberListComponent,
    ProjectDashboardComponent,
    ProjectCreateComponent,
    ProjectRoadmapPageComponent,
    EntrepreneurPlaygroundComponent,
    MentorDashboardComponent,
    OnboardingWizardComponent
  ],
  imports: [
    CommonModule,
    GestionProjetsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StartupList
  ]
})
export class GestionProjetsModule { }
