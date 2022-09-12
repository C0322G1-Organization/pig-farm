import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigRoutingModule } from './pig-routing.module';
import { PigCreateComponent } from './pig/pig-create/pig-create.component';
import { EditPigComponent } from './pig/edit-pig/edit-pig.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PigCreateComponent, EditPigComponent],
  imports: [
    CommonModule,
    PigRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PigModule { }
