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
import { MentoringComponent } from './pages/mentoring/mentoring.component';
import { RoadmapsComponent } from './pages/roadmaps/roadmaps.component';
import { PartnershipsComponent } from './pages/partnerships/partnerships.component';
import { EventsComponent } from './pages/events/events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VerifyCertificateComponent } from './pages/verify-certificate/verify-certificate.component';
import { AdminRegistrationsComponent } from './pages/admin-registrations/admin-registrations.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { Oauth2CallbackComponent } from './auth/oauth2-callback/oauth2-callback';

export const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      // Landing page: public, no authentication required
      { path: '', component: LandingComponent, pathMatch: 'full' },
      // The routes below require the user to be signed in
      { path: 'events', component: EventsComponent, canActivate: [loginGuard] },
      { path: 'community', loadChildren: () => import('./modules/community/community.module').then(m => m.CommunityModule), canActivate: [loginGuard] },
      { path: 'procedures', loadChildren: () => import('./modules/legal/legal.module').then(m => m.LegalModule) },
      { path: 'investment', loadChildren: () => import('./modules/investment-module/investment/investment-module').then(m => m.InvestmentModule), canActivate: [loginGuard] },
      // Profile accessible to any authenticated user (including USER role)
      { path: 'profile', component: ProfileComponent, canActivate: [loginGuard] },
      // Partenariat pages â€” accessible to all logged-in users (USER, PARTNER, ADMIN)
      { path: 'partenariat', loadChildren: () => import('./modules/partenaire/partenaire.module').then(m => m.PartenaireModule), canActivate: [loginGuard] },
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
      { path: 'reset-password', loadComponent: () => import('./auth/reset-password/reset-password').then(m => m.ResetPasswordComponent) },
      { path: 'oauth2-callback', component: Oauth2CallbackComponent },
    ],
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HomeComponent },
      { path: 'projects', loadChildren: () => import('./modules/gestion-projets/gestion-projets.module').then(m => m.GestionProjetsModule) },
      { path: 'community', loadChildren: () => import('./modules/community/community.module').then(m => m.CommunityModule) },
      { path: 'legal', loadChildren: () => import('./modules/legal/legal.module').then(m => m.LegalModule), canActivate: [authGuard], data: { roles: ['ADMIN', 'ENTREPRENEUR', 'EXPERT'] } },
      { path: 'investments', redirectTo: '/investment', pathMatch: 'full' },
      { path: 'mentoring', component: MentoringComponent },
      { path: 'roadmaps', component: RoadmapsComponent },
      { path: 'partnerships', component: PartnershipsComponent },
      { path: 'events', component: EventsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'registrations', component: AdminRegistrationsComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
      { path: 'users', component: UsersListComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
      { path: 'partenariat', loadChildren: () => import('./modules/partenaire/partenaire.module').then(m => m.PartenaireModule) },
    ],
  },
  { path: 'verify/:token', component: VerifyCertificateComponent },
  { path: '**', redirectTo: '' },
];
