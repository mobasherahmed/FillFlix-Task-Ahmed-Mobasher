import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { XappApiService } from 'src/app/shared/services/xapp-api.service';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
 
})
export class UsersComponent implements OnInit {

  displayedColumns = ['no', 'name', 'role','phoneNumber','email','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  constructor(private xapp:XappApiService,private toaster:ToastrService,
    private share:SharedDataService,private _feature:FeatureService,private router:Router) {
   this.listUsers();
  }

 ngOnInit(): void {
     
 }

 listUsers(){
  this._feature.listUsers().subscribe(res=>{
  console.log("res",res);
  this.dataSource = new MatTableDataSource(res.Value);
 })
}

 editUser(item){
   this.share.updateItem.next(item);
   this.router.navigate(['/features/UserForm'])
 }

 openDeleteDialog(id){}
}
