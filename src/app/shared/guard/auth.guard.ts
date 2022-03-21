import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,private share:SharedDataService) {}

    canActivate() {
        
        if(this.share.token.getValue() !== ''){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
