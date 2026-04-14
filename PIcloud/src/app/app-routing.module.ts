import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/services/auth.guard';
import { HomeComponent } from './modules/home/home.component';
import { VerifyCertificateComponent } from './pages/verify-certificate/verify-certificate.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then(m => m.UserModule)
  },
   {
    path: 'legal-procedures',
    loadChildren: () =>
      import('./modules/legal/legal.module').then(m => m.LegalModule)
  },
  {
    path: 'events',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/event/event.module').then(m => m.EventModule)
  },
  {
    path: 'partenariat',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/partenaire/partenaire.module').then(m => m.PartenaireModule)
  },
  {
    path: 'verify/:token',
    component: VerifyCertificateComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule {}
