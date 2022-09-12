import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateTreatmentComponent} from './treatment/create-treatment/create-treatment.component';


const routes: Routes = [
  {
    path: 'treatment/create', component: CreateTreatmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
