import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PigstyCreateComponent} from './pigsty-create/pigsty-create.component';
import {PigstyEditComponent} from './pigsty-edit/pigsty-edit.component';
import {PigstyListComponent} from './pigsty-list/pigsty-list.component';


const routes: Routes = [
  {
    path: 'pigsty/list',
    component: PigstyListComponent
  },
  {path: 'pigsty/create', component: PigstyCreateComponent},
  {path: 'pigsty/edit/:id', component: PigstyEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigstyRoutingModule { }
