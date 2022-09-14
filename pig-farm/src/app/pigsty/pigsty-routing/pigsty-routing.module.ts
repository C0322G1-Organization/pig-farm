import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigstyRoutingRoutingModule } from './pigsty-routing-routing.module';
import {PigstyCreateComponent} from "../pigsty-create/pigsty-create.component";
import {PigstyEditComponent} from "../pigsty-edit/pigsty-edit.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PigstyCreateComponent,
    PigstyEditComponent,
  ],
  imports: [
    CommonModule,
    PigstyRoutingRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PigstyRoutingModule { }
