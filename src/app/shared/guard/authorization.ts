import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { NavService } from '../services/nav.service';

@Injectable()
export class Authorization implements CanActivate {
    constructor(private router: Router,private nav:NavService) {
   
    }
    

    canActivate() {
        let urls:string[] = this.nav.urls.getValue();
        
        this.router.events.subscribe(event=>{
            if(event instanceof NavigationEnd){    
                console.log("event",event.url);
                        
              if(urls.includes(event.url)){
                return true;
              }
              
            this.router.navigate(['/login']);
            return false;
              
            }
        })
        return true;
    
    }
}
