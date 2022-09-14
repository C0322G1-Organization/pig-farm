import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigstyRoutingModule } from './pigsty-routing.module';
<<<<<<< HEAD
import {PigstyListComponent} from './pigsty-list/pigsty-list.component';
import {HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
=======
import {ListPigstyComponent} from './list-pigsty/list-pigsty.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PigstyCreateComponent} from './pigsty-create/pigsty-create.component';
import {PigstyEditComponent} from './pigsty-edit/pigsty-edit.component';
>>>>>>> 979d198eb4f64ea1367dc5a0bdce5fb4b48f3992


@NgModule({
  declarations: [
    PigstyListComponent,
  ],
    imports: [
        CommonModule,
        PigstyRoutingModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class PigstyModule { }
