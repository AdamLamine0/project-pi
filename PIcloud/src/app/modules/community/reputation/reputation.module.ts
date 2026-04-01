import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReputationRoutingModule } from './reputation-routing.module';
import { ReputationCardComponent } from './components/reputation-card/reputation-card.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { BadgesComponent } from './components/badges/badges.component';

@NgModule({
  declarations: [],
  imports: [SharedModule, ReputationRoutingModule]
})
export class ReputationModule { }