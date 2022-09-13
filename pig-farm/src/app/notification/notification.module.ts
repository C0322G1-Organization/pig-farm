import { NgModule } from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditComponent} from './editNotification/edit.component';
import {CreateComponent} from './createNotification/create.component';

@NgModule({
  declarations: [],
  exports: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class NotificationModule { }
