import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListTreatmentComponent} from './list-treatment/list-treatment.component';
import {CreateTreatmentComponent} from './create-treatment/create-treatment.component';

const routes: Routes = [
  {
    path: 'treatment',
    component: ListTreatmentComponent
  }, {
    path: 'treatment/create',
    component: CreateTreatmentComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule { }
