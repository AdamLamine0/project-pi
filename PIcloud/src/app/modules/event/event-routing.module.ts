import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { SpeakerListComponent } from './pages/speaker-list/speaker-list.component';
import { PendingEventsComponent } from './pages/pending-events/pending-events.component';
import { authGuard } from '../../core/services/auth.guard';

const routes: Routes = [
  { path: '',         component: EventListComponent },
  { path: 'new',      component: EventFormComponent },
  { path: 'speakers', component: SpeakerListComponent },
  {
    path: 'pending',
    component: PendingEventsComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' }
  },
  { path: ':id',      component: EventDetailComponent },
  { path: ':id/edit', component: EventFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}