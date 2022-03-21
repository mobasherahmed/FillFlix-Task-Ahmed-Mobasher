import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { XappApiService } from './shared/services/xapp-api.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ManagementSystemModule } from './management-system/management-system.module';
import { InterceptorService } from './shared/services/interceptor.service';

const firebaseConfig = {
    apiKey: "AIzaSyAmSAFsKhV1h28beWOC-XRNrMNW0CJBOjM",
    authDomain: "fillflix-task.firebaseapp.com",
    databaseURL: "https://fillflix-task-default-rtdb.firebaseio.com",
    projectId: "fillflix-task",
    storageBucket: "fillflix-task.appspot.com",
    messagingSenderId: "988625109369",
    appId: "1:988625109369:web:c567ca39046427af176fa8",
    measurementId: "G-N5SS0S7CWV"
  };

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    const path = window.location.origin + '/assets/i18n/';
    return new TranslateHttpLoader(http, path, '.json');

}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
        ManagementSystemModule,
        NgMultiSelectDropDownModule.forRoot(),
        TranslateModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            },
          }),
        ToastrModule.forRoot(),
        NgxIntlTelInputModule
    ],
    providers: [XappApiService,
      { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
