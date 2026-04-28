import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/services/auth.guard';
import { PartenarieListComponent } from './partenarie-list/partenarie-list.component';
import { FormOrganisationComponent } from './form-organisation/form-organisation.component';
import { MonOrganisationComponent } from './mon-organisation/mon-organisation.component';
import { ConventionListComponent } from './convention-list/convention-list.component';
import { FormConventionComponent } from './form-convention/form-convention.component';
import { RequestMeetingComponent } from './request-meeting/request-meeting.component';
import { MeetingsComponent } from './meetings/meetings.component';


const SHARED_ROLES = ['ADMIN', 'PARTNER', 'PARTENAIRE', 'USER'];

const routes: Routes = [
  { path: 'list',                  component: PartenarieListComponent,   canActivate: [authGuard], data: { roles: SHARED_ROLES } },
  { path: 'mon-organisation',      component: MonOrganisationComponent,  canActivate: [authGuard], data: { roles: ['PARTNER', 'PARTENAIRE'] } },
  { path: 'mon-organisation/:id',  component: MonOrganisationComponent,  canActivate: [authGuard], data: { roles: SHARED_ROLES } },
  { path: 'form',                  component: FormOrganisationComponent,  canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'form/:id',              component: FormOrganisationComponent,  canActivate: [authGuard], data: { role: 'ADMIN' } },
  { path: 'conventions',           component: ConventionListComponent,    canActivate: [authGuard], data: { roles: SHARED_ROLES } },
  { path: 'conventions/form',      component: FormConventionComponent,    canActivate: [authGuard], data: { roles: SHARED_ROLES } },
  { path: 'conventions/form/:id',  component: FormConventionComponent,    canActivate: [authGuard], data: { roles: SHARED_ROLES } },
  { path: 'meetings',              component: MeetingsComponent,          canActivate: [authGuard], data: { roles: SHARED_ROLES } },
  { path: 'meetings/request/:id',  component: RequestMeetingComponent,    canActivate: [authGuard], data: { roles: SHARED_ROLES } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartenaireRoutingModule { }
