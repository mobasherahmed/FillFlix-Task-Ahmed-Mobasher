import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http:HttpClient) { }

  listUsers():Observable<any>{
    // return this.http.get('getUsers').pipe(take(1))
    let obj = {
      Value:[
        {
          name:"string",
          email:"string@d.com",
          phoneNumber:"01002883308",
          roleId:"string",
        }
      ]
    }
    let resOBS= of(obj);
    return resOBS;
  }
  addUser(user):Observable<any>{
    return this.http.post('addUser',user).pipe(take(1))
  }

}
