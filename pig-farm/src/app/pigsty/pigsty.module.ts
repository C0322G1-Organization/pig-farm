import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PigstyRoutingModule } from './pigsty-routing.module';
import {PigstyListComponent} from './pigsty-list/pigsty-list.component';
import {HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';


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
