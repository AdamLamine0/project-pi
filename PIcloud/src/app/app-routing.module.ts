import { VerifyCertificateComponent } from './pages/verify-certificate/verify-certificate.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/services/auth.guard';
import { HomeComponent } from './modules/home/home.component';


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
    path: 'events',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/event/event.module').then(m => m.EventModule)
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
