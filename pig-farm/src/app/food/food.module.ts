import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ListFoodComponent} from './food-list/list-food.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FoodCreateComponent} from './food-create/food-create.component';
import {FoodEditComponent} from './food-edit/food-edit.component';


@NgModule({
  declarations: [ ListFoodComponent,
    FoodCreateComponent, FoodEditComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class FoodModule { }
