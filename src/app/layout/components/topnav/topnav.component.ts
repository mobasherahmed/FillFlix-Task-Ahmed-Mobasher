import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CustomizerService } from 'src/app/shared/services/customizer.service';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;

    constructor(public router: Router,private translate:TranslateService,private customize:CustomizerService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.removeItem('token');
        localStorage.removeItem('2FA');
        this.router.navigate(['/login']);
    }

    changeLang(){
        if(localStorage.getItem('lang') === 'en'){
            this.translate.use('ar');
            localStorage.setItem('lang','ar');
            this.customizeLayoutType('rtl');
            document.getElementsByTagName('html')[0].setAttribute('lang', 'ar');
        }else{
            this.translate.use('en');
            localStorage.setItem('lang','en');
            this.customizeLayoutType('ltr');
            document.getElementsByTagName('html')[0].setAttribute('lang', 'en');

        }
    }

    customizeLayoutType(val) {
        this.customize.setLayoutType(val)
        
      }

  
}
