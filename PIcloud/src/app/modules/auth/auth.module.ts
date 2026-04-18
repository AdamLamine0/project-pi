import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { Oauth2CallbackComponent } from './oauth2-callback/oauth2-callback.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Oauth2CallbackComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule {}