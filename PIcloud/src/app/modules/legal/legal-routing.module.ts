import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProcedureHomeComponent }        from './pages/procedure-home/procedure-home.component';
import { LegalProcedureListComponent }   from './pages/legal-procedure-list/legal-procedure-list.component';
import { LegalProcedureFormComponent }   from './pages/legal-procedure-form/legal-procedure-form.component';
import { LegalProcedureDetailComponent } from './pages/legal-procedure-detail/legal-procedure-detail.component';
import { ExpertProceduresComponent }     from './pages/expert-procedures/expert-procedures.component';

const routes: Routes = [
  // ── Entrepreneur ───────────────────────────────────────────────
  { path: '',        component: ProcedureHomeComponent },       // /legal-procedures
  { path: 'list',    component: LegalProcedureListComponent },  // /legal-procedures/list
  { path: 'new',     component: LegalProcedureFormComponent },  // /legal-procedures/new
  { path: ':id',     component: LegalProcedureDetailComponent },// /legal-procedures/:id (checklist incluse)

  // ── Expert ─────────────────────────────────────────────────────
  { path: 'expert/assigned', component: ExpertProceduresComponent }, // /legal-procedures/expert/assigned
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule {}
