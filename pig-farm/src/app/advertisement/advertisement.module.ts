import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdvertisementRoutingModule} from './advertisement-routing.module';
import {ListComponent} from './list-componenet/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    AdvertisementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdvertisementModule {
}
