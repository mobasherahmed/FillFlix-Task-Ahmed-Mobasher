import { Component, OnInit } from '@angular/core';
import { EnumService } from 'src/app/shared/services/enum.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
 
})
export class UsersComponent implements OnInit {

  constructor(public Enum:EnumService) {
 
  }

 ngOnInit(): void {
     
 }

}
