import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { permissions } from '../dataModels/management-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManagementSystemService {

  constructor(private http:HttpClient) { }

  getPermissions():Observable<permissions>{
    // url=/web/getPermissions
    let object = {
      Value:[
        {
          name:'Users',
          id:1
        }
      ]
    }

    let resObs = of(object);
    return resObs
  }

}
