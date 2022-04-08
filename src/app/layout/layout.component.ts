import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomizerService } from '../shared/services/customizer.service';
import { SharedDataService } from '../shared/services/shared-data.service';

@Component({
    selector: 'app-layout',
    template:`
    <app-topnav></app-topnav>
    <app-sidebar></app-sidebar>
    <div class="main-container">
        <router-outlet></router-outlet>
        <div class="loader" *ngIf="showLoader">
            <mat-spinner></mat-spinner>
        </div>
    </div>

    `
})
export class LayoutComponent implements OnInit {
    showLoader:boolean=false;
    constructor(private translate:TranslateService,private customize:CustomizerService,private share:SharedDataService) {
        translate.setDefaultLang('en');
        customize.setLayoutType('ltr')
        localStorage.setItem('lang','en')
    }

    ngOnInit() {
        this.share.showLoader.subscribe(loader=>{
            this.showLoader = loader;
        })
     }

     ngOnDestroy(){
        //  this.share.showLoader.unsubscribe();
     }
}
