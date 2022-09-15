
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdvertisementPostComponent} from './advertisement-post/advertisement-post.component';
import {AdvertisementEditComponent} from './advertisement-edit/advertisement-edit.component';
import {ListComponent} from './advertisement-list/list.component';

const routes: Routes = [
  {
    path: 'advertisement/page',
    component: ListComponent
  },
  {
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


