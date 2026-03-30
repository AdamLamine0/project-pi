import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { FormUserComponent } from './form-user/form-user.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserListComponent,
    SetPasswordComponent,
    FormUserComponent
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