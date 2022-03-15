import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ManagementSystemService } from 'src/app/management-system/services/management-system.service';
import { User } from '../../interfaces/user-interface';
import { SharedDataService } from '../../services/shared-data.service';
import { XappApiService } from '../../services/xapp-api.service';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
import { ViewRolePermissionsModalComponent } from '../view-role-permissions-modal/view-role-permissions-modal.component';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent implements OnInit {

  displayedColumns = ['no', 'name','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  roles: any;

  constructor(private management:ManagementSystemService,private share:SharedDataService,private router:Router,public dialog: MatDialog) { 
   this.management.getRoles().subscribe(res=>{
     this.roles = res.Value;
      this.dataSource = new MatTableDataSource(res.Value);
    })
  }
  
  ngOnInit(): void {
  }

  openDeleteDialog(roleId:number){
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
        this.management.deleteRole(roleId).subscribe(res=>{
         this.roles = this.roles.filter(item=>item.id !== roleId);
         this.dataSource = new MatTableDataSource(this.roles)
        })
      }
  });
  }

  ViewPermissions(item){
    const dialogRef = this.dialog.open(ViewRolePermissionsModalComponent, {data: item});
  //   dialogRef.afterClosed().subscribe((confirmed: boolean) => {
  //     if (confirmed) {
  //     }
  // });
  }
 
  editRoles(item){
    this.share.updateItem.next(item);
    this.router.navigate(['/management/AccessRuleForm'])
  }

}
