import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './pages/auth/auth-layout.component';
import { authGuard } from './core/services/auth.guard';
import { loginGuard } from './core/services/login.guard';
import { LandingLayoutComponent } from './pages/landing/landing-layout.component';
import { LayoutComponent } from './layout/layout.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/auth/login.component';
import { SignupComponent } from './pages/auth/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { MentoringComponent } from './pages/mentoring/mentoring.component';
import { RoadmapsComponent } from './pages/roadmaps/roadmaps.component';
import { PartnershipsComponent } from './pages/partnerships/partnerships.component';
import { EventsComponent } from './pages/events/events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VerifyCertificateComponent } from './pages/verify-certificate/verify-certificate.component';
import { AdminRegistrationsComponent } from './pages/admin-registrations/admin-registrations.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'events', component: EventsComponent, canActivate: [loginGuard] },
      { path: 'community', loadChildren: () => import('./modules/community/community.module').then(m => m.CommunityModule), canActivate: [loginGuard] },
      { path: 'procedures', loadChildren: () => import('./modules/legal/legal.module').then(m => m.LegalModule) },
      {
        path: 'investment', loadChildren: () => import('./modules/investment-module/investment/investment-module').then(m => m.InvestmentModule), canActivate: [loginGuard]
      },
      // Profile accessible to any authenticated user (including USER role)
      { path: 'profile', component: ProfileComponent, canActivate: [loginGuard] },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent },
      { path: 'signup', component: SignupComponent }, // Keep both for compatibility
    ],
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomeComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'community', loadChildren: () => import('./modules/community/community.module').then(m => m.CommunityModule) },
      { path: 'legal', loadChildren: () => import('./modules/legal/legal.module').then(m => m.LegalModule) },
      { path: 'investments', component: InvestmentsComponent },
      { path: 'mentoring', component: MentoringComponent },
      { path: 'roadmaps', component: RoadmapsComponent },
      { path: 'partnerships', component: PartnershipsComponent },
      { path: 'events', component: EventsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'registrations', component: AdminRegistrationsComponent },
    ],
  },
  { path: 'verify/:token', component: VerifyCertificateComponent },
  { path: '**', redirectTo: '' },
];
