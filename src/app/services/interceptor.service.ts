
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedDataService } from './shared-data.service';

@Injectable({
    providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

    constructor(private share: SharedDataService,private injector:Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const url: any = "https://platform.ucx.zone:2053";

        const urlarr = req.url.split('://');

        const token: string = localStorage.getItem('token');
        const lang: string = 'en';

        // const token: any = this.share.getToken().value;

        if (urlarr.length > 1) {
            req = req.clone({
                url: req.url
            });
        } else {
            req = req.clone({

                url: url + req.url

            });
        }


        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
        if (token) {  // authorization
            req = req.clone({ headers: req.headers.set('authorization', `${token}`) });
            req = req.clone({ headers: req.headers.set('Accept-Language', lang) });
        }
        return next.handle(req);
    }
}
