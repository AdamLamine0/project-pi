import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LegalRoutingModule } from './legal-routing.module';
import { LegalProcedureListComponent } from './pages/legal-procedure-list/legal-procedure-list.component';
import { LegalProcedureFormComponent } from './pages/legal-procedure-form/legal-procedure-form.component';
import { LegalProcedureDetailComponent } from './pages/legal-procedure-detail/legal-procedure-detail.component';

@NgModule({
  declarations: [
    LegalProcedureListComponent,
    LegalProcedureFormComponent,
    LegalProcedureDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LegalRoutingModule
  ]
})
export class LegalModule {}