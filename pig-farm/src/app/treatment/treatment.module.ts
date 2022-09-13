import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {TreatmentRoutingModule} from './treatment-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TreatmentListComponent} from './list-treatment/treatment-list.component';
import {TreatmentCreateComponent} from './create-treatment/treatment-create.component';

@NgModule({
  declarations: [
    TreatmentListComponent,
    TreatmentCreateComponent

  ],
  imports: [
    BrowserModule,
    TreatmentRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: []
})
export class TreatmentModule {
}
