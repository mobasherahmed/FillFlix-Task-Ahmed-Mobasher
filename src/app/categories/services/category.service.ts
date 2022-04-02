import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories:BehaviorSubject<any> = new BehaviorSubject({})
  constructor(private http:HttpClient) { }

  addCategory(category):Observable<any>{
    return this.http.post('createCategory',category).pipe(take(1))
  }
  getCategories():Observable<any>{
    return this.http.get('getAllCategories').pipe(take(1))
  }
  updateCategory(id,category):Observable<any>{
    return this.http.put('updateCategory/'+id,category).pipe(take(1))
  }
  deleteCategory(id):Observable<any>{
    return this.http.delete('deleteCategory/'+id).pipe(take(1))
  }
}
