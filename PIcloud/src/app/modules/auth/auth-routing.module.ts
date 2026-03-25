import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Oauth2CallbackComponent } from './oauth2-callback/oauth2-callback.component';

const routes: Routes = [
  {path : 'login',component: LoginComponent },
  {path :'register', component: RegisterComponent},
  { path: 'oauth2/callback', component: Oauth2CallbackComponent },
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
