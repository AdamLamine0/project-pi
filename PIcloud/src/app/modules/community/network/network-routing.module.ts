import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionListComponent } from './components/connection-list/connection-list.component';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component';

const routes: Routes = [
  { path: '', component: ConnectionListComponent },
  { path: 'pending', component: PendingRequestsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }