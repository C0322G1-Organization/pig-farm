import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PigstyListComponent} from './pigsty-list/pigsty-list.component';


const routes: Routes = [
  {
    path: 'pigsty/list',
    component: PigstyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigstyRoutingModule { }
