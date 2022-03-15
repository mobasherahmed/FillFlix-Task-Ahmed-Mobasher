import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http:HttpClient) { }

  listUsers():Observable<any>{
    return this.http.get('getUsers').pipe(take(1))
  }
  addUser(user):Observable<any>{
    return this.http.post('addUser',user).pipe(take(1))
  }
  updateUser(userId,user):Observable<any>{
    return this.http.put('updateUser/'+userId,user).pipe(take(1))
  }
  deleteUser(userId):Observable<any>{
    return this.http.delete('deleteUser/'+userId).pipe(take(1))
  }
  updateUserStatus(userId:number,status:number):Observable<any>{
    return this.http.put('updateUserStatus/'+userId,{status:status}).pipe(take(1))
  }
  updateUserRole(userId:number,role:number):Observable<any>{
    return this.http.put('updateUserRole/'+userId,{role:role}).pipe(take(1))
  }

}
