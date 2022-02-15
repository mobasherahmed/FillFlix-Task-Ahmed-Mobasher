import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class TwoFactorAuthenticationGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        if (localStorage.getItem('2FA') === 'true') {
            return true;
        }

        this.router.navigate(['/phone']);
        return false;
    }
}
