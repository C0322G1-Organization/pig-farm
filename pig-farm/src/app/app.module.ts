import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// @ts-ignore

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {environment} from '../environments/environment';
// @ts-ignore

import {HttpClientModule} from '@angular/common/http';
import {PostAdvertisementComponent} from './advertisement/post-advertisement/post-advertisement.component';
import {UpdateAdvertisementComponent} from './advertisement/update-advertisement/update-advertisement.component';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
// @ts-ignore
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
