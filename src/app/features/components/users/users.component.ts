import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { XappApiService } from 'src/app/shared/services/xapp-api.service';

@Component({
  selector: 'app-users',
  template: `<app-mat-table></app-mat-table>`,
 
})
export class UsersComponent implements OnInit {

  constructor(private xapp:XappApiService,private toaster:ToastrService) {
   this.listUsers();
  }

 ngOnInit(): void {
     
 }

 listUsers(){
  this.xapp.listUsers().subscribe(res=>{
    this.xapp.users.next(res.data);
    },err=>{
        this.toaster.error(err.error)
    })
 }

}
