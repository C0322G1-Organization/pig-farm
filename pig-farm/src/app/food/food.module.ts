import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ListFoodComponent} from './list-food/list-food.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListFoodComponent],
  exports: [
    ListFoodComponent
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class FoodModule { }
