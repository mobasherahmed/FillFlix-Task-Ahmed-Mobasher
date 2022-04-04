import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects:BehaviorSubject<any>=new BehaviorSubject([])
  constructor(private http:HttpClient) { }

  addProject(project):Observable<any>{
    return this.http.post('createProject',project).pipe(take(1))
  }
  updateProject(id,project):Observable<any>{
    return this.http.post('createProject',project).pipe(take(1))
  }
}
