import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestmentRoutingModule } from './investment-routing-module';



import { CriteriaForm } from './components/criteria-form/criteria-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CriteriaList } from './components/criteria-list/criteria-list';
import { KanbanBoard } from './components/kanban-board/kanban-board';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DealCard } from './components/deal-card/deal-card';
import { KanbanColumn } from './components/kanban-column/kanban-column';
import { InvestmentHolding } from './components/investment-holding/investment-holding';
import { NextBestActionCard } from './components/next-best-action-card/next-best-action-card';
import { RequestForm } from './components/request-form/request-form';
import { StartupList } from './components/startup-list/startup-list';
import { RequestManagement } from './components/request-management/request-management';
import { InvestorMarketplace } from './components/investor-marketplace/investor-marketplace';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    InvestmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    MatProgressSpinnerModule,
    CriteriaForm,
    CriteriaList,
    KanbanBoard,
    KanbanColumn,
    InvestmentHolding,
    DealCard,
    NextBestActionCard,
    RequestForm,
    StartupList,
    RequestManagement,
    InvestorMarketplace,
  ],
})
export class InvestmentModule {}
