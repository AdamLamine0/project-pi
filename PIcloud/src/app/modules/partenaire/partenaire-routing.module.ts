import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/services/auth.guard';
import { PartenarieListComponent } from './partenarie-list/partenarie-list.component';
import { FormOrganisationComponent } from './form-organisation/form-organisation.component';


const routes: Routes = [
  // in your partenariat-routing.module.ts
{ path: 'list', component: PartenarieListComponent, canActivate: [authGuard] },
{ path: 'form', component: FormOrganisationComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
{ path: 'form/:id', component: FormOrganisationComponent, canActivate: [authGuard], data: { role: 'ADMIN' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartenaireRoutingModule { }
