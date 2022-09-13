import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VaccinationListComponent} from './vaccination-list/vaccination-list.component';


const routes: Routes = [
  {path: 'vaccination', component: VaccinationListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinationRoutingModule { }
