import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FoodCreateComponent} from './food-create/food-create.component';
import {FoodEditComponent} from './food-edit/food-edit.component';
import {FoodListComponent} from './food-list/food-list.component';

const routes: Routes = [
  {
    path: 'food',
    component: FoodListComponent
  },
  {
    path: 'food/create',
    component: FoodCreateComponent
  }, {
    path: 'food/edit/:id',
    component: FoodEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule {
}
