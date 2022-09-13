import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExportPortCreateComponent} from './export-port-create/export-port-create.component';
import {ExportPortUpdateComponent} from './export-port-update/export-port-update.component';
import {ExportRoutingModule} from './export-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ExportPortCreateComponent,
    ExportPortUpdateComponent
  ],
  imports: [
    CommonModule,
    ExportRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class ExportModule {
}
