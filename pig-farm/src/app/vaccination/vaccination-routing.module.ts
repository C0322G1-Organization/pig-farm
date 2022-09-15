import {RouterModule, Routes} from '@angular/router';
import {VaccinationCreateComponent} from './vaccination-create/vaccination-create.component';
import {NgModule} from '@angular/core';
import {VaccinationListComponent} from './vaccination-list/vaccination-list.component';

const routes: Routes = [
  {
    path: 'vaccination',
    component: VaccinationListComponent
  },
  {
    path: 'api/vaccination/create',
    component: VaccinationCreateComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class VaccinationRoutingModule { }
