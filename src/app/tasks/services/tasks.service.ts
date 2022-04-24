import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public tasks:BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private http:HttpClient) { }

  getAllTasks():Observable<any>{
    return this.http.get('getAllTasks').pipe(take(1))
  }
  deleteTask(id):Observable<any>{
    return this.http.delete('deleteTask/'+id).pipe(take(1))
  }
  manageTasks(tasks):Observable<any>{
    return this.http.post('manageTasks',tasks).pipe(take(1))
  }
  getProjects():Observable<any>{
    return this.http.get('getAllProjects').pipe(take(1))
  }
  getcategories():Observable<any>{
    return this.http.get('getAllCategories').pipe(take(1))
  }
  getTaskTypes(id):Observable<any>{
    return this.http.get(`getLookupDetailBasedMaster/${id}`).pipe(take(1))
  }
  getCurrencies(id):Observable<any>{
    return this.http.get(`getLookupDetailBasedMaster/${id}`).pipe(take(1))
  }
  getSurvey():Observable<any>{
    return this.http.get('getAllSurvies').pipe(take(1))
  }
  getUploadedTasks():Observable<any>{
    // return this.http.get('getUploadedTasks').pipe(take(1))
    let res = {
      Value:[
        {
          id:1,
          taskTitle:"test",
          price:'EGP 500',
          startDate:"7/7/2022",
          endDate:"7/9/2022",
          customers:[
            {
              id:2,
              name:"Mobasher",
              email:"a@a.com",
              phoneNumber:"001022320329",
              answers:[
                {
                  question:"test question",
                  answer:"sjskjjs"
                },
                {
                  question:"test question",
                  answer:"sjskjjs"
                },
              ]
            },
            {
              name:"Mobasher2",
              email:"a22@a.com",
              phoneNumber:"34341022320329",
              answers:[
                {
                  question:"test skks",
                  answer:"4"
                }
              ]
            },
          ]
        },
        {
          taskTitle:"test",
          price:'EGP 500',
          startDate:"7/7/2022",
          endDate:"7/9/2022",
          customers:[
            {
              name:"Mobasher",
              email:"a@a.com",
              phoneNumber:"001022320329",
              answers:[
                {
                  question:"test question",
                  answer:"sjskjjs"
                },
                {
                  question:"test question",
                  answer:"sjskjjs"
                },
              ]
            },
            {
              name:"Mobasher2",
              email:"a22@a.com",
              phoneNumber:"34341022320329",
              answers:[
                {
                  question:"test skks",
                  answer:"4"
                }
              ]
            },
          ]
        },
      ]
    }
    let resObs = of(res);
    return resObs
  }
  changeUploadedTaskStatus(body):Observable<any>{
    return this.http.post('changeUploadedTaskStatus',body).pipe(take(1))
  }

  
}
