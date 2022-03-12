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
   return this.http.get('getPermissions').pipe(take(1))
  }

}
