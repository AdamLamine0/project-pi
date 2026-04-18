import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { SpeakerCardComponent } from './components/speaker-card/speaker-card.component';
import { SpeakerFormComponent } from './components/speaker-form/speaker-form.component';
import { SpeakerListComponent } from './pages/speaker-list/speaker-list.component';
import { ProgramSlotComponent } from './components/program-slot/program-slot.component';
import { ProgramFormComponent } from './components/program-form/program-form.component';
import { RegistrationListComponent } from './components/registration-list/registration-list.component';

@NgModule({
  declarations: [
    EventListComponent,
    EventDetailComponent,
    EventFormComponent,
    EventCardComponent,
    SpeakerCardComponent,
    SpeakerFormComponent,
    SpeakerListComponent,
    ProgramSlotComponent,
    ProgramFormComponent,
    RegistrationListComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EventModule {}