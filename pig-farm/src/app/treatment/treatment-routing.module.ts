import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TreatmentCreateComponent} from './treatment-create/treatment-create.component';
import {TreatmentListComponent} from './treatment-list/treatment-list.component';

const routes: Routes = [
  {
    path: 'treatment',
    component: TreatmentListComponent
  }, {
    path: 'treatment/create',
    component: TreatmentCreateComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule { }
