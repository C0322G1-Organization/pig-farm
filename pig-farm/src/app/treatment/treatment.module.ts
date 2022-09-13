import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {TreatmentRoutingModule} from './treatment-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TreatmentCreateComponent} from './treatment-create/treatment-create.component';
import {TreatmentListComponent} from './treatment-list/treatment-list.component';

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
