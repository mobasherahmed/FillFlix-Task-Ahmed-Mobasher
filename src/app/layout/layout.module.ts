import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        LayoutRoutingModule,
        MaterialModule,
        SharedModule,
        CommonModule,
        FormsModule,
        TranslateModule.forChild()
    ],
    declarations: [
        LayoutComponent,
        TopnavComponent,
        SidebarComponent,
        HeaderComponent
    ],

})
export class LayoutModule { }
