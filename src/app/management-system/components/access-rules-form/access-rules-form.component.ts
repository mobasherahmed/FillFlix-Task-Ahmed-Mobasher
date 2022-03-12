import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dropdownSettings } from 'src/app/shared/interfaces/multi-selection-interfaces';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { XappApiService } from 'src/app/shared/services/xapp-api.service';
import { permission, permissions } from '../../dataModels/management-interfaces';
import { ManagementSystemService } from '../../services/management-system.service';

@Component({
  selector: 'app-access-rules-form',
  templateUrl: './access-rules-form.component.html',
  styleUrls: ['./access-rules-form.component.scss']
})
export class AccessRulesFormComponent implements OnInit {

  Form:FormGroup;
  dropdownSettings:dropdownSettings;
  permissions:permission[];

  constructor(private fb:FormBuilder,private management:ManagementSystemService,
    private toaster:ToastrService,private share:SharedDataService) {
    this.Form = this.fb.group({
      name:['',Validators.required],
      permissionType:['1',Validators.required],
      permission:['',Validators.required],
      screenId:[''],
      buttons:[''],
    })
    this.dropdownSettings = this.share.dropdownSettings
   
   }

  ngOnInit(): void {
    // screen of application;
    this.getPermissions()
  }

  getPermissions(){
    this.management.getPermissions().subscribe(res=>{
      console.log("r",res);
      
      this.permissions = res.Value
    })
  }

  checkDisable(){

  }

  cancel(){

  }

  addRule(){

  }

}
