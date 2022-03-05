import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { XappApiService } from 'src/app/shared/services/xapp-api.service';

@Component({
  selector: 'app-user',
  template: `<app-mat-table></app-mat-table>`,
})
export class UserComponent implements OnInit {

  constructor(private xapp:XappApiService,private toaster:ToastrService) {
    this.getOneUser()
  }

  ngOnInit(): void {
  }

  getOneUser(){
    let items = [];
    this.xapp.oneUser().subscribe(res=>{
      items.push(res.data)
      this.xapp.users.next(items);
    },err=>{
      this.toaster.error(err.error);
    }) 
  }

}
