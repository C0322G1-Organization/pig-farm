import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FoodCreateComponent} from "./food-create/food-create.component";
import {FoodEditComponent} from "./food-edit/food-edit.component";


const routes: Routes = [
  {path: "food/create", component: FoodCreateComponent   },
  {path: "food/edit/:id", component: FoodEditComponent   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
