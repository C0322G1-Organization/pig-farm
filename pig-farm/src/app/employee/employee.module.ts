import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EmployeeListComponent} from './employee-list/employee-list.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})

export class EmployeeModule {
}

