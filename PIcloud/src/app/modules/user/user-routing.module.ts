import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { authGuard } from '../../core/services/auth.guard'; // ← fix path
import { MyBadgesComponent } from './pages/my-badges/my-badges.component';
import { MyCertificatesComponent } from './pages/my-certificates/my-certificates.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'badges', component: MyBadgesComponent },
  { path: 'certificates', component: MyCertificatesComponent },
  
  {
    path: 'list',
    component: UserListComponent,
    canActivate: [authGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  { path: '', redirectTo: 'profile', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }