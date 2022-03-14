import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { XappApiService } from 'src/app/shared/services/xapp-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
 
})
export class UsersComponent implements OnInit {

  displayedColumns = ['no', 'name', 'role','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  constructor(private xapp:XappApiService,private toaster:ToastrService) {
   this.listUsers();
  }

 ngOnInit(): void {
     
 }

 listUsers(){
  // this.xapp.listUsers().subscribe(res=>{
  //   this.xapp.users.next(res.data);
  //   },err=>{
  //       this.toaster.error(err.error)
  //   })
 }

 editUser(id){}
 openDeleteDialog(id){}
}
