import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostAdvertisementComponent} from './post-advertisement/post-advertisement.component';
import {UpdateAdvertisementComponent} from './update-advertisement/update-advertisement.component';




const routes: Routes = [
 {
    path: 'advertisement/post',
    component: PostAdvertisementComponent
  }, {
    path: 'advertisement/edit/:id',
    component: UpdateAdvertisementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisementRoutingModule { }
