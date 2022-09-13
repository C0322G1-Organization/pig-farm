import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BodyRoutingModule} from './body-routing.module';
import {BodyComponent} from './body.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InfoNewsComponent} from './info-news/info-news.component';
import {ContactModule} from '../contact/contact.module';


@NgModule({
  declarations: [
    BodyComponent,
    InfoNewsComponent
  ],
    imports: [
        CommonModule,
        BodyRoutingModule,
        ReactiveFormsModule,
        ContactModule
    ]
})
export class BodyModule {
}
