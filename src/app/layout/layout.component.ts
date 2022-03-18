import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomizerService } from '../shared/services/customizer.service';

@Component({
    selector: 'app-layout',
    template:`
    <app-topnav></app-topnav>
    <app-sidebar></app-sidebar>
    <div class="main-container">
        <router-outlet></router-outlet>
    </div>
    `
})
export class LayoutComponent implements OnInit {
    constructor(private translate:TranslateService,private customize:CustomizerService) {
        translate.setDefaultLang('en');
        customize.setLayoutType('ltr')
        localStorage.setItem('lang','en')
    }

    ngOnInit() { }
}
