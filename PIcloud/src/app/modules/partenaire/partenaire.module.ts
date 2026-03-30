import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartenaireRoutingModule } from './partenaire-routing.module';
import { FormOrganisationComponent } from './form-organisation/form-organisation.component';
import { PartenarieListComponent } from './partenarie-list/partenarie-list.component';
import { PartenarieDetailsComponent } from './partenarie-details/partenarie-details.component';


@NgModule({
  declarations: [
    FormOrganisationComponent,
    PartenarieListComponent,
    PartenarieDetailsComponent
  ],
  imports: [
    CommonModule,
    PartenaireRoutingModule
  ]
})
export class PartenaireModule { }
