import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { addedUser } from '../../interfaces/added-user-interface';
import { XappApiService } from '../../services/xapp-api.service';

export interface DialogData {
  type : string;
  name?:string,
  job?:string;
}

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  Form:FormGroup;
  mode: string = 'add';
  constructor(public dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb:FormBuilder,private xapp:XappApiService,
    private toaster:ToastrService,private dialog: MatDialog) {
    this.Form = this.fb.group({
      name:['',Validators.required],
      job:['',Validators.required]
    })
   }

  ngOnInit(): void {
    if(this.data.type === 'update') this.setValues();

  }

  setValues(){
    this.mode = 'update'
    this.Form.controls.name.setValue(this.data.name)
    this.Form.controls.job.setValue(this.data.job)
  }

  submitForm(){
  this.mode === 'add' ? this.addUser() : this.updateUser();
  }
  
  addUser(){
    this.xapp.addUser(this.Form.value).subscribe(res=>{
      this.toaster.success('User added successfully','Great');
    },err=>{
      this.toaster.error(err.error)
    })
  }
  
  updateUser(){
    this.xapp.updateUser(this.Form.value).subscribe(res=>{
      this.toaster.success('User Updated successfully','Great');
    },err=>{
      this.toaster.error(err.error)
    })
  }


}
