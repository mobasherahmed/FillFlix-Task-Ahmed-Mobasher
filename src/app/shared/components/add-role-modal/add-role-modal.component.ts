import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ManagementSystemService } from 'src/app/management-system/services/management-system.service';
@Component({
  selector: 'app-add-role-modal',
  templateUrl: './add-role-modal.component.html',
  styleUrls: ['./add-role-modal.component.scss']
})
export class AddRoleModalComponent implements OnInit {
  roles: any;
  roleId = new FormControl('',Validators.required)
  message: string = "Please add role to this user!";
  confirmButtonText = "Save";
  cancelButtonText = "Cancel";
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private _management:ManagementSystemService,
  private dialogRef: MatDialogRef<AddRoleModalComponent>) { 
    this.getRoles();

  }

  ngOnInit(): void {
  }

  
  getRoles(){
    this._management.getRoles().subscribe(res=>{
      this.roles = res.Value; 
     })
  }

  onConfirmClick(): void {
    this.dialogRef.close(this.roleId.value);
}

}
