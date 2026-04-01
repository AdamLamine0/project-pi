import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MarketplaceRoutingModule } from './marketplace-routing.module';

import { OpportunityListComponent } from './components/opportunity-list/opportunity-list.component';
import { OpportunityCardComponent } from './components/opportunity-card/opportunity-card.component';
import { OpportunityCreateComponent } from './components/opportunity-create/opportunity-create.component';
import { CandidateDashboardComponent } from './components/candidate-dashboard/candidate-dashboard.component';
import { PublisherDashboardComponent } from './components/publisher-dashboard/publisher-dashboard.component';

@NgModule({
  declarations: [
    OpportunityListComponent,
    OpportunityCardComponent,
    OpportunityCreateComponent,
    CandidateDashboardComponent,
    PublisherDashboardComponent
  ],
  imports: [SharedModule, MarketplaceRoutingModule]
})
export class MarketplaceModule { }