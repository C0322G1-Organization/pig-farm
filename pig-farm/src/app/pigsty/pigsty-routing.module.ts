import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListPigstyComponent} from './list-pigsty/list-pigsty.component';


const routes: Routes = [
  {
    path: 'pigsty/list',
    component: ListPigstyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigstyRoutingModule { }
