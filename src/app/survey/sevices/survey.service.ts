import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  survey:BehaviorSubject<any>=new BehaviorSubject([])
  constructor(private http:HttpClient) { }

  manageSurvey(survey):Observable<any>{
    return this.http.post('manageSurveies',survey).pipe(take(1))
  }
  getSurvey():Observable<any>{
    return this.http.get('getAllSurvies').pipe(take(1))
  }
  deleteSurvey(id,type):Observable<any>{
    return this.http.delete(`deleteSurvey/${type}/${id}`).pipe(take(1))
  }
  getanswerTypes(id):Observable<any>{
    return this.http.get(`getLookupDetailBasedMaster/${id}`).pipe(take(1))
 }
  

}
