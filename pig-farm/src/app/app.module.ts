import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { PigstyCreateComponent } from './pigsty/pigsty-create/pigsty-create.component';
import { PigstyEditComponent } from './pigsty/pigsty-edit/pigsty-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PigstyCreateComponent,
    PigstyEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
