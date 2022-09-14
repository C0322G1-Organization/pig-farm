

import { PlacementListComponent } from './placement-list/placement-list.component';
import { AdvertisementPostComponent } from './advertisement-post/advertisement-post.component';
import { AdvertisementEditComponent } from './advertisement-edit/advertisement-edit.component';
import {ListComponent} from './advertisement-list/list.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdvertisementRoutingModule} from './advertisement-routing.module';
import {NgModule} from '@angular/core';



@NgModule({
  declarations: [ ListComponent, PlacementListComponent, AdvertisementPostComponent, AdvertisementEditComponent],

  imports: [
    CommonModule,
    FormsModule,
    AdvertisementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdvertisementModule {
}
