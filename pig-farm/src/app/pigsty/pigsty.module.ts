import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigstyRoutingModule } from './pigsty-routing.module';
import {ListPigstyComponent} from './list-pigsty/list-pigsty.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PigstyCreateComponent} from './pigsty-create/pigsty-create.component';
import {PigstyEditComponent} from './pigsty-edit/pigsty-edit.component';


@NgModule({
  declarations: [
    ListPigstyComponent,
    PigstyCreateComponent,
    PigstyEditComponent
  ],
    imports: [
        CommonModule,
        PigstyRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class PigstyModule { }
