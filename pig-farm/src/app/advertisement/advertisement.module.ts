import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisementRoutingModule } from './advertisement-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PostAdvertisementComponent } from './post-advertisement/post-advertisement.component';
import { UpdateAdvertisementComponent } from './update-advertisement/update-advertisement.component';
import { ListPlacementComponent } from './list-placement/list-placement.component';
import { ListAdvertisementComponent } from './list-advertisement/list-advertisement.component';


@NgModule({
  declarations: [PostAdvertisementComponent, UpdateAdvertisementComponent, ListPlacementComponent, ListAdvertisementComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdvertisementRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdvertisementModule { }
