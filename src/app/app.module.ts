import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FillflixService } from './shared/services/fillflix.service';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';

// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

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
        ToastrModule.forRoot(),
    ],
    providers: [FillflixService],
    bootstrap: [AppComponent]
})
export class AppModule {}
