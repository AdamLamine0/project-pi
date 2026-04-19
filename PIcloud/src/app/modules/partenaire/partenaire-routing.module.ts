import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/services/auth.guard';
import { PartenarieListComponent } from './partenarie-list/partenarie-list.component';
import { FormOrganisationComponent } from './form-organisation/form-organisation.component';
import { MonOrganisationComponent } from './mon-organisation/mon-organisation.component';
import { ConventionListComponent } from './convention-list/convention-list.component';
import { FormConventionComponent } from './form-convention/form-convention.component';


const routes: Routes = [
  { path: 'list',                  component: PartenarieListComponent,   canActivate: [authGuard] },
  { path: 'mon-organisation',      component: MonOrganisationComponent,  canActivate: [authGuard], data: { role: 'PARTNER' } },
  { path: 'mon-organisation/:id',  component: MonOrganisationComponent,  canActivate: [authGuard] },
  { path: 'form',                  component: FormOrganisationComponent,  canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'form/:id',              component: FormOrganisationComponent,  canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'conventions',           component: ConventionListComponent,    canActivate: [authGuard] },
  { path: 'conventions/form',      component: FormConventionComponent,    canActivate: [authGuard] },
  { path: 'conventions/form/:id',  component: FormConventionComponent,    canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartenaireRoutingModule { }
