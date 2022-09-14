import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdvertisementComponent} from './advertisement-list/advertisement.component';
import {AdvertisementPostComponent} from './advertisement-post/advertisement-post.component';
import {AdvertisementEditComponent} from './advertisement-edit/advertisement-edit.component';

const routes: Routes = [
  {
    path: 'advertisement/page',
    component: AdvertisementComponent
  }, {
    path: 'advertisement/post',
    component: AdvertisementPostComponent
  }, {
    path: 'advertisement/edit/:id',
    component: AdvertisementEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdvertisementRoutingModule {
}


