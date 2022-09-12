import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PigComponent } from './pig/pig.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pig'},
  {path: 'pig', component: PigComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PigComponent
  ],
    imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule,
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes),
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
        preventDuplicates: true
      })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
