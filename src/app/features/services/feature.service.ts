import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http:HttpClient) { }

  addUser(user):Observable<any>{
    return this.http.post('addUser',user).pipe(take(1))
  }

}
