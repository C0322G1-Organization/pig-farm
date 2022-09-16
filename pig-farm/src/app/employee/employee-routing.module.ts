import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: 'employee/list',
    component: EmployeeListComponent
  }, {
    path: 'employee/create',
    component: EmployeeCreateComponent
  }, {
    path: 'employee/edit/:id',
    component: EmployeeEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmployeeRoutingModule {
}

