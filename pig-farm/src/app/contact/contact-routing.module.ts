import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContactListComponent} from './contact-list/contact-list.component';


const routes: Routes = [{
  path: 'contact',
  component: ContactListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {
}
