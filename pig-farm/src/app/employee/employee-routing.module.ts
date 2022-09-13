import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";


const routes: Routes = [
  {path: 'list',component:EmployeeListComponent},
  // {path: 'edit/:id',component:EmployeeListComponent},
  // {path: 'add',component:EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
