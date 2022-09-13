import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostAdvertisementComponent} from './post-advertisement/post-advertisement.component';
import {UpdateAdvertisementComponent} from './update-advertisement/update-advertisement.component';

import {ListAdvertisementComponent} from "./list-advertisement/list-advertisement.component";


const routes: Routes = [
  {
    path: 'list',
    component: ListAdvertisementComponent
  },
 {
    path: 'post',
    component: PostAdvertisementComponent
  }, {
    path: 'edit/:id',
    component: UpdateAdvertisementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisementRoutingModule { }
