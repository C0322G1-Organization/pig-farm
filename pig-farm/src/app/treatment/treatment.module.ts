import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {TreatmentRoutingModule} from './treatment-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {ListTreatmentComponent} from './list-treatment/list-treatment.component';
import {CreateTreatmentComponent} from './create-treatment/create-treatment.component';

@NgModule({
  declarations: [
    ListTreatmentComponent,
    CreateTreatmentComponent

  ],
  imports: [
    BrowserModule,
    TreatmentRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: []
})
export class TreatmentModule {
}
