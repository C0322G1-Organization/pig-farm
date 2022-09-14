import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListPigstyComponent} from './list-pigsty/list-pigsty.component';
import {PigstyCreateComponent} from './pigsty-create/pigsty-create.component';
import {PigstyEditComponent} from './pigsty-edit/pigsty-edit.component';


const routes: Routes = [
  {
    path: 'pigsty/list',
    component: ListPigstyComponent
  },
  {path: 'pigsty/create', component: PigstyCreateComponent},
  {path: 'pigsty/edit/:id', component: PigstyEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigstyRoutingModule { }
