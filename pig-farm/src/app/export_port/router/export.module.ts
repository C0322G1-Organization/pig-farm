import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportRoutingModule } from './export-routing.module';
import {ListComponent} from '../component/list/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ExportRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ExportModule { }
