import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddRoleModalComponent } from 'src/app/shared/components/add-role-modal/add-role-modal.component';
import { ModalConfirmationComponent } from 'src/app/shared/components/modal-confirmation/modal-confirmation.component';
import { EnumService } from 'src/app/shared/services/enum.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { XappApiService } from 'src/app/shared/services/xapp-api.service';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'app-users-list-mat-table',
  templateUrl: './users-list-mat-table.component.html',
  styleUrls: ['./users-list-mat-table.component.scss']
})
export class UsersListMatTableComponent implements OnInit {
  @Input() status;
  displayedColumns = ['no', 'name', 'role','phoneNumber','email','status','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  users: any[]=[];
  constructor(private xapp:XappApiService,private toaster:ToastrService,public Enum:EnumService,
    private share:SharedDataService,private _feature:FeatureService,private router:Router,public dialog: MatDialog) {
   this.listUsers();


  }
  ngOnInit(): void {
  }
 
  ngOnChanges(){
   
    
  }

  filterUsers(){
      this.users = this.users.filter(user=>user.status == this.status);
      this.dataSource = new MatTableDataSource(this.users);
  }
  
 listUsers(){
  this._feature.listUsers().subscribe(res=>{
  this.users = res.Value;
  this.dataSource = new MatTableDataSource(res.Value);
  this.filterUsers();

 })
}

editUser(item){
  this.share.updateItem.next(item);
  this.router.navigate(['/features/UserForm'])
}

openDeleteDialog(userId:number){
  const dialogRef = this.dialog.open(ModalConfirmationComponent, {
    data: {
        message: "Are you sure want to delete?",
        buttonText: {
            ok: "Ok",
            cancel: "No",
        },
    },
});
  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this._feature.deleteUser(userId).subscribe(res=>{
       this.users = this.users.filter(item=>item.id !== userId);
       this.dataSource = new MatTableDataSource(this.users)
      })
    }
});
}

addRoleToUserBeforeApprove(userId,status){
  const dialogRef = this.dialog.open(AddRoleModalComponent);
  dialogRef.afterClosed().subscribe((roleId:number)=>{
    if(roleId){
      this.updateUserRole(userId,roleId,status)
    }
  })
}

updateUserRole(userId,roleId,status){
this._feature.updateUserRole(userId,roleId).subscribe(res=>{
      this.updateUserStatus(userId,status)
})
}
updateUserStatus(userId,status){
  this._feature.updateUserStatus(userId,status).subscribe(res=>{
      this.listUsers();
  })
  
}

}
