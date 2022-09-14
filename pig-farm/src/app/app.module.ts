import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// @ts-ignore

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {environment} from '../environments/environment';
// @ts-ignore
import {HttpClientModule} from '@angular/common/http';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
// @ts-ignore
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

import {BodyModule} from './body/body.module';
import {VaccinationModule} from './vaccination/vaccination.module';
import {TreatmentModule} from './treatment/treatment.module';
import {StorageModule} from './storage/storage.module';
import {NotificationModule} from './notification/notification.module';
import {AdvertisementModule} from './advertisement/advertisement.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    VaccinationModule,
    StorageModule,
    BodyModule,
    TreatmentModule,
    NotificationModule,
    AdvertisementModule,
    ToastrModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
