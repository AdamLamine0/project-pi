import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Oauth2CallbackComponent } from './oauth2-callback/oauth2-callback.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path : 'login',component: LoginComponent },
  {path :'register', component: RegisterComponent},
  { path: 'oauth2/callback', component: Oauth2CallbackComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },   // ← ajouter
  { path: 'reset-password', component: ResetPasswordComponent },
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
