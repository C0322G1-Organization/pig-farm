import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateComponent} from './createNotification/create.component';
import {EditComponent} from './editNotification/edit.component';


const routes: Routes = [
  {
    path: 'add',
    component: CreateComponent
  },
  {
    path: 'edit/update/:id',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
