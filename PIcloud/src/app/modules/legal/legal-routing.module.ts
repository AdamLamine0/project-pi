import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalProcedureListComponent } from './pages/legal-procedure-list/legal-procedure-list.component';
import { LegalProcedureFormComponent } from './pages/legal-procedure-form/legal-procedure-form.component';
import { LegalProcedureDetailComponent } from './pages/legal-procedure-detail/legal-procedure-detail.component';
import { ProcedureHomeComponent } from './pages/procedure-home/procedure-home.component'; // ✅

const routes: Routes = [
  { path: '', component: ProcedureHomeComponent },       // ✅ home par défaut
  { path: 'list', component: LegalProcedureListComponent },
  { path: 'new', component: LegalProcedureFormComponent },
  { path: ':id', component: LegalProcedureDetailComponent },
  { path: ':id/edit', component: LegalProcedureFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule {}