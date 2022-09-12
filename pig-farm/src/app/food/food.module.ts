import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodCreateComponent } from './food-create/food-create.component';


@NgModule({
  declarations: [FoodCreateComponent],
  imports: [
    CommonModule,
    FoodRoutingModule
  ]
})
export class FoodModule { }
