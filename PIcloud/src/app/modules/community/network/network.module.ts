import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NetworkRoutingModule } from './network-routing.module';
import { ConnectionListComponent } from './components/connection-list/connection-list.component';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component';
import { MemberCardComponent } from './components/member-card/member-card.component';

@NgModule({
  declarations: [
    ConnectionListComponent,
    PendingRequestsComponent,
    MemberCardComponent
  ],
  imports: [SharedModule, NetworkRoutingModule]
})
export class NetworkModule { }