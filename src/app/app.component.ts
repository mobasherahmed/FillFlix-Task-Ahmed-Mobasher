import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomizerService } from './shared/services/customizer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    constructor(private translate:TranslateService,private customize:CustomizerService) {
        translate.setDefaultLang('ar');
        customize.setLayoutType('rtl')
        localStorage.setItem('lang','ar')
    }

    ngOnInit() {
    }
    
}
