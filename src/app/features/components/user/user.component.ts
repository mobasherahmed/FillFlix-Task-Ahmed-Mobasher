import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FillflixService } from 'src/app/shared/services/fillflix.service';

@Component({
  selector: 'app-user',
  template: `<app-mat-table></app-mat-table>`,
})
export class UserComponent implements OnInit {

  constructor(private fillflix:FillflixService,private toaster:ToastrService) {
    this.getOneUser()
  }

  ngOnInit(): void {
  }

  getOneUser(){
    let items = [];
    this.fillflix.oneUser().subscribe(res=>{
      items.push(res.data)
      this.fillflix.users.next(items);
    },err=>{
      this.toaster.error(err.error);
    }) 
  }

}
