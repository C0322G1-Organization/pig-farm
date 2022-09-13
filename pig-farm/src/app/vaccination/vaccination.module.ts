import {NgModule} from '@angular/core';
import {VaccinationListComponent} from './vaccination-list/vaccination-list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
