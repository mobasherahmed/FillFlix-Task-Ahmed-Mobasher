import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-role-permissions-modal',
  templateUrl: './view-role-permissions-modal.component.html',
  styleUrls: ['./view-role-permissions-modal.component.scss']
})
export class ViewRolePermissionsModalComponent implements OnInit {

  message: string = "Premissions of role";
  confirmButtonText = "Ok";
  permissions: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<ViewRolePermissionsModalComponent>) { 
    if(data){
      this.permissions= data.permissions;
      this.message = this.message + ' ' + data.name;
    }
  }

  ngOnInit(): void {
  }

  onConfirmClick(){
    this.dialogRef.close(true);

  }
}
