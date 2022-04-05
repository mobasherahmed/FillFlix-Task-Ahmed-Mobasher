import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddTaskRequestDTO } from '../dataModel/tasks-interface';

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
    // return this.http.get('getAllProjects').pipe(take(1))
    let obj = [
      {
        id:1,
        name:"test"
      },
      {
        id:2,
        name:"test2"
      },
    ]

    let obs = of(obj);
    return obs;
  }
  getcategories():Observable<any>{
    let obj = [
      {
        id:1,
        name:"test"
      },
      {
        id:2,
        name:"test2"
      },
    ]

    let obs = of(obj);
    return obs;
  }
}
