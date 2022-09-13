import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VaccinationListComponent} from './vaccination/vaccination-list/vaccination-list.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
