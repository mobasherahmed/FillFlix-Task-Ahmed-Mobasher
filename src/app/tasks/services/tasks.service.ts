import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AddTaskRequestDTO } from '../dataModel/tasks-interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getAllTasks():Observable<any>{
    return this.http.get('web/getAllTasks').pipe(take(1))
  }
  addTask(task:AddTaskRequestDTO):Observable<any>{
    return this.http.post('web/createTask',task).pipe(take(1))
  }
  updatask(taskId:number,task:AddTaskRequestDTO):Observable<any>{
    return this.http.put('web/updateTask'+taskId,task).pipe(take(1))
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
