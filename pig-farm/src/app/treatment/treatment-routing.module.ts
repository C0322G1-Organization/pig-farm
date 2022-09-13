import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TreatmentListComponent} from './list-treatment/treatment-list.component';
import {TreatmentCreateComponent} from './create-treatment/treatment-create.component';

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
