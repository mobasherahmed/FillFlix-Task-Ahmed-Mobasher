import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllCustomers():Observable<any>{
    // return this.http.get('getAllCustomers').pipe(take(1));
    let res = {
      Value:[
        {
          email: "xapp@gmail.com",
          id: 1,
          name: "xapp super admin",
          phoneNumber: "01023456789",
          status: 'pending'
        }
      ]
    }

    let resObs = of(res);
    return resObs;
  }

}
