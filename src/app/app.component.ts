import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomizerService } from './shared/services/customizer.service';
import { SharedDataService } from './shared/services/shared-data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    showLoader:boolean=false;
    constructor(private translate:TranslateService,private customize:CustomizerService,private share:SharedDataService) {
        translate.setDefaultLang('ar');
        customize.setLayoutType('rtl')
        localStorage.setItem('lang','ar');
    }

    ngOnInit() {
        this.share.showLoader.subscribe(loader=>{
            this.showLoader = loader;
        })
     }

     ngOnDestroy(){
         this.share.showLoader.unsubscribe();
     }
    
}
