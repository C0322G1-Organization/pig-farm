import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FoodCreateComponent} from "./food-create/food-create.component";


const routes: Routes = [
  {path: "food/create", component: FoodCreateComponent   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
