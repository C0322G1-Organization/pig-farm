import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementRoutingModule } from './advertisement-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PostAdvertisementComponent } from './post-advertisement/post-advertisement.component';
import { UpdateAdvertisementComponent } from './update-advertisement/update-advertisement.component';
import { ListPlacementComponent } from './list-placement/list-placement.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [PostAdvertisementComponent, UpdateAdvertisementComponent, ListPlacementComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdvertisementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdvertisementModule { }
