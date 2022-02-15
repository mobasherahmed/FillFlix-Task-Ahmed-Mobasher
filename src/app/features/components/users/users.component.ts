import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FillflixService } from 'src/app/shared/services/fillflix.service';

@Component({
  selector: 'app-users',
  template: `<app-mat-table></app-mat-table>`,
 
})
export class UsersComponent implements OnInit {

  constructor(private fillflix:FillflixService,private toaster:ToastrService) {
   this.listUsers();
  }

 ngOnInit(): void {
     
 }

 listUsers(){
  this.fillflix.listUsers().subscribe(res=>{
    this.fillflix.users.next(res.data);
    },err=>{
        this.toaster.error(err.error)
    })
 }

}
