import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LegalRoutingModule } from './legal-routing.module';

import { LegalProcedureListComponent }   from './pages/legal-procedure-list/legal-procedure-list.component';
import { LegalProcedureFormComponent }   from './pages/legal-procedure-form/legal-procedure-form.component';
import { LegalProcedureDetailComponent } from './pages/legal-procedure-detail/legal-procedure-detail.component';
import { ProcedureHomeComponent }        from './pages/procedure-home/procedure-home.component';
import { ExpertProceduresComponent }     from './pages/expert-procedures/expert-procedures.component';

@NgModule({
  declarations: [
    LegalProcedureListComponent,
    LegalProcedureFormComponent,
    LegalProcedureDetailComponent,
    ProcedureHomeComponent,
    ExpertProceduresComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    LegalRoutingModule,
  ]
})
export class LegalModule {}
