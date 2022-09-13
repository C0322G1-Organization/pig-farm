import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigRoutingModule } from './pig-routing.module';
import { PigCreateComponent } from './pig/pig-create/pig-create.component';
import { UpdatePigComponent } from './pig/update-pig/update-pig.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PigCreateComponent, UpdatePigComponent],
  imports: [
    CommonModule,
    PigRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PigModule { }
