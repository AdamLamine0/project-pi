import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { authGuard } from '../../core/services/auth.guard'; // ← fix path

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'set-password', component: SetPasswordComponent },
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