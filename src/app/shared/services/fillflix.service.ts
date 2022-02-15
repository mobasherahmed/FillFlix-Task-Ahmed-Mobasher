import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class FillflixService {
  url :string = 'https://reqres.in/api';
  users = new BehaviorSubject<User[]>([])
  
  constructor(private http:HttpClient) { }
  

  login(user):Observable<any>{
    return this.http.post(`${this.url}/login`,user).pipe(take(1));
  }
  listUsers():Observable<any>{
    return this.http.get(`${this.url}/users?page=2`).pipe(take(1));
  }
  oneUser():Observable<any>{
    return this.http.get(`${this.url}/users/2`).pipe(take(1));
  }
  addUser(user):Observable<any>{
    return this.http.post(`${this.url}/users`,user).pipe(take(1));
  }
  updateUser(user):Observable<any>{
    return this.http.put(`${this.url}/users/2`,user).pipe(take(1));
  }
  deleteUser():Observable<any>{
    return this.http.delete(`${this.url}/users/2`).pipe(take(1));
  }
}
