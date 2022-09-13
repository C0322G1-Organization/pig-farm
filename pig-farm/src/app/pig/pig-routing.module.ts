import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PigCreateComponent} from './pig/pig-create/pig-create.component';
import {UpdatePigComponent} from './pig/update-pig/update-pig.component';


const routes: Routes = [
  {
    path: 'pig/create', component: PigCreateComponent
  },
  {
    path: 'pig/update/:id', component: UpdatePigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigRoutingModule {
}
