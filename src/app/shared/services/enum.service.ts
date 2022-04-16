import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }
  screen=1;
  button=2;
  approved = 3;
  rejected = 4;
  pending = 5;
  taskTypes = 4;
  currecies=5;
  answerTypes=3;
}
