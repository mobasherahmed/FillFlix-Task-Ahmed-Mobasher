import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { SharedDataService } from '../services/shared-data.service';

@Injectable()
export class Authorization implements CanActivate {
    constructor(private router: Router,private share:SharedDataService) {
   
    }
    

    canActivate() {
        let urls:string[] = this.share.urls.getValue();
        return true;
    
    }
}
