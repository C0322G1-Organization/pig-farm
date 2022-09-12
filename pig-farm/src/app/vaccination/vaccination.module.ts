import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import {VaccinationRoutingModule} from './vaccination-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VaccinationCreateComponent} from './vaccination-create/vaccination-create.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [VaccinationCreateComponent],
  imports: [
    CommonModule,
    VaccinationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class VaccinationModule { }
