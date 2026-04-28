import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriteriaForm } from './components/criteria-form/criteria-form';
import { CriteriaList } from './components/criteria-list/criteria-list';
import { KanbanBoard } from './components/kanban-board/kanban-board';
import { InvestmentHolding } from './components/investment-holding/investment-holding';
import { RequestManagement } from './components/request-management/request-management';
import { RequestForm } from './components/request-form/request-form';
import { StartupList } from './components/startup-list/startup-list';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CriteriaList,
    data: { title: 'Critères' },
  },
  {
    path: 'startups',
    component: StartupList,
    data: { title: 'Startups' },
  },
  {
    path: 'criteria',
    component: CriteriaForm,
    data: { title: 'Nouveau critère' },
  },
  {
    path: 'criteria/edit/:id',
    component: CriteriaForm,
    data: { title: 'Modifier critere' },
  },
  {
    path: 'kanban',
    component: KanbanBoard,
    data: { title: 'Pipeline' },
  },
  {
    path: 'holding/request/:requestId',
    component: InvestmentHolding,
    data: { title: 'Investment Holding' },
  },
  {
    path: 'demandes',
    component: RequestManagement,
    data: { title: 'Demandes' },
  },
  {
    path: 'request/:startupId',
    component: RequestForm,
    data: { title: 'Demande d’investissement' },
  },
  { path: 'edit-request/:id', component: RequestForm,data: { title: 'modifier la demande d’investissement' },},
  {
    path: 'data-room',
    redirectTo: '../data-room',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentRoutingModule {
}
