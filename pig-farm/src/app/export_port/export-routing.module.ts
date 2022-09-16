import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExportPortCreateComponent} from './export-port-create/export-port-create.component';
import {ExportPortUpdateComponent} from './export-port-update/export-port-update.component';


const routes: Routes = [
  {path: 'export/create', component: ExportPortCreateComponent},
  {path: 'export/update/:id', component: ExportPortUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportRoutingModule {
}
