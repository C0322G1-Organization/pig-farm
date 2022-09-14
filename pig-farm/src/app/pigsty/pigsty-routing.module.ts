import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import {PigstyListComponent} from './pigsty-list/pigsty-list.component';
=======
import {ListPigstyComponent} from './list-pigsty/list-pigsty.component';
import {PigstyCreateComponent} from './pigsty-create/pigsty-create.component';
import {PigstyEditComponent} from './pigsty-edit/pigsty-edit.component';
>>>>>>> 979d198eb4f64ea1367dc5a0bdce5fb4b48f3992


const routes: Routes = [
  {
    path: 'pigsty/list',
<<<<<<< HEAD
    component: PigstyListComponent
  }
=======
    component: ListPigstyComponent
  },
  {path: 'pigsty/create', component: PigstyCreateComponent},
  {path: 'pigsty/edit/:id', component: PigstyEditComponent}
>>>>>>> 979d198eb4f64ea1367dc5a0bdce5fb4b48f3992
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigstyRoutingModule { }
