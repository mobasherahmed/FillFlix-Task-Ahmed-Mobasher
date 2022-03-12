import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RegisterUserDtoRequest, UserDtoRequest } from '../shared/interfaces/data-interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(user:UserDtoRequest):Observable<any>{
    return this.http.post('login',user).pipe(take(1))
  }
  Register(user:RegisterUserDtoRequest):Observable<any>{
    return this.http.post('register',user).pipe(take(1))
  }
}
