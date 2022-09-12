import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StorageListComponent} from './storage-list/storage-list.component';
import {StorageCreateComponent} from './storage-create/storage-create.component';


const routes: Routes = [
  {path: 'storage/page', component: StorageListComponent},
  {path: 'storage/create', component: StorageCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule {
}
