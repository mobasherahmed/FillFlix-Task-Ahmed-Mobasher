import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { permissions } from '../dataModels/management-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManagementSystemService {

  constructor(private http:HttpClient) { }

  getPermissions():Observable<any>{
    let obj ={
      HasError: false,
      Value: [
        {
          id: 1,
          permissionName: "Users",
          permissionType: 1,
          permissionTypeName: "Screen"
        }
      ]
    }
    let resObs = of(obj)
    return resObs
  //  return this.http.get('getPermissions').pipe(take(1))
  }
  getScreenButtons(screenId:number):Observable<any>{
    let obj ={
      HasError: false,
      Value: [
        {
          id: 1,
          permissionName: "Users",
          permissionType: 1,
          permissionTypeName: "Screen"
        }
      ]
    }
    let resObs = of(obj)
    return resObs
    // return this.http.get('screenActions/'+screenId).pipe(take(1))
  }

}
