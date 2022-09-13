import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NotificationCreateComponent} from './notification-create/notification-create.component';
import {NotificationEditComponent} from './notification-edit/notification-edit.component';


const routes: Routes = [
  {
    path: 'notification',
    component: NotificationListComponent
  }, {
    path: 'notification/create',
    component: NotificationCreateComponent
  }, {
    path: 'notification/edit/:id',
    component: NotificationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
