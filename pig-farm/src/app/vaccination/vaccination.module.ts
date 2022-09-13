import {NgModule} from '@angular/core';
import {VaccinationListComponent} from './vaccination-list/vaccination-list.component';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {VaccinationRoutingModule} from './vaccination-routing.module';


@NgModule({
  declarations: [
    VaccinationListComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    VaccinationRoutingModule,
    FormsModule
  ]
})
export class VaccinationModule {
}
