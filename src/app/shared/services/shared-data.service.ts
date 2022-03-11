import { Injectable } from '@angular/core';
import { dropdownSettings } from '../interfaces/multi-selection-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public dropdownSettings:dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  constructor() { }
}
