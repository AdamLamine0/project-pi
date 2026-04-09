import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PartenaireRoutingModule } from './partenaire-routing.module';
import { FormOrganisationComponent } from './form-organisation/form-organisation.component';
import { PartenarieListComponent } from './partenarie-list/partenarie-list.component'; 
import { PartenarieDetailsComponent } from './partenarie-details/partenarie-details.component';
import { MonOrganisationComponent } from './mon-organisation/mon-organisation.component';
import { ConventionListComponent } from './convention-list/convention-list.component';
import { FormConventionComponent } from './form-convention/form-convention.component';

@NgModule({
  declarations: [
    FormOrganisationComponent,
    PartenarieListComponent,
    PartenarieDetailsComponent,
    MonOrganisationComponent,
    ConventionListComponent,
    FormConventionComponent,
  ],
  imports: [
    CommonModule,
    PartenaireRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PartenaireModule { }