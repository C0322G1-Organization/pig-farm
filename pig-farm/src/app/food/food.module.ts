import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FoodRoutingModule} from './food-routing.module';
import {FoodCreateComponent} from './food-create/food-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FoodEditComponent} from './food-edit/food-edit.component';


@NgModule({
  declarations: [FoodCreateComponent, FoodEditComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    ReactiveFormsModule
  ]
})
export class FoodModule {
}
