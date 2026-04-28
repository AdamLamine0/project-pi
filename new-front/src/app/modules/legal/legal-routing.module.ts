import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/services/auth.guard';

import { ProcedureHomeComponent } from './pages/procedure-home/procedure-home.component';
import { LegalProcedureListComponent } from './pages/legal-procedure-list/legal-procedure-list.component';
import { LegalProcedureFormComponent } from './pages/legal-procedure-form/legal-procedure-form.component';
import { LegalProcedureDetailComponent } from './pages/legal-procedure-detail/legal-procedure-detail.component';
import { ExpertProceduresComponent } from './pages/expert-procedures/expert-procedures.component';

const routes: Routes = [
  {
    path: '',
    component: ProcedureHomeComponent,
  },
  {
    path: 'list',
    component: LegalProcedureListComponent,
    canActivate: [authGuard],
    data: { roles: ['ENTREPRENEUR', 'ADMIN'] },
  },
  {
    path: 'new',
    component: LegalProcedureFormComponent,
    canActivate: [authGuard],
    data: { roles: ['ENTREPRENEUR', 'ADMIN'] },
  },
  {
    path: 'expert/assigned',
    component: ExpertProceduresComponent,
    canActivate: [authGuard],
    data: { roles: ['EXPERT', 'ADMIN'] },
  },
  {
    path: ':id',
    component: LegalProcedureDetailComponent,
    canActivate: [authGuard],
    data: { roles: ['ENTREPRENEUR', 'ADMIN'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalRoutingModule {}
