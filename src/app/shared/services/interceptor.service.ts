
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedDataService } from './shared-data.service';
import { HandleApiResponseService } from './handle-api-response.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

    constructor(private share: SharedDataService,private router:Router,
      private injector:Injector,private _notify: HandleApiResponseService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
        const url: any = "https://admin.xwar.app:2052/web/";

        const urlarr = req.url.split('://');

        // const token: string = '';
        // localStorage.getItem('token')
        const lang: string = localStorage.getItem('lang');

        const token: any = this.share.token.getValue();

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
            req = req.clone({ headers: req.headers.set('language', lang) });
        }
        // return next.handle(req)    
        // returning an observable to complete the request cycle
        return new Observable((observer) => {
          next.handle(req).subscribe(
            (res: HttpResponse<any>) => {
              
              if (res instanceof HttpResponse) {
                observer.next(res);
                if(req.method !== 'GET'){
                  this._notify.SuccessMsg(res.body.message)
                }
              }
            },
            (err: HttpErrorResponse) => {
              this._notify.handleError(err);
              if(err.error.message === 'Please, confirm your email'){
                this.router.navigate(['/authentication/activateEmail'])
              }
            }
          );
        });
      }
}
