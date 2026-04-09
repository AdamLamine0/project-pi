import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { FormUserComponent } from './form-user/form-user.component';
import { MyBadgesComponent } from './pages/my-badges/my-badges.component';
import { MyCertificatesComponent } from './pages/my-certificates/my-certificates.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UserListComponent,
    SetPasswordComponent,
    FormUserComponent,
    MyBadgesComponent,
    MyCertificatesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class UserModule { }