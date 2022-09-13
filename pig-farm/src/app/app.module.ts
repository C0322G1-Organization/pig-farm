import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {VaccinationListComponent} from './vaccination/vaccination-list/vaccination-list.component';
import {VaccinationModule} from './vaccination/vaccination.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    VaccinationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
