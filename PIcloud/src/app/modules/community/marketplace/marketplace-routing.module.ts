import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpportunityListComponent } from './components/opportunity-list/opportunity-list.component';
import { OpportunityCreateComponent } from './components/opportunity-create/opportunity-create.component';
import { CandidateDashboardComponent } from './components/candidate-dashboard/candidate-dashboard.component';
import { PublisherDashboardComponent } from './components/publisher-dashboard/publisher-dashboard.component';

const routes: Routes = [
  { path: '', component: OpportunityListComponent },
  { path: 'create', component: OpportunityCreateComponent },
  { path: 'my-applications', component: CandidateDashboardComponent },
  { path: 'my-offers', component: PublisherDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }