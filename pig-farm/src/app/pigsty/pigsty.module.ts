import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigstyRoutingModule } from './pigsty-routing.module';
import {ListPigstyComponent} from './list-pigsty/list-pigsty.component';
import {HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ListPigstyComponent,
  ],
    imports: [
        CommonModule,
        PigstyRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class PigstyModule { }
