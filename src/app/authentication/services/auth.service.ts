import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail:BehaviorSubject<string>=new BehaviorSubject('')
  constructor(private http:HttpClient) { }

  activeUser(code):Observable<any>{
   return this.http.post('activateUser',{activationCode:code}).pipe(take(1));
  }
  resetPassword(body):Observable<any>{
    return this.http.post('resetPassword',body).pipe(take(1))
  }
  forgetPassword(body):Observable<any>{
    return this.http.post('forgetPassword',body).pipe(take(1))
  }

}
