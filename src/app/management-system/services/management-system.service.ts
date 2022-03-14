import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { createRoleAndItsPermissionsRequestDto, permissions } from '../dataModels/management-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManagementSystemService {

  constructor(private http:HttpClient) { }

  getPermissions():Observable<any>{
   return this.http.get('getPermissions').pipe(take(1))
  }
  getScreenButtons(screenId:number[]):Observable<any>{
    return this.http.post('screenActions',{screenId:screenId}).pipe(take(1))
  }
  createRoleAndItsPermissions(body:createRoleAndItsPermissionsRequestDto):Observable<any>{
    return this.http.post('createRoleAndItsPermissions',body).pipe(take(1))
  }
  getRoles():Observable<any>{
    return this.http.get('getRoles').pipe(take(1))
  }
  deleteRole(RoleId:number):Observable<any>{
    return this.http.delete('deleteRole/'+RoleId).pipe(take(1))
  }

}
