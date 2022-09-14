import {RouterModule, Routes} from '@angular/router';
import {VaccinationCreateComponent} from './vaccination-create/vaccination-create.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
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
